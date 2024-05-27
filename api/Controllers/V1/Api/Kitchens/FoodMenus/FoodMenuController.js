const FoodMenu = require('../../../../../Models/FoodMenu');
const Menu = require('../../../../../Models/Menu');

exports.store = async (req, res) => {
  try {
    const { price } = req.body;

    const menu = await Menu.findById(req.body.menu);
    const { minimum_price, maximum_price } = menu;
    if (price >= maximum_price || price <= minimum_price) {
      res
        .status(400)
        .json({ message: 'Price should be in the mentioned range!' });
    }
    const model = new FoodMenu({
      menu: req.body.menu,
      kitchen: req.body.kitchen,
      price: req.body.price,
    });
    const foodMenu = await model.save();

    res.status(201).json({
      foodMenu,
      message: 'Food Menu succssfully created!',
    });
  } catch (error) {
    throw new Error(error);
  }
};

exports.index = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { search } = req.query;
  const { col = 'created_at', order = -1 } = req.query;

  const foodMenus = await FoodMenu.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ [col]: order })
    .populate({ path: 'kitchen' })
    .populate({ path: 'menu' })
    .exec();
  const count = await FoodMenu.countDocuments();

  res.status(200).json({
    data: foodMenus,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    message: 'Data Fetched Successfully.',
  });
};

exports.show = async (req, res) => {
  const { id } = req.params;

  const foodMenu = await FoodMenu.find({ kitchen: id }).populate({
    path: 'menu',
    select: 'name',
  });

  res.status(200).json({
    data: foodMenu,
    count: foodMenu.length,
  });
};

exports.update = async (req, res) => {
  const menu = await FoodMenu.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    menu,
    message: 'Food Menu Updated Successfully',
  });
};

exports.delete = async (req, res) => {
  const { ids } = req.body;
  ids.forEach(async (id) => {
    await FoodMenu.findByIdAndRemove(id);
  });

  res.status(200).json({
    message: 'Food Menu Deleted Successfully',
  });
};
