const express = require("express");
const router = express.Router();

const controler = require("../../controllers/admin/my-account.controller");

router.get("/", controler.index);
router.get("/edit", controler.edit);

module.exports = router;
