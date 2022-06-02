const express=require('express');
const router=express.Router();
const doctorController=require('../controller/doctorController')

const checkUserAuth=require('../middleware/auth-middleware')


//Routes to register and log in respectively
router.post('/register',doctorController.register);
router.post('/login',doctorController.login)

// Routes with middleWare to Authenticate
router.post('/changePassword',checkUserAuth,doctorController.changePassword);
router.get('/loggedUser',checkUserAuth,doctorController.loggedUser); 



module.exports=router; 