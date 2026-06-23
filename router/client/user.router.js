const express = require("express");
const router = express.Router();

const controler = require("../../controllers/client/user.controller");
const validate = require("../../validates/client/user.validate");
router.get("/register", controler.register);
router.post("/register", validate.regiterPost, controler.registerPost);
router.get("/login", controler.login);
router.post("/login", validate.loginPost, controler.loginPost);

module.exports = router;
