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

export const getBrand = createAsyncThunk(
    "brands/get-brand",
    async(id,thunkAPI)=>{
    try {
        return await brandServices.getBrand(id)
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

export const updateBrand = createAsyncThunk(
    "brands/update-brand",
    async({id,data},thunkAPI)=>{
    try {
        return await brandServices.updateBrand(id,data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteBrand = createAsyncThunk(
    "brands/delete-brand",
    async(id,thunkAPI)=>{
    try {
        return await brandServices.deleteBrand(id)
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
            // console.log(action.payload)
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
        // get brand
        .addCase(getBrand.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getBrand.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.brand= state.brands.filter(brand => brand._id === action.payload._id);
            // console.log(action.payload)
        }).addCase(getBrand.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.error;
        })
        // delete brand
        .addCase(deleteBrand.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteBrand.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            console.log(action.payload)
            state.brands = state.brands.filter(brand => brand._id !== action.payload._id);
            if (state.isSuccess === true) {
                toast.info("برند با موفقیت حذف شد")
            }
            state.message = "برند با موفقیت حذف شد";
        }).addCase(deleteBrand.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.error;
        })
        // update brand
        .addCase(updateBrand.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateBrand.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.brands = state.brands.map((brand) =>
                brand._id === action.payload._id ? action.payload : brand 
           );
           if (state.isSuccess === true) {
               toast.info("محصول با موفقیت آپدیت شد")
           }
            // console.log(action.payload)
        }).addCase(updateBrand.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.error;
        })
    }   
})


export default brandSlice.reducer