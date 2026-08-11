import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from '../../../../app/config/axiosInstance'

let loginEmployee = createAsyncThunk(

    "auth/login",
    async (credentials, thunkapi) => {
        try{
            let res = await axiosInstance.post('/auth/login', credentials)
            console.log(res);
            return res.data
            
        }catch (error){
            return thunkapi.rejectWithValue(error)
        }
    }

) 