const PostService = require('../services/PostService');
const router = require('express').Router();
const withAuth = require('../middleware/withAuth');

router.get('/', async (req, res) => {
  try {
    const postData = await PostService.getAllPostsWithUserAndComments();

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
    const postData = await PostService.getAllUserPosts(req.session.user_id);

    res.render('dashboard', {
      pageTitle: 'Dashboard',
      loggedIn: req.session.logged_in,
      userId: req.session.user_id,
      posts: postData.map((post) => post.get({ plain: true })),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

router.get('/login', (req, res) => {
  try {
    if (req.session.logged_in) {
      return res.redirect('/');
    }
    res.render('login');
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

router.get('/signup', (req, res) => {
  try {
    if (req.session.logged_in) {
      return res.redirect('/');
    }
    res.render('signup');
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

router.get('/posts/:id', async (req, res) => {
  try {
    const postData = await PostService.getPostWithUserAndCommentsById(req.params.id);
    const post = PostService.placeOwnership(postData, req.session.user_id);

    res.render('post', {
      post,
      loggedIn: req.session.logged_in,
      userId: req.session.user_id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

router.get('/posts/:id/edit', async (req, res) => {
  try {
    const post = await PostService.getPostWithUserById(req.params.id);

    res.render('update-post', {
      post: post.get({ plain: true }),
      loggedIn: req.session.logged_in,
      userId: req.session.user_id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

module.exports = router;
