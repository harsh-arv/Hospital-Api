const PatientsModel = require("../model/patientsSchema");
const PatientsReport = require("../model/patientsReportSchema");
const Doctor=require('../model/doctorsSchema');
module.exports.register = async (req, res) => {
  const { name, email, mobile} = req.body;
  //add check auth to detect doc
  //finding data by using Mobile No
  const user = await PatientsModel.findOne({ mobile: mobile });
  //if exist we need return the whole data
  try {
    if (user) {
      res.status(200).send({
        status: user,
        messsage: "Patients already Exists",
      });
    } else {
      if (name && email && mobile) {
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
          messsage: "All fields required",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res(400).send({
      status: "failed",
      messsage: "Unable to register",
    });
  }
};

//needs Auth-tokken of Logged-In Doctor
module.exports.create_report = async (req, res) => {
  const { status } = req.body;
  const {name}=req.user     //DocorName from Tokken of logged in doctor
  const number = req.params.number;
  const user = await PatientsModel.findOne({ mobile: number });
  if (user) { 
    const patientReport = new PatientsReport({
      patientNumber:number,
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
};

module.exports.all_reports = async (req, res) => {
  const number = req.params.number;
  const reports = await await PatientsReport.find({ patientNumber:number })
    .select("doctorName")
    .select("status")
    .select("patientNumber");
  if (reports) {
    res.status(200).send({
      status: "Success",
      messsage: reports,
    });
  }
};

module.exports.reports = async (req, res) => {
    const status = req.params.status;
    const reports = await PatientsReport.find({"status":{$regex:status}})
      .select("doctorName")
      .select("status")
      .select("patientNumber");
    if (reports) {
      res.status(200).send({
        status: "Success",
        messsage: reports,
      });
    }else{
      res.status(400).send({
        status:"failed",
        messsage:"Status"
      })
    }
  };
