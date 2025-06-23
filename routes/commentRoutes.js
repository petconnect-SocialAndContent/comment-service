const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController.js');

router.post('/', commentController.createComment);
router.get('/post/:postId', commentController.getCommentsByPost);

module.exports = router;
