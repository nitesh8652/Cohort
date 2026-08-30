const express = require('express')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World')
})



app.post('/create',async (req, res) => {
    try {
        let { title, description } = req.body
        let newNote = await NotesModel.create({
            title,
            description
        })

        return res.status(201).json({
            message:"Note created Successfully.",
            data: newNote
        })

    } catch (error) {
        console.log("error in creation", error)
    }
})


module.exports = app