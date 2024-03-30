const requirePostIdAndCommentText = (req, res, next) => {
  if (req.body.commentText.trim().length === 0 || !req.body.postId) {
    return res.status(400).json({ message: 'Bad Request', error: 'Please make sure to fill out all fields' });
  }
  next();
};
module.exports = requirePostIdAndCommentText;
