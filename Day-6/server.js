require('dotenv').config();  
const app = require('./src/app.js')
const mongoose = require('mongoose');

function Connect(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connected to Database');
        
    })
}
Connect();
app.listen(3000,()=>{
    console.log('Server is running');
    
})