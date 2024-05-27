const kitchenAuthController = require('../Controllers/V1/Auth/KitchenAuthController');

module.exports = (app) => {
  app.post('/api/v1/auth/kitchens/login', kitchenAuthController.login);
  app.post('/api/v1/auth/kitchens/log-out', kitchenAuthController.logOut);
};
