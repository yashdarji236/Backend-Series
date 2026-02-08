const express = require('express');
const app = express();
const model = require('../model/note.model.js')
const cors = require('cors');
app.use(express.json());
app.use(express.json())
app.use(cors());
app.use(express.static('./public'))
const path = require('path');

//Post Method
app.post('/api/notes',async (req,res)=>{
    const {title,description} = req.body;
    const note = await model.create({
        title,
        description
    })
    res.status(201).json({
        message:"Data seccessfully inserted",
        note
    })
})

//Get
app.get('/api/notes',async (req,res)=>{

    //find always return the array of object
    const notes = await model.find();
    res.status(200).json({
        notes
    })
})

//delete
app.delete('/api/notes/:id',async(req,res)=>{
    const {id} = req.params;
    const note = await model.findByIdAndDelete(id);
    res.status(200).json({
        message:"Data seccessfully deleted",
    
    })
})


//patch
app.patch('/api/notes/:id',async (req,res)=>{
    const {id}= req.params
    const note = await model.findByIdAndUpdate(id,req.body , {new:true})
    res.status(200).json({
        message:"Data seccessfully updated",
        note
    })

})



app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,'..', '/public/index.html'))
    
})
module.exports = app;