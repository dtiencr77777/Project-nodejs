const express = require("express");
const router = express.Router();
//  Hiển thị ảnh sản phẩm
const multer = require("multer");
// const upload = multer({ dest: "./public/uploads/" });

//  cloudinary
// const storageMulter = require("../../helpers/storageMulter");
// const upload = multer({ storage: storageMulter() });
const upload = multer();
const uploadCloudRouter = require("../../middlewares/admin/uploadCloud.middlewares");
//end  cloudinary
const controler = require("../../controllers/admin/setting.controller");

router.get("/general", controler.general);
router.patch("/general", controler.generalPatch);

module.exports = router;
