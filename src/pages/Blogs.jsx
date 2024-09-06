import { blogs } from "@/assets/data/data"
import BreadCrumb from "../components/BreadCrumb"
import Meta from "../components/Meta"
import BlogCart from "@/components/BlogCart"


const Blogs = () => {
  return (
    <>
       <Meta title=" وبلاگ اخبار فناوری" /> 
       <BreadCrumb title="مطالب وبلاگ" /> 
       <div className="py-5 bg-[var(--color-f5f5f7)]">
            <div className="container xl:max-w-screen-xl">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-3">
                            <div className=" bg-white rounded-lg mb-3 p-4">
                                <h3 className="text-[var(--color-1c1c1b)] font-semibold text-base pb-4 border-b border-[var(--color-ededed)] mb-5">دسته بندی محصولات</h3>
                                <div className="">
                                    <ul className="list-none text-xs text-[var(--color-7777777)] flex flex-col gap-3">
                                        <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">گوشی هوشمند</li>
                                        <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">تلویزیون</li>
                                        <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">دوربین</li>
                                        <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">لپ تاپ</li>
                                    </ul>
                                </div>
                            </div>
                    </div>
                    <div className="col-span-9">
                      <div className="grid grid-cols-12 gap-5">
                        {
                          blogs.map((blog,i)=><BlogCart key={i} dataBlog={blog} grid="6" />)
                        }
                      </div>
                    </div>
                </div>
            </div>
       </div>     
    </>
  )
}

export default Blogs