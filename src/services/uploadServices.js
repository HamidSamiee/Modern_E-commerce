
import http from "./httpServices";


const uploadImage = async(image)=>{
    
    const response = await http.post("upload",image);
    console.log(response)
    if (response.data) {
        return response.data
    }  
}

const deleteImage = async(productId,id)=>{
    
    const response = await http.delete(`upload/delete-img/${productId}/${id}`);
    console.log(response.data)
    if (response.data) {
        return response.data
    }  
}

const cloudinaryDeleteImage = async(id)=>{
    
    const response = await http.delete(`upload/delete-img/${id}`);
    console.log(response.data)
    if (response.data) {
        return response.data
    }  
}
export const uploadServices={uploadImage,deleteImage,cloudinaryDeleteImage}