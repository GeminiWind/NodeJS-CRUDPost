module.exports = function(app,io) {
    const postController = require('../app/Http/Controllers/PostController')(io);    
    app.delete("/api/posts/:id", postController.delete);
}
