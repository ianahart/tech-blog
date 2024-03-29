const sequelize = require('../config/connection');
const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    res.render('homepage', { pageTitle: 'Home', loggedIn: req.session.logged_in, userId: req.session.user_id });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

module.exports = router;
