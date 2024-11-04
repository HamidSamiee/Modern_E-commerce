import http from "./httpServices";

const getBrands = async()=>{
    
    const response = await http.get('brand/'); 
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

export const brandServices={getBrands,createBrand}