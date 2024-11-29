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

export const getColor = createAsyncThunk(
    "color/get-color",
    async(id,thunkAPI)=>{
    try {
        return await colorServices.getColor(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteColor = createAsyncThunk(
    "color/delete-color",
    async(id,thunkAPI)=>{
    try {
        return await colorServices.deleteColor(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateColor = createAsyncThunk(
    "color/update-color",
    async({id,data},thunkAPI)=>{
    try {
        return await colorServices.updateColor(id,data)
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
        // get color  by id
        .addCase(getColor.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getColor.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.color=state.colors.filter(c=>c._id === action.payload._id);
        }).addCase(getColor.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // delete color
        .addCase(deleteColor.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteColor.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.colors = state.colors.filter(color=>
                color._id !== action.payload._id 
            );
            if (state.isSuccess) {
                toast.error("رنگ با موفقیت حذف شد")
            }
        }).addCase(deleteColor.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // update color
        .addCase(updateColor.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateColor.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            // console.log(action.payload)
            state.colors = state.colors.map(color=>
                color._id === action.payload._id ? action.payload : color
            );
            if (state.isSuccess) {
                toast.info("رنگ با موفقیت آپدیت شد")
            }
        }).addCase(updateColor.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    }   
})


export default colorSlice.reducer