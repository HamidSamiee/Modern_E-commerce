import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { blogServices } from "@/services/blogServices";
import { toast } from "react-toastify";

export const getBlogs = createAsyncThunk(
    "blog/get-blogs",
    async(thunkAPI)=>{
    try {
        return await blogServices.getBlogs()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createBlog = createAsyncThunk(
    "blog/create-blog",
    async(data,thunkAPI)=>{
    try {
        return await blogServices.createBlog(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getBlog = createAsyncThunk(
    "blog/get-blog",
    async(id,thunkAPI)=>{
    try {
        return await blogServices.getBlog(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteBlog = createAsyncThunk(
    "blog/delete-blog",
    async(id,thunkAPI)=>{
    try {
        return await blogServices.deleteBlog(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateBlog = createAsyncThunk(
    "blog/update-blog",
    async({id,data},thunkAPI)=>{
    try {
        return await blogServices.updateBlog(id,data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const uploadImageBlog = createAsyncThunk(
    "blog/uploadImg-blog",
    async({id,data},thunkAPI)=>{
    try {
        return await blogServices.uploadImageBlog(id,data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const blogSlice=createSlice({
    name:'blog',
    initialState:{
        blogs:[],
        blog:[],
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
        // create blog
        .addCase(createBlog.pending,(state)=>{
            state.isLoading=true;
        }).addCase(createBlog.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.blogs=action.payload;
            if (state.isSuccess) {
                toast.success('بلاگ با موفقیت اضافه شد')
            }
        }).addCase(createBlog.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
         // get blog
         .addCase(getBlog.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getBlog.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.blog=state.blogs.filter(blo => blo._id === action.payload._id);
        }).addCase(getBlog.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
         // delete blog
         .addCase(deleteBlog.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteBlog.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.blogs =state.blogs.filter(blog=>blog._id !== action.payload._id);
            if (state.isSuccess) {
                toast.success("بلاگ با موفقیت حذف شد")
            }
        }).addCase(deleteBlog.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
         // update blog
         .addCase(updateBlog.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateBlog.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.blogs=state.blogs.map(blog => blog._id === action.payload._id ? action.payload : blog);
            if (state.isSuccess) {
                toast.success("بلاگ با موفقیت آپدیت شد")
            }
        }).addCase(updateBlog.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // upload Image blog
        .addCase(uploadImageBlog.pending,(state)=>{
            state.isLoading=true;
        }).addCase(uploadImageBlog.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.blogs=state.blogs.map (blog => blog._id === action.payload._id ? action.payload : blog);
            // if (state.isSuccess) {
            //     toast.success("بلاگ با موفقیت آپدیت شد")
            // }
        }).addCase(uploadImageBlog.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    }   
})


export default blogSlice.reducer