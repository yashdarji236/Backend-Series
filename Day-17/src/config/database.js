const mongoose = require('mongoose');

function Connect(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("connect toDatabase");
        
    })
    
    
}

module.exports = Connect;