import http from "./httpServices";

const getBlogCategories = async()=>{
    
    const response = await http.get('blogcategory/');
    if (response.data) {
        return response.data
    }  
}

export const bCategoryServices={getBlogCategories}