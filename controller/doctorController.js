const DoctorModel = require("../model/doctorsSchema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sign } = require("jsonwebtoken");

module.exports.register = async (req, res) => {
  const { name, email, password, password_confirmation, tc } = req.body; 
  const user = await DoctorModel.findOne({ email: email });
  if (user) {
    res.status(201).send({ 
      status: "failed",
      messsage: "Email already Exist",
    });
  } else {
    if (name && email && password && password_confirmation && tc) {
      if (password === password_confirmation) {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(password, salt);
          const doc = new DoctorModel({
            name: name,
            email: email,
            password: hashPassword,
            tc: tc,
          });

          await doc.save();
          const doctorId = await DoctorModel.findOne({ email: email });

          res.send({
            status: "success",
            messsage: "Registration Success",
          });
        } catch (error) {
          console.log(error);
          res.send({
            status: "failed",
            messsage: "Unable to register",
          });
        }
      } else {
        res.send({
          status: "failed",
          messsage: "Confirm pass doesn't match",
        });
      }
    } else {
      res.send({
        status: "failed",
        messsage: "All fields required",
      });
    }
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const user = await DoctorModel.findOne({ email: email });

      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (user.email === email && isMatch) {
          //Generate JWT Token for 10 minutes
          const token = jwt.sign({ userID: user._id }, "qwerty0987ytrewq", {
            expiresIn: "600s",
          });
          res.status(200).send({
            status: "success",
            messsage: "Login Success",
            token: token,
          });
        } else {
          res.send({
            status: "failed",
            messsage: "Email or Password is not valid",
          });
        }
      } else {
        res.send({
          status: "failed",
          messsage: "Not Registered User",
        });
      }
    } else {
      res.status(400).send({
        status: "failed",
        messsage: "All fields required",
      });
    }
  } catch (error) {
    console.log(error);
    res.send({
        status: "failed",
        messsage: "All fields required",
      });
  }
  return res.redirect("back");
};

//make a functionality of change password also 1:5:00 to 1:22:00
module.exports.changePassword = async (req, res) => {
  const { password, password_confirmation } = req.body;

  if (password && password_confirmation) {
    if (password !== password_confirmation) {
      res.send({
        status: "failed",
        message: "passwod and confirm doesn't match",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const newHashPassword = await bcrypt.hash(password, salt);
      console.log(newHashPassword);
      res.send({
        status: "success",
        message: "password changed successfully",
      });
    }
  } else {
    res.send({
      status: "failed",
      message: "All feilds required",
    });
  }
};

module.exports.loggedUser = async (req, res) => {
  console.log(req.user);
  res.send({
    user: req.user,
  });
};
