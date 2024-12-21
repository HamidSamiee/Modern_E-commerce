import { compareProduct} from '@/assets/data/data'
import BreadCrumb from '@/components/BreadCrumb'
import Container from '@/components/Container'
import Meta from '@/components/Meta'
import { IoClose } from 'react-icons/io5'



const CompareProducts = () => {

    
  return (
    <>
       <Meta title=" مقایسه محصولات " /> 
       <BreadCrumb title=" مقایسه محصولات" />
       <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className="grid grid-cols-12 gap-5">
                    {
                        compareProduct.slice(0,4).map(({imgA,brand,title,price,quantity,type,color},i)=>{
                            return(
                                <div key={i} className="col-span-12 sm-custom3:col-span-6 sm:col-span-6 md:col-span-4  lg:col-span-3">
                                    <div className="relative px-4 py-5 rounded-xl bg-white">
                                        <IoClose className='w-5 h-5 absolute top-2 right-2 cursor-pointer' />
                                        <img src={imgA} alt={title} className="" />
                                        <div className="flex flex-col gap-3 mb-3">
                                            <h5 className="font-extrabold text-justify line-clamp-2">{title}</h5>
                                            <h6 className="text-sm self-end">{price} تومان</h6>
                                        </div>
                                        <div className=" text-xs py-3 border-t border-t-[var(--color-ededed)] flex items-center justify-between">
                                            <h5 className="font-extrabold">برند :</h5>
                                            <p className="">{brand}</p>
                                        </div>
                                        <div className="text-xs py-3 border-t border-t-[var(--color-ededed)] flex items-center justify-between">
                                          <h5 className="font-extrabold">نوع : </h5>
                                          <p className="">{type}</p>  
                                        </div>
                                        <div className="text-xs py-3 border-t border-t-[var(--color-ededed)] flex items-center justify-between">
                                          <h5 className="font-extrabold">موجودی :</h5>
                                          <p className="">{quantity > 0 ? "در انبار" : "ناموجود"}</p>  
                                        </div>
                                        <div className="text-xs py-3 border-t border-t-[var(--color-ededed)] flex items-center justify-between">
                                           <h5 className="font-extrabold text-nowrap">رنگ :</h5>
                                           <div className="flex items-center line-clamp-1 gap-2">
                                              {color.map((c)=><span className='p-2 rounded-full border border-black/50' style={{background: c}} key={c}></span>)} 
                                           </div> 
                                        </div>
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