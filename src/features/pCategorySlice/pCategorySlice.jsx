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

export const getProCategory = createAsyncThunk(
    "productCategory/get-category",
    async(id,thunkAPI)=>{
    try {
        return await pCategoryServices.getProCategorey(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteProCategory = createAsyncThunk(
    "productCategory/delete-category",
    async(id,thunkAPI)=>{
    try {
        return await pCategoryServices.deleteProCategorey(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateProCategory = createAsyncThunk(
    "productCategory/update-category",
    async({id,data},thunkAPI)=>{
    try {
        return await pCategoryServices.updateProCategorey(id,data)
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
                toast.success(" دسته بندی محصول با موفقیت اضافه شد")
            }
        }).addCase(createProductsCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // get a products Category by id
        .addCase(getProCategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getProCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.pCategory=state.pCategories.filter(pCategory=>pCategory._id ==action.payload._id );
        }).addCase(getProCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // update products Category 
        .addCase(updateProCategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateProCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.pCategories = state.pCategories.map((pCategory)=>
                pCategory._id === action.payload._id ? action.payload : pCategory );
            if (state.isSuccess === true) {
                toast.success("دسته بندی محصول با موفقیت آپدیت شد")
            }
        }).addCase(updateProCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // delete products Category by id
        .addCase(deleteProCategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteProCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.pCategories=state.pCategories.filter(pCategory=>pCategory._id !==action.payload._id );
            if (state.isSuccess === true) {
                toast.success("دسته بندی محصول با موفقیت حذف شد")
            }
        }).addCase(deleteProCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    }   
})


export default pCategorySlice.reducer