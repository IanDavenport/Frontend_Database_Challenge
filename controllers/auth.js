const SessionModel = require('../models/sessionModel');
// const SessionModel = require('../models/sessionModel');

exports.checkSignedIn = (async(req, res, next) => {
        if(await SessionModel.checkSession(req.session.userID)) {
            next();
        } else {
            res.send('You must log-in to access this page');
        }
});


// exports.adminSignedIn = (async(req, res, next) => {
//     if(await SessionModel.checkSession(req.session.adminID)) {
//         next();
//     } else {
//         res.send('Admin must log-in to access this page');
//     }
// });

