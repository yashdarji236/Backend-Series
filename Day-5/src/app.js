const express = require('express');
const app = express();
app.use(express.json())

const notes = []

app.post('/notes',(req,res)=>{
    notes.push(req.body)

    res.status(201).json({
        message:"note added successfully",
        note:req.body
    })
})

app.get('/notes',(req,res)=>{
    res.status(200).json({
        message:"message fetch successfully",
        notes:notes
    })
})

app.delete('/notes/:id',(req,res)=>{
    if(req.params.id<notes.length){
        delete notes[req.params.id]
        res.status(204).json({
            message:"note deleted successfully",
        })
        }
    else{
        res.status(404).json({
            message:"invalid id"
        })
    }
})

app.patch('/notes/:id',(req,res)=>{
    if(req.params.id<notes.length){
        notes[req.params.id].title = req.body.title
        notes[req.params.id].description = req.body.description
        res.status(200).json({
            message:"note updated successfully",
            notes:notes
        })
        
    }
    else{
        res.status(404).json({
            message:"invalid id"
        })
    }
})


module.exports = app