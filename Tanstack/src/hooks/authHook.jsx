import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addUser } from "../features/authslice";
import { useState } from "react";

export const useAuth = () => {

    let navigate = useNavigate()
    const dispatch = useDispatch()

    let {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()


    const [registerUsers, setRegisterUsers] = useState(JSON.parse(localStorage.getItem("registeredUsers")) || [] )

    const registerForm =(data) =>{
        
        let arr = [...registerUsers, data]
        setRegisterUsers(arr)
        localStorage.setItem("registeredUsers",JSON.stringify(arr))
        alert("successfully registered ")
        console.log(arr)
    }

    const loginForm =(data) =>{
        
        let loginUser = registerUsers.find((val)=>{
            return val.email === data.email && val.password === data.password
        })

        if(!loginUser){
            alert("invalid credentials")
            return
        }

        dispatch(addUser(loginUser))
        localStorage.setItem("loginUser", JSON.stringify(loginUser))
        alert("login successfull")  
        reset()

    }


    

    return {

        navigate,
        register,
        handleSubmit,
        errors,
        registerForm,
        loginForm,
    }
}