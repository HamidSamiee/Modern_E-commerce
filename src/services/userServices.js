
import http from "./httpServices";

// -----------------------------------------------------------------------------------------

const register = async(userData)=>{
    
    const response = await http.post("user/register",userData);
    if (response.data) {
        return response.data
    }  
}

const login = async(userData)=>{
    
    const response = await http.post("user/login",userData);
    if (response.data) {
        localStorage.setItem("user",JSON.stringify(response.data))
        return response.data
    }  
}

const getUserWishlist = async()=>{
    
    const response = await http.get('user/wishlist');
    if (response.data) {
        return response.data
    }  
}

// admin services

const getUsers = async()=>{
    const response = await http.get('user/all-users');
    if (response.data) {
        return response.data
    }  
}

const getOrders = async()=>{
    
    const response = await http.get('user/get-orders');
    if (response.data) {
        return response.data
    }  
}

export const authRegister={register,login,getUserWishlist,getUsers,getOrders}