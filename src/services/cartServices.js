import axios from "axios";
import http from "./httpServices";

const addToCart = async (cartData) => {
    const response = await http.post("user/cart", cartData);
    if (response.data) {
        return response.data;
    }
    throw new Error("خطا در افزودن به سبد خرید");
};

const getFromCart = async () => {
    const userStr = localStorage.getItem("user");
    const response = await axios.get("http://localhost:5000/api/user/cart",{
        headers: {
            Authorization:`Bearer ${JSON.parse(userStr)?.token || JSON.parse(userStr)?.refreshToken}`,
    }
     })
    if (response.data) {
        return response.data;
    }
    throw new Error("خطا در دریافت سبد خرید");
};

const createOrder = async (orderData) => {  
    try {  
        const response = await http.post("user/cart/cash-order", orderData);  
        return response.data;  
    } catch (error) {  
        throw new Error("خطا در ثبت سفارش: " + error.message);  
    }  
};  

const updatedCart = async (data) => {
    console.log(data)
    const userStr = localStorage.getItem("user");
    const response = await axios.put("http://localhost:5000/api/user/update-cart",data,{
        headers: {
            Authorization:`Bearer ${JSON.parse(userStr)?.token || JSON.parse(userStr)?.refreshToken}`,
    }
     })
    if (response.data) {
        return response.data;
    }
    throw new Error("خطا در دریافت سبد خرید");
};

const applyCoupon = async (couponName) => {
    const response = await http.post("user/cart/applycoupon", { couponName });
    if (response.data) {
        return response.data;
    }
    throw new Error("خطا در اعمال کد تخفیف");
};

export const cartServices = { applyCoupon, updatedCart , addToCart, getFromCart ,createOrder};
