const requireUserNameAndPassword = (req, res, next) => {
  if (req.body.username.trim().length === 0 || req.body.password.trim().length === 0) {
    return res.status(400).json({ message: 'Bad Request', error: 'Please make sure to fill out all fields' });
  }
  next();
};

module.exports = requireUserNameAndPassword;
