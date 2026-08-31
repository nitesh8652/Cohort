const NotesModel = require('../models/notes.models')

const createNotesController = async (req, res) => {
    try {
        let { title, description } = req.body
        let newNote = await NotesModel.create({
            title,
            description
        })

        return res.status(201).json({
            message: "Note created Successfully.",
            data: newNote
        })

    } catch (error) {
        console.log("error in creation", error)
        return res.status(500).json({
            message: "Failed to create note",
            error: error.message
        })
    }
}

const fetchall = async (req, res) => {
    try {

        const allnotes = await NotesModel.find()

        res.status(200).json({
            message: "All notes Fetched",
            data: allnotes
        })

    } catch (error) {
        console.log("error at fetching notes", error)
        return res.status(500).json({
            message: "Failed to fetch notes",
            error: error.message
        })
    }
}

const noteid =  async (req, res) => {
    try {
        let noteId = req.params.id
        let note = await NotesModel.findById(noteId)

        res.status(200).json({
            message: "notes found",
            data : note
        })

    } catch (error){
        console.log("error in id fetching", error)
    }
}

module.exports = {
    createNotesController,
    fetchall,
    noteid
}