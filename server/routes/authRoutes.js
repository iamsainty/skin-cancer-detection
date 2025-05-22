const express = require("express");
const router = express.Router();
const User = require("../model/User");
const generateOTP = require("../utils/generateOTP");
const sendOTP = require("../utils/mailer");
const bcrypt = require("bcryptjs");
const verifyToken = require("../middlewares/verifyToken");
const jwt = require("jsonwebtoken");
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, age, gender } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      age,
      gender,
    });
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 10 * 60000);
    await sendOTP(email, otp);
    await User.findByIdAndUpdate(user._id, { otp, otpExpiry });
    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
    console.log(err);
  }
});
router.post("/verifyotp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });
    if (user.otp !== otp || user.otpExpiry < new Date()) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }
    await User.findByIdAndUpdate(user._id, { isVerified: true });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ msg: "OTP verified successfully", token });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
    console.log(err);
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });
    if (!user.isVerified)
      return res.status(400).json({ msg: "User not verified" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ msg: "Login successful", token });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
    console.log(err);
  }
});
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
    console.log(err);
  }
});

module.exports = router;
