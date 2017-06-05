var async = require('async');
var nodemailer = require('nodemailer');
// load up the user model
var User = require('../../models/User');
//load env config
require("dotenv").config();
exports.showResetForm = function(req, res) {
    User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
            $gt: Date.now()
        }
    }, function(err, user) {
        if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('/forget');
        }
        res.render('auth/password/reset', {
            user: req.user,
            token: req.params.token
        });
    });
};
exports.reset = function(req, res) {
    async.waterfall([
        function(done) {
            User.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: {
                    $gt: Date.now()
                }
            }, function(err, user) {
                if (!user) {
                    req.flash('error', 'Password reset token is invalid or has expired.');
                    return res.redirect('back');
                }
                user.local.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                user.save(function(err) {
                    done(err, user);
                });
            });
        },
        function(user, done) {
            var smtpTransport = nodemailer.createTransport({
                service: 'SendGrid',
                auth: {
                    user: process.env.SENDGRID_USER,
                    pass: process.env.SENDGIRD_PASS
                }
            });
            var mailOptions = {
                to: user.local.email,
                from: 'passwordreset@demo.com',
                subject: 'Your password has been changed',
                text: 'Hello,\n\n' + 'This is a confirmation that the password for your account ' + user.local.email + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
                req.flash('success', 'Success! Your password has been changed.');
                done(err);
            });
            req.logIn(user, function(err) {
                done(err);
            });
        }
    ], function(err) {
        res.redirect('/');
    });
};