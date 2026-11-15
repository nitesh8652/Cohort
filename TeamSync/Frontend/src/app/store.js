import { configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/states/auth/authSlice'

export let store = configureStore({
    reducer:{
        auth:authReducer
    }
})