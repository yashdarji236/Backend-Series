const express = require('express');
const app = express();
app.use(express.json());
const UserData = []

app.post('/user',(req,res)=>{
    console.log(req.body);
    UserData.push(req.body)
    res.send('user Accont is created!')
})
app.get('/user',(req,res)=>{
    res.send(UserData)
})
app.delete('/user/:index',(req,res)=>{
    if(UserData.length>req.params.index){
       delete UserData[req.params.index]
       res.send("successfully deleted!")

       
    }
    else{
        res.send("the index is invalid!")
    }

})
app.patch('/user/:index',(req , res)=>{
    if(UserData.length>req.params.index){
        UserData[req.params.index].Username = req.body.Username
        UserData[req.params.index].password = req.body.password
        res.send("successfully updated!")
    }
    else{
        res.send("the index is invalid!")
    }
})
app.listen(3000,()=>{
    console.log("Surver is running...");
    
})