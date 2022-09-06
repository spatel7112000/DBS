const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    Name: {
        type:String,
        required:false,
        trim:true
    },
    Email: {
        type:String,
        required:false,
        trim:true
    },
    Mobile: {
        type:String,
        required:false,
        trim:true
    },
    Password: {
        type:String,
        required:false,
        trim:true
    },
    ConfirmPassword: {
        type:String,
        required:false,
        trim:true
    }
})

const adminModel = mongoose.model("adminModel", adminSchema)
module.exports = adminModel