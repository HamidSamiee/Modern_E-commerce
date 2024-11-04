import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { brandServices } from "@/services/brandServices";
import { toast } from "react-toastify";

export const getAllbrands = createAsyncThunk(
    "brands/get-brands",
    async(thunkAPI)=>{
    try {
        return await brandServices.getBrands()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addBrand = createAsyncThunk(
    "brand/create-brand",
    async(brandTitle,thunkAPI)=>{
    try {
        return await brandServices.createBrand(brandTitle)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})



export const brandSlice=createSlice({
    name:'brand',
    initialState:{
        brands:[],
        isError:false,
        isSuccess:false,
        isLoading:false,
        message:"",
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        // get All brands
        .addCase(getAllbrands.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAllbrands.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.brands=action.payload;
            console.log(action.payload)
        }).addCase(getAllbrands.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.error;
        })
        // add brand
        .addCase(addBrand.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addBrand.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createdBrand=action.payload;
            if (state.isSuccess === true) {
                toast.info("عنوان برند با موفقیت اضافه شد")
            }
        }).addCase(addBrand.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.response.data.message;
            console.log(state.message);
            if (state.isError === true) {
                toast.error(state.message?.response?.data?.message)
            }
        })
    }   
})


export default brandSlice.reducer