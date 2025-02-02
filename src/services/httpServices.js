import { isTokenExpired } from "@/utils/isTokenExpired";  
import axios from "axios";  

const baseURL = 'http://localhost:5000/api';  

// Function to get the user from localStorage  
const getUserFromLocalStorage = () => {  
    const userStr = localStorage.getItem("user");  
    return userStr ? JSON.parse(userStr) : null;  
};  

// Create an instance of Axios  
const app = axios.create({  
    baseURL,  
    headers: {  
        accept: "application/json",  
        withCredentials: true,  
    }  
});  

axios.defaults.withCredentials = true;

// Request interceptor to add Authorization header  
app.interceptors.request.use((request) => {  
    const user = getUserFromLocalStorage();  
    if (user && user.token) {  
        request.headers.Authorization = `Bearer ${user.token.replace('"', "")}`;  
    }  
    return request;  
}, (err) => Promise.reject(err));  

// Response interceptor to handle token expiration and refresh  
app.interceptors.response.use(  
    (res) => res,  
    async (err) => {  
        const originalConfig = err.config;  

        // Check for 401 Unauthorized error  
        if (err.response?.status === 401 && !originalConfig._retry) {  
            originalConfig._retry = true;  

            // Check if the token is expired  
            if (isTokenExpired()) {  
                // console.log("Expire")
                localStorage.removeItem("user");  
                localStorage.removeItem("tokenExpiry");  
                window.location.href = '/login'; // Redirect to login  
                return Promise.reject(err);  
            }  

            try {  
                const user = getUserFromLocalStorage();  
                const response = await axios.get(`${baseURL}/user/refresh`, {  
                    withCredentials: true,  
                    headers: {  
                        Authorization: `Bearer ${user.token.replace('"', "")}`,  
                    },  
                });  
                console.log(response,"جدیدییییییییییییییییییی")
                if (response.data) {  
                    // Update local storage  
                    localStorage.setItem("user", JSON.stringify(response.data));  
                    // Update the Authorization header  
                    request.headers.Authorization = `Bearer ${response.data.token.replace('"', "")}`;  
                    return app(originalConfig); // Retry original request with new token  
                }  
            } catch (error) { 
                // console.log(error,"refresh token fails ارورشه ها") 
                
                localStorage.removeItem("user");  
                localStorage.removeItem("tokenExpiry");  
                window.location.href = '/login'; // Redirect to login  
                return Promise.reject(error);  
            }  
        }  

        return Promise.reject(err);  
    }  
);  

// Create an HTTP utility object  
const http = {  
    get: app.get,  
    post: app.post,  
    delete: app.delete,  
    put: app.put,  
    patch: app.patch,  
};  

export default http;