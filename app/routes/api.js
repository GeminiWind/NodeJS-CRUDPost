
const loginController = require('../controllers/Auth/LoginController');
module.exports = function(app,io) {
    const postController = require('../controllers/PostController')(io);    
    app.delete("/api/posts/:id", postController.delete);
}
