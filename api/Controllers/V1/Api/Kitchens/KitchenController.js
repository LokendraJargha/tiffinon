const bcrypt = require('bcrypt');

const Kitchen = require('../../../../Models/Kitchen');
const Upload = require('../../../../Models/Upload');

exports.index = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { search } = req.query;
  const { col = 'created_at', order = -1 } = req.query;
  const kitchens = await Kitchen.find({
    $or: [{ name: new RegExp(search, 'i') }],
  })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ [col]: order })
    //.populate({path:'author',populate:{path: 'role_id'}})
    .exec();
  const count = await Kitchen.countDocuments();

  res.status(200).json({
    data: kitchens,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    message: 'Data fetched successfully.',
  });
};

exports.store = async (req, res) => {
  const model = new Kitchen({
    name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    pan_number: req.body.pan_number,
    ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    deliver_radius: req.body.address,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  const kitchen = await model.save();

  res.status(201).send({
    kitchen: kitchen,
    message: 'kitchen successfully created!',
  });
};

exports.update = async (req, res) => {
  const kitchen = await Kitchen.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).send({
    kitchen,
    message: 'Kitchen update successfully.',
  });
};

exports.delete = async (req, res) => {
  const { ids } = req.body;
  ids.forEach(async (id) => {
    await Kitchen.findByIdAndRemove(id);
  });

  res.status(200).json({
    message: 'Kitchen Deleted Successfully',
  });
};

exports.uploads = async (req, res) => {
  const { id } = req.params;
  const uploads = await Upload.find({ kitchen: id }).exec();

  res.status(200).json({
    uploads,
    message: 'Data Fetched Successfully',
  });
};

exports.verifications = async (req, res) => {
  const { is_verified, is_active } = req.body;

  if (typeof is_verified !== 'undefined') {
    const kitchen = await Kitchen.findByIdAndUpdate(
      req.params.id,
      { $set: { is_verified: !is_verified } },
      { new: true }
    );
    res.status(200).json({
      kitchen,
      message: 'Verification Changed Successfully',
    });
  }

  if (typeof is_active !== 'undefined') {
    const kitchen = await Kitchen.findByIdAndUpdate(
      req.params.id,
      { $set: { is_active: !is_active } },
      { new: true }
    );
    res.status(200).json({
      kitchen,
      message: 'Active Changed Successfully',
    });
  }
};

exports.getProfile = async (req, res) => {
  res.status(200).json({ kitchen: req.kitchen });
};

exports.updateProfile = async (req, res) => {
  const { _id: kitchenId } = req.kitchen;
  req.body.updated_at = new Date().toISOString();

  const kitchen = await Kitchen.findByIdAndUpdate(kitchenId, req.body, {
    new: true,
  });

  res.status(200).json({
    kitchen,
    message: 'Kitchen Updated Successfully!',
  });
};
