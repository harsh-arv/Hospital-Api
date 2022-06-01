const mongoose=require('mongoose');

//Defining schema
const patientSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    email:{
        type:String,
        required: true,
        trim: true
    },
    mobile:{
        type:Number,
        required: true,
        trim: true
    }
})

// create Model

const PatientsModel=mongoose.model("patients",patientSchema);
module.exports= PatientsModel;

