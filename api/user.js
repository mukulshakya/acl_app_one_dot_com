const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();
const saltRounds = 10;

router.get("/", (req, res) => {
  return res.json({
    users: db.users.find(),
    roles: db.roles.find(),
    roleAccesses: db.roleAccesses.find(),
  });
});

router.post("/signup", async (req, res) => {
  try {
    for (const key of ["username", "password", "role"]) {
      if (!req.body[key] || !req.body[key].trim())
        return res
          .status(400)
          .json({ success: false, message: `${key} is required` });
      else req.body[key] = req.body[key].trim();
    }

    const { username, password, role } = req.body;
    const passwordPattern = /^[a-z0-9]{6,}$/i;

    const usernameTaken = db.users.findOne({ username });
    if (usernameTaken)
      return res
        .status(400)
        .json({ success: false, message: "Username is already taken" });

    if (!passwordPattern.test(password))
      return res
        .status(400)
        .json({ success: false, message: "Password should be alphanumeric" });

    const roleValid = db.roles.findOne({ role: role.toLowerCase() });
    if (!roleValid)
      return res
        .status(400)
        .json({ success: false, message: "Not a valid role" });

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    db.users.insert({
      username,
      role: role.toLowerCase(),
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successfull",
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Unexpected error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    for (const key of ["username", "password"]) {
      if (!req.body[key] || !req.body[key].trim())
        return res
          .status(400)
          .json({ success: false, message: `${key} is required` });
      else req.body[key] = req.body[key].trim();
    }

    const { username, password } = req.body;

    const user = db.users.findOne({ username });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "user not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });

    const token = jwt.sign({ username }, process.env.JWT_SECRET);
    return res.status(200).json({
      success: true,
      message: "Login successfull",
      data: { username, token },
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Unexpected error",
    });
  }
});

module.exports = router;
