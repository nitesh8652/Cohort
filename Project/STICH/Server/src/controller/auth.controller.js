import userModel from '../models/user.model.js'

//register user ans save data from req.body

export async function register(req, res){
    const {email, name, password} = req.body

    const isUserAlreadyExists
}