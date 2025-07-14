const Comment = require('../models/Comment');

exports.createComment = async (req, res) => {
  try {
    const { postId, content } = req.body;
    const userId = req.user.id;

    const newComment = new Comment({
      postId,
      userId,
      content
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error('❌ Error creating comment:', error);
    res.status(500).json({ error: 'Error creating comment' });
  }
};

exports.getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    console.error('❌ Error getting comments:', error);
    res.status(500).json({ error: 'Error getting comments' });
  }
};
