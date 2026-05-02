const express = require("express");
const router = express.Router();

const controler = require("../../controllers/admin/accounts.controller");

router.get("/", controler.accountsDashboard);
router.get("/create", controler.create);

module.exports = router;
