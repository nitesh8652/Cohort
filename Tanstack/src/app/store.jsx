import { configureStore } from "@reduxjs/toolkit";
import MEOW from '../features/counterSlice'
import authentication from '../features/authslice'

export default configureStore({
    reducer:{
         counter: MEOW,
         auth: authentication
    }
})