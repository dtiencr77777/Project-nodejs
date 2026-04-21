const express = require("express");
const router = express.Router();

const controler = require("../../controllers/admin/roles.controller");

router.get("/", controler.rolesIndex);
router.get("/create", controler.create);

module.exports = router;
