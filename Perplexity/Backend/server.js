import app from './src/app.js'
import {testAi} from './src/services/ai.service.js'

testAi()

app.listen(3000,()=>{
    console.log("Server is Running");
    
})