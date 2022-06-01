const jwt = require("jsonwebtoken");
const DoctorModel = require("../model/doctorsSchema");

var checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;

  if (authorization && authorization.startsWith("Bearer")) {
    try {
      //Get Token from header
      token = authorization.split(" ")[1];

      // verify token
      const { userID } = jwt.verify(token, "qwerty0987ytrewq");

      //get User from token
      req.user = await DoctorModel.findById(userID).select("-password");
      if (req.user === null) {
        // Failed if doctor doesn't exist in Doctor Model
        res.status(400).send({
          status: "failed",
          messsage: "Unauthorised Access ",
        });
      }
      next();
    } catch (error) {
      return res.status(401).send({
        status: "failed",
        message: "UnAuthorized User",
      });
    }
  }
  if (!token) {
    res.status(401).send({
      status: "failed",
      message: "unauthorised user no Token",
    });
  }
};
module.exports = checkUserAuth;
