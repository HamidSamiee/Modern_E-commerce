

import axios from "axios";
const baseURL='http://localhost:5000/api';

const getTokenFromLocalStorage = localStorage.getItem("user") ?
JSON.parse(localStorage.getItem("user")) : null ;


const app = axios.create({
    baseURL: baseURL,
    headers:{
        Authorization : `Bearer ${ getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
    },
    accept: "application/json",
    // withCredentials: true,
})

// app.interceptors.request.use(
//     (req) => req,
//     (err) => Promise.reject(err)
// )

// app.interceptors.response.use(
//     (res) => res,
//     async (err) => {
//         // console.log(err.config)
//         const originalConfig = err.config;

//         if (err.response?.status === 401 && !originalConfig._retry) {
//             originalConfig._retry = true;

//             try {
//                 const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/refresh-token`,
//                     { withCredentials: true },
//                 )
//                 if (data) {
//                     return app(originalConfig)
//                 }
//             } catch (error) {
//                 return Promise.reject(error)
//             }
//         }

//         return Promise.reject(err)
//     }
// )




const http = {
    get: app.get,
    post: app.post,
    delete: app.delete,
    put: app.put,
    patch: app.patch,
}

export default http;