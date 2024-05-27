const FoodReviewController = require('../Controllers/V1/Api/Kitchens/Reviews/FoodReviewController.js');
const KitchenReviewController = require('../Controllers/V1/Api/Kitchens/Reviews/KitchenReviewController');
const kitchenAuth = require('../Middleware/Auth/kitchenJwt')['authenticate'];

module.exports = (app) => {
  app.get('/api/v1/reviews/food', FoodReviewController.index);
  app.post('/api/v1/reviews/food', FoodReviewController.store);
  app.get('/api/v1/reviews/food/:id', FoodReviewController.show);

  app.get('/api/v1/reviews/kitchen', KitchenReviewController.index);
  app.post('/api/v1/reviews/kitchen', KitchenReviewController.store);
  app.get('/api/v1/reviews/kitchen/:id', KitchenReviewController.show);

  // single kitchen api reviews
  app.get('/api/v1/kitchen/review', kitchenAuth, KitchenReviewController.index);
};
