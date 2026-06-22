const express = require("express");
const router = express.Router();

const controler = require("../../controllers/client/user.controller");
router.get("/register", controler.register);

module.exports = router;
