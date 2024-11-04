import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bCategoryServices } from "@/services/bCategoryServices";

export const getProductsCategory = createAsyncThunk(
    "blogCategory/get-categories",
    async(thunkAPI)=>{
    try {
        return await bCategoryServices.getBlogCategories()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})





export const bCategorySlice=createSlice({
    name:'bCategory',
    initialState:{
        bCategories:[],
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
            state.bCategories=action.payload;
        }).addCase(getProductsCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        
    }   
})


export default bCategorySlice.reducer