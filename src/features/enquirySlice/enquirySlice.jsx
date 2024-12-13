import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enquiryServices } from "@/services/enquiryServices";
import { toast } from "react-toastify";

export const getEnquiries = createAsyncThunk(
    "enquiry/get-enquiries",
    async(thunkAPI)=>{
    try {
        return await enquiryServices.getEnquiries()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const createEnquiries = createAsyncThunk(
    "enquiry/create-enquiry",
    async(data,thunkAPI)=>{
    try {
        return await enquiryServices.createEnquiry(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const deleteEnquiries = createAsyncThunk(
    "enquiry/delete-enquiry",
    async(id,thunkAPI)=>{
    try {
        return await enquiryServices.deleteEnquiry(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const getEnquiry = createAsyncThunk(
    "enquiry/get-enquiry",
    async(id,thunkAPI)=>{
    try {
        return await enquiryServices.getEnquiry(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateEnquiries = createAsyncThunk(
    "enquiry/update-enquiry",
    async({id,data},thunkAPI)=>{
    try {
        return await enquiryServices.updateEnquiry(id,data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const enquirySlice=createSlice({
    name:'enquiry',
    initialState:{
        enquiries:[],
        isError:false,
        isSuccess:false,
        isLoading:false,
        message:"",
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        // get All Enquiries
        .addCase(getEnquiries.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getEnquiries.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.enquiries=action.payload;
        }).addCase(getEnquiries.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // create Enquiries
        .addCase(createEnquiries.pending,(state)=>{
            state.isLoading=true;
        }).addCase(createEnquiries.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createdEnquiry = action.payload;
            if (state.isSuccess) {
                toast.success("فرم شما با موفقیت ارسال شد")
            }
        }).addCase(createEnquiries.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // get Enquiry by id
        .addCase(getEnquiry.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getEnquiry.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.enquiry = state.enquiries.filter(enquiry => enquiry._id === action.payload._id);
        }).addCase(getEnquiry.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // delete Enquiries
        .addCase(deleteEnquiries.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteEnquiries.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.enquiries = state.enquiries.filter(enquiry => enquiry._id !== action.payload._id);
            if (state.isSuccess) {
                toast.success("نظر مشتری با موفقیت حذف شد")
            }
        }).addCase(deleteEnquiries.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // update Enquiries
        .addCase(updateEnquiries.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateEnquiries.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.enquiries = state.enquiries.map(enquiry =>enquiry._id === action.payload._id ? action.payload : enquiry ) ;
            if (state.isSuccess) {
                toast.success("فرم شما با موفقیت آپدیت شد")
            }
        }).addCase(updateEnquiries.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    }   
})


export default enquirySlice.reducer