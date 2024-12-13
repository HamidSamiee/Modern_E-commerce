import http from "./httpServices";

const getEnquiries = async()=>{
    
    const response = await http.get('enquiry/');
    if (response.data) {
        return response.data
    }  
}

const getEnquiry = async(id)=>{
    
    const response = await http.get(`enquiry/${id}`);
    if (response.data) {
        return response.data
    }  
}

const createEnquiry = async(data)=>{
    
    const response = await http.post('enquiry/',data);
    if (response.data) {
        return response.data
    }  
}
const deleteEnquiry = async(id)=>{
    
    const response = await http.delete(`enquiry/${id}`);
    if (response.data) {
        return response.data
    }  
}

const updateEnquiry = async(id,data)=>{
    
    const response = await http.put(`enquiry/${id}`,data);
    if (response.data) {
        return response.data
    }  
}

export const enquiryServices={getEnquiries,createEnquiry,getEnquiry,deleteEnquiry,updateEnquiry}