var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Initialize Schema
var chatSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: Object,
    created_at: Date,
    updated_at: Date
});
var Chat = mongoose.model('Chat', chatSchema);

// on every save, add the date
chatSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();
    // change the updated_at field to current date
    this.updated_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at) this.created_at = currentDate;
    next();
});

module.exports = Chat;