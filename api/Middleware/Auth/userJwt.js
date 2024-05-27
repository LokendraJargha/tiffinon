const passport = require('passport');

module.exports = {
  initialize: function () {
    return passport.initialize();
  },
  authenticate: function (req, res, next) {
    return passport.authenticate(
      'user',
      {
        session: false,
      },
      (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (!user) {
          return res
            .send({
              status: '401',
              error: 'Unauthorization fail for User',
            })
            .status(401);
        }
        // Forward kitchen customer information to the next middleware
        req.user = user;
        next();
      }
    )(req, res, next);
  },
};
