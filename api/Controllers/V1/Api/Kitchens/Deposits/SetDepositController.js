const SetDeposit = require('../../../../../Models/SetDeposit');

exports.index = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { search } = req.query;
  const { col = 'created_at', order = -1 } = req.query;
  const setDeposits = await SetDeposit.find()
    .populate({ path: 'kitchenCategory', select: 'name' })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ [col]: order })
    .exec();
  const count = await SetDeposit.countDocuments();

  res.status(200).json({
    data: setDeposits,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    message: 'Data Fetched Successfully!',
  });
};

exports.store = async (req, res) => {
  const { kitchenCategory } = req.body;
  const checkCategory = await SetDeposit.find({ kitchenCategory });
  if (checkCategory.length > 0) {
    res.status(500).json({
      message: 'Set Deposit with the given id already exists in the database',
    });
  }

  // const setDeposit = await SetDeposit.create(req.body);

  res.status(201).json({
    // setDeposit,
    message: 'Set Deposit Created Successfully!',
  });
};

exports.update = async (req, res) => {
  const setDeposit = await SetDeposit.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({
    setDeposit,
    message: 'Set Deposit Updated Successfully!',
  });
};

exports.delete = async (req, res) => {
  const setDeposit = await SetDeposit.findByIdAndRemove(req.params.id);

  res.status(200).json({
    setDeposit,
    message: 'Set Deposit Deleted Successfully!',
  });
};
