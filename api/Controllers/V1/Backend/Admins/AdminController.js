const bcrypt = require('bcrypt');
const Admin = require('../../../../Models/Admin');
//const emailTemplate = require('../../../../Services/Email/userVerifyEmail');
//const sendEmail = require('../../../../Services/Email/sendEmail');

exports.index = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const { search } = req.query;
  const { col = 'created_at', order = -1 } = req.query;

  const admins = await Admin.find({ $or: [{ name: new RegExp(search, 'i') }] })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ [col]: order })
    // .populate({path:'author',populate:{path: 'role_id'}})
    .populate({ path: 'role' })
    .exec();
  const count = await Admin.countDocuments();

  res.status(201).json({
    data: admins,
    count,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    message: 'Data Fetched Successfully.',
  });
};

exports.store = async (req, res) => {
  // res.status(200).json({
  //   data: req.body
  // })
  const model = new Admin({
    name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    role: req.body.role,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  const admin = await model.save();

  res.status(201).json({
    admin: admin,
    message: 'Admin Successfully Created!',
  });
};

exports.update = async (req, res) => {
  const { password, updatePassword } = req.body;
  if (updatePassword) {
    req.body.password = bcrypt.hashSync(password, 10);
  }
  const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({
    admin,
    message: 'Admin Updated Successfully!',
  });
};

exports.profile = async (req, res) => {
  res.status(200).json({ admin: req.admin });
};
