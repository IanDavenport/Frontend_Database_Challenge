
// Schema is a skeleton of what our document will 
// look like in a table

//  npm i bcrypt    


const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const user = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    // age: {type: Number, required: true},
    // phoneNumber: {type: String, required: false, unique: true},
    password: {type: String, required: true}
});


//  STATIC METHODS FOR SCHEMA
user.statics.checkExists = async function(email, phoneNumber) {
    let exists = await this.exists({$or: [{email}, {phoneNumber}]});
    // if (exists) {
    //     return true;
    // } 
    return exists;
}


user.statics.hashPassword = async function (password) {
    let hash = await bcrypt.hash(password, 12);  //  12 is the number of times the hash occurs
    console.log(hash);
    return hash;
}


user.statics.comparePassword = async function (email, attemptedPassword) {
    let user = await this.findOne({email});
    if (!user) {
        return false;
    } 
    let result = await bcrypt.compare(attemptedPassword, user.password);
    return result;
}


module.exports = model('users', user);
//  MODEL IS A PACKAGED VERSION OF THE SCHEMA





