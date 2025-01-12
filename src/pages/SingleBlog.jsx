import BreadCrumb from "@/components/BreadCrumb";
import Meta from "@/components/Meta";
import { Link, useParams } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Container from "@/components/Container";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "@/features/BlogsSlice/blogSlice";
import { RenderContent } from "@/components/BlogCart";

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
  const { title = "", description = "", images = [] } =
    blogState?.[0] || {};

  let parsedDescription = [];
  if (typeof description === "string") {
    try {
      parsedDescription = JSON.parse(description);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      parsedDescription = [];
    }
  } else if (Array.isArray(description)) {
    parsedDescription = description;
  } else {
    console.warn("Description is not a valid type:", typeof description);
    parsedDescription = [];
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
                className="flex items-center gap-3 justify-end p text-sm text-[var(--color-777777)]"
              >
                بازگشت به صفحه قبلی
                <HiOutlineArrowLeft />
              </Link>
              <h3 className="font-semibold text-2xl text-justify text-[var(--color-1c1c1b)]">
                {title}
              </h3>
              {images[0]?.url && (
                <img src={images[0].url} alt={title} className="my-4" />
              )}
              <p className="prose max-w-2xl mx-auto text-sm text-justify prose-p:text-gray-700 text-[var(--color-777777)] leading-6">
                <RenderContent
                  content={Array.isArray(parsedDescription) ? parsedDescription : []}
                />
              </p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
