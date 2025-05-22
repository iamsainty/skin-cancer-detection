const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateOTP = require('../utils/generateOTP');
const sendOTP = require('../utils/mailer');

exports.register = async (req, res) => {
  try {
    const { name, email, password, age, gender } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60000); // 5 minutes

    const user = await User.create({ name, email, password: hashed, age, gender, otp, otpExpiry });
    await sendOTP(email, otp);

    res.status(201).json({ msg: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.isVerified) return res.status(400).json({ msg: "Invalid request" });

    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ msg: "OTP expired or incorrect" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ msg: "Email verified. You can now login." });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.isVerified) return res.status(400).json({ msg: "Email not verified" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { name: user.name, email: user.email, age: user.age, gender: user.gender } });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

exports.getMe = async (req, res) => {
  const user = await User.findById(req.userId).select('-password');
  res.json(user);
};