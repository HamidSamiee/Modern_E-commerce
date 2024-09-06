import BreadCrumb from "@/components/BreadCrumb"
import Meta from "@/components/Meta"
import { toPersianDigits } from "@/utils/toPersianDigits"
import {AiOutlineHome, AiOutlineMail} from "react-icons/ai"
import { BiInfoCircle, BiPhoneCall } from "react-icons/bi"
import { Link } from "react-router-dom"

const Contact = () => {
  return (
    <>
      <Meta title=" تماس با ما " /> 
      <BreadCrumb title=" تماس با ما " />
      <div className="py-5 bg-[var(--color-f5f5f7)]">
            <div className="container xl:max-w-screen-xl">
                <div className="grid grid-cols-12 gap-5">
                  {/* google map */}
                  <div className="col-span-12">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1674.1772759001317!2d50.121425649613364!3d32.941647430526054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1725621790615!5m2!1sen!2s"
                        height="450"
                        className="border-none w-full"
                        allowfullscreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    >
                    </iframe>
                  </div>
                  <div className="col-span-12 mt-5 p-5 rounded-lg gap-3 bg-white">
                      <div className="flex items-center justify-between">
                          <div className="w-[48%]">
                              <h3 className="font-bold text-2xl leading-9 text-right mb-4">
                            ارتباط با ما
                              </h3>
                              <form  className="flex flex-col gap-5">
                                <input type="text" className="bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent "  placeholder="نام و نام خانوادگی"/>
                                <input type="email" className="bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent "  placeholder="آدرس پست الکترونیکی"/>
                                <input type="tel" className="bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent  text-right"  placeholder="شماره موبایل"/>
                                <textarea className="bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent " name="" id="" cols="30" rows="5" placeholder="نظرات">

                                </textarea>
                                <button className="self-end w-fit px-2 py-1 rounded-full bg-[var(--color-febd69)]">
                                  ارسال
                                </button>
                              </form>
                          </div>
                          <div className="w-[48%]">
                              <h3 className="font-bold text-2xl leading-9 text-right mb-5">
                              با ما تماس بگیرید
                              </h3>
                              <div className="">
                                <ul className="">
                                  <li className="mb-4 flex items-center gap-3">
                                    <AiOutlineHome className="w-5 h-5"/>
                                    <address className="text-sm">
                                     استان اصفهان - شهرستان فریدونشهر
-                                    فروشگاه اینترنتی دیجی مارکت
                                    </address>
                                  </li>
                                  <li className="mb-4 flex items-center gap-3">
                                    <BiPhoneCall className="w-5 h-5"/>
                                    <Link className="" to='tel:0913 973 4679' >
                                          {toPersianDigits(0) + toPersianDigits(9139734679)}
                                    </Link>  
                                  </li>
                                  <li className="mb-4 flex items-center gap-3">
                                    <AiOutlineMail className="w-5 h-5"/>
                                    <Link className="" to='mailto:Dgmarket@gmail.com' >
                                        Dgmarket@gmail.com
                                    </Link>
                                  </li>
                                  <li className="mb-4 flex items-center gap-3">
                                    <BiInfoCircle className="w-5 h-5"/>
                                    <p className=""> 
                                      {
                                         toPersianDigits(10)
                                      }
                                      &nbsp;
                                      مرداد 
                                      &nbsp;                     
                                      {
                                         toPersianDigits(1403)
                                      }
                                    </p>
                                  </li>
                                </ul>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
            </div>
       </div>  
    </>
  )
}

export default Contact