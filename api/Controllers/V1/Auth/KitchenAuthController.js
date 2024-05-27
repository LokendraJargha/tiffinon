const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Kitchen = require('../../../Models/Kitchen');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const kitchen = await Kitchen.findOne({ email });
  if (!kitchen) {
    res.status(404).send({
      message: 'Requested Kitchen not found on our system!',
    });
  }

  const checkPass = bcrypt.compareSync(password, kitchen.password);
  if (!checkPass) {
    res.status(401).send({
      message: 'Entered password is not valid!',
    });
  }

  const session = jwt.sign(
    { id: kitchen.id, email: kitchen.email, name: kitchen.name },
    process.env.JWT_SECRET,
    {
      expiresIn: 86400,
    }
  );

  res.status(200).json({
    kitchen: session,
    message: 'Successfully Logged In.',
  });
};

exports.logOut = (req, res) => {
  req.headers.authorization = '';

  res.status(200).json({
    token: req.headers.authorization,
    message: 'Successfully Logged Out!',
  });
};
