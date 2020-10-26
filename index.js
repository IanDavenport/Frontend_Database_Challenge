//  npm i express-handlebars
//  npm i connect-mongo     <==  NEEDED FOR SESSIONS
//  npm i express-session   <==  NEEDED FOR SESSIONS


const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const express = require('express');

const path = require('path');

const router = require('./routes/router');
const app = express();


app.engine('.hbs', hbs({
    extname: '.hbs',
    defaultLayout: 'layout'
}));

app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


mongoose.connect('mongodb+srv://Ian:password123abc@cluster0.rsd7t.mongodb.net/fred?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}); //  ABOVE AVOIDS GETTING DEPRACATION WARNING

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


////////////  SESSIONS CODE BELOW ////////////  
app.use(session({
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    secret: 'keyboardcat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,              //  process.env.IN_PROD
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 2  // = 2 hours
        // maxAge: 60000  //  ONE MINUTE
    }
}));
////////////  SESSIONS CODE ABOVE ////////////  


app.use('/', router);

app.get('/index', (req, res) => {    //location on server
    res.render('index');             // actual page to send to client
});

app.get('/admin', (req, res) => {
    res.render('admin');
});

app.get('/two', (req, res) => {
    res.render('two');
});

app.get('/three', (req, res) => {
    res.render('three');
});









app.listen(3000, () => {
    console.log('Server listening on port 3000');
});








// #### EARLY CODE FOR ADDING A NEW USER ####
// let user = new UserModel({      // user is    
//     name: 'George',             // UserModel is     
//     email: "george@gmail.com",
//     age: 42,
//     phoneNumber: "07744246802"
// });
// user.save();  //  adds users to the database when new data is added into the above.
                 //  but can comment out when NOT adding a new user.   


// const getUsers = async() => {
//     let allUsers = await userModel.find({}); //find= [{}, {}, {}]  findOne= {}
//     console.log(allUsers);
//     // let allUsers = await userModel.find({Dean});  // WOULD FIND ONLY DEANS
// }
// getUsers();




