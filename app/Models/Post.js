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
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
var Post = mongoose.model('Post', postSchema);
module.exports = Post;