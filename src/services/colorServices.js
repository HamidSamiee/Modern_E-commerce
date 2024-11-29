import http from "./httpServices";

const getColors = async()=>{
    
    const response = await http.get('color/');
    if (response.data) {
        return response.data
    }  
}

const getColor = async(id)=>{
    
    const response = await http.get(`color/${id}`);
    if (response.data) {
        return response.data
    }  
}

const deleteColor = async(id)=>{
    
    const response = await http.delete(`color/${id}`);
    if (response.data) {
        return response.data
    }  
}

const updateColor = async(id,data)=>{
    
    const response = await http.put(`color/${id}`,data);
    if (response.data) {
        return response.data
    }  
}

const createColors = async(color)=>{
    
    const response = await http.post('color/',color);
    if (response.data) {
        return response.data
    }  
}

export const colorServices={getColors,createColors,getColor,deleteColor,updateColor}