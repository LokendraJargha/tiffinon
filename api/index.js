require('dotenv').config();

const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_NAME, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true,
});

require('./Services/Auth/passportUser');
require('./Services/Auth/passportKitchen');
require('./Services/Auth/passportAdmin');
require('./Models/Post');
require('./Models/User');
require('./Models/Admin');
require('./Models/Kitchen');
require('./Models/Menu');
require('./Models/FoodMenu');
require('./Models/Deposit');
require('./Models/AddDeposit');
require('./Models/Order');
require('./Models/CheckList');
require('./Models/FoodMenuUpload');
require('./Models/FoodReview');
require('./Models/KitchenReview');
require('./Models/Category');
require('./Models/Role');
require('./Models/Upload');

app.use(
  fileUpload({
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024 * 1024, //10MB max file(s) size
    },
  })
);
app.use(express.static('./uploads'));

app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

require('./routes/userAuth')(app);
require('./routes/adminAuth')(app);
require('./routes/kitchenAuth')(app);
require('./routes/posts')(app);
require('./routes/roles')(app);
require('./routes/users')(app);
require('./routes/kitchens')(app);
require('./routes/kitchenCategories')(app);
require('./routes/menus')(app);
require('./routes/foodMenus')(app);
require('./routes/orders')(app);
require('./routes/checkLists')(app);
require('./routes/deposits')(app);
require('./routes/admins')(app);
require('./routes/uploads')(app);
require('./routes/users')(app);
require('./routes/reviews')(app);
require('./routes/commons')(app);

const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}...`);
});
