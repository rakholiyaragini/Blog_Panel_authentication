const cookieParser = require('cookie-parser')
const signUpModel = require('../models/signUpmodel.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const logIn = (req, res) => {
    res.render('pages/samples/login-basic');
}

const logInController = async (req, res) => {
    console.log("login controller", req.body);
    
     res.redirect('/');
}
const logout = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}
module.exports = { logIn, logInController ,logout}
