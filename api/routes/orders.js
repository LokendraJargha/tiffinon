const OrderController = require('../Controllers/V1/Api/Users/Orders/OrderController');
const StatusController = require('../Controllers/V1/Backend/Status/StatusController');
const OrderStatusController = require('../Controllers/V1/Api/Users/Orders/OrderStatusController');
const userAuth = require('../Middleware/Auth/userJwt')['authenticate'];
const kitchenAuth = require('../Middleware/Auth/kitchenJwt')['authenticate'];

module.exports = (app) => {
  // admin orders
  app.get('/api/v1/orders', OrderController.index);
  app.post('/api/v1/orders', OrderController.store);
  app.put('/api/v1/orders/:id', OrderController.update);
  app.delete('/api/v1/orders', OrderController.delete);

  // kitchen api orders
  app.get('/api/v1/orders', kitchenAuth, OrderController.index);
  app.post('/api/v1/orders', kitchenAuth, OrderController.store);
  app.put('/api/v1/orders/:id', kitchenAuth, OrderController.update);
  app.delete('/api/v1/orders', kitchenAuth, OrderController.delete);

  // user api orders
  app.get('/api/v1/users/orders', userAuth, OrderController.index);
  app.post('/api/v1/users/orders', userAuth, OrderController.store);
  app.put('/api/v1/users/orders/:id', userAuth, OrderController.update);
  app.delete('/api/v1/users/orders', userAuth, OrderController.delete);

  app.get('/api/v1/status', StatusController.index);
  app.post('/api/v1/status', StatusController.store);
  app.put('/api/v1/status/:id', StatusController.update);
  app.delete('/api/v1/status', StatusController.delete);

  app.post('/api/v1/order-status', OrderStatusController.store);
  app.get('/api/v1/order-status', OrderStatusController.index);
  app.get('/api/v1/order-status/:id', OrderStatusController.show);
};
