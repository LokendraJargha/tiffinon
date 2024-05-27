const MenuController = require('../Controllers/V1/Backend/Menus/MenuController');
const adminAuth = require('../Middleware/Auth/adminJwt')['authenticate'];
const kitchenAuth = require('../Middleware/Auth/kitchenJwt')['authenticate'];

module.exports = (app) => {
  // admin menus
  app.get('/api/v1/menus', adminAuth, MenuController.index);
  app.post('/api/v1/menus', MenuController.store);
  app.put('/api/v1/menus/:id', MenuController.update);
  app.delete('/api/v1/menus', MenuController.delete);
};
