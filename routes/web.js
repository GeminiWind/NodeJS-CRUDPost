const loginController = require('../app/Http/Controllers/Auth/LoginController');
const registerController = require('../app/Http/Controllers/Auth/RegisterController');
const forgetPasswordController = require('../app/Http/Controllers/Auth/ForgetPasswordController.js');
const resetPasswordController = require('../app/Http/Controllers/Auth/ResetPasswordController.js');
const middleware = require('../app/Http/Middleware/Middleware.js');
module.exports = function(app, passport, io) {
    const postController = require('../app/Http/Controllers/PostController')(io);
    const chatController = require('../app/Http/Controllers/ChatController')(io);
    app.get('/', (req, res) => {
        res.render('index');
    });
    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', loginController.showLoginForm);
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    // show the signup form
    app.get('/register', registerController.showRegistrationForm);
    // process the signup form
    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/register', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    app.get('/forget',forgetPasswordController.showForgetForm);
    app.post('/forget',forgetPasswordController.forget);
    app.get('/reset/:token', resetPasswordController.showResetForm);
    app.post('/reset/:token', resetPasswordController.reset);
    app.get('/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));
    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
    }));
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', middleware.redirectIfAuthenticated, function(req, res) {
        res.render('auth/profile', {
            user: req.user // get the user out of session and pass to template
        });
    });
    app.post('/profile/pic', [middleware.redirectIfAuthenticated,middleware.uploadProfilePicture], function (req, res, next) {
      console.log(req.file.path);
      let user = req.user;
      user.profile.picture = req.file.path;
      user.save(function(err,user){
        if (err) console.log(err);
      })
      res.redirect('back');
    })
    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    //Manage posts
    app.get("/posts", postController.index);
    app.get("/posts/create", postController.create);
    app.post("/posts", postController.store);
    app.get("/posts/:id/edit", postController.edit);
    app.put("/posts/:id", postController.update);
    //Chat realtime
    app.get("/chats", middleware.redirectIfAuthenticated, chatController.index);
    app.post("/chats",middleware.redirectIfAuthenticated, chatController.store);
}
