const connect = require('./src/config/database.js')
const app = require('./src/app.js')
require('dotenv').config();  
connect()
app.listen(3000,()=>{
    console.log('Server is running');
    
})