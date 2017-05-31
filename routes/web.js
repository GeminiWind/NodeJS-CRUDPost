const postController = require('../controllers/PostController');
const loginController = require('../controllers/Auth/LoginController');
const registerController = require('../controllers/Auth/RegisterController');
module.exports = function(app, passport) {
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
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('auth/profile', {
            user: req.user // get the user out of session and pass to template
        });
    });
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
    app.delete("/posts/:id", postController.delete);
}
// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/');
}