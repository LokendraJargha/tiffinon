const KitchenCategory = require('../../../../../Models/KItchenCategory');

exports.index = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { search } = req.query;
  const { col = 'created_at', order = -1 } = req.query;
  const kitchenCategory = await KitchenCategory.find({
    $or: [{ name: new RegExp(search, 'i') }],
  })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ [col]: order })
    .exec();
  const count = await KitchenCategory.countDocuments();

  res.status(200).json({
    data: kitchenCategory,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    message: 'Data Fetched Successfully',
  });
};

exports.store = async (req, res) => {
  const kitchenCategory = await KitchenCategory.create(req.body);

  res.status(201).json({
    kitchenCategory,
    message: 'Kitchen Category Created Scucessfully!',
  });
};

exports.update = async (req, res) => {
  const kitchenCategory = await KitchenCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json({
    kitchenCategory,
    message: 'Kitchen Category Updated Successfully!',
  });
};

exports.delete = async (req, res) => {
  const { ids } = req.body;
  ids.forEach(async (id) => {
    await KitchenCategory.findByIdAndRemove(id);
  });

  res.status(200).json({
    message: 'Kitchen Category Deleted Successfully',
  });
};
