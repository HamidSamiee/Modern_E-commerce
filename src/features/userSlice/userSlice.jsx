import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authRegister } from "@/services/userServices";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
    "auth/register",
    async(userData,thunkAPI)=>{
    try {
        return await authRegister.register(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const loginUser = createAsyncThunk(
    "auth/login",
    async(userData,thunkAPI)=>{
    try {
        return await authRegister.login(userData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})


export const authSlice=createSlice({
    name:'auth',
    initialState:{
        user:"",
        isError:false,
        isSuccess:false,
        isLoading:false,
        message:"",
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.isLoading=true;
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createdUser=action.payload;
            if (state.isSuccess === true) {
                toast.info("ثبت نام شما با موفقیت انجام شد")
            }
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if (state.isError === true ) {
                toast.error(action.error)
            }
        })
        .addCase(loginUser.pending,(state)=>{
            state.isLoading=true;
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.user=action.payload;
            if (state.isSuccess === true) {
                localStorage.setItem("token",action.payload.token)
                toast.success(`${state.user.firstname } ${state.user.lastname} عزیز خوش آمدید`)
            }
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
            if (state.isError === true ) {
                toast.error(action.error)
            }
        })
    }   
})


export default authSlice.reducer