const express=require('express');
const router = express.Router();
const controller = require('../controllers/appController');
const auth= require('../middleware/authentication');

router.route("/login").post(controller.login);
router.route("/register").post(controller.register);
router.route("/run").post(controller.run);
router.route("/fullStat").get(controller.fullStat);
router.route("/logout/:_id").get(auth.authenticateUser,controller.logOut);
module.exports = router;