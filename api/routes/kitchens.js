const KitchenController = require('../Controllers/V1/Api/Kitchens/KitchenController');
const KitchenReviewController = require('../Controllers/V1/Api/Kitchens/Reviews/KitchenReviewController');
const KitchenAuthController = require('../Controllers/V1/Api/Kitchens/Auth/AuthController');
const kitchenAuth = require('../Middleware/Auth/kitchenJwt')['authenticate'];
const adminAuthentication = require('../Middleware/Auth/adminJwt')[
  'authenticate'
];

module.exports = (app) => {
  app.get('/api/v1/kitchens', adminAuthentication, KitchenController.index);
  app.post('/api/v1/kitchens', KitchenController.store);
  app.put('/api/v1/kitchens/:id', KitchenController.update);
  app.delete('/api/v1/kitchens', KitchenController.delete);

  app.get('/api/v1/kitchens/uploads/:id', KitchenController.uploads);

  app.post(
    '/api/v1/kitchens/verifications/:id',
    KitchenController.verifications
  );

  app.get('/kitchen-reviews', KitchenReviewController.index);
  app.post('/kitchen-reviews', KitchenReviewController.store);

  // login
  app.post('/api/v1/kitchen/login', KitchenAuthController.sendOTP);
  app.post('/api/v1/kitchen/otp', KitchenAuthController.validateOTP); // validate otp
  app.get('/api/v1/kitchen/otp', KitchenAuthController.resendOTP); // resend otp

  // profile
  app.get('/api/v1/kitchen/profile', kitchenAuth, KitchenController.getProfile);
  app.post(
    '/api/v1/kitchen/profile',
    kitchenAuth,
    KitchenController.updateProfile
  );
};
