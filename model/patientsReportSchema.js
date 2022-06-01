const mongoose=require('mongoose');

//Defining schema
const report=new mongoose.Schema({
    patientNumber:{
        type:Number,
        required:true,
    },
    doctorName:{
        type:String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        // status : ['Negative','Travelled-Quarantine',
        // 'Symptoms-Quarantine','Positive-Admit]'],
        // default: 'Negative'
    }
},{
    timestamps:true

})

// create Model 
const PatientsReport=mongoose.model("patientreports",report);
module.exports= PatientsReport;

