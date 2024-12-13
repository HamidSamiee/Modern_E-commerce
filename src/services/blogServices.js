import http from "./httpServices";

const getBlogs = async()=>{
    
    const response = await http.get('blog/');
    if (response.data) {
        return response.data
    }  
}

const createBlog = async(data)=>{
    
    const response = await http.post('blog/',data);
    if (response.data) {
        return response.data
    }  
}

const getBlog = async(id)=>{
    
    const response = await http.get(`blog/${id}`);
    if (response.data) {
        return response.data
    }  
}

const updateBlog = async(id,data)=>{
    
    const response = await http.put(`blog/${id}`,data);
    if (response.data) {
        return response.data
    }  
}

const deleteBlog = async(id)=>{
    
    const response = await http.delete(`blog/${id}`);
    if (response.data) {
        return response.data
    }  
}

const uploadImageBlog = async(id,image)=>{
    
    const response = await http.put(`blog/upload/${id}`,image);
    if (response.data) {
        return response.data
    }  
}

export const blogServices={getBlogs,getBlog,deleteBlog,updateBlog,uploadImageBlog,createBlog}