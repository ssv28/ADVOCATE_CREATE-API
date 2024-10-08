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
        unique : true
    },

    password : {
        type: String,
        required: true,
    },

    verificationCode: String,
   
});

const ADMIN = mongoose.model('ADMIN', adminSchema);  
module.exports = ADMIN;
