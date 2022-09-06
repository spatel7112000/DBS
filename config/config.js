const mongoose = require('mongoose')


const ConnectDB = async()=>{
    mongoose.connect("mongodb://localhost:27017/adminc").then(()=>{
        console.log("connected");
    }).catch((err)=>{
        console.log("Not connected",err);
    })
}

module.exports = ConnectDB