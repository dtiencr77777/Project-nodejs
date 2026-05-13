const express = require("express");
const router = express.Router();

const controler = require("../../controllers/admin/auth.controller");

router.get("/login", controler.login);

module.exports = router;
