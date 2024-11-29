import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { bCategoryServices } from "@/services/bCategoryServices";
import { toast } from "react-toastify";

export const getBlogCategories = createAsyncThunk(
    "blogCategory/get-categories",
    async(thunkAPI)=>{
    try {
        return await bCategoryServices.getBlogCategories()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getBlogCategory = createAsyncThunk(
    "blogCategory/get-category",
    async(id,thunkAPI)=>{
    try {
        return await bCategoryServices.getBlogCategory(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteBlogCategory = createAsyncThunk(
    "blogCategory/delete-category",
    async(id,thunkAPI)=>{
    try {
        return await bCategoryServices.deleteBlogCategory(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
  
export const updateBlogCategory = createAsyncThunk(
    "blogCategory/update-category",
    async({id,data},thunkAPI)=>{
    try {
        return await bCategoryServices.updateBlogCategory(id,data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createBlogCategory = createAsyncThunk(
    "blogCategory/add-category",
    async(data,thunkAPI)=>{
    try {
        return await bCategoryServices.addBlogCategories(data)
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
        // get All blog Category
        .addCase(getBlogCategories.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getBlogCategories.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.bCategories=action.payload;
        }).addCase(getBlogCategories.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // create blog Category
        .addCase(createBlogCategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(createBlogCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.bCategories=action.payload;
            if (state.isSuccess) {
                toast.success('عنوان دسته بندی بلاگ با موفقیت اضافه شد')
            }
        }).addCase(createBlogCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // get one blog Category
        .addCase(getBlogCategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getBlogCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.bCategory=action.payload;
        }).addCase(getBlogCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // delete blog Category
        .addCase(deleteBlogCategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteBlogCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.bCategories=state.bCategories.filter(bCategory =>bCategory._id !== action.payload._id);
            if (state.isSuccess) {
                toast.info("دسته بندی بلاگ با موفقیت حذف شد")
            }
        }).addCase(deleteBlogCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // update blog Category
        .addCase(updateBlogCategory.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateBlogCategory.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.bCategories=state.bCategories.map(bCategory=>
                bCategory._id === action.payload._id ? action.payload : bCategory
            );
            if (state.isSuccess) {
                toast.info("دسته بندی بلاگ با موفقیت آپدیت شد")
            }
        }).addCase(updateBlogCategory.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    }   
})


export default bCategorySlice.reducer