import { Link } from "react-router-dom"
import banner1 from "@assets/images/main-banner1.webp"
import sbanner1 from "@assets/images/small-banner1.webp"
import sbanner2 from "@assets/images/small-banner2.webp"
import sbanner3 from "@assets/images/small-banner3.webp"
import sbanner4 from "@assets/images/small-banner4.webp"
import gift from "@assets/images/gift.png"
import discount from "@assets/images/discont.png"
import service1 from "@assets/images/service1.png"
import service2 from "@assets/images/service2.png"
import service3 from "@assets/images/service3.png"
import service4 from "@assets/images/service4.png"
import service5 from "@assets/images/service5.png"
import service6 from "@assets/images/service6.png"
import service7 from "@assets/images/service7.png"
import service8 from "@assets/images/service8.png"
import service9 from "@assets/images/service9.png"
import service10 from "@assets/images/service10.png"

import { LiaShippingFastSolid } from "react-icons/lia";
import { MdPayment } from "react-icons/md";

import { BsArrowLeft } from "react-icons/bs"
import {  BiSupport } from "react-icons/bi"
import { toPersianDigits } from "@/utils/toPersianDigits"

const Home = () => {
  return (
    <main>
      <section className="py-5 ">
        <div className="container xl:max-w-screen-xl">
          <div className="grid grid-cols-12 gap-5 px-5">
            <div className="relative col-span-6 ">
                <div className="w-full h-full">
                    <img src={banner1} alt="" className=" w-full h-full rounded-md " />
                </div>
                <div className=" absolute top-[20%] border-l border-l-[var(--color-ededed)] left-[10%] font-extrabold flex flex-col gap-5">
                  <h4 className="text-6xl text-center">
                      Samsung 
                  </h4>
                  <h5 className="text-3xl text-center mb-10 ">
                    Galexy S24 Ultra
                  </h5>
                  <Link className="flex items-center gap-2 mx-20 text-center text-xl bg-[var(--color-febd69)] rounded-full px-2 py-1 animate-pulse" >
                          خرید کنید  <BsArrowLeft  className="bg-white rounded-full font-medium"/> 
                  </Link>
                </div>
            </div>
            <div className="col-span-6 ">
                <div className="grid grid-cols-12 gap-5 w-full h-full">
                    <div className="relative col-span-6  hover:scale-105 transition-all duration-300 ease-in-out">
                        <div className="">
                            <img src={sbanner1} alt="" className=" rounded-md shadow-lg " />
                        </div>
                        <div className=" absolute top-[20%] left-[10%] font-extrabold flex flex-col gap-5">
                          <h4 className=" text-center text-rose-800">
                              بهترین قیمت ها 
                          </h4>
                          <p className=" text-center ">
                             لپ تاپ های 
                          </p>
                          <p className="text-center text-lg">
                            ASUS
                          </p>
                        </div>
                    </div>
                    <div className="relative col-span-6  hover:scale-105 transition-all duration-300 ease-in-out">
                        <div className="">
                            <img src={sbanner2} alt="" className=" rounded-md shadow-lg" />
                        </div>
                        <div className=" absolute top-[20%] left-[10%] font-extrabold flex flex-col gap-5">
                          <h4 className=" text-center text-rose-800">
                              محصول جدید
                          </h4>
                          <p className=" text-center ">
                             تبلت {toPersianDigits(11)} اینچی اپل
                          </p>
                          <p className="text-center text-lg">
                            iPad Air 2024 M2
                          </p>
                        </div>
                    </div>
                    <div className="relative col-span-6  hover:scale-105 transition-all duration-300 ease-in-out">
                        <div className="">
                            <img src={sbanner3} alt="" className=" rounded-md shadow-lg" />
                        </div>
                        <div className=" absolute top-[20%] left-[7%] font-extrabold flex flex-col gap-5">
                          <h4 className=" text-center text-rose-800">
                              تجربه ای خاص و دلپذیر
                          </h4>
                          <p className=" text-center ">
                             هدفون بلوتوثی اپل 
                          </p>
                          <p className="text-center text-lg">
                             AirPods Max
                          </p>
                        </div>
                    </div>
                    <div className="relative col-span-6  hover:scale-105 transition-all duration-300 ease-in-out">
                        <div className="">
                            <img src={sbanner4} alt="" className=" rounded-md shadow-lg" />
                        </div>
                        <div className=" absolute top-[20%] left-[7%] font-extrabold flex flex-col gap-5">
                         <h4 className=" text-center text-rose-800">
                              %{toPersianDigits(15)} تخفیف
                          </h4>
                          <p className=" text-center ">
                            ساعت هوشمند اپل
                          </p>
                          <p className="text-center text-lg">
                             Series 7
                          </p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 bg-[var(--color-f5f5f7)]">
        <div className="container xl:max-w-screen-xl ">
          <div className="w-full flex items-center justify-between px-5 py-12">
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
        </div>
      </section>
      <section className=" bg-[var(--color-f5f5f7)] pb-5 ">
        <div className="container xl:max-w-screen-xl">
          <div className="w-full flex items-center justify-between px-5">
              <div className="bg-white w-full shadow-md p-3 rounded-lg">
                <div className="flex items-center flex-wrap">
                    <div className="w-[20%] px-2.5 py-2.5  border-l border-l-[var(--color-ededed)] border-b border-b-[var(--color-ededed)] flex items-center justify-center gap-4">
                      <div className="w-[60%] flex flex-col gap-2">
                        <h6 className="font-extrabold">
                              کامپیوتر و لپ تاپ
                        </h6>
                        <p className="text-gray-400">
                             {toPersianDigits(8)}  مورد
                        </p>
                      </div>
                      <div className="h-20 flex items-center justify-center">
                        <img src={service1} alt="" className="w-16 h-auto" />
                      </div>                
                   </div>
                    <div className="w-[20%] px-2.5 py-2.5  border-l border-l-[var(--color-ededed)] border-b border-b-[var(--color-ededed)] flex items-center justify-center gap-4">
                      <div className="w-[60%] flex flex-col gap-2">
                        <h6 className="font-extrabold">
                              دوربین
                        </h6>
                        <p className="text-gray-400">
                        {toPersianDigits(10)} مورد
                        </p>
                      </div>
                      <div className="h-20 flex items-center justify-center">
                        <img src={service2} alt="" className="w-16 h-auto" />
                      </div>                
                   </div>
                    <div className="w-[20%] px-2.5 py-2.5  border-l border-l-[var(--color-ededed)] border-b border-b-[var(--color-ededed)] flex items-center justify-center gap-4">
                      <div className="w-[60%] flex flex-col gap-2">
                        <h6 className="font-extrabold">
                              تلویزیون هوشمند
                        </h6>
                        <p className="text-gray-400">
                        {toPersianDigits(13)} مورد
                        </p>
                      </div>
                      <div className="h-20 flex items-center justify-center">
                        <img src={service3} alt="" className="w-16 h-auto" />
                      </div>                
                   </div>
                    <div className="w-[20%] px-2.5 py-2.5  border-l border-l-[var(--color-ededed)] border-b border-b-[var(--color-ededed)] flex items-center justify-center gap-4">
                      <div className="w-[60%] flex flex-col gap-2">
                        <h6 className="font-extrabold">
                              ساعت هوشمند
                        </h6>
                        <p className="text-gray-400">
                        {toPersianDigits(12)} مورد
                        </p>
                      </div>
                      <div className="h-20 flex items-center justify-center">
                        <img src={service4} alt="" className="w-20 h-auto" />
                      </div>                
                   </div>
                    <div className="w-[20%] px-2.5 py-2.5   border-b border-b-[var(--color-ededed] flex items-center justify-center gap-4">
                      <div className="w-[60%] flex flex-col gap-2">
                        <h6 className="font-extrabold">
                              لوازم جانبی بازی 
                        </h6>
                        <p className="text-gray-400">
                        {toPersianDigits(4)}  مورد
                        </p>
                      </div>
                      <div className="h-20 flex items-center justify-center">
                        <img src={service5} alt="" className="w-16 h-auto " />
                      </div>                
                    </div>
                    <div className="w-[20%]  px-2.5 py-2.5  border-l border-l-[var(--color-ededed)] flex items-center  justify-center gap-4">
                      <div className="w-[60%] flex flex-col gap-2">
                        <h6 className="font-extrabold">
                              موبایل و تبلت
                        </h6>
                        <p className="text-gray-400">
                        {toPersianDigits(5)}  مورد
                        </p>
                      </div>
                      <div className="h-20 flex items-center justify-center">
                        <img src={service6} alt="" className="w-10 h-auto" />
                      </div>
                    </div>
                    <div className="w-[20%] px-2.5 py-2.5  border-l border-l-[var(--color-ededed)] flex items-center justify-center gap-4">
                      <div className="w-[60%] flex flex-col gap-2">
                        <h6 className="font-extrabold">
                              هدفون
                        </h6>
                        <p className="text-gray-400">
                        {toPersianDigits(6)}  مورد
                        </p>
                      </div>
                      <div className="h-20 flex items-center justify-center">
                        <img src={service7} alt="" className="w-14 h-auto" />
                      </div>
                    </div>
                    <div className="w-[20%] px-2.5 py-2.5  border-l border-l-[var(--color-ededed)] flex items-center justify-center gap-4">
                      <div className="w-[60%] flex flex-col gap-2">
                        <h6 className="font-extrabold">
                              لوازم جانبی موبایل
                        </h6>
                        <p className="text-gray-400">
                        {toPersianDigits(10)}  مورد
                        </p>
                      </div>
                      <div className="h-20 flex items-center justify-center">
                        <img src={service8} alt="" className="w-16 h-auto" />
                      </div>
                    </div>
                    <div className="w-[20%] px-2.5 py-2.5  border-l border-l-[var(--color-ededed)] flex items-center justify-center gap-4">
                      <div className="w-[60%] flex flex-col gap-2">
                        <h6 className="font-extrabold">
                              اسپیکر
                        </h6>
                        <p className="text-gray-400">
                        {toPersianDigits(8)}  مورد
                        </p>
                      </div>
                      <div className="h-20 flex items-center justify-center">
                        <img src={service9} alt="" className="w-24 h-auto" />
                      </div>
                    </div>
                    <div className="w-[20%] px-2.5 py-2.5   flex items-center justify-center gap-4">
                      <div className="w-[60%] flex flex-col gap-2">
                        <h6 className="font-extrabold">
                              لوازم خانگی
                        </h6>
                        <p className="text-gray-400">
                        {toPersianDigits(6)}  مورد
                        </p>
                      </div>
                      <div className="h-20 flex items-center justify-center">
                        <img src={service10} alt="" className="w-14 h-auto" />
                      </div>
                    </div>
                </div>
              </div> 
          </div>
        </div>  
      </section>           
    </main>
  )
}

export default Home