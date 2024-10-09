const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    
    name: {
        type: String,
        required: true,
    },

    lastname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique : true,
        lowercase: true,
        trim: true,
    },

    password : {
        type: String,
        required: true,
        minlength: 8,
    },

    // verificationCode: String,
   
});

const ADMIN = mongoose.model('ADMIN', adminSchema);  
module.exports = ADMIN;
