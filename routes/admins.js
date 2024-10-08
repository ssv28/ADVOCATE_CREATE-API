let express = require('express');
let router = express.Router();

let adminController = require("../Controller/Admin")


router.post('/create', adminController.adminCreate);
router.post('/login', adminController.adminLogin);
router.get('/all', adminController.allAdmin);

// Forget Password without token
// router.post('/sendVerificationCode', adminController.sendVerificationCode);
// router.post('/resetPasswordWithCode', adminController.resetPasswordWithCode);

module.exports = router;
