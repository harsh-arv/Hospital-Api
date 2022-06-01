const mongoose  = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/hospitalApi'
mongoose.connect('mongodb+srv://Harsh_arv:harsh123@cluster0.wkjgb.mongodb.net/HospitalApi?retryWrites=true&w=majority'
,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
   })

const db=mongoose.connection;

// checking if there is any error
db.on('error', console.error.bind(console , "Error on connecting Database"));

// print sucess if database connection is sucessfull
db.once('open', ()=>{
    console.log('connect to Database :: MongoDB'); 
})

module.exports = db;