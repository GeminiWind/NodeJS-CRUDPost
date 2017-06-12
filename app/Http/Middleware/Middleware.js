var multer  = require('multer');
//config multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'storage/app/profile/')
  },
  filename: function (req, file, cb) {
  	let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    cb(null, req.user.profile.name + '.' + extension);
  }
})

var uploadProfilePic = multer({ storage: storage });

exports.redirectIfAuthenticated = (req, res, next) => {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/login');
}

exports.uploadProfilePicture = uploadProfilePic.single('avatar');
