import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../../app/config/AxiosInstance";

export let loginEmployee = createAsyncThunk('auth/login', async (credentials, thunkApi) => {
    try {
let response = await axiosInstance.post('/auth/login', credentials)
console.log(response)
return response.data
    } catch (error) {
        return thunkApi.rejectWithValue(error)
    }
})