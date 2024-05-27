const CheckListController = require('../Controllers/V1/Api/Kitchens/CheckLists/CheckListController');

module.exports = (app) => {
  app.post('/api/v1/check-lists', CheckListController.store);
  app.get('/api/v1/check-lists', CheckListController.index);
  app.get('/api/v1/check-lists/:id', CheckListController.show);
};
