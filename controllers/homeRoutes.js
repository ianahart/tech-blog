const PostService = require('../services/PostService');
const router = require('express').Router();
const withAuth = require('../middleware/withAuth');

router.get('/', async (req, res) => {
  try {
    const postData = await PostService.getAllPosts();

    res.render('homepage', {
      pageTitle: 'Home',
      loggedIn: req.session.logged_in,
      userId: req.session.user_id,
      posts: postData.map((post) => post.get({ plain: true })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postData = await PostService.getAllUserPosts();

    res.render('dashboard', {
      pageTitle: 'Dashboard',
      loggedIn: req.session.logged_in,
      userId: req.session.user_id,
      posts: postData.map((post) => post.get({ plain: true })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

module.exports = router;
