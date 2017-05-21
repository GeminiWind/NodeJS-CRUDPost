const dotenv = require("dotenv").config();
var mongoose = require("mongoose");
// Connect to the beerlocker MongoDB
mongoose.connect(process.env.MONGODB_URL);
var Schema = mongoose.Schema;
//Initialize Schema
var postSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    created_at: Date,
    updated_at: Date
});
var Post = mongoose.model('Post', postSchema);
//Helper method for CRUD
postSchema.methods.all = (cb) => {
    return this.model('Post').find({}, cb);
};
postSchema.methods.find = (id, cb) => {
    return this.model('Post').findById(id, cb);
};
postSchema.methods.store = (req, cb) => {
    let post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    return post.save(cb);
};
postSchema.methods.update = (id, req, cb) => {
    this.model('Post').findByIdAndUpdate(id, {
        $set: {
            title: req.body.title,
            content: req.body.content
        }
    }, cb);
};
postSchema.methods.delete = (id, cb) => {
    return this.model('Post').findByIdAndRemove(id, cb);
};
// on every save, add the date
postSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at) this.created_at = currentDate;
    next();
});

module.exports = Post;