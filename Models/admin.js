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
    }
   
});

const ADMIN = mongoose.model('ADMIN', adminSchema);  // Create a model from the schema
module.exports = ADMIN;
