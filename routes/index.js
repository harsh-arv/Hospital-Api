const express=require('express');
const router=express.Router();

// /doctors/register → with username and password
// - /doctors/login → returns the JWT to be used
// - /patients/register
// - /patients/:id/create_report
// - /patients/:id/all_reports → List all the reports of a patient oldest to latest
// - /reports/:status → List all the reports of all the patients filtered by a specific status

const homeController=require('../controller/homeController') 

router.get('/',(req,res)=>{
    return res.end('<h1> Working</h1>')
});

router.get('/reports/:status',homeController.reportByStatus);

router.use('/doctors',require('./doctor'));
router.use('/patients',require('./patients'));

module.exports=router;