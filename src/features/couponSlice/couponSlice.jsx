import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { couponServices } from "@/services/couponServices";

export const getAllCoupons = createAsyncThunk(
    "coupons/get-coupons",
    async(thunkAPI)=>{
    try {
        return await couponServices.getCoupons()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getCoupon = createAsyncThunk(
    "coupons/get-coupon",
    async(id,thunkAPI)=>{
    try {
        return await couponServices.getCoupon(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addCoupon = createAsyncThunk(
    "coupon/create-coupon",
    async(couponTitle,thunkAPI)=>{
    try {
        return await couponServices.createCoupon(couponTitle)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateCoupon = createAsyncThunk(
    "coupons/update-coupon",
    async({id,data},thunkAPI)=>{
    try {
        return await couponServices.updateCoupon(id,data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteCoupon = createAsyncThunk(
    "coupons/delete-coupon",
    async(id,thunkAPI)=>{
    try {
        return await couponServices.deleteCoupon(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const resetState = createAction("Reset_all");

export const couponSlice=createSlice({
    name:'coupon',
    initialState:{
        coupons:[],
        isError:false,
        isSuccess:false,
        isLoading:false,
        message:"",
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        // get All coupons
        .addCase(getAllCoupons.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAllCoupons.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.coupons=action.payload;
            // console.log(action.payload)
        }).addCase(getAllCoupons.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.error;
        })
        // add Coupon
        .addCase(addCoupon.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addCoupon.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createdCoupon=action.payload;
            if (state.isSuccess) {
                toast.success("کد تخفیف با موفقیت اضافه شد")
            }
        }).addCase(addCoupon.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.response.data.message;
            console.log(state.message);
            if (state.isError === true) {
                toast.error(state.message?.response?.data?.message)
            }
        })
        // get Coupon
        .addCase(getCoupon.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getCoupon.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.coupon= state.coupons.filter(coupon => coupon._id === action.payload._id);
            // console.log(action.payload)
        }).addCase(getCoupon.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.error;
        })
        // delete Coupon
        .addCase(deleteCoupon.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteCoupon.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            console.log(action.payload)
            state.coupons = state.coupons.filter(coupon => coupon._id !== action.payload._id);
            if (state.isSuccess === true) {
                toast.success("کد تخفیف با موفقیت حذف شد")
            }
            state.message = "کد تخفیف با موفقیت حذف شد";
        }).addCase(deleteCoupon.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.error;
        })
        // update Coupon
        .addCase(updateCoupon.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateCoupon.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.coupons = state.coupons.map((coupon) =>
                coupon._id === action.payload._id ? action.payload : coupon 
           );
           if (state.isSuccess === true) {
               toast.success("کد تخفیف با موفقیت آپدیت شد")
           }
            // console.log(action.payload)
        }).addCase(updateCoupon.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.error;
        })
        
    }   
})


export default couponSlice.reducer