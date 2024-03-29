const router = require('express').Router();
const UserService = require('../../services/UserService');

router.post('/', async (req, res) => {
  try {
    if (req.body.username.trim().length === 0 || req.body.password.trim().length === 0) {
      return res.status(400).json({ message: 'Bad Request', error: 'Please make sure to fill out all fields' });
    }

    const userExists = await UserService.getUserByUserName(req.body.username);

    if (userExists) {
      return res.status(400).json({ message: 'Bad Request', error: 'Email is already taken' });
    }

    const userData = await UserService.createUser(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.username = userData.username;
      res.status(201).json({ message: 'success', data: {} });
    });
  } catch (error) {
    res.status(500).json({ message: 'Intenal Server Error', error });
  }
});

module.exports = router;
