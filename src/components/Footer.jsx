import { subscribeToNewsletter } from "@/features/newsSlice/newsletterReducer";
import { toPersianDigits } from "@/utils/toPersianDigits"
import { useState } from "react";
import { BsGithub, BsInstagram, BsLinkedin, BsSend, BsYoutube } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom"


const Footer = () => {

  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.newsletter);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== "") {
      dispatch(subscribeToNewsletter(email));
      setEmail(""); // Clear input after dispatch
    }
  };

  

  return (
    <>
    <footer className="bg-[var(--color-232f3e)] py-4">
        <section className="container xl:max-w-screen-xl">
            <div className="grid grid-cols-12 place-items-center text-white py-4">
              <div className="col-span-12  md:col-span-5 flex items-center gap-x-4">
                  <BsSend className="w-6 h-6  md:w-10 md:h-10 text-[var(--color-febd69)]" />
                  <h2 className="text-xl md:text-2xl font-extrabold">عضویت در خبرنامه</h2>
              </div>
              <div className="px-5 mt-2 md:mt-0 md:pl-10 col-span-12 md:col-span-6 w-full">
                  <div className="relative w-full mx-auto">
                    {/* Form for email subscription */}
                    <form onSubmit={handleSubmit} className="w-full">
                      <input
                        className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        type="email"
                        placeholder="ایمیل تان را وارد کنید"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        // required
                      />
                      <button
                        type="submit"
                        className={`absolute inset-y-0 left-0 flex items-center p-3 text-gray-700 bg-[var(--color-febd69)] border border-gray-300 rounded-l-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          loading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                        disabled={loading} // Disable button while loading
                      >
                        {loading ? "در حال ارسال..." : "اشتراک"}
                      </button>
                    </form>
                  </div>
                  {/* Feedback messages */}
                  {/* {error && (
                    <p className="text-red-500 mt-2 cursor-pointer" onClick={clearFeedback}>
                      {error}
                    </p>
                  )} */}
                  {/* {successMessage && (
                    <p className="text-green-500 mt-2 cursor-pointer" onClick={clearFeedback}>
                      {successMessage}
                    </p>
                  )} */}
                </div>
            </div>
        </section>
    </footer>
    <footer className=" px-5 bg-[var(--color-232f3e)] py-4 border-t border-t-[var(--color-3b4149)]">
        <section className="container xl:max-w-screen-xl">
            <div className="grid grid-cols-12 gap-4 sm:gap-10 text-white justify-center">
              <div className="hidden lg:block lg:col-span-3">
                <h2 className="mb-4 font-extrabold text-lg md:text-xl">
                      اپلیکیشن ما
                </h2>
                <ul className="mb-4">

                </ul>
              </div>
              <div className="col-span-6 sm:col-span-4 lg:col-span-2">
                <h2 className="mb-4 font-extrabold text-lg md:text-xl">
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
              <div className="col-span-6 sm:col-span-4 lg:col-span-2">
                <h2 className="mb-4 font-extrabold text-lg md:text-xl">
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
              <div className="col-span-6 sm:col-span-4 lg:col-span-2">
                <h2 className="mb-4 font-extrabold text-lg md:text-xl">
                     اطلاعات   
                </h2>
                <ul className="">
                <li className="mb-1 py-2">
                      <Link to='/privacy-policy' className="">
                          حریم خصوصی
                      </Link>
                    </li>
                    <li className="mb-1 py-2">
                      <Link to='/refund-policy' className="">
                             استرداد پول
                      </Link>
                    </li>
                    <li className="mb-1 py-2">
                      <Link to='/shipping-policy' className="">
                            سیاست های فروشگاه
                      </Link>
                    </li>
                    <li className="mb-1 py-2">
                      <Link to='/term-conditons' className="">
                            قوانین و مقررات فروشگاه
                      </Link>
                    </li>
                    <li className="mb-1 py-2">
                      <Link to='/blogs' className="">
                            وبلاگ
                      </Link>
                    </li>
                </ul>
              </div>
              <div className=" col-span-12 sm-custom:place-self-center md:col-span-6 lg:col-span-3 ">
                <h2 className=" mb-4 font-extrabold text-lg md:text-xl"> 
                        تماس با ما                
                </h2>
                <div className="mb-1 py-2 space-y-3">
                  <address >
                    آدرس : اصفهان - شهرستان فریدونشهر 
                    <br />
                    <span className="font-bold">فروشگاه اینترنتی دیجی مارکت</span>
                  </address>
                  <div className="flex  items-center justify-between">
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
{/* شبکه های اجتماعی  */}
                <div className="flex items-center justify-center flex-row-reverse gap-10 text-2xl mt-3">
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