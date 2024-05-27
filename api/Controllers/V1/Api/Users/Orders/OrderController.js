const Order = require('../../../../../Models/Order');
const OrderStatus = require('../../../../../Models/OrderStatus');

exports.store = async (req, res) => {
  const { food_menus } = req.body;
  food_menus.forEach(async (menu) => {
    req.body.food_menu = menu;
    await Order.create(req.body);
  });

  res.status(201).json({ message: 'Order Created Successfully!' });
};

exports.index = async (req, res) => {
  const { user, kitchen } = req;
  const { page = 1, limit = 10 } = req.query;
  const { search } = req.query;
  const { col = 'created_at', order = -1 } = req.query;

  let orders;
  if (user) {
    orders = await Order.find({ user: user._id })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ [col]: order })
      .populate({ path: 'user', select: 'name' })
      .populate({ path: 'kitchen', select: 'name' })
      .populate({
        path: 'food_menu',
        select: 'menu',
        populate: { path: 'menu', select: 'name' },
      })
      .exec();
  } else if (kitchen) {
    orders = await Order.find({ kitchen: kitchen._id })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ [col]: order })
      .populate({ path: 'user', select: 'name' })
      .populate({ path: 'kitchen', select: 'name' })
      .populate({
        path: 'food_menu',
        select: 'menu',
        populate: { path: 'menu', select: 'name' },
      })
      .exec();
  } else {
    orders = await Order.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ [col]: order })
      .populate({ path: 'user', select: 'name' })
      .populate({ path: 'kitchen', select: 'name' })
      .populate({
        path: 'food_menu',
        select: 'menu',
        populate: { path: 'menu', select: 'name' },
      })
      .exec();
  }
  const count = orders.length;

  res.status(200).json({
    data: orders,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    message: 'Data Fetched Successfully.',
  });
};

exports.update = async (req, res) => {
  await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });

  await OrderStatus.findByIdAndUpdate(req.body.order_status, {
    status: req.body.status,
  });

  res.status(201).json({ message: 'Order Updated Successfully!' });
};

exports.delete = async (req, res) => {
  const { ids } = req.body;
  ids.forEach(async (id) => {
    await Order.findByIdAndRemove(id);
  });

  res.status(200).json({
    message: 'Order Deleted Successfully',
  });
};
