import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const generateToken = ({userId}) => {
    const access_token = jwt.sign({id: userId}, config.ACCESS_TOKEN,{expiresIn:"15m"})
    const refresh_token = jwt.sign({id: userId}, config.REFRESH_TOKEN,{expiresIn:"7d"})
    return {access_token , refresh_token}
}
