
import http from "./httpServices";
// import qs from "qs";

// const getProducts = async(data)=>{
//     console.log(data)
//     const response = await http.get(`product`,{
//         params: {
//           category: data?.category,
//           tag: data?.tag,
//           brand: data?.brand,
//           minPrice:data?.minPrice ,
//           maxPrice: data?.maxPrice,
//           sort: data?.sort,
//           fields: data?.fields,
//           page: data?.page,
//           limit: data?.limit
//         },
//         paramsSerializer: params => {
//             console.log(qs.stringify(params, { skipNulls: true }))
//             return qs.stringify(params, { skipNulls: true })
//         }
//       });
     

//     if (response.data) {
//         return response.data
//     }  
// }

// const getProducts = async (data) => {
//     console.log(data)
//     try {
//       let query = `product?`;
  
//       if (data?.category) query += `category=${data.category}&`;
//       if (data?.brand) query += `brand=${data.brand}&`;
//       if (data?.tag) query += `tag=${data.tag}&`;
//       if (data?.minPrice) query += `price[gte]=${data.minPrice}&`;
//       if (data?.maxPrice) query += `price[lte]=${data.maxPrice}&`;
//       if (data?.sort) query += `sort=${data.sort}&`;
//       if (data?.fields) query += `fields=${data.fields}&`;
//       if (data?.page) query += `page=${data.page}&`;
//       if (data?.limit) query += `limit=${data.limit}&`;

//       // حذف علامت "&" اضافی در انتها
//       query = query.endsWith("&") ? query.slice(0, -1) : query;
//   console.log(query);
//       const response = await http.get(query);
  
//       if (response.data) {
//         return response.data;
//       }
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       throw error;
//     }
//   };
const getProducts = async (data) => {
    // console.log(data);
    
    const queryParams = {
        inStock:data?.inStock,
        category: data?.category,
        tag: data?.tag,
        brand: data?.brand,
        minPrice: data?.minPrice,
        maxPrice: data?.maxPrice,
        sort: data?.sort,
        fields: data?.fields,
        page: data?.page,
        limit: data?.limit
    };

    const params = new URLSearchParams();
    
    for (const key in queryParams) {
        if (Object.prototype.hasOwnProperty.call(queryParams, key) && queryParams[key] !== undefined  && queryParams[key] !== null) {
            params.append(key, queryParams[key]);
        }
    }


    const response = await http.get(`product?${params.toString()}`);
    // console.log(params.toString());
    if (response.data) {
        return response.data;
    }
};

const createProduct = async(product)=>{
    
    const response = await http.post(`product`, product);
    console.log(response.data)
    if (response.data) {
        return response.data
    }  
}

const getProductById = async(id)=>{
    
    const response = await http.get(`product/${id}`);
    if (response.data) {
        return response.data
    }  
}

const updateProduct = async(id,userData)=>{
    
    const response = await http.put(`product/${id}`,userData);
    console.log(response)
    if (response.data) {
        return response.data
    }  
}

const deleteProduct = async(id)=>{
    console.log(id,'😎')
    const response = await http.delete(`product/${id}`);
    if (response.data) {
        return response.data
    }  
}

const addToWishlist = async(prodId)=>{
    
    const response = await http.put('product/wishlist',{prodId});
    if (response.data) {
        return response.data
    }  
}

const removeFromWishlist = async(prodId)=>{
    
    const response = await http.delete('product/wishlist',{ data: { prodId } });
    if (response.data) {
        return response.data
    }  
}

const ratingProduct = async(ratingData)=>{
    
    // const token = localStorage.getItem('token');
    // if (!token) {
    //     throw { response: { data: { message: 'برای ثبت نظرات لطفاً لاگین کنید ' } } };
    // }

    const response = await http.put('product/rating',ratingData);

    if (response.data) {
        return response.data
    }  
}

export const productServices={getProducts,removeFromWishlist,createProduct,getProductById,updateProduct,deleteProduct,addToWishlist,ratingProduct}