import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productServices } from "@/services/productServices";
import { toast } from "react-toastify";

export const getAllProducts = createAsyncThunk(
    "product/getAll",
    async(data,thunkAPI)=>{
    try {
        return await productServices.getProducts(data)
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

export const deleteProduct = createAsyncThunk(
    "product/delete-product",
    async(productId,thunkAPI)=>{
    try {
        return await productServices.deleteProduct(productId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const getProductById = createAsyncThunk(
    "product/get-product",
    async(productId,thunkAPI)=>{
    try {
        return await productServices.getProductById(productId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const updateProduct = createAsyncThunk(
    "product/update-product",
    async({id, data},thunkAPI)=>{
    try {
        return await productServices.updateProduct(id, data)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addToWishList = createAsyncThunk(
    "product/add/wishlist",
    async(prodId,thunkAPI)=>{
    try {
        return await productServices.addToWishlist(prodId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const removeFromWishList = createAsyncThunk(
    "product/remove/wishlist",
    async(prodId,thunkAPI)=>{
    try {
        return await productServices.removeFromWishlist(prodId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const addRating = createAsyncThunk(
    "product/rating",
    async ({ data, navigate }, thunkAPI) => {
        try {
            return await productServices.ratingProduct(data);
        } catch (error) {
            if (error.response?.status === 401) {
                // toast.error(error.response?.data?.message || "خطای ناشناخته"); // نمایش پیام خطا
                sessionStorage.setItem('redirectPath',  `${window.location.pathname}#comments`);
                navigate('/login'); // اینجا از navigate استفاده کنید
            }
            return thunkAPI.rejectWithValue(error.response?.data || { message: "خطای ناشناخته" });
        }
    }
);


export const productSlice=createSlice({
    name:'product',
    initialState:{
        products:[],
        compareProducts:[],
        isError:false,
        isSuccess:false,
        isLoading:false,
        message:"",
    },
    reducers: {  
        addCompareProduct(state, action) {  
          const productExists = state.compareProducts.find(product => product._id == action.payload._id);  
          // جلوگیری از اضافه کردن محصول تکراری  
          if (!productExists) { 
            state.compareProducts.push(action.payload);  
          }  
        },  
        removeCompareProduct(state, action) {  
          const compareProducts = state.compareProducts.filter(product => product._id !== action.payload._id);
            state.compareProducts = compareProducts;
        },  
        clearCompareProducts(state) {  
          state.compareProducts = [];  
        },   
    },  
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
                toast.success("محصول با موفقیت اضافه شد")
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
            state.wishList=action.payload?.wishlist;
            state.message="محصول به لیست علاقه مندی ها اضافه شد";
            if (state.isSuccess) {
                toast.success(state.message)
            }
        }).addCase(addToWishList.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload?.response?.data?.message;
            if (state.isError === true) {
                toast.error(state.message)
            }
        })
        // remove from Wishlist
        .addCase(removeFromWishList.pending,(state)=>{
            state.isLoading=true;
        }).addCase(removeFromWishList.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            if(state.wishList){
                state.wishList = state.wishList.filter(item => item._id !== action.payload._id); // حذف از لیست    
            }
            state.message="محصول از لیست علاقه مندی ها حذف شد";
            if (state.isSuccess === true) {
                toast.info(state.message)
            }
        }).addCase(removeFromWishList.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.payload?.response?.data?.message;
            if (state.isError === true) {
                toast.error(state.message)
            }
        })
         // delete product
         .addCase(deleteProduct.pending,(state)=>{
            state.isLoading=true;
        }).addCase(deleteProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            // console.log(action.payload)
            state.products = state.products.filter(product => product._id !== action.payload._id);
            if (state.isSuccess === true) {
                toast.success("محصول با موفقیت حذف شد")
            }
            state.message="محصول با موفقیت حذف شد";
        }).addCase(deleteProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // get product by id
        .addCase(getProductById.pending,(state)=>{
            state.isLoading=true;
        }).addCase(getProductById.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            // console.log(action.payload)
            state.product= state.products.filter(product => product._id === action.payload._id);
            // console.log(state.product) 
            state.message=`محصول با آیدی ${action.payload._id} با موفقیت دریافت شد`;
        }).addCase(getProductById.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // update product
        .addCase(updateProduct.pending,(state)=>{
            state.isLoading=true;
        }).addCase(updateProduct.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.products = state.products.map((product) =>
                 product._id === action.payload._id ? action.payload : product 
            );
            if (state.isSuccess === true) {
                toast.success("محصول با موفقیت آپدیت شد")
            }
        }).addCase(updateProduct.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message=action.error;
        })
        // add rating product
        .addCase(addRating.pending,(state)=>{
            state.isLoading=true;
        }).addCase(addRating.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.rating =action.payload; 
            if (state.isSuccess === true) {
                toast.success("کامنت شما با موفقیت ثبت شد")
            }
        }).addCase(addRating.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.isSuccess=false;
            state.message = action.payload?.message;
            if (state.isError === true) {
                toast.error(state.message);
            }
        })
    }   
})

export const { addCompareProduct, removeCompareProduct, clearCompareProducts } = productSlice.actions;  
export default productSlice.reducer