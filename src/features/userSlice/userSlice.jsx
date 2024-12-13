import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authRegister } from "@/services/userServices";
import { toast } from "react-toastify";

const userInfo=JSON.parse(localStorage.getItem("user"));
const getUserFromLocalStorage = localStorage.getItem("user") ?
 userInfo : null ;

export const registerUser = createAsyncThunk(
    "auth/register",
    async(userData,thunkAPI)=>{
    try {
        return await authRegister.register(userData)
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        toast.error(errorMessage);
        return thunkAPI.rejectWithValue({ error: errorMessage });
        
    }
})

export const loginUser = createAsyncThunk(
    "auth/login",
    async(userData,thunkAPI)=>{
    try {
        return await authRegister.login(userData)
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message; 
        return thunkAPI.rejectWithValue({ error: errorMessage });
    }
})

export const getUserProductWishlist = createAsyncThunk(
    "user/wishlist",
    async(thunkAPI)=>{
    try {
        return await authRegister.getUserWishlist()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getAllUsers = createAsyncThunk(
    "user/all-users",
    async(thunkAPI)=>{
    try {
        return await authRegister.getUsers()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getOrders = createAsyncThunk(
    "order/all-orders",
    async(thunkAPI)=>{
    try {
        return await authRegister.getOrders()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const authSlice=createSlice({
    name:'auth',
    initialState:{
        user:getUserFromLocalStorage || '',
        customers:[],
        orders:[],
        isError:false,
        isSuccess:false,
        isLoading:false,
        message:"",
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        // register user
        .addCase(registerUser.pending,(state)=>{
            state.isLoading=true;
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.createdUser=action.payload;
            if (state.isSuccess === true) {
                toast.success("ثبت نام شما با موفقیت انجام شد")
            }
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message = action.payload.error;
            if (state.isError) {
                toast.error(action.payload.error)
            }
        })
        // login user
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
            state.message=action.payload.error;
            if (state.isError) {
                toast.error(action.payload.error)
            }
        })
        // get user wishlist
        .addCase(getUserProductWishlist.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getUserProductWishlist.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.wishList=action.payload;
        }).addCase(getUserProductWishlist.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.error;
        })
        // get all users
        .addCase(getAllUsers.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAllUsers.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.customers=action.payload;
        }).addCase(getAllUsers.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.error;
        })
        // get orders
        .addCase(getOrders.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getOrders.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.orders=action.payload;
        }).addCase(getOrders.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.error;
        })
    }   
})


export default authSlice.reducer