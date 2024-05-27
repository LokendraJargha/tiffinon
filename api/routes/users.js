const UserController = require('../Controllers/V1/Api/Users/UserController');
const userAuth = require('../Middleware/Auth/userJwt')['authenticate'];

module.exports = (app) => {
  app.get('/api/v1/users', UserController.index);
  app.post('/api/v1/users', UserController.store);
  app.put('/api/v1/users/:id', UserController.update);
  app.delete('/api/v1/users', UserController.delete);

  // login
  app.post('/api/v1/user/login', UserController.sendOTP);
  app.post('/api/v1/user/validate-otp', UserController.validateOTP);

  app.get('/api/v1/user/profile', userAuth, UserController.profile);
};
