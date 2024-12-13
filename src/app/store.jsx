import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '@features/CartSlice/CartSlice'
import authReducer from '@features/userSlice/userSlice'
import productReducer from '@features/ProductsSlice/productSlice'
import brandReducer from '@features/BrandSlice/brandSlice'
import pCategoryReducer from '@features/pCategorySlice/pCategorySlice'
import blogReducer from '@features/BlogsSlice/blogSlice'
import colorReducer from '@features/ColorSlice/colorSlice'
import bCategoryReducer from '@features/bCategorySlice/bCategorySlice'
import enquiryReducer from '@features/enquirySlice/enquirySlice'
import uploadReducer from '@features/uploadSlice/uploadSlice'
import couponReducer from '@features/couponSlice/couponSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth:authReducer,
    product:productReducer,
    brand:brandReducer,
    pCategory:pCategoryReducer,
    blog:blogReducer,
    color:colorReducer,
    bCategory:bCategoryReducer,
    enquiry:enquiryReducer,
    upload:uploadReducer,
    coupon:couponReducer,
  },
})