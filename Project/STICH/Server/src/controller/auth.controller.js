import userModel from '../models/user.model.js'
import bcrypt from "bcryptjs"
import { createAcessToken, createRefreshToken } from '../../utils/auth.utils.js'



//register user ans save data from req.body

export async function register(req, res) {
    const { email, name, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User already exists with this email",
            errors: [
                {
                    field: "email",
                    message: "user already exists"
                }
            ]
        })
    }


    const user = await userModel.create({
        email,
        name,
        passwordHash: await bcrypt.hash(password, 12)
    })

    const accessToken = createAcessToken({
        userId: user._id,
        role: user.role
    })

    const refreshToken = createRefreshToken({
        userId: user._id,
        role: user.role
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true
    })

    res.status(201).json({
        message:"user registered successfullly",
        data:{
            user:{
                email:user.email,
                name:user.name,
                id:user._id
            }
        }
    })


}