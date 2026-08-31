const express = require('express')
const { createNotesController, fetchall, noteid } = require('../controllers/notes.controller')
const router = express.Router() 

router.post('/create', createNotesController)
router.get('/allnotes', fetchall)


    
    
router.get('/:id',noteid)

module.exports = router

