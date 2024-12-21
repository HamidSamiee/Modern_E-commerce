import { blogs } from "@/assets/data/data";
import BreadCrumb from "@/components/BreadCrumb"
import Meta from "@/components/Meta"
import { Link, useParams } from "react-router-dom"
import {HiOutlineArrowLeft} from 'react-icons/hi'
import Container from "@/components/Container";
import { useState } from "react";


const SingleBlog = () => {

    const {id}=useParams();
    
    const [openSections, setOpenSections] = useState({});

    const toggleSection = (section) => {
      setOpenSections((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    };
  

    const blog =blogs.filter(b=>b.id == id);
    console.log(blog[0].description.long)

  return (
    <>
    <Meta title=" اخبار سایت " /> 
    <BreadCrumb title={`${blog[0].title}`} />
    <Container class1="py-5 bg-[var(--color-f5f5f7)]">
        <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 lg:col-span-3">
                            <div className=" bg-white rounded-lg mb-3 p-4 ">
                                <h3
                                 className={`inline-block text-[var(--color-1c1c1b)] font-semibold text-base transition-all ease-in-out duration-300 ${openSections['category'] && "pb-4 border-b border-[var(--color-ededed)] mb-5"} `}
                                 onClick={() => toggleSection('category')}
                                >
                                  دسته بندی محصولات
                                </h3>
                                {openSections['category'] && (
                                      <div className="flex items-center justify-center md:justify-normal">
                                          <ul className="list-none text-xs text-[var(--color-7777777)] flex gap-5 lg:flex-col lg:gap-3">
                                              <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">گوشی هوشمند</li>
                                              <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">تلویزیون</li>
                                              <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">دوربین</li>
                                              <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">لپ تاپ</li>
                                          </ul>
                                      </div>
                                )}
                            </div>
                    </div>
            <div className="col-span-12 lg:col-span-9">
                <div className="bg-white p-4 flex flex-col gap-5">
                    <Link to="/blogs" className="flex items-center gap-3 justify-end p text-sm text-[var(--color-777777)]">بازگشت به صفحه قبلی<HiOutlineArrowLeft /></Link>
                    <h3 className="font-semibold text-2xl text-justify text-[var(--color-1c1c1b)]">{blog[0].title}</h3>
                    <img src={blog[0].img} alt={blog[0].title} className="my-4" />
                    <p className="prose max-w-2xl mx-auto text-sm text-justify prose-p:text-rose-400 text-[var(--color-777777)] leading-6">
                        {blog[0].description.long}
                    </p>
                </div>
            </div>
        </div>
    </Container>  
 </>
  )
}

export default SingleBlog