
const express= require ("express");
const port = process.env.PORT || 8000;
const app=express();


app.use(express.json())
app.use(express.urlencoded()); 
app.use('/',require('./routes'));

// database connection
const db = require('./config/db');

app.listen(port,(error)=>{
    if(error){
        console.log(error);
        return
    }
    console.log(`Connect to server Done on port ${port}`);
})