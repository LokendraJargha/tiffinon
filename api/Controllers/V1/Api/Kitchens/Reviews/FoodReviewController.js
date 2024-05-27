const FoodReview = require('../../../../../Models/FoodReview');

exports.store = async (req, res) => {
  const model = new FoodReview({
    food_menu: req.body.food_menu,
    user: req.body.user,
    review: req.body.review,
    rating: req.body.rating,
  });
  const foodReview = await model.save();

  res.status(201).json({
    foodReview,
    message: 'Food Review has been done successfully!',
  });
};

exports.index = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { search } = req.query;
  const { col = 'created_at', order = -1 } = req.query;
  const foodReviews = await FoodReview.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ [col]: order })
    .populate({
      path: 'food_menu',
      populate: [
        { path: 'menu', select: 'name' },
        { path: 'kitchen', select: 'name' },
      ],
    })
    .populate({ path: 'user', select: 'name' })
    .exec();
  const count = await FoodReview.countDocuments();

  res.status(200).json({
    data: foodReviews,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    message: 'Data Fetched Successfully.',
  });
};

exports.show = async (req, res) => {
  const { kitchen } = req;
  const { id: kitchenId } = req.params;

  let reviews;
  if (kitchen) {
    reviews = getReviews(kitchen._id);
  } else {
    reviews = getReviews(kitchenId);
  }

  res.status(200).json({
    data: reviews,
    count: reviews.length,
  });
};

const getReviews = async (id) => {
  const foodReviews = await FoodReview.find({})
    .populate({
      path: 'user',
      select: 'name',
    })
    .populate({
      path: 'food_menu',
      populate: [
        { path: 'menu', select: 'name' },
        { path: 'kitchen', select: '_id' },
      ],
    })
    .exec();

  let reviews = [];
  foodReviews.forEach((review) => {
    if (review.food_menu.kitchen._id == id) {
      reviews.push(review);
    }
  });
  return reviews;
};
