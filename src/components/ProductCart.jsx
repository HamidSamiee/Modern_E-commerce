
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import compare from "@assets/images/comparing.png"
import cart from "@assets/images/cart.png"
import { toPersianDigitsWithComma } from "@/utils/toPersianDigits";
import StarRating from "./StarRating";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList } from "@/features/ProductsSlice/productSlice";
import { useEffect, useState } from "react";
import { getAllbrands } from "@/features/BrandSlice/brandSlice";

const ProductCart = (Props) => {

    const dispatch=useDispatch();
    const {dataSelection,grid}=Props;
    const {id,images,brand,title,description,price}=dataSelection;
   
    useEffect(() => {
      dispatch(getAllbrands());
      }, [dispatch])

    const {brands}=useSelector((state)=>state.brand);

    // console.log(window.innerWidth)
    const location=useLocation();
    
    

       
  return (
    <section className={` ${location.pathname == '/shop' && window.innerWidth >= 1024 ? `${grid === 4 ? 'col-span-4' : `col-span-${grid}`} ` : location.pathname == '/shop' ? 'sm-custom:col-span-12 col-span-6 sm:col-span-4 ': "sm-custom:col-span-12 col-span-6 sm:col-span-4 lg:col-span-2" } `} >
        <div className={`product_cart  relative bg-white shadow-lg overflow-hidden rounded-lg ${grid == 12 && window.innerWidth >= 1024 && 'flex px-8'}`}>
            <button className="absolute top-[2%] right-2 "  onClick={()=>dispatch(addToWishList(id))} >
                     <CiHeart className="hover:text-red-500" />
            </button>
            <ImageHover images={images} title={title} />
            <div className=" w-full flex flex-col gap-2 p-4">
                <h6 className="text-xs text-[var(--color-bf4800)]">
                {
                  brands.find(b=>b._id == brand)?.title
                } 
                </h6>
                <Link to={`/product/${id}`} className={`${grid == 12 ? "" : "h-12"} font-extrabold text-[var(--color-131921)] text-base line-clamp-2`}>{title}</Link>
                <div className=" flex flex-col items-end ">
                        <StarRating />
                        <p className={` ${grid == 12 ? 'block' : 'hidden'} text-xs text-justify mt-2 text-gray-400 line-clamp-2`}>{description}</p> 
                        <p className="text-base  text-nowrap">{toPersianDigitsWithComma(price)} تومان</p>

                </div>
            </div>
            <div className={`action_bar absolute top-8 -right-5 transition-all ease-in-out duration-300 `}>
                <div className="flex flex-col justify-center gap-3">
                  <button className="">
                     <img src={compare} alt="" className="w-4" />
                  </button>
                  <Link className="">
                     <IoEyeOutline className="hover:text-sky-500"/>
                  </Link>
                  <Link className="">
                    <img src={cart} alt="" className="w-4" />
                  </Link>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ProductCart


export const ImageHover = (Props) => { 
  
  const { images, title } = Props;
  const [isHovered, setIsHovered] = useState(false);  

  return (  
    <div  
      className="flex items-center justify-center pt-10 pb-7"  
      onMouseEnter={() => setIsHovered(true)} // زمانی که نشانگر ماوس روی عکس است  
      onMouseLeave={() => setIsHovered(false)} // زمانی که نشانگر ماوس خارج می‌شود  
    >  
      <img  
        src={images[0]?.url}  
        alt={title}  
        className={`images w-36 transition-all ease-in-out duration-500 ${  
          isHovered == false ? 'scale-100' : 'scale-0 hidden'  
        }`}  
      />  
      <img  
        src={images[1]?.url}  
        alt={title}  
        className={`images w-36 transition-all ease-in-out duration-500 ${  
          isHovered ? 'scale-100' : 'scale-0 hidden'  
        }`}  
      />  
    </div>  
  );  
};  

 