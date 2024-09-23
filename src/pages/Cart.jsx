import BreadCrumb from '@/components/BreadCrumb'
import Meta from '@/components/Meta'
import { decreaseQuantity, increaseQuantity, removeFromCart } from '@/features/CartSlice/CartSlice'
import { toPersianDigits, toPersianDigitsWithComma } from '@/utils/toPersianDigits'
import {  AiOutlineClose } from 'react-icons/ai'
import {  TiArrowBack } from 'react-icons/ti'
import { FiMinus, FiPlus, FiTrash } from 'react-icons/fi'
// import { AiFillDelete } from 'react-icons/ai'
// import { FiMinus, FiPlus } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Container from '@/components/Container'


const Cart = () => {

  const {cart,totalPrice}=useSelector(state=>state.cart);
  const dispatch=useDispatch();

  cart.map(p=>console.log(p.quantity))
 
  return (
    <>
       <Meta title="سبد خرید " /> 
       <BreadCrumb title=" سبد خرید شما " /> 
       {
        cart.length > 0 ?
        <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className="grid grid-cols-12">
                <div className="col-span-12">
                  <div className="border-b border-b-[var(--color-888888)] py-3 flex items-center justify-between">
                    <h4 className='text-sm text-[var(--color-777777)] w-2/5'>محصولات</h4>
                    <h4 className='text-sm text-[var(--color-777777)] w-[10%]'>قیمت</h4>
                    <h4 className='text-sm text-[var(--color-777777)] w-[15%] text-center'>تعداد</h4>
                    <h4 className='text-sm text-[var(--color-777777)] w-[15%]'>قیمت کل</h4>
                  </div>
                  {
                  cart.map(p=>{ 
                    return <div key={p.id} className="relative mb-2 border-b border-b-[var(--color-999999)] py-3 flex items-center justify-between">
                          <div onClick={()=>dispatch(removeFromCart(p))} className="absolute left-2 top-2 ">
                            <AiOutlineClose className='text-red-500 cursor-pointer'/>
                          </div>
                        <div className='text-sm text-[var(--color-777777)] w-2/5 flex items-center gap-4'>
                          <div className="w-[25%] ">
                            <img src={p.img} alt="" className="" />
                          </div>
                          <div className="flex flex-col gap-2 w-[75%] ">
                            <h5 className="font-extrabold  text-black">{p.name}</h5>
                            <p className="">رنگ : {p.color == 'silver' ? "نقره ای" :
                                                            p.color == 'blue' ? "آبی" :
                                                            p.color == 'green' ? "سبز" :
                                                            p.color == 'red' ? "قرمز" :
                                                            p.color == 'white' ? "سفید" :
                                                            p.color == 'black' ? "مشکی" :
                                                            p.color == 'pink' ? "صورتی" : "--"
                                                  }
                            </p>
                            <p className="">سایز : {p.size}</p>
                          </div>
                        </div>
                        <div className='text-sm text-[var(--color-777777)] w-[10%]'><h5 className="text-base text-[var(--color-1c1c1b)]">{toPersianDigitsWithComma(p.price)} تومان</h5></div>
                        <div className='text-sm text-[var(--color-777777)] w-[15%] flex items-center justify-center gap-4'>
                            <div className="flex items-center border border-[var(--color-eaeaea)]">
                                        <button onClick={()=>dispatch(increaseQuantity(p))} className="cursor-pointer px-1 border-l">
                                            <FiPlus className='text-black' />
                                        </button>
                                        <input  type="text" value={toPersianDigits(p.quantity)}  min={1} className="w-10 py-0 text-center text-[13px] mb-0 text-[var(--color-777777)] border-none "/>
                                        {
                                          p.quantity == 1 ? 
                                          <button onClick={()=>dispatch(removeFromCart(p))}  className={` px-1 border-r `}>
                                                <FiTrash className='text-red-500' /> 
                                          </button>
                                          :
                                          <button onClick={()=>dispatch(decreaseQuantity(p))}  className={` px-1 border-r `}>
                                                <FiMinus className={`text-black`}/> 
                                          </button>
                                          
                                        }          
                            </div>         
                        </div>
                        <div className='text-sm text-[var(--color-777777)] w-[15%]'>{toPersianDigitsWithComma(p.totalPrice)} تومان</div>
                    </div>
                  })
                  }
                </div>
                <div className=" col-span-12 py-2 mt-2">
                        <div className="grid grid-cols-12 place-items-center">
                            <div className="col-span-12 w-full  flex justify-between">
                                <div className="">
                                    <Link to='/shop' className='flex items-center gap-1  p-2 shadow-inner text-xs rounded-xl text-black  shadow-[var(--color-febd69)] animate-pulse'> <TiArrowBack className='w-4 h-4 scale-x-[-1]' /> بازگشت به فروشگاه و ادامه خرید  </Link>
                                </div>
                                <div className="flex flex-col gap-2 justify-between">
                                  <h4 className="text-xs"> جمع سبد خرید  : </h4>
                                  <p className="self-end">{toPersianDigitsWithComma(totalPrice)} تومان</p>
                                  <Link to='/checkout' className=" self-end w-full bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white text-center px-2 py-1 rounded-xl transition-all duration-300 ease-in-out">
                                          تایید و تکمیل سفارش
                                  </Link>
                                </div>
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
                          برای رفتن به فروشگاه <Link to='/shop' className="text-sky-500 animate-pulse text-lg font-bold">کلیک</Link> کنید
                        </p>
                    </div>
                </div>
        </Container>
       } 
    </>
  )
}

export default Cart