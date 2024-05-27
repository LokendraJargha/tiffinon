const Kitchen = require('../../../../Models/Kitchen');
const FoodMenu = require('../../../../Models/FoodMenu');
const User = require('../../../../Models/User');
const Status = require('../../../../Models/Status');

exports.kitchens = async (req, res) => {
  const kitchens = await Kitchen.find({}).select('name');

  res.status(200).json({ kitchens });
};

exports.foodMenus = async (req, res) => {
  const { id: kitchenId } = req.params;
  const foodMenus = await FoodMenu.find({ kitchen: kitchenId }).populate({
    path: 'menu',
    select: 'name',
  });

  res.status(200).json({ foodMenus });
};

exports.users = async (req, res) => {
  const users = await User.find({}).select('name');

  res.status(200).json({ users });
};

exports.status = async (req, res) => {
  const status = await Status.find({}).select('name');

  res.status(200).json({ status });
};
