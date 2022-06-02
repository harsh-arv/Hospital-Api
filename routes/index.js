const express = require("express");
const router = express.Router();

// /doctors/register → with username and password
// - /doctors/login → returns the JWT to be used
// - /patients/register
// - /patients/:id/create_report
// - /patients/:id/all_reports → List all the reports of a patient oldest to latest
// - /reports/:status → List all the reports of all the patients filtered by a specific status

const homeController = require("../controller/homeController");

router.get("/", (req, res) => {
  return res.end(`<div>
    <h1>Task</h1>
    <p> Theme: </p>
    <ul>
    <h1>An API for the doctors of a Hospital which has been allocated by the
    govt for testing and quarantine + well being of COVID-19 patients</h1>
    <li> There can be 2 types of Users </li>
    Doctors & 
     Patients</li>
     <li>Doctors can log in</li>
     <li>Each time a patient visits, the doctor will follow 2 steps</li>
     <li>Register the patient in the app (using phone number, if the patient already exists, just
    return the patient info in the API)</li>
     <li>After the checkup, create a Report</li>
     <li>Patient Report will have the following fields</li>
     <li>1.)Created by doctor
     2.)Status (You can use enums if you want to):
        Can be either of: [Negative, Travelled-Quarantine, Symptoms-Quarantine,
        PositiveAdmit]
    
    3.) Date </li>

    <h1>Required Routes</h1>
    <li> /doctors/register > with username and password return the status with message "Successfully Registrated "</li>
    <li> /loggedUser  > it will return the logged user details</li>
    <li> /changePassword > it will allow user to change password with existed Email Id </li>
    <li> /doctors/login > returns the JWT to be used </li>
    <li> /patients/register > needs JWT tokken to register teh Patient</li> 
    <li> /patients/:id/create_report  >   it will allow Doctor to create report of Patient with use of mobile no. of patients entered at registrations time</li>
    <li> /patients/:id/all_reports > List all the reports of a patient oldest to latest</li>
    <li> /reports/:status > List all the reports of all the patients filtered by a specific status</li>
    </ul></div>`);
});

router.get("/reports/:status", homeController.reportByStatus);

router.use("/doctors", require("./doctor"));
router.use("/patients", require("./patients"));

module.exports = router;
