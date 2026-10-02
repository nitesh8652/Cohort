import config from "../src/config/config.js";
import jwt from 'jsonwebtoken'

export function createAcessToken({ userId, role }) {
    const access_token = jwt.sign({
        userId,
        role
    }, config.ACCESS_TOKEN, { expiresIn: "15Min" })
    return access_token
}

export function createRefreshToken({ userId, role }) {
    const refresh_token = jwt.sign({
        userId,
        role
    }, config.REFRESH_TOKEN, { expiresIn: "7Days" })
    return refresh_token
}

// export function createRefreshToken({ userId, role }) {
//     const refresh_token = jwt.sign({
//         userId,
//         role
//     }, config.REFRESH_TOKEN, { expiresIn: "7Days" })
//     return refresh_token
// }

export function readRefreshToken(refreshToken){
    return jwt.verify(refreshToken, config.REFRESH_TOKEN)
}













