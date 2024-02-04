const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Import the User model or adjust the path accordingly

const requireAuth = async (req, res, next) => {
  try {
    // Verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: "Invalid authorization" });
    }

    const token = authorization.split(" ")[1];

    // Verify token
    const { _id } = jwt.verify(token, process.env.SECRET);

    // Put user id onto req
    const user = await User.findOne({ _id }).select("_id");
    if (!user) {
      return res.status(401).json({ error: "Invalid authorization" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid authorization" });
  }
};

module.exports = requireAuth;
