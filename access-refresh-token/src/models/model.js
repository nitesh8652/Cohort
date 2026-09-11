import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    passwordHash: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,

    }
})

const userModel = mongoose.model("User", userSchema)
export default userModel