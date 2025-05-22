const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['token'];
  if (!token) return res.status(401).json({ msg: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(403).json({ msg: "Invalid token" });
  }
};

module.exports = verifyToken;