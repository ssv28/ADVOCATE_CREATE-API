const ADMIN = require('../Models/admin');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();

let currentOtp = null; // Store the current OTP temporarily
let otpExpiry = null; // Store the expiry time of the OTP

// Function to generate a random OTP
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit OTP
}

// Send OTP to the user's registered email (mocked here as a console log)
function sendOtpToEmail(email, otp) {
    console.log(`Sending OTP ${otp} to ${email}`);
}

// Request OTP
exports.requestOtp = async function (req, res) {
    try {
        const { email } = req.body;

        // Find the admin by email
        const admin = await ADMIN.findOne({ email });
        if (!admin) {
            return res.status(404).json({
                status: "Fail",
                message: "Admin not found!"
            });
        }

        // Generate OTP and set its expiry
        currentOtp = generateOtp();
        otpExpiry = Date.now() + 300 * 1000; // OTP valid for 5 minutes

        // Send OTP to the admin's email (mocking this step)
        sendOtpToEmail(email, currentOtp);

        res.status(200).json({
            status: "Success",
            message: "OTP sent successfully!"
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
    }
};

// Verify OTP and reset password
exports.verifyOtpAndResetPassword = async function (req, res) {
    try {
        const { email, otp, newPassword, confirmPassword } = req.body;

        // Check OTP
        if (!currentOtp || Date.now() > otpExpiry) {
            return res.status(400).json({
                status: "Fail",
                message: "OTP is invalid or has expired!"
            });
        }

        if (parseInt(otp) !== currentOtp) {
            return res.status(400).json({
                status: "Fail",
                message: "Invalid OTP!"
            });
        }

        // Validate new password and confirm password match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                status: "Fail",
                message: "New password and confirm password do not match!"
            });
        }

        // Find the admin by email
        const admin = await ADMIN.findOne({ email });
        if (!admin) {
            return res.status(404).json({
                status: "Fail",
                message: "Admin not found!"
            });
        }

        // Hash the new password and update
        admin.password = await bcrypt.hash(newPassword, 10);
        await admin.save();

        // Reset OTP
        currentOtp = null;
        otpExpiry = null;

        res.status(200).json({
            status: "Success",
            message: "Password has been reset successfully!"
        });
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error.message
        });
    }
};

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





// // Password Reset with New Password and Confirm Password
// exports.resetPasswordWithConfirmation = async function (req, res) {
//     try {
//         const { email, newPassword, confirmPassword } = req.body;

//         // Validate that newPassword and confirmPassword match
//         if (newPassword !== confirmPassword) {
//             return res.status(400).json({
//                 status: "Fail",
//                 message: "New password and confirm password do not match!"
//             });
//         }

//         // Find the admin by email
//         const admin = await ADMIN.findOne({ email });
//         if (!admin) {
//             return res.status(404).json({
//                 status: "Fail",
//                 message: "Admin not found!"
//             });
//         }

//         // Hash the new password
//         admin.password = await bcrypt.hash(newPassword, 10);
//         await admin.save();

//         res.status(200).json({
//             status: "Success",
//             message: "Password has been reset successfully!"
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: "Fail",
//             message: error.message
//         });
//     }
// };
