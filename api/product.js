const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.all("/", auth, (req, res) => {
  return res
    .status(200)
    .json({ success: true, message: "Products sent successfully" });
});

module.exports = router;
