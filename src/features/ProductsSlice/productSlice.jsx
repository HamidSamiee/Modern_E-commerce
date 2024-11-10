import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productServices } from "@/services/productServices";
import { toast } from "react-toastify";

export const getAllProducts = createAsyncThunk(
    "product/getAll",
    async(thunkAPI)=>{
    try {
        return await productServices.getProducts()
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const createProducts = createAsyncThunk(
    "product/create-product",
    async(product,thunkAPI)=>{
    try {
        return await productServices.createProduct(product)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addToWishList = createAsyncThunk(
    "product/wishlist",
    async(prodId,thunkAPI)=>{
    try {
        return await productServices.addToWishlist(prodId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})



export const productSlice=createSlice({
    name:'product',
    initialState:{
        products:[],
        isError:false,
        isSuccess:false,
        isLoading:false,
        message:"",
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        // get All products
        .addCase(getAllProducts.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getAllProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.products=action.payload;
        }).addCase(getAllProducts.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // create products
        .addCase(createProducts.pending,(state)=>{
            state.isLoading=true;
        }).addCase(createProducts.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.products=action.payload;
            if (state.isSuccess === true) {
                toast.info("محصول با موفقیت اضافه شد")
            }
        }).addCase(createProducts.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // add to Wishlist
        .addCase(addToWishList.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addToWishList.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.addToWishList=action.payload;
            state.message="محصول به لیست علاقه مندی ها اضافه شد";
        }).addCase(addToWishList.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
    }   
})


export default productSlice.reducer