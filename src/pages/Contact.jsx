import BreadCrumb from "@/components/BreadCrumb"
import Container from "@/components/Container"
import Input from "@/components/Input"
import Meta from "@/components/Meta"
import { createEnquiries } from "@/features/enquirySlice/enquirySlice"
import { toPersianDigits } from "@/utils/toPersianDigits"
import { useState } from "react"
import {AiOutlineHome, AiOutlineMail} from "react-icons/ai"
import { BiInfoCircle, BiPhoneCall } from "react-icons/bi"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

const Contact = () => {

const dispatch = useDispatch();

const [formData, setFormData] = useState({
  name:'',
  email:'',
  mobile:'',
  comment:'',
})

const handleChange=(e)=>{
  const {name,value} = e.target;
  setFormData({
    ...formData,
    [name] : value,
  })
}
const handleSubmit=(e)=>{
  e.preventDefault();
  dispatch(createEnquiries(formData))
}
  return (
    <>
      <Meta title=" تماس با ما " /> 
      <BreadCrumb title=" تماس با ما " />
      <Container class1="py-5 bg-[var(--color-f5f5f7)]">
          <div className="grid grid-cols-12 gap-5">
                  {/* google map */}
                  <div className="px-5 col-span-12">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1674.1772759001317!2d50.121425649613364!3d32.941647430526054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1725621790615!5m2!1sen!2s"
                        height="450"
                        className="border-none w-full"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    >
                    </iframe>
                  </div>
                  <div className="col-span-12 mt-5 p-5 rounded-lg gap-3 bg-white">
                      <div className="grid grid-cols-12 gap-5 ">
                          <div className="col-span-12 md:col-span-6  w-full">
                              <h3 className="font-bold text-2xl leading-9 text-right mb-4">
                            ارتباط با ما
                              </h3>
                              <form  onSubmit={handleSubmit} className="flex flex-col gap-3">
                                  <Input 
                                    name="name" 
                                    type="text" 
                                    className="w-full md:w-[70%] p-1 bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] "  
                                    placeholder="نام و نام خانوادگی"
                                    value={formData.name}
                                    onChange={handleChange}
                                  />
                                  <Input 
                                    name="email" 
                                    type="email" 
                                    className="w-full md:w-[70%] p-1 bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] "  
                                    placeholder="آدرس پست الکترونیکی"
                                    value={formData.email}
                                    onChange={handleChange}
                                  />
                                  <Input 
                                    name="mobile" 
                                    type="tel" 
                                    className="w-full md:w-[70%] p-1 bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)]  text-right"  
                                    placeholder="شماره موبایل"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                  />
                                  <textarea 
                                    className="w-full md:w-[70%] p-1 bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] " 
                                    name="comment" 
                                    id="" 
                                    cols="25" rows="5" 
                                    placeholder="نظرات"
                                    value={formData.comment}
                                    onChange={handleChange}
                                  >
                                  </textarea>
                                  <div className="w-full md:w-[70%]">
                                      <button type="submit" className="self-end w-full  px-2 py-1 rounded-full bg-[var(--color-febd69)]">
                                        ارسال
                                      </button>
                                  </div>
                              </form>
                          </div>
                          <div className="col-span-12 md:col-span-6 w-full">
                              <h3 className="font-bold text-2xl leading-9 text-right mb-5">
                              با ما تماس بگیرید
                              </h3>
                              <div className="">
                                <ul className="space-y-5">
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
      </Container> 
    </>
  )
}

export default Contact