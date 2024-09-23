import BreadCrumb from "@/components/BreadCrumb"
import Container from "@/components/Container";
import Input from "@/components/Input";
import Meta from "@/components/Meta"
import { iranCity, iranTowns } from "@/utils/iranCity";
import { toPersianDigitsWithComma } from "@/utils/toPersianDigits";
import { useState } from "react";

import { TiArrowBack } from "react-icons/ti";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const Checkout = () => {

    const {cart,totalPrice}=useSelector(state=>state.cart);
    const [cityState, setCityState] = useState({
        city:'',
        town:'',
    })

    const irTowns=iranTowns(cityState.city);
    const irCitys=iranCity();
    const location=useLocation();
    console.log(location)

    const handleTown=()=>{}

  return (
    <>
       <Meta title=" سبد خرید " /> 
        <BreadCrumb title=" سبد خرید " />
        <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-7">
                        <div className="flex  flex-col gap-2">
                            <h3 className="font-extrabold ">دیجی مارکت</h3>
                            <nav className="mb-2">
                                <ol className="breadcrumb flex items-center">
                                    <li className="">
                                        <Link to='/cart' className="text-white  "> سبد خرید</Link>
                                    </li>
                                    <li className={`${location.pathname == '/checkout' ? 'activeStage' : 'text-white'} `}>
                                        <Link to='/checkout' className={`  `}> اطلاعات تماس</Link>
                                    </li>
                                    <li className="">
                                        <Link to='/' className="text-white  "> شیوه ارسال</Link>
                                    </li>
                                    <li className="">
                                        <Link to='/' className="text-white  "> پرداخت</Link>
                                    </li>
                                </ol>            
                            </nav>
                            <h4 className="font-bold">اطلاعات تماس </h4>
                            <p className="">حساب کاربری  ( hamidsmoaser@yahoo.com )</p>
                            <form className="w-4/6 py-3 space-y-5">
                                <div className="flex items-center justify-between gap-10">
                                    <Input name="firstName" type="text" className="w-1/2 p-1 bg-white border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] "  placeholder="نام"/>
                                    <Input name="lastName" type="text" className="w-1/2 p-1 bg-white border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] "  placeholder="نام خانوادگی"/>
                                </div>
                                <div className="flex items-center justify-between gap-10">
                                    <select name="city" onChange={(e)=>setCityState({...cityState,city:e.target.value})} id="" className="w-1/2 p-1 bg-white border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] ">
                                            {
                                               irCitys.map((spec,i)=>{
                                                return <option key={i} value={spec[1]}>{spec[0]}</option>    
                                              } ) 
                                            }
                                    </select>
                                    <select name="town" id="" onChange={handleTown} className="w-1/2 p-1 bg-white border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] ">
                                        {
                                          irTowns.map((spec,i)=>{
                                            return <option key={i} value={spec[1]}>{spec[0]}</option>    
                                          } )
                                        }
                                    </select>
                                </div>
                                <div className="">
                                   <textarea className="bg-white border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] " name="" id="" cols="60" rows="2" placeholder=" آدرس محل سکونت" />
                                </div>
                                <div className="flex items-center justify-between gap-10">
                                    <Input name="phoneNumber" type="tel" className="w-1/2 p-1 text-right bg-white border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] "  placeholder="شماره موبایل"/>
                                    <Input name="postalCode" type="tel" className="w-1/2 p-1 text-right bg-white border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] "  placeholder="کدپستی"/>
                                </div>
                                <div className="flex items-center justify-between gap-10">
                                    <Link to='/cart' className='flex items-center gap-1 p-2 text-xs  text-black '> <TiArrowBack className='w-4 h-4 scale-x-[-1]' /> بازگشت به سبد خرید   </Link>
                                    <Link to='/checkout' className=" self-end w-1/2 bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white text-center px-2 py-1 rounded-xl transition-all duration-300 ease-in-out">
                                                ادامه ثبت سفارش
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-span-5 space-y-5 pr-4 border-r border-r-[var(--color-999999)] ">
                        <div className="border-b-2 border-b-[var(--color-eaeaea)]">
                                {
                                    cart.map(p=>{
                                        return <div key={p.id} className="flex gap-5 pb-4">
                                                    <div className="relative w-[20%]">
                                                        <img src={p.img} alt={p.title} className="" />
                                                        <div className="w-6 h-6 absolute -top-2 -left-2 font-bold  rounded-full bg-black/15 inline-flex items-center justify-center">
                                                                <p className="text-white text-xs">{toPersianDigitsWithComma(p.quantity)}</p>
                                                        </div>
                                                    </div>
                                                    <div className="w-[60%]">
                                                        <h5 className="line-clamp-2">{p.name}</h5>
                                                        <p className="text-[var(--color-999999)] text-sm">{p.color == 'silver' ? "نقره ای" :
                                                                        p.color == 'blue' ? "آبی" :
                                                                        p.color == 'green' ? "سبز" :
                                                                        p.color == 'red' ? "قرمز" :
                                                                        p.color == 'white' ? "سفید" :
                                                                        p.color == 'black' ? "مشکی" :
                                                                        p.color == 'pink' ? "صورتی" : "--"}  / سایز  {p.size} </p>
                                                    </div>
                                                    <div className="w-[10%] flex items-center justify-center">{toPersianDigitsWithComma(p.price)} تومان</div>
                                            </div>
                                    })
                                }
                        </div>
                        <div className="flex flex-col pb-5 gap-5 border-b-2 border-b-[var(--color-eaeaea)]">
                            <div className="flex  items-center justify-between gap-5">
                                <p className="text-base font-bold">جمع سبد خرید</p>
                                <p className="text-base font-semibold"> {toPersianDigitsWithComma(totalPrice)} تومان</p>
                            </div>
                            <div className="flex  items-center justify-between gap-5">
                                <p className="text-base font-bold">هزینه ارسال</p>
                                <p className="text-base font-semibold">{toPersianDigitsWithComma(45000)} تومان</p>
                            </div>
                        </div>
                        <div className="flex  items-center justify-between gap-5">
                                <p className="text-base font-bold">مجموع : </p>
                                <p className="text-base font-semibold">{toPersianDigitsWithComma(totalPrice + 45000)} تومان</p>
                            </div>        
                    </div>
            </div>
       </Container>      
    </>
  )
}

export default Checkout



