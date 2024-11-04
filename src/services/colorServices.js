import http from "./httpServices";

const getColors = async()=>{
    
    const response = await http.get('color/');
    if (response.data) {
        return response.data
    }  
}

export const colorServices={getColors}