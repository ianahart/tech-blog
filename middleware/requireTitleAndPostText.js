const requireUserNameAndPassword = (req, res, next) => {
  if (req.body.title.trim().length === 0 || req.body.postText.trim().length === 0) {
    return res.status(400).json({ message: 'Bad Request', error: 'Please make sure to fill out all fields' });
  }
  next();
};

module.exports = requireUserNameAndPassword;
