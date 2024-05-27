const CheckList = require('../../../../../Models/CheckList');

exports.store = async (req, res) => {
  const model = new CheckList({
    kitchen: req.body.kitchen,
    upload: req.body.upload,
  });
  const checkList = await model.save();

  res.status(201).json({
    checkList,
    message: 'Check List Created Successfully!',
  });
};

exports.index = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { search } = req.query;
  const { col = 'created_at', order = -1 } = req.query;
  const checkLists = await CheckList.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ [col]: order })
    .populate({ path: 'kitchen' })
    .exec();
  const count = await CheckList.countDocuments();

  res.status(200).json({
    data: checkLists,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    message: 'Data fetched successfully.',
  });
};

exports.show = async (req, res) => {
  const { id: kitchenId } = req.params;

  const checklists = await CheckList.find({ kitchen: kitchenId }).populate({
    path: 'upload',
    select: 'save_path',
  });

  res.status(200).json({ checklists });
};
