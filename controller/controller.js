const mongoose = require("mongoose");
const adminModel = require("../models/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

//Signup or Register

// exports a signup directly
exports.signup = async (req, res) => {
  const { Name, Email, Mobile, Password, ConfirmPassword } = req.body;

//Check Email in Database if Email Already exists then R-22_Called
  const Admin = await adminModel.findOne({ Email: Email });
  if (Admin) {
    res.send({ status: "Failed", message: "Email already Exists" });
  } else {
// Check All fields Are Required
    if (Name && Email && Mobile && Password && ConfirmPassword) {
// Check Password and ConfirmPassword
      if (Password === ConfirmPassword) {
        try {
// Convert to HashPassword
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(Password, salt);
          const data = new adminModel({
            Name: Name,
            Email: Email,
            Mobile: Mobile,
            Password: hashPassword,
          });

// save a Data in a Collection
          const result = await data.save();
          console.log(result);

// Generate JsonWebToken Token
          const saved_Admin = await adminModel.findOne({ Email: Email });
          const token = jwt.sign(
            { AdminID: saved_Admin._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );
          res
            .status(200)
            .send({
              status: "Success",
              message: "Register Successfully",
              token: token,
            });

// IF Any error Occurs then catch called
        } catch (err) {
          console.log(err);
          res.send({ status: "Failed", message: "Unable to Register" });
        }

// IF Password and ConfirmPassword Doesn't Match
      } else {
        res.send({
          status: "Failed",
          message: "Password and ConfirmPassword Doesn't Match",
        });
      }

// IF All or Single Fields are Empty
    } else {
      res.send({ status: "Failed", message: "All Fields are Required" });
    }
  }
};

// Login or Signin

// exports a signin directly
exports.signin = async (req, res) => {
  try {
    const { Email, Password } = req.body;

// Check Email And Password fields Are Required
    if (Email && Password) {
// if Email field are not empty then Find an Email From Collection or Database
      const Admin = await adminModel.findOne({ Email: Email });

// If Email Are Exists in Collection then Compare a password type in postman and collection Password
      if (Admin != null) {
        const isMatch = await bcrypt.compare(Password, Admin.Password);

// res.send({ status: "Failed", message: "Email or Password Doesn't Match" });
        if (Admin.Email === Email && isMatch) {

//generate jwt token
          const token = jwt.sign(
            { AdminID: Admin._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );

// If Email and Password are True
          res.send({status: "Success",message: "Login Success","token": token});
        }

// If Email are not in collection
      } else {
        res.send({ status: "Failed", message: "You are not a Register" });
      }

// Check Email or Password fields are empty
    } else {
      res.send({ status: "Failed", message: "All Fields are Required" });
    }
  } catch (err) {}
};


