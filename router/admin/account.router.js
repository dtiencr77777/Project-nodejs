const express = require("express");
const router = express.Router();

const controler = require("../../controllers/admin/accounts.controller");

router.get("/", controler.accountsDashboard);

module.exports = router;
