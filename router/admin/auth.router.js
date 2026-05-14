const express = require("express");
const router = express.Router();

const controler = require("../../controllers/admin/auth.controller");
const validate = require("../../validates/admin/auth.validate");
router.get("/login", controler.login);
router.post("/login", validate.login, controler.loginPost);
router.get("/logout", controler.logout);

module.exports = router;
