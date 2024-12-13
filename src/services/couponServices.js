import http from "./httpServices";

const getCoupons = async()=>{
    
    const response = await http.get('coupon/'); 
    if (response.data) {
        return response.data
    }  
}

const getCoupon = async(id)=>{
    
    const response = await http.get(`coupon/${id}`); 
    if (response.data) {
        return response.data
    }  
}

const deleteCoupon = async(id)=>{
    
    const response = await http.delete(`coupon/${id}`); 
    if (response.data) {
        return response.data
    }  
}

const createCoupon = async(brand)=>{
    
    const response = await http.post('coupon/',brand);
    if (response.data) {
        return response.data
    }  
}

const updateCoupon = async(id,data)=>{
    
    const response = await http.put(`coupon/${id}`,data); 
    if (response.data) {
        return response.data
    }  
}

export const couponServices={getCoupons,createCoupon,getCoupon,updateCoupon,deleteCoupon}