import { createSlice } from "@reduxjs/toolkit";


export const CartSlice=createSlice({
    name:'cart',
    initialState:{
        totalPrice:JSON.parse(localStorage.getItem('cart'))?.totalPrice || 0,
        totalAmount:JSON.parse(localStorage.getItem('cart'))?.totalAmount || 0,
        cart: JSON.parse(localStorage.getItem('cart'))?.cart || [],
    },
    reducers:{
        addToCart(state,action){
            const product=action.payload;
            try {
                const exist = state.cart.find(p=>p.id === product.id && p.size === product.size && p.color === product.color );
                if(exist){
                    exist.quantity++;
                    exist.totalPrice += exist.price;
                    state.totalPrice += exist.price ;
                    state.totalAmount++ ;
                    
                }else{
                    state.cart.push({
                        id: product.id,
                        name: product.name,
                        size: product.size ,
                        img: product.img,
                        text: product.text,
                        color: product.color,
                        price: product.price,
                        quantity: product.quantity,
                        totalPrice: product.totalPrice,
                    })
                    state.totalAmount++;
                    state.totalPrice += product.totalPrice; 
                }
            } catch (error) {
                return error
            }
            localStorage.setItem('cart',JSON.stringify(state))
        },
        removeFromCart(state,action){
            const product=action.payload;
            try {
                const exist = state.cart.find(p=>p.id === product.id && p.size === product.size && p.color === product.color );
                // if( exist.amount > 1){
                //     state.totalPrice -= exist.price ;
                //     state.totalAmount-- ;
                //     exist.quantity--;
                //     exist.totalPrice -= exist.price;
                    
                // }else{
                    state.totalPrice -= exist.totalPrice ;
                    state.totalAmount-- ;
                    state.cart = state.cart.filter(p=>p.id !== product.id);
                                //    }
            } catch (error) {
                return error
            }
            localStorage.setItem('cart',JSON.stringify(state))
        },
        increaseQuantity:(state,action)=>{
            const product=state.cart.find(p=>p.id == action.payload.id);
            if (product) {
                product.quantity +=1 ;
                product.totalPrice = product.quantity * product.price ;
                state.totalPrice += product.price;
            }
            localStorage.setItem('cart',JSON.stringify(state))
        },
        decreaseQuantity:(state,action)=>{
            const product=state.cart.find(p=>p.id == action.payload.id);
            if (product && product.quantity > 1) {
                product.quantity -=1 ;
                product.totalPrice = product.quantity * product.price ;
                state.totalPrice -= product.price;
            }else if (product && product.quantity === 1) {
                product.totalPrice = 0 ;
                state.cart =state.cart.filter(p=>p.id != action.payload.id);
                state.totalPrice -= product.price;
            }
            localStorage.setItem('cart',JSON.stringify(state))
        }
    }    
})


// eslint-disable-next-line react-refresh/only-export-components
export const {addToCart,removeFromCart,increaseQuantity,decreaseQuantity}=CartSlice.actions;

export default CartSlice.reducer