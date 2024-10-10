const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');
const signUp = require('../controllers/signUpController');
const logIn = require('../controllers/loginController');
const passport = require('../config/passportConfig');
const isAuth = require('../auth/auth');
const blog = require('../controllers/blog');
const multer = require('../config/multerConfig');
const upload = require('../config/multerConfig');
const authController = require('../controllers/authController');
const topic = require('../controllers/topic');

// Default route
router.get('/', isAuth, controller.defaultController);

// Sign Up routes
router.get('/signUp', signUp.signUpform);
router.post('/signUpController', signUp.signUpController);

// Log In routes
router.get('/logIn', logIn.logIn);
router.post('/logInController', passport.authenticate('local', { failureRedirect: '/logIn' }), logIn.logInController);
router.get('/logout', isAuth, logIn.logout);

// Blog routes
router.get('/addBlog', blog.addBlog);
router.post('/addBlogController', upload.single('blog_img'), blog.addBlogController);
router.get('/viewBlog', isAuth, blog.viewBlog);
router.get('/editBlog/:id', blog.editController);
router.post('/updateBlog/:id', upload.single('blog_img'), blog.updateController);
router.get('/deleteBlog/:id', blog.deleteController);
router.get('/allBlog', isAuth, blog.allBlog);

// Authentication routes
router.get('/forgotPassword', authController.forgotPassword);
router.post('/forgotPasswordController', authController.forgotPasswordController);
router.get('/changePassword', isAuth, authController.changePassword);
router.post('/chanagePasswordController', authController.chanagePasswordController);

// OTP and Reset Password routes
router.get('/otp/:id', authController.otp);
router.post('/confirmOTP/:id', authController.confirmOTP);
router.get('/confirmOTP/:id', authController.confirmOTP);
router.post('/resetPasswordController/:id', authController.resetPasswordController);

// Error page route
router.get('/errorPage', authController.errorPage);
// Topic routes
router.get('/addTopics',isAuth,topic.addTopics);
router.post('/addTopicController',isAuth,topic.addTopicsController)
router.get('/deleteTopics/:id',isAuth,topic.deletTopics);
router.get('/subTopic',isAuth,topic.subTopic);
module.exports = router;
