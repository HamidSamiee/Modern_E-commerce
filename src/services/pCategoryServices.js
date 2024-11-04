import http from "./httpServices";

const getProductCategoreis = async()=>{
    
    const response = await http.get('category/');
    if (response.data) {
        return response.data
    }  
}

export const pCategoryServices={getProductCategoreis}