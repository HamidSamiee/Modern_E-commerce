
import http from "./httpServices";


const getProducts = async()=>{
    
    const response = await http.get("product");
    if (response.data) {
        return response.data
    }  
}

const getProductById = async(id)=>{
    
    const response = await http.get(`product/${id}`);
    if (response.data) {
        return response.data
    }  
}

const updateProduct = async(id,userData)=>{
    
    const response = await http.put(`product/${id}`,userData);
    if (response.data) {
        return response.data
    }  
}

const deleteProduct = async(id)=>{
    
    const response = await http.delete(`product/${id}`);
    if (response.data) {
        return response.data
    }  
}

const addToWashlist = async(washlistData)=>{
    
    const response = await http.put('washlist',washlistData);
    if (response.data) {
        return response.data
    }  
}

const ratingProduct = async(ratingData)=>{
    
    const response = await http.put('rating',ratingData);
    if (response.data) {
        return response.data
    }  
}

export const productServices={getProducts,getProductById,updateProduct,deleteProduct,addToWashlist,ratingProduct}