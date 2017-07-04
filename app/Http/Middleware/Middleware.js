var multer  = require('multer');
//config multer
var configFile = require('../../../config/file.js');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, configFile.upload.profile_pic)
  },
  filename: function (req, file, cb) {
  	let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, req.user.profile.name + '.' + extension);
  }
});

var uploadProfilePic = multer({ storage: storage });

//middleware to authenticate user
exports.redirectIfAuthenticated = (req, res, next) => {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/login');
}

//middleware to handle avatar image of user
exports.uploadProfilePicture = uploadProfilePic.single('avatar');
