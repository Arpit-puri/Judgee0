const express=require('express');
const router = express.Router();
const controller = require('../controllers/appController');
router.route("/login").post(controller.login);
router.route("/register").post(controller.register);
router.route("/run").post(controller.run);
router.route("/logout/:_id").get(controller.logOut);
module.exports = router;