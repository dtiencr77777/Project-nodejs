const express = require("express");
const router = express.Router();

const controler = require("../../controllers/client/checkout.controller");
router.get("/", controler.index);
router.post("/order", controler.order);

module.exports = router;
