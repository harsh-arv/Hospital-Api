const PatientsModel = require("../model/patientsSchema");
const PatientsReport = require("../model/patientsReportSchema");
const Doctor = require("../model/doctorsSchema");
module.exports.register = async (req, res) => {
  console.log(req.body);
  const { name, email, mobile } = req.body;
  //finding data by using Mobile No
  const user = await PatientsModel.findOne({ mobile: mobile });
  //if exist we need return the whole data
  try {
    if (user) {
      console.log("User exist defined");

      res.status(200).send({
        status: user,
        messsage: "Patients already Exists",
      });
      
    } else {
      if (name && email && mobile) {
        console.log("all defined");
        const patient = new PatientsModel({
          name: name,
          email: email,
          mobile: mobile,
        });
        await patient.save();
        res.status(200).send({
          status: "success",
          messsage: "Patient Registration Success",
        });
        
      } else {
        res.status(400).send({
          status: "failed",
          messsage: `All fields required. You entered > mobile:${mobile} name:${name} email:${email}`,
        });
        
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: "failed",
      messsage: "Unable to register",
    });
    return;
  }
};

//needs Auth-tokken of Logged-In Doctor
module.exports.create_report = async (req, res) => {
  const { status } = req.body;
  if (req.user === null) {
    return redirect("back");
  }
  const number = req.params.number;
  const user = await PatientsModel.findOne({ mobile: number });

  //Required Status should be any of them below
  const statusAr = [
    "Negative",
    "Travelled-Quarantine",
    "Symptoms-Quarantine",
    "Positive-Admit",
  ];

  var result = false;
  statusAr.map((requiredStatus) => {
    if (requiredStatus.toLowerCase() === status.toLowerCase()) {
      result = true;
    }
  });

  if (result) {
    const { name } = req.user; //DoctorName from Tokken of logged in doctor
    if (user) {
      const patientReport = new PatientsReport({
        patientNumber: number,
        status: status,
        doctorName: name,
      });
      await patientReport.save();
      res.status(200).send({
        status: "success",
        messsage: "Patient Report Submitted",
      });
    } else {
      res.status(400).send({
        status: "Failed",
        messsage: "Patient doesn't exist",
      });
    }
  } else {
    res.status(400).send({
      status: "failed",
      messsage: `${status} not match with any of required feilds  "Negative",
      "Travelled-Quarantine",
      "Symptoms-Quarantine",
      "Positive-Admit",`,
    });
  }
};

//fetching all reports corresponding to patient's mobile
module.exports.all_reports = async (req, res) => {
  const number = req.params.number;
  const reports = await PatientsReport.find({ patientNumber: number })
    .select("doctorName")
    .select("status")
    .select("patientNumber");
  if (reports) {
    if (reports.length === 0) {
      res
        .status(400)
        .send({ status: "failed", message: "Reports doesn't exist" });
    }
    res.status(200).send({
      status: "Success",
      messsage: reports,
    });
  }
};

//fetch reports correspond given status
module.exports.reports = async (req, res) => {
  const status = req.params.status;
  const statusAr = [
    "Negative",
    "Travelled-Quarantine",
    "Symptoms-Quarantine",
    "Positive-Admit",
  ];
  var result = false;
  statusAr.map((requiredStatus) => {
    if (requiredStatus.toLowerCase() === status.toLowerCase()) {
      result = true;
    }
  });
  if (result) {
    const reports = await PatientsReport.find({ status: { $regex: status } })
      .select("doctorName")
      .select("status")
      .select("patientNumber");
    if (reports) {
      if (reports.length == 0) {
        res.status(400).send({
          status: "Failed",
          messsage: "Reports not exist",
        });
      } else {
        res.status(200).send({
          status: "Success",
          messsage: reports,
        });
      }
    } else {
      res.status(400).send({
        status: "failed",
        messsage: "Reports not exists",
      });
    }
  } else {
    res.status(400).send({
      status: "failed",
      messsage: `${status} not match with any of required feilds  "Negative",
      "Travelled-Quarantine",
      "Symptoms-Quarantine",
      "Positive-Admit",`,
    });
  }
};
