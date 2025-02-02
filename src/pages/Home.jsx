import {
      banner1,banner2,
      sbanner1,sbanner2,
      sbanner3,sbanner4,gift,
      discount,service1,service2,
      service3,service4,service5,
      service6,service7,service8,
      service9,service10,brand1,
      brand2,brand3,brand4,brand5,
      brand6,brand7,brand8,
      brand9,brand10,brand11,brand12,
} from "@/utils/myimages";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdPayment } from "react-icons/md";
import {  BiSupport } from "react-icons/bi"
import { toPersianDigits } from "@/utils/toPersianDigits"
import Marquee from "react-fast-marquee";
import BlogCart from "@/components/BlogCart";
import {famousProduct, selectionProduct} from "@/assets/data/data";
import ProductCart from "@/components/ProductCart";
import SpecialProduct from "@/components/SpecialProduct";
import FamousProduct from "@/components/FamousProduct";
import Meta from "@/components/Meta";
import Container from "@/components/Container";
import gsap from "gsap";
import { Carousel } from 'antd';
import { useEffect, useRef, useState } from "react";
import {useGSAP} from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDispatch, useSelector } from "react-redux";
import { getBlogs } from "@/features/BlogsSlice/blogSlice";
import { getAllProducts } from "@/features/ProductsSlice/productSlice";
import { useNavigate } from "react-router-dom";

const brands=[brand1,brand2,brand3,brand4,brand5,brand6,brand7,brand8,brand9,brand10,brand11,brand12];
gsap.registerPlugin(useGSAP,ScrollTrigger);
``

const Home = () => {
 
  const navigate=useNavigate();
  const slides=[banner1,banner2 ];
  const container=useRef();
  useGSAP(() => {
    // gsap code here...
    gsap.fromTo(
      ".hero1",
      { opacity: 0, x:500  ,y:200 }, // حالت اولیه
      {
        opacity: 1,
        x: 0,
        y:0,
        scrollTrigger: {
          trigger: ".hero1",
          start: "top bottom", // شروع انیمیشن
          end: "top center", // پایان انیمیشن
          toggleActions: "play none none reverse", // رفتار انیمیشن
        },
      }
    );
    gsap.fromTo(
      ".hero2",
      { opacity: 0, x:-500 ,y:200 }, // حالت اولیه
      {
        opacity: 1,
        x: 0,
        y:0,
        scrollTrigger: {
          trigger: ".hero2",
          start: "top bottom", // شروع انیمیشن
          end: "top center", // پایان انیمیشن
          toggleActions: "play none none reverse", // رفتار انیمیشن
        },
      }
    );
  }, { scope: container });

  const [isShaking, setIsShaking] = useState({  
    computer: false,  
    camera: false,  
    tv: false,  
    smartwatch: false,  
    accessories: false,  
    phone: false,  
    headset: false,  
    mobileAccessories: false,  
    speakers: false,  
    tablet: false,  
});  

const handleMouseEnter = (type) => {  
    setIsShaking(prev => ({ ...prev, [type]: true }));  
};  

const handleMouseLeave = (type) => {  
    setIsShaking(prev => ({ ...prev, [type]: false }));  
};  


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs())
    dispatch(getAllProducts())
  }, [dispatch]) 

  const {blogs}=useSelector(state=>state?.blog)
  const productState=useSelector(state=>state?.product?.products)
// console.log(productState)


  return (
    <main ref={container}>
      <Meta title=" فروشگاه اینترنتی دیجی مارکت " />
  {/* Hero Section */}
      {/* desktop */}
      <Container class1="hidden md:block py-5">
          <div className=" grid grid-cols-12 gap-5 px-5 ">
              <div className="hero1 col-span-12 sm:col-span-6 ">
                  <div className="main-hero w-full h-full rounded-md ">
                  </div>
              </div>
              <div className="hero2 col-span-12 sm:col-span-6 ">
                  <div className=" grid grid-cols-12 gap-5 w-full h-full">
                      <div className=" relative col-span-6  hover:scale-105 transition-all duration-300 ease-in-out">
                          
                              <img src={sbanner1} alt="" className=" rounded-md shadow-lg " />
                         
                      </div>
                      <div className=" relative col-span-6  hover:scale-105 transition-all duration-300 ease-in-out">
                          
                              <img src={sbanner2} alt="" className=" rounded-md shadow-lg" />
                          
                      </div>
                      <div className=" relative col-span-6  hover:scale-105 transition-all duration-300 ease-in-out">
                          
                              <img src={sbanner3} alt="" className=" rounded-md shadow-lg" />
                          
                      </div>
                      <div className=" relative col-span-6  hover:scale-105 transition-all duration-300 ease-in-out">
                          
                              <img src={sbanner4} alt="" className=" rounded-md shadow-lg" />
                          
                      </div>
                  </div>
              </div>
          </div>
      </Container>
      {/* mobile */}
      <Container class1="py-5 md:hidden">
          <div className="flex flex-col items-center justify-center gap-5 px-5 ">
              <div className=" w-full h-full  ">
              <Carousel autoplay>
                {slides.map((src, index) => (
                  <div key={index} >
                    <img
                      src={src}
                      alt={`Slide ${index + 1}`}
                      style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        marginBottom:'20px',
                        borderRadius:'6px',
                      }}
                    />
                  </div>
                ))}
              </Carousel>
              <div className="">
                  <div className=" grid grid-cols-12 gap-5 w-full h-full">
                      <div className=" relative col-span-6  hover:scale-105 transition-all duration-300 ease-in-out">
                         
                              <img src={sbanner1} alt="" className=" rounded-md shadow-lg " />
                         
                      </div>
                      <div className=" relative col-span-6  hover:scale-105 transition-all duration-300 ease-in-out">
                          
                              <img src={sbanner2} alt="" className=" rounded-md shadow-lg" />
                         
                      </div>
                      <div className=" relative col-span-6  hover:scale-105 transition-all duration-300 ease-in-out">
                          
                              <img src={sbanner3} alt="" className=" rounded-md shadow-lg" />
                          
                          
                      </div>
                      <div className=" relative col-span-6  hover:scale-105 transition-all duration-300 ease-in-out">
                          
                              <img src={sbanner4} alt="" className=" rounded-md shadow-lg" />
                        
                      </div>
                  </div>
              </div>
              </div>
          </div>
      </Container>
  {/* khadmat Section */} 
      <Container class1="py-5 bg-[var(--color-f5f5f7)]">
          {/* desktop */}
          <div className="hidden w-full md:flex items-center justify-between px-5 py-12">
                <div className="flex items-center gap-5">
                  <LiaShippingFastSolid className="w-14 h-14" />
                  <div className="flex flex-col gap-3">
                    <h6 className="font-bold text-xl text-nowrap">
                        ارسال رایگان
                    </h6>
                    <p className="text-nowrap text-sm">
                          سفارش بالای {toPersianDigits(1)} میلیون 
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <img src={gift} alt="" className="w-12 h-12" />
                  <div className="flex flex-col gap-3">
                    <h6 className="font-bold text-xl text-nowrap">
                      تخفیف شگفت انگیز 
                    </h6>
                    <p className="text-nowrap text-sm">
                              تا {toPersianDigits(25)}% تخفیف بگیرید
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <BiSupport className="w-12 h-12" />
                  <div className="flex flex-col gap-3">
                    <h6 className="font-bold text-xl text-nowrap">
                        {toPersianDigits(24)} / {toPersianDigits(7)}  
                    </h6>
                    <p className="text-nowrap text-sm">
                            کارشناس آنلاین
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <img src={discount} alt=""  className="w-12 h-12" />
                  <div className="flex flex-col gap-3">
                    <h6 className="font-bold text-xl text-nowrap">
                      قیمت مناسب
                    </h6>
                    <p className="text-nowrap text-sm">
                        قیمت کارخانه
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MdPayment className="w-12 h-12" />
                  <div className="flex flex-col gap-3">
                    <h6 className="font-bold text-xl text-nowrap">
                        پرداخت امن
                    </h6>
                    <p className="text-nowrap text-sm">
                    {toPersianDigits(100)}% ایمن
                    </p>
                  </div>
                </div>
          </div>
          {/* mobile */}
          <div className="block mx-5 md:hidden ">
                <Marquee className=" flex items-center justify-center  " direction="right" pauseOnHover>
                        
                        <div className="ml-14 flex items-center gap-5">
                          <LiaShippingFastSolid className="w-10 h-10" />
                          <div className="flex flex-col gap-3">
                            <h6 className="font-bold text-base text-nowrap">
                                ارسال رایگان
                            </h6>
                            <p className="text-nowrap text-sm">
                                  سفارش بالای {toPersianDigits(1)} میلیون 
                            </p>
                          </div>
                        </div>
                        <div className="ml-14 flex items-center gap-3">
                          <img src={gift} alt="" className="w-8 h-8" />
                          <div className="flex flex-col gap-3">
                            <h6 className="font-bold text-base text-nowrap">
                              تخفیف شگفت انگیز 
                            </h6>
                            <p className="text-nowrap text-sm">
                                      تا {toPersianDigits(25)}% تخفیف بگیرید
                            </p>
                          </div>
                        </div>
                        <div className="ml-14 flex items-center gap-3">
                          <BiSupport className="w-8 h-8" />
                          <div className="flex flex-col gap-3">
                            <h6 className="font-bold text-base text-nowrap">
                                {toPersianDigits(24)} / {toPersianDigits(7)}  
                            </h6>
                            <p className="text-nowrap text-sm">
                                    کارشناس آنلاین
                            </p>
                          </div>
                        </div>
                        <div className="ml-14 flex items-center gap-3">
                          <img src={discount} alt=""  className="w-8 h-8" />
                          <div className="flex flex-col gap-3">
                            <h6 className="font-bold text-base text-nowrap">
                              قیمت مناسب
                            </h6>
                            <p className="text-nowrap text-sm">
                                قیمت کارخانه
                            </p>
                          </div>
                        </div>
                        <div className="ml-14 flex items-center gap-3">
                          <MdPayment className="w-8 h-8" />
                          <div className="flex flex-col gap-3">
                            <h6 className="font-bold text-base text-nowrap">
                                پرداخت امن
                            </h6>
                            <p className="text-nowrap text-sm">
                            {toPersianDigits(100)}% ایمن
                            </p>
                          </div>
                        </div>
                  
                </Marquee>
          </div>
      </Container>
  {/* Category Section */}
      <Container class1="bg-[var(--color-f5f5f7)] py-5">
          {/* desktop */}
          <div className="w-full hidden md:flex items-center justify-between px-5">
              <div className="bg-white w-full shadow-md p-3 rounded-lg">
                  <div className="flex items-center flex-wrap">  
                    {/* کامپیوتر و لپ تاپ */}  
                            <div className="w-[20%]  px-2.5 py-2.5  border-l border-l-[var(--color-ededed)] border-b border-b-[var(--color-ededed)] flex items-center justify-between gap-4" onMouseEnter={() => handleMouseEnter('computer')} onMouseLeave={() => handleMouseLeave('computer')}>  
                                <div onClick={()=>navigate(`/product`, { state: { category: '67293dbb05bb2a23b912de8e' } })  }>  
                                    <h6 className="cursor-pointer font-extrabold" >کامپیوتر و لپ تاپ</h6>  
                                </div>  
                                <div className="h-20 flex items-center justify-center">  
                                    <img src={service1} alt="" className={`w-16 h-auto ${isShaking.computer ? 'shake' : ''}`} />  
                                </div>  
                            </div>  

                            {/* دوربین */}  
                            <div className="w-[20%]  px-2.5 py-2.5  border-l border-l-[var(--color-ededed)] border-b border-b-[var(--color-ededed)] flex items-center  justify-between gap-4" onMouseEnter={() => handleMouseEnter('camera')} onMouseLeave={() => handleMouseLeave('camera')}>  
                                <div onClick={()=>navigate(`/product`, { state: { category: '67293d5d05bb2a23b912de7e' } })  }>  
                                    <h6 className="cursor-pointer font-extrabold">دوربین</h6>  
                                </div>  
                                <div className="h-20 flex items-center justify-center">  
                                    <img src={service2} alt="" className={`w-16 h-auto ${isShaking.camera ? 'shake' : ''}`} />  
                                </div>  
                            </div>  

                            {/* تلویزیون هوشمند */}  
                            <div className="w-[20%]  px-2.5 py-2.5  border-l border-l-[var(--color-ededed)] border-b border-b-[var(--color-ededed)] flex items-center  justify-between gap-4" onMouseEnter={() => handleMouseEnter('tv')} onMouseLeave={() => handleMouseLeave('tv')}>  
                                <div>  
                                    <h6 className="cursor-pointer font-extrabold">تلویزیون هوشمند</h6>  
                                </div>  
                                <div className="h-20 flex items-center justify-center">  
                                    <img src={service3} alt="" className={`w-16 h-auto ${isShaking.tv ? 'shake' : ''}`} />  
                                </div>  
                            </div>  

                            {/* ساعت هوشمند */}  
                            <div className="w-[20%]  px-2.5 py-2.5  border-l border-l-[var(--color-ededed)] border-b border-b-[var(--color-ededed)] flex items-center  justify-between gap-4" onMouseEnter={() => handleMouseEnter('smartwatch')} onMouseLeave={() => handleMouseLeave('smartwatch')}>  
                                <div onClick={()=>navigate(`/product`, { state: { category: '67293dea05bb2a23b912de92' } })  }>  
                                    <h6 className="cursor-pointer font-extrabold">ساعت هوشمند</h6>  
                                </div>  
                                <div className="h-20 flex items-center justify-center">  
                                    <img src={service4} alt="" className={`w-20 h-auto ${isShaking.smartwatch ? 'shake' : ''}`} />  
                                </div>  
                            </div>  

                            {/* لوازم جانبی بازی */}  
                            <div className="w-[20%]  px-2.5 py-2.5   border-b border-b-[var(--color-ededed)] flex items-center  justify-between gap-4" onMouseEnter={() => handleMouseEnter('accessories')} onMouseLeave={() => handleMouseLeave('accessories')}>  
                                <div>  
                                    <h6 className="cursor-pointer font-extrabold">لوازم جانبی بازی</h6>  
                                </div>  
                                <div className="h-20 flex items-center justify-center">  
                                    <img src={service5} alt="" className={`w-16 h-auto ${isShaking.accessories ? 'shake' : ''}`} />  
                                </div>  
                            </div>  

                            {/* موبایل */}  
                            <div className="w-[20%]   px-2.5 py-2.5  border-l border-l-[var(--color-ededed)] flex items-center  justify-between gap-4" onMouseEnter={() => handleMouseEnter('phone')} onMouseLeave={() => handleMouseLeave('phone')}>  
                                <div onClick={()=>navigate(`/product`, { state: { category: '67293c8205bb2a23b912de72' } })  }>  
                                    <h6 className="cursor-pointer font-extrabold">موبایل</h6>  
                                </div>  
                                <div className="h-20 flex items-center justify-center">  
                                    <img src={service6} alt="" className={`w-10 h-auto ${isShaking.phone ? 'shake' : ''}`} />  
                                </div>  
                            </div>  

                            {/* هدفون */}  
                            <div className="w-[20%]   px-2.5 py-2.5  border-l border-l-[var(--color-ededed)] flex items-center  justify-between gap-4" onMouseEnter={() => handleMouseEnter('headset')} onMouseLeave={() => handleMouseLeave('headset')}>  
                                <div onClick={()=>navigate(`/product`, { state: { category: '67293d2305bb2a23b912de76' } })  }>  
                                    <h6 className="cursor-pointer font-extrabold">هدفون</h6>  
                                </div>  
                                <div className="h-20 flex items-center justify-center">  
                                    <img src={service7} alt="" className={`w-14 h-auto ${isShaking.headset ? 'shake' : ''}`} />  
                                </div>  
                            </div>  

                            {/* لوازم جانبی موبایل */}  
                            <div className="w-[20%]   px-2.5 py-2.5  border-l border-l-[var(--color-ededed)] flex items-center  justify-between gap-4" onMouseEnter={() => handleMouseEnter('mobileAccessories')} onMouseLeave={() => handleMouseLeave('mobileAccessories')}>  
                                <div>  
                                    <h6 className="cursor-pointer font-extrabold">لوازم جانبی موبایل</h6>  
                                </div>  
                                <div className="h-20 flex items-center justify-center">  
                                    <img src={service8} alt="" className={`w-16 h-auto ${isShaking.mobileAccessories ? 'shake' : ''}`} />  
                                </div>  
                            </div>  

                            {/* اسپیکر */}  
                            <div className="w-[20%]   px-2.5 py-2.5  border-l border-l-[var(--color-ededed)] flex items-center  justify-between gap-4" onMouseEnter={() => handleMouseEnter('speakers')} onMouseLeave={() => handleMouseLeave('speakers')}>  
                                <div onClick={()=>navigate(`/product`, { state: { category: '67293d6d05bb2a23b912de82' } })  }>  
                                    <h6 className="cursor-pointer font-extrabold">اسپیکر</h6>  
                                </div>  
                                <div className="h-20 flex items-center justify-center">  
                                    <img src={service9} alt="" className={`w-24 h-auto ${isShaking.speakers ? 'shake' : ''}`} />  
                                </div>  
                            </div>  

                            {/* تبلت */}  
                            <div className="w-[20%]   px-2.5 py-2.5  flex items-center  justify-between gap-4" onMouseEnter={() => handleMouseEnter('tablet')} onMouseLeave={() => handleMouseLeave('tablet')}>  
                                <div onClick={()=>navigate(`/product`, { state: { category: '67293d7a05bb2a23b912de86' } })  }>  
                                    <h6 className="cursor-pointer font-extrabold">تبلت</h6>  
                                </div>  
                                <div className="h-20 flex items-center justify-center">  
                                    <img src={service10} alt="" className={`w-14 h-auto ${isShaking.tablet ? 'shake' : ''}`} />  
                                </div>  
                            </div>  
                  </div>  
              </div>
          </div>
          {/* mobile */}
          <div className="w-full md:hidden flex items-center justify-between px-5   ">
                <div className="w-max flex items-center justify-between flex-wrap ">
                    <div className="w-[20%] sm-custom:w-[25%]  p-2.5 tooltip tooltip-bottom" data-tip="کامپیوتر و لپ تاپ">
                      <div className="h-20 w-20  sm-custom:h-14 sm-custom:w-14 sm-custom2:h-16 sm-custom2:w-16 bg-white hover:scale-125 transition-all duration-200 ease-linear cursor-pointer shadow-md border-2 border-[var(--color-febd69)] rounded-full flex items-center justify-center">
                        <img src={service1} alt="" className="w-16 sm-custom:w-14  h-auto" />
                      </div>                
                   </div>
                    <div className="w-[20%] sm-custom:w-[25%]  p-2.5  tooltip tooltip-bottom" data-tip="دوربین">
                      <div className="h-20 w-20  sm-custom:h-14 sm-custom:w-14 sm-custom2:h-16 sm-custom2:w-16 bg-white hover:scale-125 transition-all duration-200 ease-linear cursor-pointer shadow-md border-2 border-[var(--color-febd69)] rounded-full flex items-center justify-center">
                         <img src={service2} alt="" className="w-16 sm-custom:w-14 h-auto" />
                      </div>                
                   </div>
                    <div className="w-[20%] sm-custom:w-[25%]  p-2.5  tooltip tooltip-bottom" data-tip="تلویزیون هوشمند">
                      <div className="h-20 w-20  sm-custom:h-14 sm-custom:w-14 sm-custom2:h-16 sm-custom2:w-16 bg-white hover:scale-125 transition-all duration-200 ease-linear cursor-pointer shadow-md border-2 border-[var(--color-febd69)] rounded-full flex items-center justify-center">
                         <img src={service3} alt="" className="w-16 sm-custom:w-14 h-auto" />
                      </div>                
                   </div>
                    <div className="w-[20%] sm-custom:w-[25%]  p-2.5  tooltip tooltip-bottom" data-tip="ساعت هوشمند">
                      <div className="h-20 w-20  sm-custom:h-14 sm-custom:w-14 sm-custom2:h-16 sm-custom2:w-16 bg-white hover:scale-125 transition-all duration-200 ease-linear cursor-pointer shadow-md border-2 border-[var(--color-febd69)] rounded-full flex items-center justify-center">
                       <img src={service4} alt="" className="w-20 sm-custom:w-16 h-auto" />
                      </div>                
                   </div>
                    <div className="w-[20%] sm-custom:w-[25%]  p-2.5  tooltip tooltip-bottom" data-tip="لوازم جانبی بازی" >
                      <div className="h-20 w-20  sm-custom:h-14 sm-custom:w-14 sm-custom2:h-16 sm-custom2:w-16 bg-white hover:scale-125 transition-all duration-200 ease-linear cursor-pointer shadow-md border-2 border-[var(--color-febd69)] rounded-full flex items-center justify-center">
                        <img src={service5} alt="" className="w-16 sm-custom:w-14 h-auto " />
                      </div>                
                    </div>
                    <div className="w-[20%] sm-custom:w-[25%]   p-2.5  tooltip tooltip-bottom" data-tip=" موبایل و تبلت ">
                      <div className="h-20 w-20  sm-custom:h-14 sm-custom:w-14 sm-custom2:h-16 sm-custom2:w-16 bg-white hover:scale-125 transition-all duration-200 ease-linear cursor-pointer shadow-md border-2 border-[var(--color-febd69)] rounded-full flex items-center justify-center">
                        <img src={service6} alt="" className="w-10 sm-custom:w-8 h-auto" />
                      </div>
                    </div>
                    <div className="w-[20%] sm-custom:w-[25%]  p-2.5  tooltip tooltip-bottom" data-tip="هدفون">
                      <div className="h-20 w-20  sm-custom:h-14 sm-custom:w-14 sm-custom2:h-16 sm-custom2:w-16 bg-white hover:scale-125 transition-all duration-200 ease-linear cursor-pointer shadow-md border-2 border-[var(--color-febd69)] rounded-full flex items-center justify-center">
                       <img src={service7} alt="" className="w-14 sm-custom:w-12 h-auto" />
                      </div>
                    </div>
                    <div className="w-[20%] sm-custom:w-[25%]  p-2.5  tooltip tooltip-bottom" data-tip=" لوازم جانبی موبایل">
                      <div className="h-20 w-20  sm-custom:h-14 sm-custom:w-14 sm-custom2:h-16 sm-custom2:w-16 bg-white hover:scale-125 transition-all duration-200 ease-linear cursor-pointer shadow-md border-2 border-[var(--color-febd69)] rounded-full flex items-center justify-center">
                        <img src={service8} alt="" className="w-16 sm-custom:w-14 h-auto" />
                      </div>
                    </div>
                    <div className="w-[20%] sm-custom:w-[25%]  p-2.5  tooltip tooltip-bottom" data-tip="اسپیکر">
                      <div className="h-20 w-20  sm-custom:h-14 sm-custom:w-14 sm-custom2:h-16 sm-custom2:w-16 bg-white hover:scale-125 transition-all duration-200 ease-linear cursor-pointer shadow-md border-2 border-[var(--color-febd69)] rounded-full flex items-center justify-center">
                        <img src={service9} alt="" className="w-24 sm-custom:w-22 h-auto" />
                      </div>
                    </div>
                    <div className="w-[20%] sm-custom:w-[25%]  p-2.5  tooltip tooltip-bottom" data-tip="لوازم خانگی">
                      <div className="h-20 w-20  sm-custom:h-14 sm-custom:w-14 sm-custom2:h-16 sm-custom2:w-16 bg-white hover:scale-125 transition-all duration-200 ease-linear cursor-pointer shadow-md border-2 border-[var(--color-febd69)] rounded-full flex items-center justify-center">
                        <img src={service10} alt="" className="w-12 h-auto" />
                      </div>
                    </div>
                
                </div>
          </div>
      </Container>
  {/* Featured Section */}
      <Container class1="bg-[var(--color-f5f5f7)]  py-5">
          <div className=" px-5 mb-5 font-extrabold text-xl">
                <h3 className="">   منتخب محصولات </h3>
          </div>
          <div className="grid grid-cols-12 gap-5 px-5">
            {
               productState.filter(product => product.tags.includes('popular')).map((p,i)=><ProductCart key={i} dataSelection={p} />)
            }
          </div>
      </Container>
  {/* famous Section */}
      <Container class1="bg-[var(--color-f5f5f7)]  py-5">
          <div className=" px-5 mb-5 font-extrabold text-xl">
                <h3 className="">    محصولات محبوب </h3>
          </div>
          <div className="famousProduct  grid grid-cols-12 gap-5 px-5">
            {
              famousProduct.map((p,i)=><FamousProduct key={i} dataFamous={p} />)
            }
          </div>
      </Container>            
  {/* Special Section */}
      <Container class1="bg-[var(--color-f5f5f7)]  py-5">
          <div className=" px-5 mb-5 font-extrabold text-xl">
                <h3 className="">    محصولات ویژه تخفیف و حراج </h3>
          </div>
          <div className="grid grid-cols-12 gap-5 px-5">
            {
              selectionProduct.slice(6,12).map((p,i)=><SpecialProduct key={i} dataSpecial={p} />)
            }
          </div>
      </Container>
  {/* Marquee Section */}
      <Container class1="bg-[var(--color-f5f5f7)] sm-custom:py-2 py-5">
          <div className="bg-white shadow-xl p-4 sm-custom:py-1 mx-5 rounded-md my-3 ">
            <Marquee className="flex items-center justify-center" direction="right" pauseOnHover>
                {
                  brands.map((brand)=>{
                    return  <div key={brand} className="mx-6 sm-custom:mx-4 sm:mx-10 w-24  sm:w-26 md:w-32">
                              <img src={brand} alt="brand" className="" />
                            </div>
                  })
                }
            </Marquee>
          </div>
      </Container>
  {/* Blogs Section */}
      <Container class1="bg-[var(--color-f5f5f7)]  py-5" >
          <div className=" px-5 mb-5 font-extrabold text-xl">
                <h3 className=""> مطالب اخیر سایت</h3>
          </div>
          <div className="grid grid-cols-12 gap-5 px-5">
            {
              blogs.map((blog,i)=><BlogCart key={i} dataBlog={blog}  />)
            }
          </div> 
      </Container>     
    </main>
  )
}

export default Home