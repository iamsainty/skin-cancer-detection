const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTP = async (email, otp) => {
  await transporter.sendMail({
    from: `"Skin Cancer Detection" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Verification Code",
    html: `<p>Your OTP is: <strong>${otp}</strong>. It expires in 5 minutes.</p>`
  });
};

module.exports = sendOTP;