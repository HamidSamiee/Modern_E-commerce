import {  selectionProduct } from '@/assets/data/data'
import BreadCrumb from '@/components/BreadCrumb'
import Meta from '@/components/Meta'
import { IoClose } from 'react-icons/io5'


const WishList = () => {
  return (
    <>
       <Meta title=" لیست علاقه مندی ها  " /> 
       <BreadCrumb title=" لیست علاقه مندی ها " /> 
       <div className="py-5 bg-[var(--color-f5f5f7)]">
            <div className="container xl:max-w-screen-xl">
                <div className="grid grid-cols-12 gap-5">
                    {
                        selectionProduct.slice(0,4).map(({imgA,title,price},i)=>{
                            return(
                                <div key={i} className="col-span-2 rounded-lg shadow-2xl">
                                    <div className="relative px-4 py-5 rounded-tl-lg rounded-tr-lg bg-white">
                                        <IoClose className='w-5 h-5 absolute top-2 right-2 cursor-pointer' />
                                        <img src={imgA} alt={title} className="" />
                                    </div> 
                                    <div className="p-2 flex flex-col gap-3 my-3">
                                            <h5 className="h-12 font-extrabold line-clamp-2">{title}</h5>
                                            <h6 className="text-sm self-end">{price} تومان</h6>
                                    </div>   
                                </div>
                                   )
                         })
                    }
                </div>
            </div>
       </div> 
    </>
  )
}

export default WishList