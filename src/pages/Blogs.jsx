import { blogs } from "@/assets/data/data"
import BreadCrumb from "../components/BreadCrumb"
import Meta from "../components/Meta"
import BlogCart from "@/components/BlogCart"
import Container from "@/components/Container"
import { useState } from "react"


const Blogs = () => {

  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
       <Meta title=" وبلاگ اخبار فناوری" /> 
       <BreadCrumb title="مطالب وبلاگ" />
       <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-3">
                            <div className=" bg-white rounded-lg mb-3 p-4 ">
                                <h3
                                 className={`inline-block text-[var(--color-1c1c1b)] font-semibold text-base transition-all ease-in-out duration-300 ${openSections['category'] && "pb-4 border-b border-[var(--color-ededed)] mb-5"} `}
                                 onClick={() => toggleSection('category')}
                                >
                                  دسته بندی محصولات
                                </h3>
                                {openSections['category'] && (
                                      <div className="flex items-center justify-center md:justify-normal">
                                          <ul className="list-none text-xs text-[var(--color-7777777)] flex gap-5 md:flex-col md:gap-3">
                                              <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">گوشی هوشمند</li>
                                              <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">تلویزیون</li>
                                              <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">دوربین</li>
                                              <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">لپ تاپ</li>
                                          </ul>
                                      </div>
                                )}
                            </div>
                    </div>
                    <div className="px-5 col-span-12 md:col-span-9">
                      <div className="grid grid-cols-12 gap-5">
                        {
                          blogs.map((blog,i)=><BlogCart key={i} dataBlog={blog} grid="6" />)
                        }
                      </div>
                    </div>
            </div>
       </Container>     
    </>
  )
}

export default Blogs