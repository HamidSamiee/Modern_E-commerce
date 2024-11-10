
import http from "./httpServices";


const uploadImage = async(image)=>{
    
    const response = await http.post("upload",image);
    console.log(response)
    if (response.data) {
        return response.data
    }  
}

export const uploadServices={uploadImage}