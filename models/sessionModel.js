const {Schema, model} = require('mongoose');

const session = new Schema({
    expires: {type: Date},
    session: {type: String},
});

session.statics.checkSession = async function (userID) {
    let sessions = await this.find({});
    for (let session of sessions) {
        if (JSON.parse(session.session).userID == userID) {
            return true;
        }
    }
    return false;
}

module.exports = model('sessions', session);
