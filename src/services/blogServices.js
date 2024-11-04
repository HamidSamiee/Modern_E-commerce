import http from "./httpServices";

const getBlogs = async()=>{
    
    const response = await http.get('blog/');
    if (response.data) {
        return response.data
    }  
}

export const blogServices={getBlogs}