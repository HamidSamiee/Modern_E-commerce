import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { blogServices } from "@/services/blogServices";

export const getBlogs = createAsyncThunk(
    "blog/get-blogs",
    async(thunkAPI)=>{
    try {
        return await blogServices.getBlogs()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})





export const blogSlice=createSlice({
    name:'blog',
    initialState:{
        blogs:[],
        isError:false,
        isSuccess:false,
        isLoading:false,
        message:"",
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        // get All blogs
        .addCase(getBlogs.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getBlogs.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.blogs=action.payload;
        }).addCase(getBlogs.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        
    }   
})


export default blogSlice.reducer