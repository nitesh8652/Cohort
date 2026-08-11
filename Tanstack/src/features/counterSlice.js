import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
    name: "counter",
    initialState: {
        count: 0
    },
    reducers: {
        increment: (state, action) => {
            state.count++
        },
        decrement: (state, action) => {
            state.count--

        },
        incrementByAmount:(state,action) =>{
            state.count +=  Number(action.payload)
        }
    }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer