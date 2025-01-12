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

export const updateProfile = createAsyncThunk(
    "auth/profile/update",
    async(userData,thunkAPI)=>{
    try {
        return await authRegister.updateUser(userData)
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message; 
        return thunkAPI.rejectWithValue({ error: errorMessage });
    }
})

export const logoutUser = createAsyncThunk(
    "auth/logout",
    async(thunkAPI)=>{
    try {
        return await authRegister.logout()
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

export const getOrderByUser = createAsyncThunk(
    "order/getorder",
    async(thunkAPI)=>{
    try {
        return await authRegister.getUserOrder()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const forgetPassword = createAsyncThunk(
    "user/forgotPassword/token",
    async(data,thunkAPI)=>{
    try {
        return await authRegister.forgetPasswordToken(data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})
export const resetPassword = createAsyncThunk(
    "user/password/reset",
    async(data,thunkAPI)=>{
    try {
        return await authRegister.resetPassword(data)
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
        wishList:[],
        getOrderedProduct:{},
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
        // updated user
        .addCase(updateProfile.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateProfile.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.user=action.payload;
            if (state.isSuccess === true) {
                toast.success(" پروفایل شما با موفقیت بروز شد")
            }
        }).addCase(updateProfile.rejected,(state,action)=>{
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
            // console.log(action)
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
        // logout user
        .addCase(logoutUser.pending,(state)=>{
            state.isLoading=true;
        }).addCase(logoutUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.user=null;
            if (state.isSuccess === true) {
                localStorage.clear()
                toast.success('شما از حساب کاربری خود خارج شدید')
            }
        }).addCase(logoutUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            if (state.isError) {
                toast.error("اشکال در خروج از حساب کاربری")
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
         // get order by id
         .addCase(getOrderByUser.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getOrderByUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            // console.log(action.payload)
            state.getOrderedProduct=action.payload;
        }).addCase(getOrderByUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.error;
        })
        // forget password token
        .addCase(forgetPassword.pending,(state)=>{
            state.isLoading=true;
        }).addCase(forgetPassword.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.token = action.payload;
            if (state.isSuccess === true) {
                toast.success('ایمیل به آدرس  پست الکترونیکی شما ارسال شد')
            }
        }).addCase(forgetPassword.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.error;
        })
        // reset password 
        .addCase(resetPassword.pending,(state)=>{
            state.isLoading=true;
        }).addCase(resetPassword.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.pass = action.payload;
            if (state.isSuccess === true) {
                toast.success(' پسورد با موفقیت بروز شد')
            }
        }).addCase(resetPassword.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload.response.data.message;
            if (state.isError === true) {
                toast.error(state.message)
            }
        })
    }   
})

export default authSlice.reducer