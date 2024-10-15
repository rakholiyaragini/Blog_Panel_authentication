const mongoose = require('mongoose');

const signUpSchema = mongoose.Schema({
    name : {
        type:String,
        required:true
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    },
    resetToken : {
        type: String
    }
})

const signUpModel = mongoose.model('signUp',signUpSchema);

module.exports = signUpModel;