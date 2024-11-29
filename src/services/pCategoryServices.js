import http from "./httpServices";

const getProductCategoreis = async()=>{
    const response = await http.get('category/');
    if (response.data) {
        return response.data
    }  
}

const getProCategorey = async(id)=>{
    const response = await http.get(`category/${id}`);
    if (response.data) {
        return response.data
    }  
}

const deleteProCategorey = async(id)=>{
    const response = await http.delete(`category/${id}`);
    // console.log(response.data)
    if (response.data) {
        return response.data
    }  
}

const updateProCategorey = async(id,data)=>{
    const response = await http.put(`category/${id}`,data);
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

export const pCategoryServices={getProductCategoreis,createProductCategoreis,updateProCategorey,deleteProCategorey,getProCategorey}