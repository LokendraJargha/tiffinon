const FoodMenuUpload = require('../../../../../Models/FoodMenuUpload');

exports.store = async (req, res) => {
  const model = new FoodMenuUpload({
    kitchen: req.body.kitchen,
    upload: req.body.upload,
  });
  const foodMenuUpload = await model.save();
  res.send({
    foodMenuUpload,
    message: 'Food Menu uploaded successfully!',
  });
};

exports.index = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { search } = req.query;
  const { col = 'created_at', order = -1 } = req.query;
  const foodMenuUpload = await FoodMenuUpload.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ [col]: order })
    .populate({ path: 'kitchen' })
    .exec();
  const count = await FoodMenuUpload.countDocuments();
  res.send({
    foodMenuUpload,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    message: 'Data fetched successfully.',
  });
};
