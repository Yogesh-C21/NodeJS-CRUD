const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    gender : String,
    status : String
})

const Userdb = mongoose.model('User', userSchema);

module.exports = Userdb;