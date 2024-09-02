import { toPersianDigits } from "@/utils/toPersianDigits"
import { BsGithub, BsInstagram, BsLinkedin, BsSend, BsYoutube } from "react-icons/bs"
import { Link } from "react-router-dom"


const Footer = () => {
  return (
    <>
    <footer className="bg-[var(--color-232f3e)] py-4">
        <section className="container xl:max-w-screen-xl">
            <div className="grid grid-cols-12 place-items-center text-white py-4">
              <div className="col-span-5 flex items-center gap-x-4">
                  <BsSend className="w-10 h-10 text-[var(--color-febd69)]" />
                  <h2 className="text-2xl font-extrabold">عضویت در خبرنامه</h2>
              </div>
              <div className="pl-10 col-span-6 w-full">
                <div className="relative w-full mx-auto ">
                    <input className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="search" placeholder="ایمیل تان را وارد کنید" />
                    <button className="absolute inset-y-0 left-0 flex items-center p-3 text-gray-700 bg-[var(--color-febd69)]   border border-gray-300 rounded-l-md hover:bg-[var(--color-febd69)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      اشتراک
                    </button>
                </div>
              </div>
            </div>
        </section>
    </footer>
    <footer className="bg-[var(--color-232f3e)] py-4 border-t border-t-[var(--color-3b4149)]">
        <section className="container xl:max-w-screen-xl">
            <div className="grid grid-cols-12 gap-10 text-white">
            <div className="col-span-3">
                <h2 className="mb-4 font-extrabold text-xl">
                      اپلیکیشن ما
                </h2>
                <ul className="mb-4">

                </ul>
              </div>
              <div className="col-span-2">
                <h2 className="mb-4 font-extrabold text-xl">
                      دسترسی سریع
                </h2>
                <ul className="">
                    <li className="mb-1 py-2">
                      <Link to='' className="">
                          لپ تاپ
                      </Link>
                    </li>
                    <li className="mb-1 py-2">
                      <Link to='' className="">
                            موبایل
                      </Link>
                    </li>
                    <li className="mb-1 py-2">
                      <Link to='' className="">
                            تبلت
                      </Link>
                    </li>
                    <li className="mb-1 py-2">
                      <Link to='' className="">
                            هدفون
                      </Link>
                    </li>
                    <li className="mb-1 py-2">
                      <Link to='' className="">
                             ساعت هوشمند
                      </Link>
                    </li>
                </ul>
              </div>
              <div className="col-span-2">
                <h2 className="mb-4 font-extrabold text-xl">
                      اکانت
                </h2>
                <ul className="">
                    <li className="mb-1 py-2">
                      <Link to='' className="">
                          درباره ما
                      </Link>
                    </li>
                    <li className="mb-1 py-2">
                      <Link to='' className="">
                            سوالات متداول
                      </Link>
                    </li>
                    <li className="mb-1 py-2">
                      <Link to='' className="">
                            تماس با ما
                      </Link>
                    </li>
                </ul>
              </div>
              <div className="col-span-2">
                <h2 className="mb-4 font-extrabold text-xl">
                     اطلاعات   
                </h2>
                <ul className="">
                <li className="mb-1 py-2">
                      <Link to='' className="">
                          حریم خصوصی
                      </Link>
                    </li>
                    <li className="mb-1 py-2">
                      <Link to='' className="">
                             استرداد پول
                      </Link>
                    </li>
                    <li className="mb-1 py-2">
                      <Link to='' className="">
                            سیاست های فروشگاه
                      </Link>
                    </li>
                    <li className="mb-1 py-2">
                      <Link to='' className="">
                            قوانین و مقررات فروشگاه
                      </Link>
                    </li>
                    <li className="mb-1 py-2">
                      <Link to='' className="">
                            وبلاگ
                      </Link>
                    </li>
                </ul>
              </div>
              <div className="col-span-3">
                <h2 className="mb-4 font-extrabold text-xl"> 
                        تماس با ما                
                </h2>
                <div className="mb-1 py-2 space-y-3">
                  <address >
                    آدرس : اصفهان - شهرستان فریدونشهر 
                    <br />
                    <span className="font-bold">فروشگاه اینترنتی دیجی مارکت</span>
                  </address>
                  <div className="flex items-center justify-between">
                      <span className=""> کد پستی :</span>
                      <span className=""> {toPersianDigits(1111111111)}</span>
                  </div>
                  <div className="text-left flex items-center justify-between">
                      <span className=""> تلفن :</span>
                      <span className="">
                        <Link className="" to='tel:0913 973 4679' >
                        {toPersianDigits(0) + toPersianDigits(9139734679)}
                        </Link>  
                      </span>
                  </div>
                  <div className="text-left flex items-center justify-between ">
                      <span className=""> ایمیل :</span>
                      <span className="">
                        <Link className="" to='mailto:Dgmarket@gmail.com' >
                             Dgmarket@gmail.com
                        </Link>  
                      </span>
                  </div>
                </div>
                <div className="flex items-center flex-row-reverse gap-10 text-2xl mt-3">
                    <Link className="">
                        <BsLinkedin />
                    </Link>
                    <Link className="">
                        <BsInstagram />
                    </Link>
                    <Link className="">
                        <BsGithub />
                    </Link>
                    <Link className="">
                        <BsYoutube />
                    </Link>
                  </div>
              </div>
            </div>
        </section>
    </footer>
    <footer className="bg-[var(--color-232f3e)] py-4 border-t border-t-[var(--color-3b4149)] ">
        <section className="container xl:max-w-screen-xl">
          <div className="grid grid-cols-12">
            <div className="col-span-12">
                <p className="text-center text-white">
                  تمام حقوق متعلق به « گرجیان سوپل » است   {toPersianDigits(new Date().getFullYear()) } &copy; 
                </p>
            </div>
          </div>
        </section>        
    </footer>
    </>
  )
}

export default Footer