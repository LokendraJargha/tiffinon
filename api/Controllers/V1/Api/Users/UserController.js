const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../../../Models/User');
const Otp = require('../../../../Models/Otp');
const emailTemplate = require('../../../../Services/Email/userVerifyEmail');
const sendEmail = require('../../../../Services/Email/sendEmail');

const nodemailer = require('nodemailer');

exports.index = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const { search } = req.query;
    // const { col = "created_at", order = "ascend" } = req.query;
    const { sortField = 'created_at', sortOrder = 'desc' } = req.query;

    const users = await User.find({ $or: [{ name: new RegExp(search, 'i') }] })
      .skip((page - 1) * pageSize)
      .sort({ [sortField]: [sortOrder] })
      //.populate({path:'author',populate:{path: 'role_id'}})
      .populate({ path: 'role' })
      .limit(pageSize * 1)
      .exec();

    const count = await User.countDocuments();

    res.status(200).json({
      data: users,
      count,
      pageSize,
      total: Math.ceil(count / pageSize),
      currentPage: page,
      message: 'Data Fetched Successfully.',
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.store = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
    date_of_birth: req.body.date_of_birth,
    gender: req.body.gender,
    ip_address: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    address: req.body.address,
    password: bcrypt.hashSync(req.body.password, 10),
  });
  const usr = await user.save();
  // const emlTemplate = emailTemplate(usr);
  // const data = {
  //   //Specify email data
  //   from: 'godsecret007@gmail.com',
  //   //The email to contact
  //   to: 'me.jnkthp10@gmail.com',
  //   subject: 'Hello lokendra',
  //   html: emlTemplate,
  // };
  // const mail = sendEmail(data);

  res.status(201).send({
    // mail,
    user: usr,
    messages:
      'User created successfully! Please check your email to verify your account',
  });
};

exports.update = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send({
      user,
      message: 'User update successfully.',
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
  const { ids } = req.body;
  ids.forEach(async (id) => {
    await User.findByIdAndRemove(id);
  });

  res.status(200).json({
    message: 'User Deleted Successfully',
    userId: ids,
  });
};

exports.profile = async (req, res) => {
  res.status(200).json({ user: req.user });
};

exports.sendOTP = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
  }

  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }

  // https://myaccount.google.com/lesssecureapps
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const message = (otp) => {
    return (
      `Dear User, \n` +
      'OTP for Login is : \n\n' +
      `${otp}\n\n` +
      'This is a auto-generated email. Please do not reply to this email.\n\n'
    );
  };

  let mailDetails = {
    from: '"Tiffinon" <tiffinon@gmail.com>',
    to: email,
    subject: 'One Time Password',
    text: message(OTP),
  };

  mailTransporter.sendMail(mailDetails, async (err, data) => {
    if (err) {
      console.log('Error Occured', err);
    } else {
      console.log('Email sent successfully');
      await Otp.create({ email, otp: bcrypt.hashSync(OTP, 10) });
    }
  });

  res.status(200).json({
    message: 'OTP sent to the email address.',
  });
};

exports.validateOTP = async (req, res) => {
  const { email, otp } = req.body;

  // check whether there is any otp for entered email id
  const emailOTPs = await Otp.find({ email });
  if (emailOTPs.length === 0) {
    res.status(400).json({
      message: 'Provided OTP has been expired!',
    });
  }

  // check for the validation of provided otp
  const validOTP = emailOTPs[emailOTPs.length - 1]; // extracting last otp
  const checkOTP = bcrypt.compareSync(otp, validOTP.otp);
  if (!checkOTP) {
    res.status(400).json({
      message: 'Please re-check and enter a valid OTP!',
    });
  }

  const user = await User.findOne({ email }).select('email');
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: 86400 }
  );

  res.status(200).json({
    token,
    message: 'Successfully Login',
  });
};
