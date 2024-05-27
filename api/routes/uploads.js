const UploadController = require('../Controllers/V1/Api/Uploads/UploadControllers');
const kitchenAuth = require('../Middleware/Auth/kitchenJwt')['authenticate'];

module.exports = (app) => {
  app.post('/api/v1/kitchens/uploads', kitchenAuth, UploadController.store);
};
