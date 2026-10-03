import userModel from '../models/user.model.js'
import bcrypt from "bcryptjs"
import { createAcessToken, createRefreshToken, readRefreshToken } from '../utils/auth.utils.js'



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

    await userModel.findByIdAndUpdate(user._id, {
        refreshToken
    })


    res.status(201).json({
        message: "user registered successfullly",
        data: {
            user: {
                email: user.email,
                name: user.name,
                id: user._id
            },
            accessToken
        }
    })


}

export async function login(req, res) {

    const { email, password } = req.body

    const user = await userModel.findOne({
        email
    })

    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password",
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid password or email"
        })
    }

    const accessToken = createAcessToken({
        userId: user._id,
        role: user.role
    })

    const refreshToken = createRefreshToken({
        userId: user._id,
        role: user.role
    })

    await userModel.findOneAndUpdate({
        email

    }, {
        refreshToken
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true
    })

    res.status(200).json({
        message: "User logged Sucessfully",
        data: {
            user: user.email,
            name: user.name,
            id: user._id
        },
        accessToken
    })

}

export async function refresh(req, res) {

    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return res.status(400).json({
            message: "refresh Token Required"
        })
    }

    try {

        const decoded = readRefreshToken(refreshToken)

        const { userId, role } = decoded
        const user = await userModel.findById(userId)

        if (refreshToken != user.refreshToken) {

            await userModel.findByIdAndUpdate(user._id, {
                refreshToken: null
            })

            return res.status(401).json({
                message: "Mismatch token"
            })

        }

        const accessToken = createAcessToken({
            userId, role
        })

        const newRefreshToken = createRefreshToken({
            userId, role
        })

        await userModel.findByIdAndUpdate(user._id, {
            refreshToken: newRefreshToken
        })

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true
        })

        res.status(200).json({
            message: "Tokens rotated",
            data: {
                user: {
                    email: user.email,
                    name: user.name,
                    id: user._id
                },
                accessToken,
            }
        })

    } catch (err) {

        return res.status(401).json({
            message: "Invalid refresh token"
        })

    }

}

export async function getMe(req, res) {
    const { userId } = req.user

    const user = await userModel.findById(userId)

    res.status(200).json({
        message: "user Data Fetch successfully",
        data: {
            user: {
                email: user.email,
                name:user.name,
                id:user._id
            }
        }

    })
}