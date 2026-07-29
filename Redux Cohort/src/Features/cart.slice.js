import { createSlice } from "@reduxjs/toolkit";
import reducer from "./counter.Slice";

 const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cartitems:null
    },
    reducers:{
        addToCart:(state, action) =>{
            state.cartItems = action.payload
        },
        removeFromCart:(state, action)=>{

        }
    }


})

export const {initialState, removeFromCart} = cartSlice.actions
export default cartSlice.reducer
