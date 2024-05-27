const KitchenCategoryController = require('../Controllers/V1/Api/Kitchens/Categories/KitchenCategoryController');

module.exports = (app) => {
  app.get('/api/v1/kitchen-categories', KitchenCategoryController.index);
  app.post('/api/v1/kitchen-categories', KitchenCategoryController.store);
  app.put('/api/v1/kitchen-categories/:id', KitchenCategoryController.update);
  app.delete('/api/v1/kitchen-categories', KitchenCategoryController.delete);
};
