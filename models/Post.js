var mongoose = require("mongoose");
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