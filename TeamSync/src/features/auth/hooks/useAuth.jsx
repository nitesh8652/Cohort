import { useForm } from "react-hook-form"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import {loginEmployee} from '../../../features/auth/state/auth/authAction' 

 export  let useAuth = () => {
    
    let navigate = useNavigate()
    let dispatch = useDispatch()

    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm()

    const onRegisterSubmit = (data) =>{
        console.log(data ,'data')
    }
    
    const onLoginSubmit = (data) =>{
        dispatch(loginEmployee(data))
    }

    return {
        register,
        handleSubmit,
        errors,
        onLoginSubmit,
        onRegisterSubmit,
        navigate
    }

}
