//==================================================
//This file contain api router which serve for client
//==================================================

module.exports = function(app,io) {
    const postController = require('../app/Http/Controllers/PostController')(io);    
    app.delete("/api/posts/:id", postController.delete);
}
