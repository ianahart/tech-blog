const PostService = require('../services/PostService');
const router = require('express').Router();
const withAuth = require('../middleware/withAuth');

// go to create a post page
router.get('/posts/create', withAuth, (req, res) => {
  try {
    res.render('create-post', {
      loggedIn: req.session.logged_in,
      userId: req.session.user_id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// display posts with user and a comments on the homepage
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

// display all the user's posts on the dashboard
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

// display the login page, if already logged in redirect to homepage
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

// display the signup page, if already logged in redirect to homepage
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

// get to single post page with post and post's comments
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

// go to edit post page send back the post to populate the form fields with existing data
router.get('/posts/:id/edit', withAuth, async (req, res) => {
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
