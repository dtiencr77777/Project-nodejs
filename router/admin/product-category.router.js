const express = require("express");
const router = express.Router();

const controler = require("../../controllers/admin/product.category.controller");

router.get("/", controler.index);
router.get("/create", controler.create);

module.exports = router;
