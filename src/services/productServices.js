
import http from "./httpServices";


const getProducts = async()=>{
    
    const response = await http.get("product");
    if (response.data) {
        return response.data
    }  
}

const createProduct = async(product)=>{
    
    const response = await http.post(`product`, product);
    console.log(response.data)
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
    console.log(response)
    if (response.data) {
        return response.data
    }  
}

const deleteProduct = async(id)=>{
    console.log(id,'😎')
    const response = await http.delete(`product/${id}`);
    if (response.data) {
        return response.data
    }  
}

const addToWishlist = async(prodId)=>{
    
    const response = await http.put('product/wishlist',{prodId});
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

export const productServices={getProducts,createProduct,getProductById,updateProduct,deleteProduct,addToWishlist,ratingProduct}