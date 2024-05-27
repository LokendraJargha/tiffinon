const RoleController = require("../Controllers/V1/Backend/Roles/RoleController");
const jwt = require("../Middleware/Auth/adminJwt")["authenticate"];

module.exports = (app) => {
  // app.get('/roles',jwt, RoleController.index);
  // app.post('/roles',jwt, RoleController.store);
  app.get("/api/v1/roles", RoleController.index);
  app.post("/roles", RoleController.store);
};
