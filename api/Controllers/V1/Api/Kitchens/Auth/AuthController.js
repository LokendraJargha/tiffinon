const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Kitchen = require('../../../../../Models/Kitchen');
const Otp = require('../../../../../Models/Otp');

exports.sendOTP = async (req, res) => {
  const { email, push_notification_token, phone_uuid } = req.body;

  const kitchen = await Kitchen.findOne({ email });
  if (!kitchen) {
    await Kitchen.create({
      email,
      push_notification_token,
      phone_uuid,
    });
  } else {
    const kitchenTokens = kitchen.push_notification_token;
    const kitchenPhones = kitchen.phone_uuid;

    if (!kitchenTokens.includes(push_notification_token)) {
      await Kitchen.findOneAndUpdate(
        { email },
        { $push: { push_notification_token } },
        { useFindAndModify: false }
      );
    }

    if (!kitchenPhones.includes(phone_uuid)) {
      await Kitchen.findOneAndUpdate(
        { email },
        { $push: { phone_uuid } },
        { useFindAndModify: false }
      );
    }
  }

  sendEmail(email, res);
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

  const kitchen = await Kitchen.findOne({ email }).select('email');
  const token = jwt.sign(
    { id: kitchen.id, email: kitchen.email },
    process.env.JWT_SECRET,
    { expiresIn: 86400 }
  );

  res.status(200).json({
    token,
    message: 'Successfully logged in',
  });
};

exports.resendOTP = async (req, res) => {
  const { email } = req.body;

  sendEmail(email, res);
};

const sendEmail = (email, res) => {
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

  const message = (otp, res) => {
    return (
      `Dear Kitchen, \n` +
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
      res.status(500).json({
        message: 'OTP could not be sent. Please try again!',
      });
    } else {
      console.log('Email sent successfully');
      await Otp.create({ email, otp: bcrypt.hashSync(OTP, 10) });
      res.status(200).json({
        message: 'OTP sent to the email address.',
      });
    }
  });
};
