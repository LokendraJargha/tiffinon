const KitchenReview = require('../../../../../Models/KitchenReview');

exports.store = async (req, res) => {
  const model = new KitchenReview({
    kitchen: req.body.kitchen,
    user: req.body.user,
    review: req.body.review,
    rating: req.body.rating,
  });
  const kitchenReview = await model.save();

  res.status(201).json({
    kitchenReview,
    message: 'Kitchen Review has been done successfully!',
  });
};

exports.index = async (req, res) => {
  const { kitchen } = req;
  const { page = 1, limit = 10 } = req.query;
  const { search } = req.query;
  const { col = 'created_at', order = -1 } = req.query;

  let kitchenReviews;
  if (kitchen) {
    kitchenReviews = await KitchenReview.find({ kitchen: kitchen._id })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ [col]: order })
      .populate({ path: 'kitchen', select: 'name' })
      .populate({ path: 'user', select: 'name' })
      .exec();
  } else {
    kitchenReviews = await KitchenReview.find({})
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ [col]: order })
      .populate({ path: 'kitchen', select: 'name' })
      .populate({ path: 'user', select: 'name' })
      .exec();
  }
  const count = kitchenReviews.length;

  res.status(200).json({
    data: kitchenReviews,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    message: 'Data Fetched Successfully.',
  });
};

exports.show = async (req, res) => {
  const { id: kitchenId } = req.params;
  const kitchenReviews = await KitchenReview.find({
    kitchen: kitchenId,
  }).populate({ path: 'user', select: 'name' });

  res.status(200).json({
    data: kitchenReviews,
    count: kitchenReviews.length,
  });
};
