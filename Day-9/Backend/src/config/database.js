const mongoose = require('mongoose')

function Connect(){
    mongoose.connect(process.env.MONGOOSE_URI).then(()=>{
        console.log("connect to DB");
        
    })
}


module.exports = Connect;