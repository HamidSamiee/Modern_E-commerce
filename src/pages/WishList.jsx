import BreadCrumb from '@/components/BreadCrumb'
import Container from '@/components/Container'
import Meta from '@/components/Meta'
import { removeFromWishList } from '@/features/ProductsSlice/productSlice'
import { getUserProductWishlist } from '@/features/userSlice/userSlice'
import { toPersianDigitsWithComma } from '@/utils/toPersianDigits'
import { useEffect } from 'react'
import { IoClose } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import brandImg from "@assets/images/logo2.png"
import brandImg2 from "@assets/images/Spinner.gif"
import { Navigate } from 'react-router-dom'

const WishList = () => {

    const dispatch=useDispatch();
    const {wishList,isLoading,isError,user}=useSelector(state=>state.auth)
    useEffect(() => {
      if (user) {
              dispatch(getUserProductWishlist())
      }
    }, [dispatch])
    
    if (isLoading) {  
        return <div className="h-[50vh] flex flex-col items-center justify-center">
                    
                           <img src={brandImg} alt="brand" className="w-44 sm:w-60  ml-1" />
                           <img src={brandImg2}  alt="brand" className="w-20 ml-1" />
                      
              </div>;  
    }  
    if (isError || !user) {
      return <Navigate to="/unauthorized" />
    }

  return (
    <>
       <Meta title=" لیست علاقه مندی ها  " /> 
       <BreadCrumb title=" لیست علاقه مندی ها " />
       <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className="grid grid-cols-12 gap-5">
                {
                    wishList.map(({_id,images,title,price})=>{
                        return(
                            <div key={_id} className="col-span-12 sm-custom3:col-span-6 sm:col-span-3 lg:col-span-2 rounded-lg shadow-2xl">
                                <div className="relative px-4 py-5 rounded-tl-lg rounded-tr-lg bg-white">
                                    <IoClose onClick={()=>{dispatch(removeFromWishList(_id)); dispatch(getUserProductWishlist())}} className='w-5 h-5 absolute top-2 right-2 cursor-pointer' />
                                    <img src={images && images[0].url} alt={title} className="" />
                                </div> 
                                <div className="p-2 flex flex-col gap-3 my-3">
                                        <h5 className="h-12 font-extrabold line-clamp-2">{title}</h5>
                                        <h6 className="text-sm self-end">{toPersianDigitsWithComma(price)} تومان</h6>
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

export default WishList