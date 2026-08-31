const express = require('express')
const { createNotesController, fetchall, noteid, deletenotes, updatedNotesController } = require('../controllers/notes.controller')
const router = express.Router()

router.post('/create', createNotesController)
router.get('/allnotes', fetchall)

router.put('/:id', updatedNotesController)


router.delete('/:id', deletenotes)


module.exports = router

