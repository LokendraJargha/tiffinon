const AddDeposit = require('../../../../../Models/AddDeposit');
const Deposit = require('../../../../../Models/Deposit');

exports.store = async (req, res) => {
  const model = new AddDeposit({
    kitchen: req.body.kitchen,
    food_menu: req.body.food_menu,
    amount: req.body.amount,
  });
  const add_deposits = await model.save();
  res.send({
    add_deposits,
    message: 'Deposit has been added successfully!',
  });
};
exports.index = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { search } = req.query;
  const { col = 'created_at', order = -1 } = req.query;
  const addDeposit = await AddDeposit.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ [col]: order })
    .populate({ path: 'kitchen' })
    .populate({ path: 'food_menu' })
    .exec();
  const count = await AddDeposit.countDocuments();
  res.send({
    addDeposit,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    message: 'Data fetched successfully.',
  });
};
