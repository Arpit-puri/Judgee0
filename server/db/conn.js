const  mongoose= require('mongoose');
require("dotenv").config;
const db= process.env.MONGO_URL;

mongoose.connect(db).then(()=>{
    console.log("Connection establised successfully");
})  
.catch((e)=>{
    console.log("Connection cant be establised");
});