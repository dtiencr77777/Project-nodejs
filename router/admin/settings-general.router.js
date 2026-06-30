const express = require("express");
const router = express.Router();

const controler = require("../../controllers/admin/setting.controller");

router.get("/general", controler.general);

module.exports = router;
