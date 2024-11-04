import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pCategoryServices } from "@/services/pCategoryServices";

export const getProductsCategory = createAsyncThunk(
    "productCategory/get-categories",
    async(thunkAPI)=>{
    try {
        return await pCategoryServices.getProductCategoreis()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})





export const pCategorySlice=createSlice({
    name:'pCategory',
    initialState:{
        pCategories:[],
        isError:false,
        isSuccess:false,
        isLoading:false,
        message:"",
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        // get All products Category
        .addCase(getProductsCategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getProductsCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.pCategories=action.payload;
        }).addCase(getProductsCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        
    }   
})


export default pCategorySlice.reducer