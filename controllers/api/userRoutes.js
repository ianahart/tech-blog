const router = require('express').Router();
const UserService = require('../../services/UserService');
const requireUserNameAndPassword = require('../../middleware/requireUserNameAndPassword');

// Create user
router.post('/', requireUserNameAndPassword, async (req, res) => {
  try {
    const userExists = await UserService.getUserByUserName(req.body.username);

    // check to see if email exists
    if (userExists !== null) {
      return res.status(400).json({ message: 'Bad Request', error: 'Email is already taken' });
    }

    const dbUserData = await UserService.createUser(req.body);

    // persist relevant session information
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;
      req.session.username = dbUserData.username;
      res.status(201).json({ message: 'success', data: {} });
    });
  } catch (error) {
    res.status(500).json({ message: 'Intenal Server Error', error });
  }
});

// login user
router.post('/login', requireUserNameAndPassword, async (req, res) => {
  try {
    let dbUserData = await UserService.getUserByUserName(req.body.username);

    // validate that the email exists
    if (!dbUserData) {
      return res.status(400).json({ message: 'Bad Request', error: 'Incorrect email or password. Please try again' });
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    // validate that the password matches the password in the database
    if (!validPassword) {
      return res.status(400).json({ message: 'Bad Request', error: 'Incorrect email or password. Please try again' });
    }

    // detach password field from dbUserData
    dbUserData = UserService.detachPasswordField(dbUserData.get({ plain: true }));

    // persist relevant session information

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.logged_in = true;
      req.session.username = dbUserData.username;
      res.status(200).json({ message: 'success', data: dbUserData });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

module.exports = router;
