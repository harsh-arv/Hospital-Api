const mongoose=require('mongoose');

//Defining schema
const userSchema=new mongoose.Schema({
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
    password:{
        type:String,
        required: true,
        trim: true
    },
    tc:{ //term and condition Checbox 
        type:Boolean,
        required: true,
    }
})

// create Model

const DoctorModel=mongoose.model("doctor",userSchema);
module.exports= DoctorModel;

