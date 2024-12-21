import BreadCrumb from "@/components/BreadCrumb"
import Container from "@/components/Container";
import Input from "@/components/Input";
import Meta from "@/components/Meta"
import { iranCity, iranTowns } from "@/utils/iranCity";
import { toPersianDigitsWithComma } from "@/utils/toPersianDigits";
import { useFormik } from "formik";
import {  useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { TiArrowBack } from "react-icons/ti";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import * as Yup from "yup"


const AddProductSchema =Yup.object({
    firstName:Yup.string().required("ورود نام  الزامی است"),
    lastName:Yup.string().required("ورود  نام خانوادگی  الزامی است"),
    city:Yup.string().required('ورود استان الزامیست'),
    town:Yup.string().required('ورود  شهر الزامیست'),
    phoneNumber:Yup.number().required('ورود  شماره تلفن  الزامیست'),
    postalCode:Yup.number().required('ورود کد پستی الزامیست'),
    address: Yup.string().required('ورود  آدرس الزامیست'),
  })

const Checkout = () => {

    const formik = useFormik({
        initialValues:{
          firstName:'',
          lastName:'',
          city:'',
          town:'',
          phoneNumber:"",
          postalCode:"",
          address:"",
        },
        validationSchema:AddProductSchema,
        onSubmit:(values)=>{
    
          console.log(values);
          
        },
      })
    
    

    const {cart,totalPrice}=useSelector(state=>state.cart);
   

    const [grid, setGrid] = useState(8)
    const clacGrid = 12-grid;
    const toggleGrid=()=>{
        grid === 8 ? setGrid(4) : setGrid(8);
    }

    const irTowns=iranTowns(formik.values.city);
    const irCitys=iranCity();
    const location=useLocation();
    // console.log(location)


  return (
    <>
       <Meta title=" سبد خرید " /> 
        <BreadCrumb title=" سبد خرید " />
        <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className="grid grid-cols-12 gap-5">
                    <div className={`relative col-span-12 sm-custom3:col-span-12 sm:col-span-${grid} lg:col-span-6 transition-all duration-300 ease-linear`}>        
                        {
                           grid !== 8 && window.innerWidth>=640 && window.innerWidth<1024 ?
                            <div className="w-full h-full flex items-center justify-center" onClick={toggleGrid}>
                                <p className="text-2xl">
                                    برای <br/>وارد کردن <br/>اطلاعات  تماس <br/> کلیک کنید 
                                </p>
                            </div>
                            :
                            <div className="flex  flex-col gap-2">
                                    <nav className="mb-2 hidden lg:block">
                                        <ol className="lg:breadcrumb  text-base flex items-center">
                                            <li className="">
                                                <Link to='/cart' className="lg:text-white  "> سبد خرید</Link>
                                            </li>
                                            <li className={`${location.pathname == '/checkout' ? 'activeStage' : 'lg:text-white'} `}>
                                                <Link to='/checkout' className={`  `}> اطلاعات تماس</Link>
                                            </li>
                                            <li className="">
                                                <Link to='/' className="lg:text-white  "> شیوه ارسال</Link>
                                            </li>
                                            <li className="">
                                                <Link to='/' className="lg:text-white  ">   پرداخت</Link>
                                            </li>
                                        </ol>            
                                    </nav>
                                    <h4 className="font-bold">اطلاعات تماس </h4>
                                    <p className="flex flex-col  md:flex-row md:items-center md:gap-5">حساب کاربری  <span className="sm:text-sm md:text-base text-nowrap">( hamidsmoaser@yahoo.com )</span></p>
                                    <form className="w-full py-3 md:space-y-3 space-y-2">
                                    {/* نام و نام خانوادگی */}
                                        <div className={`md:w-full lg:w-[90%] flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-5 lg:gap-10`}>
                                            <div className={`w-full flex flex-col `}>
                                                <label htmlFor="firstName" className="">نام :</label>
                                                <Input
                                                 value={formik.values.firstName}
                                                 onChange={formik.handleChange}
                                                 onBlur={formik.handleBlur}
                                                 name="firstName" 
                                                 id="firstName"  
                                                 type="text"
                                                 class2="w-full" 
                                                 className={`w-full placeholder:text-sm  p-1 bg-white border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] `}  placeholder="نام"
                                                />
                                                <div className="text-rose-500 text-xs  min-h-[0.5rem] transition-all duration-300 ease-in-out">
                                                    {
                                                        formik.touched.firstName && formik.errors.firstName
                                                    }
                                                </div>
                                            </div>
                                            <div className="w-full flex flex-col">
                                                <label htmlFor="lastName" className="">نام خانوادگی  :</label>    
                                                <Input 
                                                 value={formik.values.lastName}
                                                 onChange={formik.handleChange}
                                                 onBlur={formik.handleBlur}
                                                 name="lastName" 
                                                 id='lastName' 
                                                 type="text" 
                                                 class2="w-full" 
                                                 className="w-full placeholder:text-sm  p-1 bg-white border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] "  placeholder="نام خانوادگی"
                                                />
                                                <div className="text-rose-500 text-xs  min-h-[0.5rem] transition-all duration-300 ease-in-out">
                                                    {
                                                        formik.touched.lastName && formik.errors.lastName
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    {/* انتخاب استان و شهر */}
                                        <div className="md:w-full lg:w-[90%] flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-5 lg:gap-10">
                                            <div className="w-fullflex flex-col">
                                                <label htmlFor="city" className="">استان :</label>
                                                <select 
                                                  value={formik.values.city}
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  name="city"
                                                  id="city" 
                                                  className="w-full  p-1 bg-white border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] "
                                                >
                                                        {
                                                        irCitys.map((spec,i)=>{
                                                            return <option key={i} value={spec[1]} className="first:text-xs">{spec[0]}</option>    
                                                        } ) 
                                                        }
                                                </select>
                                                <div className="text-rose-500 text-xs  min-h-[0.5rem] transition-all duration-300 ease-in-out">
                                                    {
                                                        formik.touched.city && formik.errors.city
                                                    }
                                                </div>
                                            </div>
                                            <div className="w-fullflex flex-col">
                                                <label htmlFor="town"  className="">شهر : {formik.errors.town &&' *'}</label>                
                                                <select 
                                                  value={formik.values.town}
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  name="town"
                                                  id="town" 
                                                  className="w-full p-1 bg-white  border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] "
                                                >
                                                    {
                                                    irTowns.map((spec,i)=>{
                                                        return <option key={i} value={spec[1]} className="first:text-xs">{spec[0]}</option>    
                                                    } )
                                                    }
                                                </select>
                                                <div className="text-rose-500 text-xs  min-h-[0.5rem] transition-all duration-300 ease-in-out">
                                                    {
                                                        formik.touched.town && formik.errors.town
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    {/* وارد کردن آدرس محل سکونت */}
                                        <div className="w-full  flex flex-col">
                                                <label htmlFor="address" className="">آدرس محل سکونت :</label>            
                                                <textarea
                                                 value={formik.values.address}
                                                 onChange={formik.handleChange}
                                                 onBlur={formik.handleBlur}
                                                 className= "w-full  placeholder:text-sm lg:w-[90%] bg-white border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] " 
                                                 name="address"
                                                 id="address" 
                                                 placeholder=" آدرس محل سکونت"
                                                />
                                                <div className="text-rose-500 text-xs  min-h-[1rem] transition-all duration-300 ease-in-out">
                                                    {
                                                        formik.touched.address && formik.errors.address
                                                    }
                                                </div>
                                        </div>            
                                    {/* شماره موبایل و کد پستی */}
                                        <div className="md:w-full lg:w-[90%] flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-5 lg:gap-10">
                                            <div className="w-full  flex flex-col">
                                                <label htmlFor="phoneNumber" className="">شماره تماس :</label>
                                                <Input 
                                                  value={formik.values.phoneNumber}
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  name="phoneNumber"
                                                  id="phoneNumber" 
                                                  type="tel" 
                                                  class2="w-full"
                                                  className="w-full placeholder:text-sm  p-1 text-right bg-white border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] "
                                                  placeholder="شماره موبایل"
                                                />
                                                <div className="text-rose-500 text-xs  min-h-[1rem] transition-all duration-300 ease-in-out">
                                                    {
                                                        formik.touched.phoneNumber && formik.errors.phoneNumber
                                                    }
                                                </div>
                                            </div>
                                            <div className="w-full  flex flex-col">
                                                <label htmlFor="postalCode" className="">کد پستی :</label>
                                                <Input 
                                                  value={formik.values.postalCode}
                                                  onChange={formik.handleChange}
                                                  onBlur={formik.handleBlur}
                                                  name="postalCode" 
                                                  id="postalCode" 
                                                  type="tel" 
                                                  class2="w-full" 
                                                  className="w-full placeholder:text-sm p-1 text-right bg-white border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] "  placeholder="کدپستی"
                                                />
                                                <div className="text-rose-500 text-xs  min-h-[1rem] transition-all duration-300 ease-in-out">
                                                    {
                                                        formik.touched.postalCode && formik.errors.postalCode
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    {/* دکمه تایید و بازگشت به فروشگاه */}
                                        <div className=" md:w-full lg:w-[90%] flex items-center justify-center md:justify-between md:gap-5 lg:gap-10">
                                            <Link to='/cart' className='hidden md:flex items-center gap-1 p-2 text-xs  text-black text-nowrap'> <TiArrowBack className='w-4 h-4 scale-x-[-1]' /> بازگشت به سبد خرید   </Link>
                                            <Link to='/checkout' className="sm-custom2:w-full sm-custom3:w-[70%] sm-custom3:mt-5 self-end w-52 bg-[var(--color-febd69)] text-nowrap text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white text-center px-2 py-1 rounded-xl transition-all duration-300 ease-in-out">
                                                        ادامه ثبت سفارش
                                            </Link>
                                        </div>
                                    </form>
                            </div>       
                        }   
                        <button 
                         className=" hidden sm:flex items-center justify-center lg:hidden absolute top-1/2 -left-8 w-6 h-6 rounded-full  bg-[var(--color-febd69)] transition-all duration-300 ease-linear animate-pulse hover:bg-black hover:text-[var(--color-febd69)]"
                         onClick={toggleGrid}                   
                        >
                            {
                              grid === 8 ?  <FaArrowRight /> : <FaArrowLeft />
                            }    
                        </button> 
                    </div>
                    <div className={`col-span-12 sm:col-span-${clacGrid} lg:col-span-6 space-y-5 pr-4 border-r border-r-[var(--color-999999)] `}>
                        {
                            clacGrid !== 8 && window.innerWidth>=640 && window.innerWidth<1024 ?
                                    <div className="w-full h-full flex items-center justify-center" onClick={toggleGrid}>
                                        <p className="text-2xl">
                                            برای <br/> نمایش <br/>سبد خرید <br/>کلیک کنید 
                                        </p>
                                    </div>
                                :
                                    <>
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
                                    </>
                        } 
                    </div>
            </div>
       </Container>      
    </>
  )
}

export default Checkout



