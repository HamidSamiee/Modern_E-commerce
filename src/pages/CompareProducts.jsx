import BreadCrumb from '@/components/BreadCrumb'
import Container from '@/components/Container'
import Meta from '@/components/Meta'
import { removeCompareProduct } from '@/features/ProductsSlice/productSlice'
import { toPersianDigitsWithComma } from '@/utils/toPersianDigits'
import React, { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'




const CompareProducts = () => {

  const dispatch=useDispatch();
  const { compareProducts } = useSelector((state) => state.product);

  useEffect(() => {  
    if (compareProducts.length > 0) {  
        console.log('تعداد محصولات مقایسه شده تغییر کرده است:', compareProducts.length);  
    }  
}, [compareProducts.length]);


if(!compareProducts ||compareProducts.length == 0){
  return <div className='w-full h-[50vh] flex items-center justify-center font-bold text-base'>
                <div className="flex flex-col gap-5 items-center">
                      هیچ محصولی برای مقایسه انتخاب نشده است 
                      <Link to="/product" className='w-fit p-2 block bg-[var(--color-febd69)] rounded-md hover:bg-black hover:text-[var(--color-febd69)] transition-all duration-300 ease-linear ' >بازگشت به فروشگاه</Link>
                </div>
         </div>
}



  return (
    <>
       <Meta title=" مقایسه محصولات " /> 
       <BreadCrumb title=" مقایسه محصولات" />
       <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className="grid grid-cols-12 gap-5">
                    {compareProducts &&
                        compareProducts.slice(0,4).map(({_id,images,brand,title,price,details},i)=>{
                            return(
                                <div key={i} className="col-span-12 sm-custom3:col-span-6 sm:col-span-6 md:col-span-4 ">
                                    <div className="relative px-4 py-5 rounded-xl bg-white">
                                        <IoClose className='w-5 h-5 absolute top-2 right-2 cursor-pointer' onClick={()=>dispatch(removeCompareProduct({_id}))} />
                                        <img src={images && images [0]?.url} alt={title} className="w-full h-60 object-cover" />
                                        <div className="flex flex-col gap-3 mb-3">
                                            <h5 className="font-extrabold text-justify line-clamp-2">{title}</h5>
                                            <h6 className="text-sm self-end">{toPersianDigitsWithComma(price)} تومان</h6>
                                        </div>
                                        <div className=" text-xs py-3 border-t border-t-[var(--color-ededed)] flex items-center justify-between">
                                            <h5 className="font-extrabold">برند :</h5>
                                            <p className="">{brand}</p>
                                        </div>
                                        <h2 className='my-5 pb-1 border-b-2 border-b-slate-400'>مشخصات محصول</h2>  
                                        <table>  
                                            <tbody>  
                                                {Object.entries(details).map(([category, details]) => (  
                                                        <React.Fragment key={category}> {/* کلید برای هر دسته */}  
                                                            <tr>  
                                                                <td colSpan="2" style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>  
                                                                    {category} {/* نام دسته بندی */}  
                                                                </td>  
                                                            </tr>  
                                                            {Object.entries(details).map(([key, value]) => (  
                                                                <tr key={key} className='p-1.5'>  
                                                                    <td>{key}</td>  
                                                                    <td className='text-left'>{value}</td>  
                                                                </tr>  
                                                            ))}  
                                                        </React.Fragment>   
                                                    ))  
                                                }  
                                            </tbody>  
                                        </table>  
                                        
                                    </div>
                                </div>
                            )
                        })
                    }
            </div>
       </Container>  
    </>
  )
}

export default CompareProducts