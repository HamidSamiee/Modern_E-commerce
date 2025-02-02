import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import compare from "@assets/images/comparing.png"
import { ImageHover } from './ProductCart';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { addCompareProduct } from '@/features/ProductsSlice/productSlice';
import { toPersianDigits, toPersianDigitsWithComma } from '@/utils/toPersianDigits';
import { IoEyeOutline } from 'react-icons/io5';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { addProductToCart, addToCart, getProductFromCart } from '@/features/CartSlice/CartSlice';
import { toast } from 'react-toastify';

const ProductCartModal = (Props) => {

  const dispatch = useDispatch();
  const {product} = Props ;
  const {_id,images,brand,title,color,description,price,totalrating} = product ;

  const [addedProduct, setAddedProduct] = useState({
    color:"",
    quantity:1,
  })

    const {user}=useSelector((state)=>state.auth);
    const {brands}=useSelector((state)=>state.brand);
    const userWishlist=useSelector(state=>state.auth.wishList);
   
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

const handleAddtoCart = ()=>{
        if (addedProduct.color =="") {
            toast.error("لطفا رنگ مورد نظرتون رو وارد کنید");
            return false;
        }
        if (user) {
            dispatch(addProductToCart(
            [{
                id: _id,
                name: title,
                color: addedProduct.color,
                img: images[0].url,
                desc: description,
                price: price,
                quantity: addedProduct.quantity,
                totalPrice: addedProduct.quantity * price
            }]))
            dispatch(getProductFromCart())
        }else{
            dispatch(addToCart(
                {
                    id: _id,
                    name: title,
                    color: addedProduct.color,
                    img: images[0].url,
                    desc: description,
                    price: price,
                    quantity: addedProduct.quantity,
                    totalPrice: addedProduct.quantity * price
                }
            ))
        }
    }


  return (
    <section className={ ` `} >
        <div className={` product_cart  relative overflow-hidden grid grid-cols-12 `}>
            <div className="col-span-6 ">
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
            </div>
            <div className="col-span-6">
                <div className=" w-full flex flex-col gap-2 px-4">
                    <h6 className="text-xs text-[var(--color-bf4800)]">
                    {
                      brands.find(b=>b._id == brand)?.title
                    } 
                    </h6>
                    <Link to={`/product/${_id}`} className={` font-extrabold text-[var(--color-131921)] text-base line-clamp-2`}>{title}</Link>
                    <div className=" flex flex-col ">
                            <div className="self-end">
                                 <StarRating star={parseFloat(totalrating)} setStar={null}  />
                            </div>
                            <div className="space-y-3 ">
                                <div className="flex sm-custom2:w-full sm-custom2:flex-row  sm-custom2:gap-x-6 flex-col gap-2 ">
                                    <div className="flex items-center gap-2.5">
                                        <h3 className="text-sm mb-0 text-[var(--color-1c1c1b)]"> رنگ :</h3>
                                        <p className="">
                                            {
                                                addedProduct.color 
                                            }
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {
                                            color.map((c,i)=><input 
                                                                type="checkbox" 
                                                                onChange={()=>setAddedProduct({...addedProduct,color:c})} 
                                                                className='form-checkbox checked:text-[var(--color-febd69)] cursor-pointer p-2 rounded-full border border-black focus:border-black focus:ring-[var(--color-febd69)]' 
                                                                style={{background: c == "نقره ای" ? 'silver' :
                                                                                    c == "زرد" ? 'yellow' :
                                                                                    c == "آبی" ? 'blue' :
                                                                                    c == "سبز" ? 'green' :
                                                                                    c == "قرمز" ? 'red' :
                                                                                    c == "سفید" ? 'white' :
                                                                                    c == "سیاه" ? 'black' :
                                                                                    c == "قهوه ای" ? 'brown' :
                                                                                    c == "طلایی" ? 'gold' :
                                                                                    c == "صورتی" ? 'pink' : ""}} 
                                                                key={i}
                                                              />)
                                        }
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-sm mb-0 text-[var(--color-1c1c1b)]"> تعداد :</h3>
                                    <div className="flex items-center border border-[var(--color-ededed)]">
                                        <button onClick={()=>setAddedProduct({...addedProduct,quantity:addedProduct.quantity+1})} className="cursor-pointer px-1 border-l">
                                            <FiPlus />
                                        </button>
                                        <input  type="text" readOnly value={toPersianDigits(addedProduct.quantity)}  min={1} className="w-10 py-0 text-center text-[13px] mb-0 text-[var(--color-777777)] border-none "/>
                                        <button onClick={()=>{if(addedProduct.quantity > 1)setAddedProduct({...addedProduct,quantity:addedProduct.quantity-1})}} disabled={addedProduct.quantity == 1} className={`${addedProduct.quantity == 1 ? 'cursor-not-allowed' : 'cursor-pointer'} px-1 border-r`}>
                                            <FiMinus className={`${addedProduct.quantity == 1 && 'opacity-20'}`}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
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
                    </div>
                </div>
            </div>
        </div>
        <div className="flex flex-col gap-2 ">
              <p className="text-lg font-extrabold text-nowrap self-center space-x-1"><span className="ml-5 font-bold">قیمت</span>   <span className="">{toPersianDigitsWithComma(price)}</span>  تومان</p>
              <div className="flex items-center gap-2 justify-between">
                    <Link  to="/cart"  className="flex items-center justify-center  w-full sm-custom2:mt-5 text-nowrap bg-[var(--color-131921)] text-white hover:bg-[var(--color-febd69)] hover:text-[var(--color-131921)] px-2 py-1 rounded-xl">
                                رفتن به سبد خرید    
                    </Link>
                    <button  type="submit" onClick={handleAddtoCart} className="shadow-black  w-full sm-custom2:mt-5 text-nowrap bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white px-2 py-1 rounded-xl">
                          افزودن به سبد خرید
                    </button>
              </div>                          
        </div>
    </section>
  )
}

export default ProductCartModal