const Status = require('../../../../Models/Status');

exports.store = async (req, res) => {
  const status = await Status.create(req.body);
  res.status(201).json({
    status,
    message: 'Status Created Successfully',
  });
};

exports.index = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { search } = req.query;
  const { col = 'createdAt', order = -1 } = req.query;

  const status = await Status.find({
    $or: [{ name: new RegExp(search, 'i') }],
  })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ [col]: order })
    .exec();
  const count = await Status.countDocuments();

  res.status(200).json({
    data: status,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    message: 'Data fetched successfully.',
  });
};

exports.update = async (req, res) => {
  const status = await Status.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    status,
    message: 'Status Updated Successfully',
  });
};

exports.delete = async (req, res) => {
  const { ids } = req.body;
  ids.forEach(async (id) => {
    await Status.findByIdAndRemove(id);
  });

  res.status(200).json({
    message: 'Status Deleted Successfully',
  });
};
