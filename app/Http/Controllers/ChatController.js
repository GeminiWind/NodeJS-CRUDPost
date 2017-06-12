const Chat = require('../../Models/Chat');
var mongoose = require("mongoose");
module.exports = function(io) {
    var module = {};
    module.index = (req, res) => {
        Chat.find(function(err, chats) {
            if (err) {
                res.status(500).send(err)
            } else {
                res.render("chats/index", {
                    chats: chats
                });
            }
        });
    };
    module.store = (req, res) => {
        req.assert('content', 'Null content').notEmpty();
        req.getValidationResult().then(function(result) {
            if (!result.isEmpty()) {
                res.status(400).send('There have been validation errors: ');
                return;
            }
            let chat = new Chat({
                content: req.body.content,
                author: [req.user]
            });
            chat.save(function(err, createdChat) {
                if (err) {
                    req.status(500);
                }
                io.on('connection', function(socket) {
                    socket.broadcast.emit('chat', {
                        content: chat.content,
                        author: chat.author[0].email
                    });
                    console.log("Send chat event ok");
                });
                res.redirect("/chats");
            });
        });
    };
    return module;
};