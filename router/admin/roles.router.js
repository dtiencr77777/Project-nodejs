const express = require("express");
const router = express.Router();

const controler = require("../../controllers/admin/roles.controller");

router.get("/", controler.rolesIndex);

module.exports = router;
