const SetDepositController = require('../Controllers/V1/Api/Kitchens/Deposits/SetDepositController');
const DepositController = require('../Controllers/V1/Api/Kitchens/Deposits/DepositController');
const AddDepositController = require('../Controllers/V1/Api/Kitchens/Deposits/AddDepositController');
const adminAuth = require('../Middleware/Auth/adminJwt')['authenticate'];

module.exports = (app) => {
  app.get('/api/v1/deposits', DepositController.index);
  app.post('/api/v1/deposits', DepositController.store);
  app.get('/api/v1/deposits/:id', DepositController.show);

  app.get('/api/v1/add-deposits', AddDepositController.index);
  app.post('/api/v1/add-deposits', AddDepositController.store);

  app.get('/api/v1/set-deposits', SetDepositController.index);
  app.post('/api/v1/set-deposits', SetDepositController.store);
  app.put('/api/v1/set-deposits/:id', SetDepositController.update);
  app.delete('/api/v1/set-deposits/:id', SetDepositController.delete);
};
