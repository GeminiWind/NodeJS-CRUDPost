exports.showLoginForm = (req,res) => {
	 res.render('auth/login', { message: req.flash('loginMessage') }); 
}
exports.login = (passport) => {
	passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    });
}