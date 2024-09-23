import { Link } from "react-router-dom"
import {
      banner1,sbanner1,sbanner2,
      sbanner3,sbanner4,gift,
      discount,service1,service2,
      service3,service4,service5,
      service6,service7,service8,
      service9,service10,brand1,
      brand2,brand3,brand4,brand5,
      brand6,brand7,brand8,
      brand9,brand10,brand11,
} from "@/utils/myimages"
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdPayment } from "react-icons/md";
import { BsArrowLeft } from "react-icons/bs"
import {  BiSupport } from "react-icons/bi"
import { toPersianDigits } from "@/utils/toPersianDigits"
import Marquee from "react-fast-marquee";
import BlogCart from "@/components/BlogCart";
import {blogs, famousProduct, selectionProduct} from "@/assets/data/data";
import ProductCart from "@/components/ProductCart";
import SpecialProduct from "@/components/SpecialProduct";
import FamousProduct from "@/components/FamousProduct";
import Meta from "@/components/Meta";
import Container from "@/components/Container";

const Home = () => {
  return (
    <main>
      <Meta title=" فروشگاه اینترنتی دیجی مارکت " />
  {/* Hero Section */}
      <Container class1="py-5">
          <div className="grid grid-cols-12 gap-5 px-5">
              <div className="relative col-span-6 ">
                  <div className="w-full h-full">
                      <img src={banner1} alt="" className=" w-full h-full rounded-md " />
                  </div>
                  <div className=" absolute top-[20%] left-[10%] font-extrabold flex flex-col gap-5">
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
      </Container>
  {/* khadmat Section */} 
      <Container class1="py-5 bg-[var(--color-f5f5f7)]">
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
      </Container>
  {/* Category Section */}
      <Container class1="bg-[var(--color-f5f5f7)] py-5">
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
      </Container>
  {/* Featured Section */}
      <Container class1="bg-[var(--color-f5f5f7)]  py-5">
          <div className=" px-5 mb-5 font-extrabold text-xl">
                <h3 className="">   منتخب محصولات </h3>
          </div>
          <div className="grid grid-cols-12 gap-5 px-5">
            {
              selectionProduct.slice(0,6).map((p,i)=><ProductCart key={i} dataSelection={p} />)
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
      <Container class1="bg-[var(--color-f5f5f7)] py-5">
          <div className="bg-white shadow-xl p-4 mx-5 rounded-md my-3 ">
            <Marquee className="flex items-center justify-center" direction="right" pauseOnHover>
              <div className="mx-10 w-32">
                <img src={brand1} alt="brand" className="" />
              </div>
              <div className="mx-10 w-32">
                <img src={brand2} alt="brand" className="" />
              </div>
              <div className="mx-10 w-32">
                <img src={brand3} alt="brand" className="" />
              </div>
              <div className="mx-10 w-32">
                <img src={brand4} alt="brand" className="" />
              </div>
              <div className="mx-10 w-32">
                <img src={brand5} alt="brand" className="" />
              </div>
              <div className="mx-10 w-32">
                <img src={brand6} alt="brand" className="" />
              </div>
              <div className="mx-10 w-32">
                <img src={brand7} alt="brand" className="" />
              </div>
              <div className="mx-10 w-32">
                <img src={brand8} alt="brand" className="" />
              </div>
              <div className="mx-10 w-24">
                <img src={brand9} alt="brand" className="" />
              </div>
              <div className="mx-10 w-32">
                <img src={brand10} alt="brand" className="" />
              </div>
              <div className="mx-10 w-32">
                <img src={brand11} alt="brand" className="" />
              </div>
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
              blogs.map((blog,i)=><BlogCart key={i} dataBlog={blog} grid="3" />)
            }
          </div> 
      </Container>     
    </main>
  )
}

export default Home