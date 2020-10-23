const {Router} = require('express');
const UserModel = require('../models/userModel');
const {checkSignedIn} = require('../controllers/auth');

const {nanoid} = require('nanoid');
const router = Router();

router.get('/users', async(req, res) => {
    let allUsers = await UserModel.find({});
    res.send(allUsers);
});
 
router.post('/users/create', async(req, res) => {
    let {name, email, age, phoneNumber, password} = req.body;
    if (!name || !email || !age || !password) {
        res.send('Missing required info');
        return;
    }

    if (await UserModel.checkExists(email, phoneNumber)) {
        res.send('A user with this email or phone number already exists');
        return;
    }

    let hashedPassword = await UserModel.hashPassword(password);

    let user = new UserModel({
        name,
        email,
        age,
        phoneNumber,
        password: hashedPassword
    });

    user.save();
    res.send('user created');
});

// USER LOG-IN & AUTHENTICATION BIT
router.post('/login', async (req, res) => {
    let {email, password} = req.body;

    if (!await UserModel.checkExists(email)) {
        res.send('A user with this email doesn\'t exist');
        //  Incorrect user details submitted
        return
    }

    if (await UserModel.comparePassword(email, password)) {
        req.session.userID = nanoid();
        req.session.save();
        res.send('You are now signed in')
        //  User authenticated and signed in
        return
    }
        res.send('You have entered an incorrect password')
        // User entered an incorredct password message
});


router.get('/protected-route', checkSignedIn, (req,res) => {
    res.send('Welcome to the Protected Page');
});



module.exports = router;
