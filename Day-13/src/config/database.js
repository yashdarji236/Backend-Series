const mongoose = require('mongoose');

function ConnectToDB(){
    mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("connect toDatabase");
        
    })
    
    
}

module.exports = ConnectToDB;