const express = require("express");
const router = express.Router();

const controler = require("../../controllers/client/users.controller");
router.get("/not-friend", controler.notFriend);
router.get("/request", controler.requestFriend);
router.get("/accept", controler.accept);

router.get("/friends", controler.friends);

module.exports = router;
