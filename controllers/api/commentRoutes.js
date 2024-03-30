const router = require('express').Router();
const withAuth = require('../../middleware/withAuth');
const CommentService = require('../../services/CommentService');

// delete comment by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // get commment by id
    const comment = await CommentService.getCommentById(req.params.id);

    // check if comment exists
    if (!comment) {
      return res
        .status(404)
        .json({ message: 'Not Found', error: `A comment with the id ${req.params.id} was not found` });
    }

    // check if current user owns comment
    if (!CommentService.canActionComment(comment, req.session.user_id)) {
      return res
        .status(403)
        .json({ message: 'Forbidden Action', error: 'You are not authorized to delete this comment' });
    }

    // delete comment if user owns it
    await CommentService.deleteCommentById(req.params.id);

    res.status(200).json({ message: 'Comment deleted sucessfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

module.exports = router;
