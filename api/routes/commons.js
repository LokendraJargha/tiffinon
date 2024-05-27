const CommonController = require('../Controllers/V1/Backend/Commons/CommonController');

module.exports = (app) => {
  app.get('/api/v1/commons/kitchens', CommonController.kitchens);
  app.get('/api/v1/commons/food-menus/:id', CommonController.foodMenus);
  app.get('/api/v1/commons/users', CommonController.users);
  app.get('/api/v1/commons/status', CommonController.status);
};
