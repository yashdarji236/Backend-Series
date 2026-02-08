const express = require('express');
const model = require('../model/notes.model.js');
const app = express();
app.use(express.json());

app.post('/notes',async (req,res)=>{
    const {title,description} = req.body;
    const note = await model.create({title,description})
    res.status(201).json({
        message:"note created successfully!",
        note
    })
})

app.get('/notes',async (req,res)=>{
    const notes = await model.find();
    res.status(200).json({
        message:"notes fetched successfully!",
        notes
    })
})

app.delete('/notes/:id',async (req,res)=>{
    const {id} = req.params;
    const note = await model.findByIdAndDelete(id);
    res.status(200).json({
        message:"note deleted successfully!",
        note
    })
})



app.patch('/notes/:id',async (req,res)=>{
    const {id} = req.params;
    const note = await model.findByIdAndUpdate(id,req.body,{new:true});
    res.status(200).json({
        message:"note updated successfully!",
        note
    })
})
module.exports = app;