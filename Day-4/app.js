const express = require('express');
const app = express();
app.use(express.json());
const UserData = []

app.post('/user',(req,res)=>{
    res.status(201).json({
        message: "User data received",
    })
    console.log('User data received');
    
    UserData.push(req.body)
})
app.get('/user',(req,res)=>{
    res.status(200).json({
        message: "User data fetched successfully",
        data: UserData
    }),
    console.log(UserData);
    
})
app.delete('/user/:index',(req,res)=>{
    if(UserData.length>req.params.index){
        delete UserData[req.params.index]
        res.status(204).json({
            message: "User data deleted successfully",
        }),
        console.log("User data deleted successfully");
        
    }
    else{
        res.status(404).json({
            message: "Invalid index",
        }),
        console.log("Invalid index");
        
    }

})
app.patch('/user/:index',(req,res)=>{
    if(UserData.length>req.params.index){
        UserData[req.params.index].Username = req.body.Username
        UserData[req.params.index].password = req.body.password
        res.status(200).json({
            message: "User data updated successfully",
        }),
        console.log("User data updated successfully");
    }
})
app.listen(3000,()=>{
    console.log("Surver is running...");
    
})