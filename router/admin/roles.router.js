const express = require("express");
const router = express.Router();

const controler = require("../../controllers/admin/roles.controller");

router.get("/", controler.rolesIndex);
router.get("/create", controler.create);
router.post("/create", controler.createPost);
router.get("/edit/:id", controler.edit);
router.patch("/edit/:id", controler.editPatch);
// permissions
router.get("/permissions", controler.permissions);

router.patch("/permissions", controler.permissionsPatch);

module.exports = router;
