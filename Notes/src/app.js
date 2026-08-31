const express = require('express')
const notesRoute = require("./routes/notes.route")
const NotesModel = require('./models/notes.models')


const app = express()

app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.use('/notes',notesRoute)


module.exports = app