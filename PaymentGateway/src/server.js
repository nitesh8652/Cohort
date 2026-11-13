import express from 'express'
import connectToDb from '../src/app/config/db.js'

import app from '../src/app/app.js'



app.listen(3000,()=>{
    console.log("app listneing on 30000")
})