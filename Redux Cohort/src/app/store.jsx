import { configureStore } from '@reduxjs/toolkit'
import counterSlice from '../Features/counter.Slice'
import cartSlice from '../Features/cart.slice'

export const store = configureStore({

    reducer: {
        counter: counterSlice,
        cart:cartSlice,
    },

})
