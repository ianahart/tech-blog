const router = require('express').Router();
const PostService = require('../../services/PostService');
const withAuth = require('../../middleware/withAuth');
const requireTitleAndPostText = require('../../middleware/requireTitleAndPostText');

// create a post
router.post('/', withAuth, requireTitleAndPostText, async (req, res) => {
  try {
    await PostService.createPost({
      user_id: req.session.user_id,
      post_text: req.body.postText,
      title: req.body.title,
    });

    res.status(201).json({ message: 'success' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// delete a post by its id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // get post by id
    const post = await PostService.getPostWithUserById(req.params.id);

    // if post with specified id is not found send error response
    if (!post) {
      return res
        .status(400)
        .send({ message: 'Bad Request', error: `A post with the id ${req.params.id} was not found` });
    }

    // check to see if post's user is equal to the session user
    if (!PostService.canActionPost(post, req.session.user_id)) {
      return res.status(403).json({ message: 'Forbidden Action', message: "You cannot delete another user's post" });
    }
    post.destroy();
    return res.status(200).json({ message: 'success' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// update a post by it's id
router.put('/:id', withAuth, requireTitleAndPostText, async (req, res) => {
  try {
    // get post by its id
    const post = await PostService.getPostWithUserById(req.params.id);

    // check to see if post exists
    if (!post) {
      return res
        .status(400)
        .send({ message: 'Bad Request', error: `A post with the id ${req.params.id} was not found` });
    }

    // check to see if post's user is equal to session user
    if (!PostService.canActionPost(post, req.session.user_id)) {
      return res.status(403).json({ message: 'Forbidden Action', error: "You cannot update another user's post" });
    }

    // update post
    post.title = req.body.title;
    post.post_text = req.body.postText;

    post.save();

    res.status(200).json({ message: 'success' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

module.exports = router;
