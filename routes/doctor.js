const express=require('express');
const router=express.Router();
const doctorController=require('../controller/doctorController')
const checkUserAuth=require('../middleware/auth-middleware')
// /doctors/register → with username and password
// - /doctors/login → returns the JWT to be used
// - /patients/register
// - /patients/:id/create_report
// - /patients/:id/all_reports → List all the reports of a patient oldest to latest
// - /reports/:status → List all the reports of all the patients filtered by a specific status

//Route Level MmiddleWare-to protect Route
router.use('/changePassword',checkUserAuth)
router.use('/loggedUser',checkUserAuth)

router.post('/register',doctorController.register);
router.post('/login',doctorController.login)

//protected Routes
router.post('/changePassword',doctorController.changePassword);
router.get('/loggedUser',doctorController.loggedUser); 



module.exports=router; 