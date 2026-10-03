import { readAccessToken } from "../utils/auth.utils.js"

export function authenticate(req, res, next) {
    const accessToken = req.headers.authorization?.split(" ")[1]

    if (!accessToken) {
        return res.status(400).json({
            message: "Acces token not found in the middleware"
        })
    }
    try {
        const decoded = readAccessToken(accessToken)
        req.user =  decoded 
        next()

    } catch (err) {
        res.status(401).json({
            message:"Invalid or expired access token"
        })
    }

}