const Deposit = require('../../../../../Models/Deposit');

exports.store = async (req, res) => {
  const model = new Deposit({
    kitchen: req.body.kitchen,
    amount: req.body.amount,
  });
  const deposits = await model.save();

  res.status(201).json({
    deposits,
    message: 'Deposit has been done successfully!',
  });
};

exports.index = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { search } = req.query;
  const { col = 'created_at', order = -1 } = req.query;

  const deposit = await Deposit.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ [col]: order })
    .populate('kitchen')
    .exec();
  const count = await Deposit.countDocuments();

  res.status(200).json({
    data: deposit,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    message: 'Data Fetched Successfully.',
  });
};

exports.show = async (req, res) => {
  const { id: kitchenId } = req.params;

  const deposit = await Deposit.findById(kitchenId);

  res.status(200).json({ deposit });
};
