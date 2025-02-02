import { cartServices } from "@/services/cartServices";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const applyCoupon = createAsyncThunk(
    "cart/apply-coupon",
    async (couponName, thunkAPI) => {
      try {
        return await cartServices.applyCoupon(couponName);
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  export const addProductToCart = createAsyncThunk(
    "cart/add-cart",
    async (cartData, thunkAPI) => {
      try {
        const response = await cartServices.addToCart(cartData);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || { message: "خطا در افزودن سبد خرید" });
      }
    }
  );

  export const createOrder = createAsyncThunk(
    "cart/create-order",
    async (orderData ,thunkAPI) => {
      try {
        const response = await cartServices.createOrder(orderData);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || { message: "خطا در ثبت سفارش " });
      }
    }
  );

  export const updatedCart = createAsyncThunk(
    "cart/updated-cart",
    async (cartData, thunkAPI) => {
      try {
        const response = await cartServices.updatedCart(cartData);
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || { message: "خطا در افزودن سبد خرید" });
      }
    }
  );

  export const getProductFromCart = createAsyncThunk(
    "cart/getCart",
    async (_,{getState,rejectWithValue}) => {
      const state = getState(); // دسترسی به وضعیت کل
      const products = state.product.products;
      
      try {
        const response = await cartServices.getFromCart();
        // console.log(response)
        return {response,products};
      } catch (error) {
        return rejectWithValue(error.response?.data || { message: "خطا در دریافت سبد خرید" });
      }
    }
  );
  
  function calculateCartTotal(cart) {  
    if (!Array.isArray(cart)) {  
      console.error("Expected cart to be an array, but got:", cart);  
      return 0; // یا مقدار پیش‌فرض دیگر  
    }  
    return cart.reduce((total, product) => total + (product.totalPrice || (product.price * product.quantity)), 0);  
  } 

export const CartSlice=createSlice({
    name:'cart',
    initialState:{
        cart:JSON.parse(localStorage.getItem('cart'))?.cart || [],
        cartTotal:JSON.parse(localStorage.getItem('cart'))?.cartTotal || 0,
        totalAfterDiscount:JSON.parse(localStorage.getItem('cart'))?.totalAfterDiscount ||0,
        cartId:JSON.parse(localStorage.getItem('cart'))?.cartId || 0 ,
        order:[],
        isError:false,
        isSuccess:false,
        isLoading:false,
        message:"",
    },
    // اکشن های مربوطه برای سمت فرانت
    reducers:{
      addToCart:(state, action) => {
        const product = action.payload;
        try {
            const exist = state.cart.find(p => p.id === product.id && p.color === product.color);
            if (exist) {
                exist.quantity++;
                exist.totalPrice = exist.quantity * exist.price;
            } else {
                state.cart.push({
                    ...product,
                });
            }
        } catch (error) {
            console.error(error);
        }
        state.cartTotal = calculateCartTotal(state.cart);
        toast.success("محصول با موفقیت به سبد خرید اضافه شد");
        localStorage.setItem('cart', JSON.stringify({ cart: state.cart, cartTotal: state.cartTotal , totalAfterDiscount: state.totalAfterDiscount, cartId: state.cartId }));
      },
      removeFromCart:(state, action) => {
        const product = action.payload;
        try {
            state.cart = state.cart.filter(p => !(p.id === product.id && p.color === product.color));
        } catch (error) {
            console.error(error);
        }
        state.cartTotal = calculateCartTotal(state.cart);
        toast.info("محصول با موفقیت از سبد خرید حذف شد")
        localStorage.setItem('cart', JSON.stringify({ cart: state.cart, cartTotal: state.cartTotal , totalAfterDiscount: state.totalAfterDiscount, cartId: state.cartId }));
      },
      increaseQuantity: (state, action) => {
          const product = state.cart.find(p => p.id === action.payload.id && p.color === action.payload.color);
          if (product) {
              product.quantity += 1;
              product.totalPrice = product.quantity * product.price; 
          }
          state.cartTotal = calculateCartTotal(state.cart);
          localStorage.setItem('cart', JSON.stringify({ cart: state.cart, cartTotal: state.cartTotal , totalAfterDiscount: state.totalAfterDiscount, cartId: state.cartId }));
      },
      decreaseQuantity:(state, action) => {
        const product = state.cart.find(p => p.id === action.payload.id && p.color === action.payload.color);
        if (product) {
            if (product.quantity > 1) {
                product.quantity--;
                product.totalPrice = product.quantity * product.price;
            } else {
                state.cart = state.cart.filter(p => !(p.id === action.payload.id && p.color === action.payload.color));
            }
        }
        state.cartTotal = calculateCartTotal(state.cart);
        localStorage.setItem('cart', JSON.stringify({ cart: state.cart, cartTotal: state.cartTotal , totalAfterDiscount: state.totalAfterDiscount, cartId: state.cartId }));
      },
      updateQuantity: (state, action) => {
        const { id, color, quantity } = action.payload;
        const product = state.cart.find(p => p.id === id && p.color === color);
        if (product) {
            product.quantity = quantity;
            product.totalPrice = product.quantity * product.price;
            state.cartTotal = calculateCartTotal(state.cart);
        }
        localStorage.setItem('cart', JSON.stringify({ cart: state.cart, cartTotal: state.cartTotal , totalAfterDiscount: state.totalAfterDiscount, cartId: state.cartId }));
      },
    },
    //  اکشن های مربوطه برای سمت بک اند
    extraReducers:(builder)=>{
        builder
        // apply coupun
        .addCase(applyCoupon.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(applyCoupon.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.totalAfterDiscount = action.payload;
            localStorage.setItem('cart', JSON.stringify({ cart: state.cart, cartTotal: state.cartTotal ,totalAfterDiscount: state.totalAfterDiscount , cartId: state.cartId }));
            toast.success("کد تخفیف اضافه شد.");
          })
          .addCase(applyCoupon.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload.message;
            toast.error(action.payload.message);
          })
          // add to cart database
          .addCase(addProductToCart.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(addProductToCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cart = action.payload?.productsCart;
            console.log(action.payload)
            state.cartTotal = calculateCartTotal(action.payload?.productsCart)
            if (state.isSuccess) {
              localStorage.setItem('cart', JSON.stringify({ cart: state.cart, cartTotal: state.cartTotal ,totalAfterDiscount : state.totalAfterDiscount , cartId: state.cartId }));
              toast.success("محصول با موفقیت به سبد خرید اضافه شد")
            }
          })
          .addCase(addProductToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload.message || "خطا در افزودن به سبد خرید.";
            // toast.error(state.message);
          })
          // updatedCart
          .addCase(updatedCart.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(updatedCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updateCart = action.payload;
            console.log(state.cart,"updateCart😁😁😁",action.payload)
            if (state.isSuccess) {
              // toast.success("سبد خرید با موفقیت به بروز شد")
            }
          })
          .addCase(updatedCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload.message || "خطا در افزودن به سبد خرید.";
            // toast.error(state.message);
          })
          // create Order
          .addCase(createOrder.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(createOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.message = action.payload?.message;
            state.order = action.payload?.order;
            console.log(action.payload)
            if (state.isSuccess) {
              toast.success( state.message )
            }
          })
          .addCase(createOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload.message || "خطا در ثبت سفارش.";
            // toast.error(state.message);
          })
          // get from cart database
          .addCase(getProductFromCart.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getProductFromCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;

            console.log(action.payload.response)
            console.log(action.payload.products)

            const { response , products} = action.payload; // دسترسی به productsCart از پاسخ API  
            const {productsCart, totalAfterDiscount,_id} = response;
            // console.log(totalAfterDiscount)
            // بررسی اینکه آیا productsCart آرایه است  
            if (!Array.isArray(productsCart)) {  
              console.error("Expected productsCart to be an array, but got:", productsCart);  
              return; // یا مدیریت دیگری برای این خطا  
            }  
          
            const cartFromDB = productsCart.map(item => { 
              console.log(item) 
              const product = products.find(proItem => proItem._id === item.productId);  
              return {  
                id: item.productId,  
                color: item.color,  
                quantity: item.quantity,  
                price: product ? product.price : 0,  
                totalPrice: product && product.price * item.quantity, // استفاده از totalPrice موجود  
                name: product ? product.title : '',  
                img: product && product.images.length > 0 ? product.images[0].url : '',  
                desc: product ? product.description : '',  
              };  
            }).filter(Boolean);    

          state.cart = cartFromDB;
          state.cartId = _id;
          console.log(_id)
          state.cartTotal = calculateCartTotal(cartFromDB);
          state.totalAfterDiscount = totalAfterDiscount;
          console.log(state.cart,state.cartTotal )
          localStorage.setItem('cart', JSON.stringify({ cart : state.cart , cartTotal : state.cartTotal , totalAfterDiscount : state.totalAfterDiscount , cartId:state.cartId }));
          })
          .addCase(getProductFromCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.payload?.message || "خطا در گرفتن سبد خرید.";
            // toast.error(state.message);
          });
      },
});
      



// eslint-disable-next-line react-refresh/only-export-components
export const {addToCart,removeFromCart,increaseQuantity,decreaseQuantity,updateQuantity}=CartSlice.actions;

export default CartSlice.reducer