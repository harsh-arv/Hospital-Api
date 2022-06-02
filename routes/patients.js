const express=require('express');
const router=express.Router();
const checkUserAuth=require('../middleware/auth-middleware')

const patientsController=require('../controller/patientsController')

router.post('/register',checkUserAuth,patientsController.register);
router.post('/:number/create_report',checkUserAuth,patientsController.create_report);
router.get('/:number/all_reports',patientsController.all_reports);
router.get('/reports/:status',patientsController.reports);


module.exports=router;