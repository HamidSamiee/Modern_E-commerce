import BreadCrumb from "@/components/BreadCrumb";
import Meta from "@/components/Meta";
import { Link, useParams } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Container from "@/components/Container";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { disliketheBlog, getBlog, liketheBlog } from "@/features/BlogsSlice/blogSlice";
import { RenderContent } from "@/components/BlogCart";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { IoMdStopwatch } from "react-icons/io";
import toLocalDate from "@/utils/toLocalDate";
import { FiClock } from "react-icons/fi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

const SingleBlog = () => {
  const { id } = useParams();

  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getBlog(id));
    }
  }, [dispatch, id]);

  const blogState = useSelector((state) => state.blog?.blog);
  const isLoading = useSelector((state) => state.blog?.loading);

  // مقدارهای پیش‌فرض برای جلوگیری از دسترسی به مقادیر تعریف‌نشده
  const { title = "", description = "", images = [],createdAt ="", isDisliked , isLiked , numViews} =blogState?.[0] || {};

  let parsedDescription = [];  
if (typeof description === "string") {  
    // بررسی خالی بودن و اعتبار JSON  
    if (description.trim()) {  
        try {  
            parsedDescription = JSON.parse(description);  
        } catch (error) {  
            console.error("Error parsing JSON:", error);  
            parsedDescription = [];  
        }  
    }  
} else if (Array.isArray(description)) {  
    parsedDescription = description;  
}

  if (isLoading) {
    return <div>در حال بارگذاری...</div>;
  }

  

  return (
    <>
      <Meta title="اخبار سایت" />
      <BreadCrumb title={`${title}`} />
      <Container class1="py-5 bg-[var(--color-f5f5f7)]">
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-12 lg:col-span-3">
            <div className="bg-white rounded-lg mb-3 p-4">
              <h3
                className={`inline-block text-[var(--color-1c1c1b)] font-semibold text-base transition-all ease-in-out duration-300 ${
                  openSections["category"] &&
                  "pb-4 border-b border-[var(--color-ededed)] mb-5"
                }`}
                onClick={() => toggleSection("category")}
              >
                دسته‌بندی محصولات
              </h3>
              {openSections["category"] && (
                <div className="flex items-center justify-center md:justify-normal">
                  <ul className="list-none text-xs text-[var(--color-7777777)] flex gap-5 lg:flex-col lg:gap-3">
                    <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">
                      گوشی هوشمند
                    </li>
                    <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">
                      تلویزیون
                    </li>
                    <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">
                      دوربین
                    </li>
                    <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">
                      لپ‌تاپ
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <div className="bg-white p-4 flex flex-col gap-5">
              <Link
                to="/blogs"
                className="flex items-center gap-3 justify-end  text-sm text-[var(--color-777777)]"
              >
                بازگشت به صفحه قبلی
                <HiOutlineArrowLeft />
              </Link>
              <div className="flex flex-col gap-y-2"> 
                <div className="flex items-center justify-between gap-x-2">
                    <h3 className="font-semibold text-2xl text-justify text-[var(--color-1c1c1b)]">
                      {title}
                    </h3>
                    <div className="flex items-center gap-x-4">
                        <span className="" onClick={()=>dispatch(liketheBlog({blogId:id}))}>
                            <FontAwesomeIcon
                                icon={faThumbsUp}  
                                className={` bg-gray-300  cursor-pointer rounded-full p-1 ${isLiked ? 'text-green-500' : 'text-white'} `}
                                style={{ 
                                    fill: 'currentColor'  
                                }}  
                            /> 
                        </span>
                        <span className="" onClick={()=>dispatch(disliketheBlog({blogId:id}))}>
                            <FontAwesomeIcon
                                icon={faThumbsDown}  
                                className={` bg-gray-300  cursor-pointer rounded-full p-1 ${isDisliked ? 'text-red-500' : 'text-white'}`}  
                                style={{
                                    fill: 'currentColor'  
                                }}  
                            />  
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <IoMdStopwatch />
                      <span className="">زمان مورد نیاز برای مطالعه : {toPersianDigits(10)} دقیقه</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <FiClock />
                      <span className="">{toLocalDate(createdAt, "long")}</span>
                    </div>
                </div>
                <p className="">  {toPersianDigits(numViews) } کاربر از این پست بازدید کردن </p>
              </div> 
              {images[0]?.url && (
                <img src={images[0].url} alt={title} className="" />
              )}
              <div className="prose max-w-2xl mx-auto text-sm text-justify prose-p:text-gray-700 text-[var(--color-777777)] leading-6">
                <RenderContent
                  content={Array.isArray(parsedDescription) ? parsedDescription : []}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
