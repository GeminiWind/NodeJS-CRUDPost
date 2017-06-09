const Post = require('../../Models/Post');
var mongoose = require("mongoose");
module.exports = function(io) {
    var module = {};
    module.index = (req, res) => {
        Post.find(function(err, posts) {
            if (err) {
                res.status(500).send(err)
            } else {
                res.render("posts/index", {
                    posts: posts
                });
            }
        });
    };
    module.create = (req, res) => {
        return res.render("posts/create");
    };
    module.store = (req, res) => {
        req.assert('title', 'Null title').notEmpty();
        req.assert('content', 'Null content').notEmpty();
        req.getValidationResult().then(function(result) {
            if (!result.isEmpty()) {
                res.status(400).send('There have been validation errors: ');
                return;
            }
            let post = new Post(req.body);
            post.save(function(err, createdPost) {
                if (err) {
                    req.flash('error', 'Whoops! Sonething went wrong');
                }
                io.on('connection', function(socket){
                 console.log("Connected");
				  io.emit('post-create-stt',{msg:'Success'});
				  socket.on('disconnect', () => {
				    console.log('user disconnected');
				  });
				});
                req.flash('success', 'Create post sucessful');
                res.redirect("/posts");
            });
        });
    };
    module.edit = (req, res) => {
        Post.findById(req.params.id, (err, post) => {
            if (err) {
                res.send(err);
            }
            if (post) {
                res.render("posts/edit", {
                    post: post
                });
            } else {
                res.send("No post");
            }
        });
    };
    module.update = (req, res) => {
        let _id = new mongoose.Schema.ObjectId(req.params.id).path;
        Post.findByIdAndUpdate(_id, req.body, (err, post) => {
            if (err) {
                req.flash('error', 'Whoops! Sonething went wrong');
            }
            req.flash('success', 'Update post sucessful');
            res.redirect("/posts");
        });
    }
    module.delete = (req, res) => {
        let _id = new mongoose.Schema.ObjectId(req.params.id).path;
        Post.findByIdAndRemove(_id, (err, post) => {
            if (err) {
                res.json({
                    error: 1,
                    message: "Error"
                });
            }
            res.json({
                error: 0,
                message: "Success"
            });
        })
    }
    return module;
};