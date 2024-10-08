let ADMIN = require('../Models/admin');

exports.adminCreate = async function (req, res, next) {

    try {

        let adminCreate = await ADMIN.create(req.body)
        console.log(adminCreate);

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

        let adminLogin = await ADMIN.findOne({ contactNumber: req.body.contactNumber })
        if (!adminLogin) throw new Error("Admin Record Not Found!")


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