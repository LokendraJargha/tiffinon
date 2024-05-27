const Menu = require('../../../../Models/Menu');

exports.store = async (req, res) => {
  const menu = await Menu.create(req.body);
  res.status(201).json({
    menu,
    message: 'Menu Created Successfully',
  });
};

exports.index = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { search } = req.query;
  const { col = 'createdAt', order = -1 } = req.query;

  const menus = await Menu.find({
    $or: [{ name: new RegExp(search, 'i') }],
  })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ [col]: order })
    .exec();
  const count = await Menu.countDocuments();

  res.status(200).json({
    data: menus,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    message: 'Data fetched successfully.',
  });
};

exports.update = async (req, res) => {
  const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    menu,
    message: 'Menu Updated Successfully',
  });
};

exports.delete = async (req, res) => {
  const { ids } = req.body;
  ids.forEach(async (id) => {
    await Menu.findByIdAndRemove(id);
  });

  res.status(200).json({
    message: 'Menu Deleted Successfully',
  });
};
