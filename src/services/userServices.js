
import http from "./httpServices";


const register = async(userData)=>{
    
    const response = await http.post("user/register",userData);
    if (response.data) {
        return response.data
    }  
}

const login = async(userData)=>{
    
    const response = await http.post("user/login",userData);
    if (response.data) {
        return response.data
    }  
}



export const authRegister={register,login}