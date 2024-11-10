import http from "./httpServices";

const getProductCategoreis = async()=>{
    const response = await http.get('category/');
    if (response.data) {
        return response.data
    }  
}

const createProductCategoreis = async(pCategory)=>{
    const response = await http.post('category/',pCategory);
    if (response.data) {
        return response.data
    }  
}

export const pCategoryServices={getProductCategoreis,createProductCategoreis}