const PostController = require('../Controllers/V1/Api/Posts/PostController');
const jwt = require('../Middleware/Auth/adminJwt')['authenticate'];

module.exports = app =>{
	app.get('/posts',jwt,PostController.index);
	app.post('/posts',jwt,PostController.store);
	app.get('/posts/:id', jwt, PostController.edit);
	app.put('/posts/:id', jwt, PostController.update);
	app.delete('/posts/:id', jwt, PostController.delete);
}