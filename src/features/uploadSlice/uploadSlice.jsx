import { uploadServices } from "@/services/uploadServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import { toast } from "react-toastify";

export const uploadImages = createAsyncThunk(
    "upload/images",
    async(data,thunkAPI)=>{
    try {
        const formData = new FormData();
        for (let i = 0; i < data.length; i++) {
            formData.append('images',data[i]);
            
        }
        
        return await uploadServices.uploadImage(formData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
    

export const deleteImages = createAsyncThunk(
    "delete/image",
    async({productId,id},thunkAPI)=>{
    try {
        return await uploadServices.deleteImage(productId,id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const cloudinaryDeleteImage = createAsyncThunk(
    "delete/cloudinaryDeleteImage",
    async(id,thunkAPI)=>{
    try {
        return await uploadServices.cloudinaryDeleteImage(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const uploadSlice=createSlice({
    name:'upload',
    initialState:{
        imgs:[],
        isError:false,
        isSuccess:false,
        isLoading:false,
        message:"",
    },
    reducers: {
         resetUploadImages: (state) => {
             state.imgs = [];
         },
    },
    extraReducers:(builder)=>{
        builder
        // upload images
        .addCase(uploadImages.pending,(state)=>{
            state.isLoading=true;
        }).addCase(uploadImages.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.imgs=action.payload;
        }).addCase(uploadImages.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // delete images
        .addCase(deleteImages.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteImages.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            console.log(action.payload)
            state.imgs=state.imgs.filter(img => img.public_id !== action.meta.arg);
            state.message='Deleted';
        }).addCase(deleteImages.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // cloudinary Delete Image
        .addCase(cloudinaryDeleteImage.pending,(state)=>{
            state.isLoading=true;
        }).addCase(cloudinaryDeleteImage.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            console.log(action.payload)
            state.imgs=state.imgs.filter(img => img.public_id !== action.meta.arg);
            state.message='Deleted';
        }).addCase(cloudinaryDeleteImage.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    }   
})

export const { resetUploadImages } = uploadSlice.actions;
export default uploadSlice.reducer