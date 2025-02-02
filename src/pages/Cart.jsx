import BreadCrumb from '@/components/BreadCrumb'
import Meta from '@/components/Meta'
import { addProductToCart, decreaseQuantity, getProductFromCart, increaseQuantity, removeFromCart, updateQuantity } from '@/features/CartSlice/CartSlice'
import { toEnglishDigits, toPersianDigits, toPersianDigitsWithComma } from '@/utils/toPersianDigits'
import {  AiOutlineClose } from 'react-icons/ai'
import {  TiArrowBack } from 'react-icons/ti'
import { FiMinus, FiPlus, FiTrash } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Container from '@/components/Container'
import { useEffect, useState } from 'react'
import { getAllProducts } from '@/features/ProductsSlice/productSlice'
import { getaUser } from '@/features/userSlice/userSlice'



const Cart = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {user}=useSelector(state=>state.auth);
  const { cart, cartTotal } = useSelector(state => state.cart);
  


  const handleCart = () => {
    if (user) {
      navigate('/checkout');
    } else {
      navigate('/login');
    }
  };

  const handleGetUser = (id) => {
    if (!id) {
        console.error("Invalid ID: ID is required");
        return;
    }

    dispatch(getaUser({ id }))
};

  useEffect(() => {

    if (user) {
        dispatch(getAllProducts()); // بارگذاری محصولات
        dispatch(getProductFromCart()); // بارگذاری سبد خرید
        handleGetUser(user._id)
      }

}, [user._id, dispatch]);



  return (
    <>
       <Meta title="سبد خرید " /> 
       <BreadCrumb title=" سبد خرید شما " /> 
       { cart &&
        cart.length > 0 ?
        <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className="grid grid-cols-12">
                <div className="col-span-12">
                                    <Link to='/product' className='w-fit flex items-center gap-1  p-2 shadow-inner text-xs rounded-xl text-black  shadow-[var(--color-febd69)] animate-pulse'> <TiArrowBack className='w-4 h-4 scale-x-[-1]' /> بازگشت به فروشگاه  </Link>
                </div>
                <div className="col-span-12">
                  <div className="grid grid-cols-12 border-b border-b-[var(--color-888888)] py-3 ">
                    <h4 className='col-span-9 md:col-span-6 text-sm text-[var(--color-777777)]'>محصولات</h4>
                    <h4 className='col-span-2 place-self-center text-sm text-[var(--color-777777)] hidden md:block '>قیمت</h4>
                    <h4 className='col-span-2 place-self-center text-sm text-[var(--color-777777)] hidden md:block  text-center'>تعداد</h4>
                    <h4 className='sm-custom2:hidden col-span-3 md:col-span-2 place-self-center text-sm text-[var(--color-777777)] '>قیمت کل</h4>
                  </div>
                  {
                  cart.map(p=>{ 
                    return <div key={`${p.id}-${p.color}`} >
                                <div  className="grid grid-cols-12 gap-5 relative mb-2 border-b border-b-[var(--color-999999)] py-3  ">
                                {/* image */}
                                      <div className="sm-custom2:col-span-3 col-span-2 flex items-center justify-center">
                                               <img src={p.img} alt="" className=" md:w-[80%]" />
                                      </div>
                                {/* title and color */}      
                                      <div  className="sm-custom2:col-span-9 col-span-7 md:col-span-8 grid grid-cols-8 ">
                                                <div className="col-span-8 md:col-span-4 flex flex-col justify-center gap-2  ">
                                                  <h5 className="font-extrabold text-justify text-black sm-custom2:text-sm">{p.name}</h5>
                                                  <p className="sm-custom2:text-sm">رنگ : {p.color}</p>
                                                </div>
                                    {/* price */}
                                                <div className='col-span-8 md:col-span-2 flex  items-center justify-between pl-2 py-1 md:p-0  md:justify-center text-nowrap text-sm  text-[var(--color-777777)]'>
                                                  <p className=" md:hidden">قیمت :</p>
                                                  <h5 className="text-base text-[var(--color-1c1c1b)]">{toPersianDigitsWithComma(p.price)} تومان</h5>
                                                </div>
                                    {/* quantity */}
                                                <div className='col-span-8 md:col-span-2 text-sm text-[var(--color-777777)]  flex items-center justify-between pl-2 py-1 md:p-0  md:justify-center gap-4'>
                                                    <p className=" md:hidden">تعداد :</p>
                                                    <div className="flex items-center border border-[var(--color-eaeaea)]">
                                                                <button onClick={()=>dispatch(increaseQuantity(p))} className="cursor-pointer px-1 border-l">
                                                                    <FiPlus className='text-black' />
                                                                </button>
                                                                <input  
                                                                   type="text"
                                                                   value={toPersianDigits(p.quantity)}
                                                                   onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    const englishValue = toEnglishDigits(value); // تبدیل به انگلیسی
                                                                    const newQuantity = parseInt(englishValue, 10); // تبدیل به عدد
                                                                      if (!isNaN(newQuantity) && newQuantity > 0) {
                                                                          dispatch(updateQuantity({ id: p.id, color: p.color, quantity: newQuantity }));
                                                                      }
                                                                   }}
                                                                   className="w-10 py-0 text-center text-[13px] mb-0 text-[var(--color-777777)] border-none "
                                                                />
                                                                {
                                                                  p.quantity == 1 ? 
                                                                  <button onClick={()=>dispatch(removeFromCart(p))} 
                                                                   className={` px-1 border-r `}>
                                                                        <FiTrash className='text-red-500' /> 
                                                                  </button>
                                                                  :
                                                                  <button onClick={()=>dispatch(decreaseQuantity(p))}  className={` px-1 border-r `}>
                                                                        <FiMinus className={`text-black`}/> 
                                                                  </button>
                                                                  
                                                                }          
                                                    </div>         
                                                </div>
                                      </div>
                                {/* total price */}
                                      <div className='sm-custom2:col-span-12 sm-custom2:border-t-2 sm-custom2:border-t-[var(--color-febd69)] sm-custom2:pt-3 sm-custom2:mt-2 col-span-3  md:col-span-2 font-extrabold text-sm text-nowrap text-[var(--color-777777)] sm-custom2:px-5 flex items-center  sm-custom2:justify-between justify-center'>
                                                <p className="sm-custom2:block  hidden">قیمت کل :</p>
                                                {toPersianDigitsWithComma(p.totalPrice)} تومان
                                      </div>
                                {/* close btn */}
                                      <div onClick={()=>dispatch(removeFromCart(p))} className=" absolute left-2 top-2 sm-custom2:right-2">
                                              <AiOutlineClose className='text-red-500 cursor-pointer'/>
                                      </div>
                                </div>
                              
                          </div>
                  })
                  }
                </div>
                <div className=" col-span-12 py-2 mt-2">
                        <div className="grid grid-cols-12 place-items-center">
                            <div className="col-span-12 w-full  flex flex-col justify-between">
                                
                                <div className="w-full flex items-center gap-8 justify-evenly font-bold">
                                    <h4 className="text-base"> جمع سبد خرید  : </h4>
                                    <p className="">{toPersianDigitsWithComma(cartTotal)} تومان</p>
                                </div>
                                
                                <button  onClick={handleCart}
                                 className="sm-custom:w-[80%] sm-custom:mx-2 sm-custom:self-center mt-5 self-end w-fit bg-[var(--color-febd69)] text-nowrap text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white text-center px-2 py-1 rounded-xl transition-all duration-300 ease-in-out"
                                >
                                          تایید و تکمیل سفارش
                                </button>
                            </div>
                        </div>
                </div>
            </div>
        </Container>
        :
        <Container class1="py-5 bg-[var(--color-f5f5f7)]">
                <div className="grid grid-cols-12">
                    <div className="py-10 col-span-12 flex flex-col items-center justify-center gap-5">
                        <p className="font-medium text-sm">
                          سبد خرید شما <span className="text-red-500">خالی</span> است 
                        </p>
                        <p className="font-medium text-sm">
                          برای رفتن به فروشگاه <Link to='/product' className="text-sky-500 animate-pulse text-lg font-bold">کلیک</Link> کنید
                        </p>
                    </div>
                </div>
        </Container>
       } 
    </>
  )
}

export default Cart