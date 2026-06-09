const express = require("express");
const router = express.Router();

const controler = require("../../controllers/client/product.controller");

router.get("/", controler.product);

// router.get("/:slug", controler.slug);
// slugCategory
router.get("/:slugCategory", controler.category);

module.exports = router;
