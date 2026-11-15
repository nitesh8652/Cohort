import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from '../../../../app/config/axiosInstance'

export let loginEmployee = createAsyncThunk(

    "auth/login",
    async (credentials, thunkapi) => {
        try {
            let res = await axiosInstance.post('/auth/login', credentials)
            console.log(res);
            return res.data.data

        } catch (error) {
            return thunkapi.rejectWithValue({

                    message: error.response?.data?.message || error.message,
                        status: error.response?.status
            })
        }
    }

) 