const express = require("express");
const router = express.Router();

const controler = require("../../controllers/client/search.controller");
router.get("/", controler.index);

module.exports = router;
