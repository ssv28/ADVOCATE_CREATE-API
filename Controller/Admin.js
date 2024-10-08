let ADMIN = require('../Models/admin');
var bcrypt = require('bcrypt')
require('dotenv').config()


exports.adminCreate = async function (req, res, next) {

    try {

        req.body.password = await bcrypt.hash(req.body.password, 10)
        let adminCreate = await ADMIN.create(req.body)

        res.status(201).json({
            status: "Success",
            message: "Admin Create Successfully!",
            data: adminCreate

        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }

}

exports.adminLogin = async function (req, res, next) {
    try {

        let adminLogin = await ADMIN.findOne({ email: req.body.email })
        if (!adminLogin) {
            throw new Error("Admin Not Found")
        }
        let AdminPassword = await bcrypt.compare(req.body.password, adminLogin.password)
        if (!AdminPassword) {
            throw new Error("Password Invalid")
        }


        res.status(200).json({
            status: "Success",
            message: "Admin Login Successfully!",
            data: adminLogin

        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }

}

exports.allAdmin = async function (req, res, next) {

    try {

        let allAdmin = await ADMIN.find()
        // console.log(allAdmin);

        res.status(201).json({
            status: "Success",
            message: "Admins Found Successfully!",
            data: allAdmin

        })

    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }

}

// controller/admin.js
exports.resetPasswordWithCode = async function (req, res) {
    try {
        const { email, verificationCode, newPassword, confirmPassword } = req.body;

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                status: "Fail",
                message: "New password and confirm password do not match!"
            });
        }

        // Find the admin by email and verification code
        const admin = await ADMIN.findOne({ email, verificationCode });
        if (!admin) throw new Error("Invalid verification code or email!");

        // Hash and update the password
        admin.password = await bcrypt.hash(newPassword, 10);
        admin.verificationCode = undefined;  // Clear the code after reset
        await admin.save();

        res.status(200).json({
            status: "Success",
            message: "Password has been reset successfully!"
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
};
