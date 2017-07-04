var mongoose = require("mongoose");
var Schema = mongoose.Schema;
//Initialize Schema
var chatSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: Object,
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});
// create the model for users and expose it to our app
var Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;