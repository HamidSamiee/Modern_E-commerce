import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enquiryServices } from "@/services/enquiryServices";

export const getEnquiries = createAsyncThunk(
    "enquiry/get-enquiries",
    async(thunkAPI)=>{
    try {
        return await enquiryServices.getEnquiries()
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
        
    }   
})


export default enquirySlice.reducer