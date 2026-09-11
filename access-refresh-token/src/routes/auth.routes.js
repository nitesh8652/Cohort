import { Router } from "express";
import userModel from '../models/model.js'
import bcrypt from "bcryptjs";
import generateToken from '../utils/auth.js'

const router = Router()

router.post("/register", async (req, res) => {

    const { name, email, password } = req.body

    const isUserExists = await userModel.findOne({email})

    if(isUserExists){
        return res.status(400).json({
            message:"User already exists",
            errors:[
                {
                    path:"email",
                    message:"user already exists"
                }
            ]
        })
    }

    const user = await userMode.create({
        name,
        email,
        passwordHash: await bcrypt.hash(password, 12)
    })

    const {accessToken, refreshToken} = generateTokens({userId: user._id )


})

export default router