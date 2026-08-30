const {default: mongoose} = require("mongoose")

const connectdb = async () =>{
    try{
        await mongoose.connect("mongodb://localhost:27017/notes")
        console.log("MongoDB connected")
    }catch(error){
        console.log("error connecting db",error)
    }
}

module.exports = connectdb