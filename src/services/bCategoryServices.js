import http from "./httpServices";

const getBlogCategories = async()=>{
    
    const response = await http.get('blogcategory/');
    if (response.data) {
        return response.data
    }  
}

const getBlogCategory = async(id)=>{
    
    const response = await http.get(`blogcategory/${id}`);
    if (response.data) {
        return response.data
    }  
}

const deleteBlogCategory = async(id)=>{
    
    const response = await http.delete(`blogcategory/${id}`);
    if (response.data) {
        return response.data
    }  
}

const updateBlogCategory = async(id,data)=>{
    
    const response = await http.put(`blogcategory/${id}`,data);
    if (response.data) {
        return response.data
    }  
}

const addBlogCategories = async(data)=>{
    
    const response = await http.post('blogcategory/',data);
    // console.log(response.data)
    if (response.data) {
        return response.data
    }  
}

export const bCategoryServices={getBlogCategories,addBlogCategories,getBlogCategory,deleteBlogCategory,updateBlogCategory}