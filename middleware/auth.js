const jwt = require("jsonwebtoken");
const db = require("../db");

module.exports = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token)
    return res
      .status(401)
      .json({ success: "false", message: "Auth token is required" });

  token = token.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = db.users.findOne({ username: decoded.username });
    if (!user)
      return res
        .status(404)
        .json({ success: "false", message: "User not found" });

    const roleAccess = db.roleAccesses.findOne({
      method: req.method.toLowerCase(),
      path: req.originalUrl,
    });
    if (!roleAccess || !roleAccess.roles.includes(user.role))
      return res.status(401).json({
        success: "false",
        message: "Not authorized to access endpoint",
      });

    return next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: "false", message: "Auth token is invalid" });
  }
};
