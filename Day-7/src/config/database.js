const mongoose = require('mongoose');
function Connect(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log('connected to Database');
        
    })
}

module.exports = Connect;