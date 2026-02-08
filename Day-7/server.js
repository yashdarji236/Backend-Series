require('dotenv').config();  
const app = require('./src/app.js')
const mongoose = require('./src/config/database.js');
mongoose();


app.listen(3000,()=>{
    console.log('Server is running');
    
})