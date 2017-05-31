exports.showRegistrationForm = (req, res) => {
    res.render('auth/register', {
        message: req.flash('signupMessage')
    });
}
exports.register = (passport) => {
    passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/register', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    });
}