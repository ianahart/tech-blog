const router = require('express').Router();
const PostService = require('../../services/PostService');
const withAuth = require('../../middleware/withAuth');

router.delete(`/:id`, withAuth, async (req, res) => {
  try {
    const post = await PostService.getPostWithUserById(req.params.id);

    if (!PostService.canDeletePost(post, req.session.user_id)) {
      return res.status(403).json({ message: 'Forbidden Action', message: "You cannot delete another user's post" });
    }
    post.destroy();
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

module.exports = router;
