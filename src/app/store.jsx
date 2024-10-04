import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@features/CartSlice/CartSlice'
import authReducer from '@features/userSlice/userSlice'


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth:authReducer,
  },
})