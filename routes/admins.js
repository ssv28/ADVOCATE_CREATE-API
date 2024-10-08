let express = require('express');
let router = express.Router();

let adminController = require("../Controller/Admin")


router.post('/create', adminController.adminCreate);
router.post('/login', adminController.adminLogin);
router.get('/all', adminController.allAdmin);


module.exports = router;
