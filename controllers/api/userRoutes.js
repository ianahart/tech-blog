const router = require('express').Router();
const UserService = require('../../services/UserService');
const requireUserNameAndPassword = require('../../middleware/requireUserNameAndPassword');

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
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

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
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
