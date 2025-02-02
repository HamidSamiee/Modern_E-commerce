
import axios from "axios";
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



// const getUserWishlist = async()=>{
    
//     const response = await http.get('user/wishlist');
//     if (response.data) {
//         return response.data
//     }  
// }

const getUserWishlist = async () => {
    
    const userStr = localStorage.getItem("user");
    const response = await axios.get("http://localhost:5000/api/user/wishlist",{
        headers: {
            Authorization:`Bearer ${JSON.parse(userStr)?.token || JSON.parse(userStr)?.refreshToken}`,
    }
     })
    if (response.data) {
        return response.data;
    }
    throw new Error("خطا در گرفتن لیست علاقه مندی ها");
};

// admin services

const getUsers = async()=>{
    const response = await http.get('user/all-users');
    if (response.data) {
        return response.data
    }  
}

const getaUser = async(id)=>{
    const userStr = localStorage.getItem("user");
    const response = await axios.get(`http://localhost:5000/api/user/${id}`,{
        headers: {
            Authorization:`Bearer ${JSON.parse(userStr)?.token || JSON.parse(userStr)?.refreshToken}`,
    }
     })
    if (response.data) {
        return response.data
    }  
}

const getOrders = async()=>{
    
    const response = await http.get('user/getallorders');
    if (response.data) {
        return response.data
    }  
}

const getUserOrder = async()=>{
    
    const response = await http.get('user/get-orders');
    // console.log(response)
    if (response.data) {
        return response.data
    }  
}

const logout = async()=>{
    
    const response = await http.get('user/logout');
    // console.log(response)
    if (response.data) {
        return response.data
    }  
}

const updateUser = async(data)=>{
    const response = await http.put('user/edit-user',data);
    // console.log(response)
    if (response.data) {
        return response.data
    }  
}

const forgetPasswordToken = async(data)=>{
    const response = await http.post('user/forgot-password-token',data);
    // console.log(response)
    if (response.data) {
        return response.data
    }  
}

const payment = async(data)=>{
    const response = await http.post('payment/payment',data);
    // console.log(response)
    if (response.data) {
        return response.data
    }  
}

const resetPassword = async(data)=>{
    // console.log(data)
    const response = await http.put(`user/reset-password/${data?.token}`,{password:data?.password});
    // console.log(response)
    if (response.data) {
        return response.data
    }  
}

const saveAddress = async(data)=>{

    const userStr = localStorage.getItem("user");
    const response = await axios.put("http://localhost:5000/api/user/save-address",data,{
        headers: {
            Authorization:`Bearer ${JSON.parse(userStr)?.token || JSON.parse(userStr)?.refreshToken}`,
    }
     })
    if (response.data) {
        return response.data;
    }
    throw new Error("خطا در ذخیره سازی آدرس");
}

export const authRegister={register,login,getUserWishlist,getaUser,resetPassword,payment,getUsers,forgetPasswordToken,updateUser,getOrders,getUserOrder,logout,saveAddress}