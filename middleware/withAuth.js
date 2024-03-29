const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    return res.redirect(401, '/login');
  } else {
    next();
  }
};

module.exports = withAuth;
