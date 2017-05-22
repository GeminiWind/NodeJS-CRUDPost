const express = require('express');
var router = express.Router();

const postController = require('./../controllers/PostController');

router.get("/posts", postController.index);
router.get("/posts/create", postController.create);
router.post("/posts", postController.store);
router.get("/posts/:id/edit", postController.edit);
router.put("/posts/:id", postController.update);
router.delete("/posts/:id", postController.delete);

module.exports = router