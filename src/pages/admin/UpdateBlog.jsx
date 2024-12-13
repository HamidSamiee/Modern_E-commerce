

import * as Yup from "yup";
import { useFormik } from "formik";
import Input from "@/components/Input";
import EditorSlate from "@/components/EditorSlate";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getBlogCategories } from "@/features/bCategorySlice/bCategorySlice";
import {  getBlog, updateBlog } from "@/features/BlogsSlice/blogSlice";
import UploaderUpdate from "@/components/UploaderUpdate";

const AddBlogSchema = Yup.object({
  title: Yup.string().required("ورود عنوان بلاگ الزامی است"),
  category: Yup.string().required("انتخاب دسته‌بندی الزامی است"),
  description: Yup.array().min(1, "ورود متن الزامی است").required("ورود متن الزامی است"),
  images:Yup.array().min(1,'حداقل یک عکس رو وارد کنید').required('  بارگذاری تصویر الزامیست'),
});

const UpdateBlog = (Props) => {

  const {blogId}=Props;
  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(getBlogCategories())
    dispatch(getBlog(blogId))
  }, [dispatch,blogId])
  
  const {bCategories}=useSelector(state => state.bCategory)
  const {blogs}=useSelector((state)=>state.blog);
  const blog=useMemo(() => {
    return blogs.filter((blog) => blog._id === blogId) || null;
  }, [ blogId]);
//   console.log(blog)
// console.log(bCategories)

const [images, setImages] = useState([]);

  //  imgs.map((image)=>{
  //   dbimg.push({
  //     public_id:image.public_id,
  //     url:image.url,
  //   })
  // })
//  console.log(dbimg)

useEffect(() => {
    if (blog && blog[0]) {
      setImages(blog[0].images || []); // تنظیم تصاویر
      formik.setFieldValue("images", blog[0].images || []);
    } else {
      setImages([]);
      formik.setFieldValue("images", []);
      formik.setFieldValue("description", [{ type: "paragraph", children: [{ text: "" }] }]); // مقدار پیش‌فرض
    }
  }, [blog]);
  

// const dbImg = useMemo(() => 
//   imgs.map((image) => ({
//     public_id: image.public_id,
//     url: image.url,
//   })), [imgs]);


  const formik = useFormik({
    enableReinitialize:true,
    initialValues: {
      title:blog[0]?.title || "",
      category:blog[0]?.category || "",
      description:JSON.parse(blog[0]?.description) || [{ type: "paragraph", children: [{ text: "" }] }],
      images:images || [],
    },
    validationSchema: AddBlogSchema,
    onSubmit: (values) => {
      console.log(values);
      const preparedValues = {
        ...values,
        description: JSON.stringify(values.description), // تبدیل به رشته JSON
      };
      dispatch(updateBlog({id:blogId,data:preparedValues}))
      formik.resetForm({ 
        values: {
          ...formik.initialValues,
          images: [], // مقدار تصاویر را خالی کنید
        }
      });
    },
  });

  return (
    <div
      className="w-full font-sans flex flex-col items-center gap-5"
      style={{
        maxHeight: "calc(100vh - 150px)",
        overflowY: "scroll",
        scrollBehavior: "smooth",
        scrollbarWidth: "none",
      }}
    >
      <h3 className="mb-5 font-extrabold text-4xl ">افزودن بلاگ</h3>
      <form onSubmit={formik.handleSubmit} className="w-full flex flex-col gap-5">
        <div className="space-y-2">
          <label>عنوان بلاگ</label>
          <Input
            value={formik.values.title}
            onChange={formik.handleChange("title")}
            onBlur={formik.handleBlur("title")}
            name="title"
            type="text"
            placeholder="عنوان بلاگ"
            className="w-full p-1 bg-white border rounded-lg border-secondary-900 focus:ring-secondary-900"
          />
          <div className="text-rose-500 text-xs">{formik.touched.title && formik.errors.title}</div>
        </div>

        <div className="flex flex-col gap-2">
          <label>دسته‌بندی بلاگ</label>
          <select
            className="select select-bordered select-sm w-full max-w-xs"
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
          >
            <option disabled value="">
              انتخاب دسته‌بندی بلاگ
            </option>
            {
              Array.isArray(bCategories) ?
              bCategories.map(((bCategory) =>{
                return <option key={bCategory._id} value={bCategory._id}>{bCategory.title}</option>
              }))
              :
              []
            }
         
          </select>
          <div className="text-rose-500 text-xs">{formik.touched.category && formik.errors.category}</div>
        </div>
        <div className=" flex flex-col gap-2 ">
            <label>متن بلاگ</label>
            <EditorSlate
              formik={formik}
            />
        </div> 
        <div className="text-rose-500 text-xs">
          {formik.touched.description && formik.errors.description}
        </div>

        <UploaderUpdate
          formik={formik}
          initialImages={images}
          productId={blogId}
          setImages={setImages}
        />
        <div className="text-rose-500 text-xs">{formik.touched.images && formik.errors.images}</div>

        <button
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
          className={`self-end px-4 py-1 w-fit bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white rounded-xl ${
            !(formik.isValid && formik.dirty) && "cursor-not-allowed"
          }`}
        >
          افزودن بلاگ
        </button>
      </form>
    </div>
  );
};

export default UpdateBlog;
