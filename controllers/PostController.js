//Model
const path = require("path");
const Post = require(path.normalize('./../models/Post'));

exports.index = (req,res) => {
	Post.find(function (err, posts) {  
	    if (err) {
	        res.status(500).send(err)
	    } else {
	        console.log(posts);
	        res.render("posts/index",{posts: posts});
	    }
	});
}

exports.create = (req,res) => {
	return res.render("posts/create");
}

exports.store = (req,res) => {
	let post = new Post(req.body);
	post.save(function (err, createdPost) {  
    if (err) {
        res.send(err);
    }
    res.redirect("/posts");
});
}
exports.edit = (req,res) => {
	Post.findById(req.params.id, (err,post)=>{
		 if (err) {
	        res.send(err);
	    }
	    if (post) {
	        res.render("posts/edit",{post:post});
	    } else {
	        res.send("No post");
	    }
	});
}

exports.update = (req,res) => {
	Post.findByIdAndUpdate(req.params.id, {$set: req.body}, (err,post)=>{
		if (err) {
			console.log(err);
		} 
		return res.redirect("posts");
	});
}

exports.delete = (req,res) => {
	Post.findByIdAndRemove(req.params.id, (err,post)=>{
		return res.redirect("posts");
	})
}