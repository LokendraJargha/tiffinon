const auth = require('../Controllers/V1/Auth/UserAuthController');

module.exports = (app) => {
  app.post('/auth/login', auth.Login);
  app.post('/api/v1/auth/log-out', auth.LogOut);
};
