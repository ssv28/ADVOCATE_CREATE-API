const ADMIN = require('../Models/admin');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
require('dotenv').config();


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


exports.sendVerificationCode = async function (req, res) {
    try {
        const admin = await ADMIN.findOne({ email: req.body.email });
        if (!admin) throw new Error("Admin Not Found!");

        // Generate a 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        // Optionally save the code in the database
        admin.verificationCode = verificationCode;
        await admin.save();

        // Set up email
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            to: admin.email,
            from: 'shruti123@gmail.com',
            subject: 'Password Reset Verification Code',
            text: `Your password reset verification code is: ${verificationCode}`
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            status: "Success",
            message: "Verification code sent successfully to your email!"
        });
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        });
    }
};


exports.resetPasswordWithCode = async function (req, res) {
    try {
        const { email, verificationCode, newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                status: "Fail",
                message: "New password and confirm password do not match!"
            });
        }

        const admin = await ADMIN.findOne({ email, verificationCode });
        if (!admin) throw new Error("Invalid verification code or email!");

        admin.password = await bcrypt.hash(newPassword, 10);
        admin.verificationCode = undefined;  
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



// Password Reset with New Password and Confirm Password
exports.resetPasswordWithConfirmation = async function (req, res) {
    try {
        const { email, newPassword, confirmPassword } = req.body;

        // Validate that newPassword and confirmPassword match
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

        // Hash the new password
        admin.password = await bcrypt.hash(newPassword, 10);
        await admin.save();

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
