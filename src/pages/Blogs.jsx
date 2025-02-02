// import { blogs } from "@/assets/data/data"
import BreadCrumb from "../components/BreadCrumb"
import Meta from "../components/Meta"
import BlogCart from "@/components/BlogCart"
import Container from "@/components/Container"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBlogs } from "@/features/BlogsSlice/blogSlice"


const Blogs = () => {

  const [openSections, setOpenSections] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])
  
  const {blogs}=useSelector(state=>state.blog)

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
                    <div className="px-5 col-span-12 lg:col-span-12">
                      <div className="grid grid-cols-12 gap-5">
                        {blogs &&
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


