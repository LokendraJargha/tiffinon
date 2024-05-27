const passport = require('passport');

module.exports = {
  initialize: function () {
    return passport.initialize();
  },
  authenticate: function (req, res, next) {
    return passport.authenticate(
      'admin',
      {
        session: false,
      },
      (err, admin, info) => {
        if (err) {
          return next(err);
        }
        if (!admin) {
          return res.status(401).json({
            status: '401',
            error: 'Unauthorization admin',
          });
        }
        // Forward user information to the next middleware
        req.admin = admin;
        next();
      }
    )(req, res, next);
  },
};
