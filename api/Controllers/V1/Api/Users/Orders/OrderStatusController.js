const OrderStatus = require('../../../../../Models/OrderStatus');

exports.store = async (req, res) => {
  const model = new OrderStatus({
    order: req.body.order,
    status: req.body.status,
  });
  const order_status = await model.save();
  res.send({
    order_status,
    message: 'order status successfully created!',
  });
};
exports.index = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { search } = req.query;
  const { col = 'created_at', order = -1 } = req.query;
  const orderStatus = await OrderStatus.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ [col]: order })
    .populate({ path: 'order' })
    .exec();
  const count = await OrderStatus.countDocuments();
  res.send({
    orderStatus,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    message: 'Data fetched successfully.',
  });
};

exports.show = async (req, res) => {
  const { id: orderId } = req.params;
  console.log(orderId);
  const status = await OrderStatus.findOne({ order: orderId }).populate({
    path: 'status',
    select: 'name',
  });

  res.status(200).json({ status });
};
