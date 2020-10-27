//  npm i nanoid   TO INSTALL NANOID WHICH GIVES RANDOM STRING FOR USER-ID

const {Router} = require('express');
const UserModel = require('../models/userModel');
const {checkSignedIn} = require('../controllers/auth');

const {nanoid} = require('nanoid');
const router = Router();



router.get('/', (req, res) => {
    res.render('index');
});

router.get('/signup', (req, res) => {
    res.render('signup');
})    

router.get('/users', async(req, res) => {
    let allUsers = await UserModel.find({});
    res.send(allUsers);   // res.render
});
 
router.get('/login', (req,res) => {
    res.render('login');
});

router.get('/profile', checkSignedIn, (req,res) => {
    res.render('profile');
});

router.get('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/');
});



//  USER SIGN-UP SECTION (CREATE) ==========================================
//  router.post('/users/create', async(req, res) => {   Cannot POST /
//  router.post('/signup', async(req, res) => {         Cannot POST /
//  router.post('', async(req, res) => {                Missing required info

router.post('/signup', async(req, res) => {
    let {name, email, password} = req.body;

    if (!name || !email || !password) {
        res.render('signup', {err:'Missing required info'});
        
    }

    if (await UserModel.checkExists(email)) {
        res.render('signup', {err:'A user with this email already exists'});
        return;
    }

    let hashedPassword = await UserModel.hashPassword(password);

    let user = new UserModel({
        name,
        email,
        password: hashedPassword
    });

    user.save();
    req.session.userID = nanoid();
    res.redirect('/profile');
});

router.get('/login', async (req, res) => {
    res.render('login')
})


//  ############  LOG IN  ############  
router.post('/login', async (req, res) => {
    let {email, password} = req.body;

    if (!await UserModel.checkExists(email)) {
        res.render('login', {err: 'A user with this email doesn\'t exist'});
        return;
    }

    if (await UserModel.comparePassword(email, password)) {
        req.session.userID = nanoid();
        req.session.save();
        res.redirect('profile');
        return;
    }
        res.render('login', {err:'You have entered an incorrect password'})
    
});


module.exports = router;
