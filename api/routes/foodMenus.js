const FoodMenuController = require('../Controllers/V1/Api/Kitchens/FoodMenus/FoodMenuController');
const FoodMenuUploadController = require('../Controllers/V1/Api/Kitchens/FoodMenus/FoodMenuUploadController');
const FoodReviewController = require('../Controllers/V1/Api/Kitchens/Reviews/FoodReviewController');
const kitchenAuth = require('../Middleware/Auth/kitchenJwt')['authenticate'];

module.exports = (app) => {
  app.post('/api/v1/food-menus', FoodMenuController.store);
  app.get('/api/v1/food-menus', FoodMenuController.index);
  app.get('/api/v1/food-menus/:id', FoodMenuController.show);

  // kitchen api foodmenus
  app.get('/api/v1/kitchen/food-menus', kitchenAuth, FoodMenuController.index);
  app.post('/api/v1/kitchen/food-menus', kitchenAuth, FoodMenuController.store);
  app.put(
    '/api/v1/kitchen/food-menus/:id',
    kitchenAuth,
    FoodMenuController.update
  );
  app.delete(
    '/api/v1/kitchen/food-menus',
    kitchenAuth,
    FoodMenuController.delete
  );

  app.post('/food-menu-upload', FoodMenuUploadController.store);
  app.get('/food-menu-upload', FoodMenuUploadController.index);

  app.post('/food-reviews', FoodReviewController.store);
  app.get('/food-reviews', FoodReviewController.index);

  // kitchen api food-reviews
  app.post(
    '/api/v1/kitchen/food-reviews',
    kitchenAuth,
    FoodReviewController.store
  );
  app.get(
    '/api/v1/kitchen/food-reviews',
    kitchenAuth,
    FoodReviewController.show
  );
};
