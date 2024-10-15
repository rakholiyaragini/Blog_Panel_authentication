const bcrypt = require('bcrypt');
const signUpModel = require('../models/signUpmodel');
const otpGenerator = require('otp-generator');
const nodeMailer = require('nodemailer');
const token_generator = require('token-generator');
let myOtp = null;

const Transporter = nodeMailer.createTransport({

    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    service: "gmail",
    auth: {
        user: "raginirakholiya123@gmail.com",
        pass: "irkhzcvhebtuuxtr",
    }

})
const forgotPassword = (req, res) => {
    console.log("forgot Password");
    res.render('pages/samples/forgotPassword');

}
const forgotPasswordController = async (req, res) => {
    console.log("forgot Password Controller");
    const { email } = req.body;
    const user = await signUpModel.findOne({ email: email });

    if (user) {
        const tokenGenerator = new token_generator({
            salt: 'some-salt',
            timestamp: true,
            timestampMap: '0123456789'
        });
        let token = tokenGenerator.generate();

        // const token_generator = new token_ge nerator({
        //     salt: 'some-salt',
        //     timestamp: true
        // });
        await signUpModel.updateOne({ _id: user._id }, { resetToken: token });

        console.log("user found");
        let link = `http://localhost:3004/confirmOTP/${user.id}`;
        console.log("RESET LINK >>>", link);

        const generateOtp = {
            from: "raginirakholiya123@gmail.com",
            to: user.email,
            subject: "Reset Password",
            text: `Your reset password link is <a href="${link}">click here</a>`
        };
        Transporter.sendMail(generateOtp, (error, info) => {
            if (error) {
                return console.log('Error:', error);
            }
            console.log('Email sent:', info.response);
        });

        res.redirect('/forgotPassword');
    } else {
        console.log("user not found");
        res.redirect('/signUp');
    }
};

const otp = (req, res) => {
    // console.log("id", req.params.id);
    // let otp = otpGenerator.generate(6, { upperCaseAlphabets: false, lowerCaseAlphabets: false, specialChars: false });

    // myOtp = otp;
    // console.log("OTP", myOtp);
    res.render('pages/samples/otp', { id: req.params.id });
}
// const confirmOTP = (req, res) => {
//     console.log("confirm otp");
//     const userId = req.params.id;
//     res.render('pages/samples/resetPassword', { id: userId });
// };
const confirmOTP = async (req, res) => {
    console.log("Reset Password", req.params.id);

    try {
        const user = await signUpModel.findOne({ _id: req.params.id });

        console.log("user", user);
        if (user) {
            if (user.resetToken) {
                await signUpModel.updateOne({ _id: req.params.id }, { resetToken: null });
                res.render('pages/samples/resetPassword', { id: req.params.id });
            } else {
                console.log("Invalid Link");

                res.redirect('/errorPage');
            }

        } else {
            res.redirect('/errorPage');
        }
    } catch {
        console.log("Invalid Link");

        res.redirect('/errorPage');
    }
}
const resetPasswordController = async (req, res) => {
    const id = req.params.id;
    console.log("reset Password", id);
    const { new_password, conf_password } = req.body;
    if (new_password == conf_password) {
        bcrypt.hash(new_password, 10, async (err, hashPassword) => {
            if (err) {
                console.log("Error in hashing password", err);
                return res.status(500).send("Server error");
            }
            console.log("hash", hashPassword);
            const newPass = await signUpModel.updateOne({ _id: id }, { password: hashPassword });
            console.log("updated pass", newPass);

        })
        res.redirect('/');
    } else {
        console.log("new pass & con pass not mathed");
        res.redirect(`/resetPassword/${id}`);
    }
};
const changePassword = (req, res) => {
    console.log("chanage Password");
    res.render('pages/samples/changePassword');
}
const chanagePasswordController = (req, res) => {
    console.log("chanage Password Controller");

    const { password } = req.user;
    const { current_password, new_password, conf_password } = req.body;

    bcrypt.compare(current_password, password, (err, result) => {

        console.log("result", result);
        console.log("Password", password);

        if (result) {

            if (new_password == conf_password) {
                console.log("Password did not match");
                bcrypt.hash(new_password, 10, async (err, hashpassword) => {
                    console.log("hash", hashpassword);

                    const updatePassword = await signUpModel.updateOne({ _id: req.user._id }, { password: hashpassword });
                    console.log("updatePassword", updatePassword);
                })
                res.redirect('/');
            } else {
                console.log("new & con password not matched");
                res.redirect('/changePassword');
            }
        } else {
            console.log("Wrong password");

            res.redirect('/changePassword');
        }
    })
}

const errorPage = (req, res) => {

    res.render('pages/samples/errorPage');

}
module.exports = { forgotPassword, forgotPasswordController, changePassword, chanagePasswordController, otp, confirmOTP, resetPasswordController, errorPage }