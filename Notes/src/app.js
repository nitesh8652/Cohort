const express = require('express')

const app = express()

app.get('/',(req,res)=>{
    res.send('Hello World') 
})

app.post('/create',(req,res)=>{
    try{

    }catch(error){
        
    }
})


module.exports = app