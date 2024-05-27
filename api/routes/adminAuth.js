const auth = require('../Controllers/V1/Auth/AdminAuthController');

module.exports = (app) => {
  app.post('/api/v1/auth/admin/login', auth.Login);
  // app.post('/api/v1/auth/admin/signup', auth.Signup);
  app.post('/api/v1/auth/admin/log-out', auth.LogOut);
};
