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
const controler = require("../../controllers/admin/my-account.controller");

router.get("/", controler.index);
router.get("/edit", controler.edit);
router.patch(
  "/edit",
  upload.single("avatar"),
  uploadCloudRouter.uploadCloud,
  controler.editPatch,
);

module.exports = router;
