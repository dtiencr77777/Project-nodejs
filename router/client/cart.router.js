const express = require("express");
const router = express.Router();

const controler = require("../../controllers/client/cart.controller");

router.get("/", controler.index);
router.post("/add/:productId", controler.addPost);
router.get("/delete/:productId", controler.delete);
module.exports = router;
