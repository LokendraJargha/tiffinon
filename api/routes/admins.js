const AdminController = require('../Controllers/V1/Backend/Admins/AdminController');
const adminAuthentication = require('../Middleware/Auth/adminJwt')[
  'authenticate'
];

module.exports = (app) => {
  app.get('/api/v1/admins', AdminController.index);
  app.post('/api/v1/admins', AdminController.store);
  app.put('/api/v1/admins/:id', AdminController.update);

  app.get(
    '/api/v1/admins/profile',
    adminAuthentication,
    AdminController.profile
  );
};
