// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
// define the schema for our user model
var userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    facebook: {
        id: String,
        token: String
    },
    twitter: {
        id: String,
        token: String
    },
    google: {
        id: String,
        token: String
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    profile: {
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});
// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);