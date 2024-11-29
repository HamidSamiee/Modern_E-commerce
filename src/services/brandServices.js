import http from "./httpServices";

const getBrands = async()=>{
    
    const response = await http.get('brand/'); 
    if (response.data) {
        return response.data
    }  
}

const getBrand = async(id)=>{
    
    const response = await http.get(`brand/${id}`); 
    if (response.data) {
        return response.data
    }  
}

const deleteBrand = async(id)=>{
    
    const response = await http.delete(`brand/${id}`); 
    if (response.data) {
        return response.data
    }  
}

const createBrand = async(brand)=>{
    
    const response = await http.post('brand/',brand);
    if (response.data) {
        return response.data
    }  
}

const updateBrand = async(id,data)=>{
    
    const response = await http.put(`brand/${id}`,data); 
    if (response.data) {
        return response.data
    }  
}

export const brandServices={getBrands,createBrand,getBrand,updateBrand,deleteBrand}