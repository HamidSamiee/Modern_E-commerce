import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { pCategoryServices } from "@/services/pCategoryServices";
import { toast } from "react-toastify";

export const getProductsCategory = createAsyncThunk(
    "productCategory/get-categories",
    async(thunkAPI)=>{
    try {
        return await pCategoryServices.getProductCategoreis()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createProductsCategory = createAsyncThunk(
    "productCategory/add-category",
    async(pCategory,thunkAPI)=>{
    try {
        return await pCategoryServices.createProductCategoreis(pCategory)
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
        // create products Category
        .addCase(createProductsCategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(createProductsCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.pCategories=action.payload;
            if (state.isSuccess === true) {
                toast.info(" دسته بندی محصول با موفقیت اضافه شد")
            }
        }).addCase(createProductsCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    }   
})


export default pCategorySlice.reducer