const express = require("express");
const router = express.Router();

const controler = require("../../controllers/admin/accounts.controller");

router.get("/", controler.accountsDashboard);
router.get("/create", controler.create);
router.post("/create", controler.createPost);

module.exports = router;
