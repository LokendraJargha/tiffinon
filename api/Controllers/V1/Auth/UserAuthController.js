const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../../Models/User');

exports.Login = async (req, res) => {
  let user = await User.findOne({
    email: req.body.email,
  });
  if (!user) {
    res.status(404).send({
      message: 'User not found in our system!',
    });
  }

  const checkPass = bcrypt.compareSync(req.body.password, user.password);
  if (!checkPass) {
    res.status(401).send({
      message: 'Enter password is not valid!',
    });
  }

  const session = jwt.sign(
    { id: user.id, email: user.email, role_id: user.role_id },
    process.env.JWT_SECRET,
    {
      expiresIn: 86400,
    }
  );
  res.status(200).send({
    user: session,
    message: 'user successfully login.',
  });
};

exports.signup = (req, res) => {
  const user = new User({
    first_name: req.body.first_name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
  });
};

exports.LogOut = (req, res) => {
  req.headers.authorization = '';
  res.send({
    status: 'Logout successfully!',
    token: req.headers.authorization,
  });
};
