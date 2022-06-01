const express=require('express');
const router=express.Router();
const checkUserAuth=require('../middleware/auth-middleware')

const patientsController=require('../controller/patientsController')
// /doctors/register → with username and password
// - /doctors/login → returns the JWT to be used
// - /patients/register
// - /patients/:id/create_report
// - /patients/:id/all_reports → List all the reports of a patient oldest to latest
// - /reports/:status → List all the reports of all the patients filtered by a specific status

router.post('/register',checkUserAuth,patientsController.register);
router.post('/:number/create_report',checkUserAuth,patientsController.create_report);
router.get('/:number/all_reports',patientsController.all_reports);
router.get('/reports/:status',patientsController.reports);


module.exports=router;