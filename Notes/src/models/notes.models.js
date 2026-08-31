const mongoose = require("mongoose")

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        minlength: [20, "Minumum 20 characters required"]
    }
})

const NotesModel = mongoose.model("notes", notesSchema)
module.exports = NotesModel