const express = require("express");
const router = express.Router();

const controler = require("../../controllers/client/cart.controller");
router.post("/add/:productId", controler.addPost);

module.exports = router;
