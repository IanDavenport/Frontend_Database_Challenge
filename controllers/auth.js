const SessionModel = require('../models/sessionModel');

exports.checkSignedIn = (async(req, res, next) => {
        if(await SessionModel.checkSession(req.session.userID)) {
            next();
        } else {
            res.render('login', {err: 'YOU MUST LOG-IN TO ACCESS THIS PAGE'});
        }
});

