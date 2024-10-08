// let express = require('express');
// let router = express.Router();

// let adminController = require("../Controller/Admin")


// router.post('/create', adminController.adminCreate);
// router.post('/login', adminController.adminLogin);
// router.get('/all', adminController.allAdmin);



// module.exports = router;

// router/admin.js
const express = require('express');
const router = express.Router();
const adminController = require("../Controller/Admin");

router.post('/create', adminController.adminCreate);
router.post('/login', adminController.adminLogin);
router.get('/all', adminController.allAdmin);

// Password Reset with New Password and Confirm Password
router.post('/resetPasswordWithConfirmation', adminController.resetPasswordWithConfirmation);

module.exports = router;

