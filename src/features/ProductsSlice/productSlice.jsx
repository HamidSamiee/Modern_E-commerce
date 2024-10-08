import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productServices } from "@/services/productServices";

export const getAllProducts = createAsyncThunk(
    "product/getAll",
    async(thunkAPI)=>{
    try {
        return await productServices.getProducts()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const productSlice=createSlice({
    name:'product',
    initialState:{
        product:"",
        isError:false,
        isSuccess:false,
        isLoading:false,
        message:"",
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(getAllProducts.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAllProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.product=action.payload;
        }).addCase(getAllProducts.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    }   
})


export default productSlice.reducer