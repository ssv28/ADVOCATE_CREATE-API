let express = require('express');
let router = express.Router();

let adminController = require("../Controller/Admin")


router.post('/create', adminController.adminCreate);
router.post('/login', adminController.adminLogin);
router.get('/all', adminController.allAdmin);
router.delete('/delete/:id', adminController.adminDelete);

// Request OTP for password reset
// router.post('/requestOtp', adminController.requestOtp);

// // Verify OTP and reset password
// router.post('/verifyOtpAndResetPassword', adminController.verifyOtpAndResetPassword);

router.post('/resetPasswordWithConfirmation', adminController.resetPasswordWithConfirmation);



module.exports = router;



