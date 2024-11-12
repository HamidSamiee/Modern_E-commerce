
import http from "./httpServices";


const uploadImage = async(image)=>{
    
    const response = await http.post("upload",image);
    console.log(response)
    if (response.data) {
        return response.data
    }  
}

const deleteImage = async(id)=>{
    
    const response = await http.delete(`/delete-img/${id}`);
    if (response.data) {
        return response.data
    }  
}

export const uploadServices={uploadImage,deleteImage}