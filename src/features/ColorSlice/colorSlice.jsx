import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { colorServices } from "@/services/colorServices";
import { toast } from "react-toastify";

export const getColors = createAsyncThunk(
    "color/get-colors",
    async(thunkAPI)=>{
    try {
        return await colorServices.getColors()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createColor = createAsyncThunk(
    "color/add-colors",
    async(color,thunkAPI)=>{
    try {
        return await colorServices.createColors(color)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})



export const colorSlice=createSlice({
    name:'color',
    initialState:{
        colors:[],
        isError:false,
        isSuccess:false,
        isLoading:false,
        message:"",
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        // get All colors
        .addCase(getColors.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getColors.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.colors=action.payload;
        }).addCase(getColors.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // create color
        .addCase(createColor.pending,(state)=>{
            state.isLoading=true;
        }).addCase(createColor.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createdColor=action.payload;
            if (state.isSuccess === true) {
                toast.info("  رنگ محصول با موفقیت اضافه شد")
            }
        }).addCase(createColor.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    }   
})


export default colorSlice.reducer