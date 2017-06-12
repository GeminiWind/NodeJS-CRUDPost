// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var configAuth = require('./auth');
require("dotenv").config();
// load up the user model
var User = require('../app/Models/User');
module.exports = function(passport) {
    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    }, function(req, email, password, done) {
        if (email) email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
        // asynchronous
        process.nextTick(function() {
            User.findOne({
                'email': email
            }, function(err, user) {
                // if there are any errors, return the error
                if (err) return done(err);
                // if no user is found, return the message
                if (!user) return done(null, false, req.flash('loginMessage', 'No user found.'));
                if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                // all is well, return user
                else return done(null, user);
            });
        });
    }));
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    }, function(req, email, password, done) {
        if (email) email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
        // asynchronous
        process.nextTick(function() {
            // if the user is not already logged in:
            if (!req.user) {
                User.findOne({
                    'email': email
                }, function(err, user) {
                    // if there are any errors, return the error
                    if (err) return done(err);
                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {
                        // create the user
                        var newUser = new User();
                        newUser.email = email;
                        newUser.password = password;
                        newUser.profile.name = req.body.name;
                        newUser.save(function(err) {
                            if (err) return done(err);
                            return done(null, newUser);
                        });
                    }
                });
                // if the user is logged in but has no local account...
            } else if (!req.user.email) {
                // ...presumably they're trying to connect a local account
                // BUT let's check if the email used to connect a local account is being used by another user
                User.findOne({
                    'email': email
                }, function(err, user) {
                    if (err) return done(err);
                    if (user) {
                        return done(null, false, req.flash('loginMessage', 'That email is already taken.'));
                        // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                    } else {
                        var user = req.user;
                        user.email = email;
                        user.password = password;
                        user.save(function(err) {
                            if (err) return done(err);
                            return done(null, user);
                        });
                    }
                });
            } else {
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user);
            }
        });
    }));
    passport.use(new FacebookStrategy({
            // pull in our app id and secret from our auth.js file
            clientID: process.env.FACEBOOK_CLIENT_ID || configAuth.facebook.clientID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || configAuth.facebook.clientSecret,
            callbackURL: process.env.FACEBOOK_CALLBACK_URL || configAuth.facebook.callbackURL,
            profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
            passReqToCallback : true
        },
        // facebook will send back the token and profile
        function(req, token, refreshToken, profile, done) {
            // asynchronous
            process.nextTick(function() {
                if (req.user) {
                    User.findOne({
                        'facebook.id': profile.id
                    }, (err, existingUser) => {
                        if (err) {
                            return done(err);
                        }
                        if (existingUser) {
                            req.flash('errors', {
                                msg: 'There is already a Facebook account that belongs to you. Sign in with that account or delete it, then link it with your current account.'
                            });
                            done(err);
                        } else {
                            User.findById(req.user.id, (err, user) => {
                                if (err) {
                                    return done(err);
                                }
                                user.facebook.id = profile.id;
                                user.facebook.token = token;
                                user.profile.name = user.profile.name || `${profile.name.givenName} ${profile.name.familyName}`;
                                user.profile.gender = user.profile.gender || profile._json.gender;
                                user.profile.picture = user.profile.picture || `https://graph.facebook.com/${profile.id}/picture?type=large`;
                                user.save((err) => {
                                    req.flash('info', {
                                        msg: 'Facebook account has been linked.'
                                    });
                                    done(err, user);
                                });
                            });
                        }
                    });
                } else {
                    User.findOne({
                        'facebook.id': profile.id
                    }, (err, existingUser) => {
                        if (err) {
                            return done(err);
                        }
                        if (existingUser) {
                            return done(null, existingUser);
                        }
                        User.findOne({
                            email: profile._json.email
                        }, (err, existingEmailUser) => {
                            if (err) {
                                return done(err);
                            }
                            if (existingEmailUser) {
                                req.flash('errors', {
                                    msg: 'There is already an account using this email address. Sign in to that account and link it with Facebook manually from Account Settings.'
                                });
                                done(err);
                            } else {
                                const user = new User();
                                user.email = profile._json.email;
                                user.facebook.id = profile.id;
                                user.facebook.token = token;
                                user.profile.name = `${profile.name.givenName} ${profile.name.familyName}`;
                                user.profile.gender = profile._json.gender;
                                user.profile.picture = `https://graph.facebook.com/${profile.id}/picture?type=large`;
                                user.profile.location = (profile._json.location) ? profile._json.location.name : '';
                                user.save((err) => {
                                    done(err, user);
                                });
                            }
                        });
                    });
                }
            });
        }));
/**
 * Sign in with Google.
 */
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID || configAuth.google.clientID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || configAuth.google.clientSecret,
        callbackURL: process.env.GOOGLE_CALLBACK_URL || configAuth.google.callbackURL,
        passReqToCallback : true
    }, function(req, token, refreshToken, profile, done) {
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
            if (req.user) {
                User.findOne({
                    'google.id': profile.id
                }, (err, existingUser) => {
                    if (err) {
                        return done(err);
                    }
                    if (existingUser) {
                        req.flash('errors', {
                            msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.'
                        });
                        done(err);
                    } else {
                        User.findById(req.user.id, (err, user) => {
                            if (err) {
                                return done(err);
                            }
                            user.google.id = profile.id;
                            user.google.token = token;
                            user.profile.name = user.profile.name || profile.displayName;
                            user.profile.gender = user.profile.gender || profile._json.gender;
                            user.profile.picture = user.profile.picture || profile._json.image.url;
                            user.save((err) => {
                                req.flash('info', {
                                    msg: 'Google account has been linked.'
                                });
                                done(err, user);
                            });
                        });
                    }
                });
            } else {
                User.findOne({
                    'google.id': profile.id
                }, (err, existingUser) => {
                    if (err) {
                        return done(err);
                    }
                    if (existingUser) {
                        return done(null, existingUser);
                    }
                    User.findOne({
                        email: profile.emails[0].value
                    }, (err, existingEmailUser) => {
                        if (err) {
                            return done(err);
                        }
                        if (existingEmailUser) {
                            req.flash('errors', {
                                msg: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.'
                            });
                            done(err);
                        } else {
                            const user = new User();
                            user.email = profile.emails[0].value;
                            user.google.id = profile.id;
                            user.google.token = token;
                            user.profile.name = profile.displayName;
                            user.profile.gender = profile._json.gender;
                            user.profile.picture = profile._json.image.url;
                            user.save((err) => {
                                done(err, user);
                            });
                        }
                    });
                });
            }
        });
    }));
};