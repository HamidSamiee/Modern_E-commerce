
import { IoEyeOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import compare from "@assets/images/comparing.png"
import cart from "@assets/images/cart.png"
import { toPersianDigitsWithComma } from "@/utils/toPersianDigits";
import StarRating from "./StarRating";
import { useDispatch, useSelector } from "react-redux";
import { addCompareProduct, addToWishList, getAllProducts, removeFromWishList } from "@/features/ProductsSlice/productSlice";
import { forwardRef, useEffect, useRef, useState } from "react";
import { getAllbrands } from "@/features/BrandSlice/brandSlice";
import { addProductToCart, } from "@/features/CartSlice/CartSlice";
import { getUserProductWishlist } from "@/features/userSlice/userSlice";
import ProductCartModal from "./ProductCartModal";

// اضافه کردن نام نمایشی برای forwardRef
const ModalInput = forwardRef((props, ref) => (
  <input type="checkbox" id="my_modal_7" className="modal-toggle" ref={ref} />
));
ModalInput.displayName = 'ModalInput'; 

const ProductCart = (Props) => {

    const dispatch=useDispatch();
    const {user}=useSelector(state=>state.auth)
    const modalRef = useRef(null);
    const {dataSelection,grid}=Props;
    const {_id,images,brand,title,color,description,price,totalrating}=dataSelection;

    useEffect(() => {
      dispatch(getAllbrands());

      if (user) {
              dispatch(getUserProductWishlist())
      }

      }, [dispatch])

    const {brands}=useSelector((state)=>state.brand);

    // console.log(window.innerWidth)
    const location=useLocation();
    
    const userWishlist=useSelector(state=>state.auth.wishList)
   
    const isLiked = userWishlist.some(item => item._id === _id); // بررسی لایک بودن محصول
   
    const [heartAnimation, setHeartAnimation] = useState(false); // State برای انیمیشن قلب
   
    const handleHeartClick = async() => {
        // شروع انیمیشن
        setHeartAnimation(true);
        setTimeout(() => {
            setHeartAnimation(false); // ریست انیمیشن بعد از 0.7 ثانیه
        }, 700);

      if (isLiked) {
        // حذف از لیست علاقه‌مندی‌ها
        await dispatch(removeFromWishList(_id));
      } else {
          // اضافه به لیست علاقه‌مندی‌ها
          await dispatch(addToWishList(_id));
      }
        
      // همگام‌سازی لیست علاقه‌مندی‌ها
      dispatch(getUserProductWishlist());
    
  };
 
  const handleOpenModal = () => {
    if (modalRef.current) {
      modalRef.current.checked = true;
    }
  };

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.checked = false;
    }
  };
 
       
  return (
    <section className={` ${location.pathname == '/product' && window.innerWidth >= 1024 ? `${grid === 4 ? 'col-span-4' : `col-span-${grid}`} ` : location.pathname == '/product' ? 'sm-custom:col-span-12 col-span-6 sm:col-span-4 ': "sm-custom:col-span-12 col-span-6 sm:col-span-4 lg:col-span-2" } `} >
        <div className={`product_cart  relative bg-white shadow-lg overflow-hidden rounded-lg ${grid == 12 && window.innerWidth >= 1024 && 'flex px-8'}`}>
            <div className="absolute top-[2%] right-2 tooltip hover:tooltip-open tooltip-left " data-tip="افزودن به علاقه مندی ها">
                <button className=""  onClick={handleHeartClick} >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`hover:text-red-500 ${ isLiked ? 'fill-red-500' : ''} ${heartAnimation ? 'heart-animation' : ''}`}
                        >
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>            
                </button>
            </div>
            <ImageHover images={images} title={title} />
            <div className=" w-full flex flex-col gap-2 p-4">
                <h6 className="text-xs text-[var(--color-bf4800)]">
                {
                  brands.find(b=>b._id == brand)?.title
                } 
                </h6>
                <Link to={`/product/${_id}`} className={`${grid == 12 ? "" : "h-12"} font-extrabold text-[var(--color-131921)] text-base line-clamp-2`}>{title}</Link>
                <div className=" flex flex-col items-end ">
                        <StarRating star={parseFloat(totalrating)} setStar={null}  />
                        <p className={` ${grid == 12 ? 'block' : 'hidden'} text-xs text-justify mt-2 text-gray-400 line-clamp-2`}>{description}</p> 
                        <p className="text-base  text-nowrap">{toPersianDigitsWithComma(price)} تومان</p>

                </div>
            </div>
            <div className={`action_bar absolute top-8 -right-5 transition-all ease-in-out duration-300 `}>
                <div className="flex flex-col justify-center gap-2.5">
                  <div className=" tooltip hover:tooltip-open tooltip-left" data-tip="مقایسه محصول">
                      <button onClick={()=>dispatch(addCompareProduct(dataSelection))} className="hover:scale-125">
                        <img src={compare} alt="" className="w-4" />
                      </button>
                  </div>
                  <div className="tooltip hover:tooltip-open tooltip-left" data-tip="نمایش محصول">
                      <Link to={`/product/${_id}`}  className="hover:scale-125">
                        <IoEyeOutline className="hover:text-sky-500"/>
                      </Link>
                  </div>
                  <div className="tooltip hover:tooltip-open tooltip-left" data-tip="خرید">
                        <button 
                        onClick={()=>{ handleOpenModal(_id)
                         dispatch(getAllProducts())}
                        }
                        className="hover:scale-150"
                        >
                            <img src={cart} alt="" className="w-4" />
                        </button>
                  </div> 
                </div>
            </div>
            {/* Modal part */}
            <ModalInput ref={modalRef} />
            <div className="modal modal-bottom sm:modal-middle">
              <div className="modal-box">
                <button 
                  className="btn btn-sm btn-circle btn-ghost absolute left-2 top-2 z-50" 
                  onClick={handleCloseModal}
                >
                  ✕
                </button>     
                {_id && <ProductCartModal product={dataSelection} handleCloseModal={handleCloseModal} />}
              </div>
              <label className="modal-backdrop" onClick={handleCloseModal}>Close</label>
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
        src={images && images[0]?.url}  
        alt={title}  
        className={`images w-36 transition-all ease-in-out duration-500 ${  
          isHovered == false ? 'scale-100' : 'scale-0 hidden'  
        }`}  
      />  
      <img  
        src={images && images[1]?.url}  
        alt={title}  
        className={`images w-36 transition-all ease-in-out duration-500 ${  
          isHovered ? 'scale-100' : 'scale-0 hidden'  
        }`}  
      />  
    </div>  
  );  
};  

 