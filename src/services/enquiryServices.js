import http from "./httpServices";

const getEnquiries = async()=>{
    
    const response = await http.get('enquiry/');
    if (response.data) {
        return response.data
    }  
}

export const enquiryServices={getEnquiries}