const passport = require('passport');

module.exports = {
  initialize: function () {
    return passport.initialize();
  },
  authenticate: function (req, res, next) {
    return passport.authenticate(
      'kitchen',
      {
        session: false,
      },
      (err, kitchen, info) => {
        if (err) {
          return next(err);
        }
        if (!kitchen) {
          return res
            .send({
              status: '401',
              error: 'Authorization failed for Kitchen',
            })
            .status(401);
        }
        // Forward kitchen customer information to the next middleware
        req.kitchen = kitchen;
        next();
      }
    )(req, res, next);
  },
};
