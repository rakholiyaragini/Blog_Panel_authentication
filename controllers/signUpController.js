const signUpModel = require('../models/signUpmodel.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const signUpController = async (req, res) => {
    try {

        const existingUser = await signUpModel.findOne({ email: req.body.email });
        console.log("req", req.body);

        if (existingUser) {
            console.log("Email already exists. Redirecting to login.");
            return res.redirect('/login');
        }

        if (req.body.password === req.body.con_password) {
            bcrypt.hash(req.body.password, saltRounds, async (err, hashPassword) => {
                if (err) {
                    console.error("Error hashing password:", err);
                    return res.redirect('/signUp');
                }
                const newUser = {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashPassword
                };

                let model = new signUpModel(newUser);
                console.log("Saving new user to database", model);

                await model.save();
                res.redirect('/login');
            });
        } else {
            console.log("Passwords do not match");
            res.redirect('/');
        }
    } catch (error) {
        console.error("Error in sign-up process:", error);
        res.redirect('/signUp');
    }
};

const signUpform = (req, res) => {
    res.render('pages/samples/register-basic');
}

module.exports = { signUpController, signUpform };
