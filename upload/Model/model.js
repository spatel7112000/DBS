const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    Name: String,
    Brand: String,
    Category: String,
    Price: String
})

module.exports = mongoose.model("students", studentSchema)