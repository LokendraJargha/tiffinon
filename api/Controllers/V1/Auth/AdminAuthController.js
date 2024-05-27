const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../../../Models/Admin');

exports.Login = async (req, res) => {
  let admin = await Admin.findOne({
    email: req.body.email,
  });
  if (!admin) {
    res.status(404).send({
      message: 'Admin not found in our system!',
    });
  }

  const checkPass = bcrypt.compareSync(req.body.password, admin.password);
  if (!checkPass) {
    res.status(404).send({
      message: 'Enter password is not valid!',
    });
  }

  const session = jwt.sign(
    { id: admin.id, email: admin.email, role_id: admin.role_id },
    process.env.JWT_SECRET,
    {
      expiresIn: 86400,
    }
  );

  res.status(200).send({
    access_token: session,
    user: admin,
    message: 'successfully login.',
  });
};

exports.Signup = async (req, res) => {
  const admin = new Admin({
    name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  await admin.save();
  res.status(200).json({ admin });
};

exports.LogOut = (req, res) => {
  req.headers.authorization = '';
  res.send({
    status: 'Logout successfully!',
    token: req.headers.authorization,
  });
};
