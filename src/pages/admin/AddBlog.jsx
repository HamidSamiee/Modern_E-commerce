
// import * as Yup from "yup"
// import { useFormik } from 'formik';
// import Input from '@/components/Input';
// import Uploader from '@/components/Uploader';
// import Editor from "@/components/Editor";

// const AddBlogSchema =Yup.object({
//   title:Yup.string().required("ورود عنوان بلاگ  الزامی است"),
//   description:Yup.string().required('ورود  دسته بندی الزامیست'),
//   category:Yup.string().required('ورود  بلاگ الزامیست'),
//   images:Yup.string().required('  بارگذاری فایل الزامیست'),
// })


// const AddBlog = () => {

  
//     const formik = useFormik({
//       initialValues:{
//         title:'',
//         description:'',
//         category:'',
//         images:'',
//       },
//       validationSchema:AddBlogSchema,
//       onSubmit:values=>{
//         console.log(values)
//       },
//     })
    

//   return (
//     <div className="w-full font-sans flex flex-col items-center gap-5"
//         style={{
//           maxHeight:'calc(100vh - 150px)',
//           overflowY:"scroll",
//           scrollBehavior:"smooth",
//           scrollbarWidth:"none"
//         }}
//     >
//         <h3 className="mb-5 font-extrabold text-4xl ">افزودن بلاگ</h3>
//         <form onSubmit={formik.handleSubmit}  className="w-1/2 flex flex-col gap-5">
          
//             <div className="space-y-2">
//                 <label>عنوان بلاگ</label>
//                 <Input 
//                   value={formik.values.title}
//                   onChange={formik.handleChange('')}
//                   onBlur={formik.handleBlur('title')}
//                   name="title"
//                   type="text"
//                   className="w-full p-1 bg-white border rounded-lg border-secondary-900  focus:ring-secondary-900"
//                   placeholder="عنوان بلاگ"
//                   class2="w-full"
//                 />
//                 <div className="text-rose-500 text-xs">
//                   {
//                     formik.touched.title && formik.errors.title
//                   }
//                 </div>
//             </div>
//             <div className="flex flex-col  gap-2 ">    
//                 <label> دسته بندی بلاگ</label>
//                 <select 
//                   className="select select-bordered select-sm w-full max-w-xs" 
//                   name="category"
//                   value={formik.values.category}
//                   onChange={formik.handleChange('')}
//                   onBlur={formik.handleBlur('category')}
//                 >
//                   <option disabled value={0}>انتخاب دسته بندی بلاگ</option>
//                   <option value={1}>Han Solo</option>
//                   <option value={2}>Greedo</option>
//                 </select>
//                 <div className="text-rose-500 text-xs">
//                   {
//                     formik.touched.category && formik.errors.category
//                   }
//                 </div>
//             </div>
//              <Editor 
             
//             />
//             <div className="text-rose-500 text-xs">
//                   {
//                     formik.touched.description && formik.errors.description
//                   }
//             </div>
//            <Uploader 
//               name='images'
//               value={formik.values.images}
//               onChange={formik.handleChange('')}
//               onBlur={formik.handleBlur('images')} 
//             />
//             <div className="text-rose-500 text-xs">
//                   {
//                     formik.touched.images && formik.errors.images
//                   }
//             </div>
//             <button type="submit" disabled={!(formik.isValid && formik.dirty)} className={`self-end px-4 py-1 w-fit bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white rounded-xl ${!(formik.isValid && formik.dirty) && 'cursor-not-allowed'}`}>
//               افزودن بلاگ
//             </button>
          
//         </form>
        
//     </div>
//   )
// }

// export default AddBlog


import * as Yup from "yup";
import { useFormik } from "formik";
import Input from "@/components/Input";
import Uploader from "@/components/Uploader";
import EditorSlate from "@/components/EditorSlate";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getBlogCategories } from "@/features/bCategorySlice/bCategorySlice";
import { createBlog } from "@/features/BlogsSlice/blogSlice";

const AddBlogSchema = Yup.object({
  title: Yup.string().required("ورود عنوان بلاگ الزامی است"),
  category: Yup.string().required("انتخاب دسته‌بندی الزامی است"),
  description: Yup.array().min(1, "ورود متن الزامی است").required("ورود متن الزامی است"),
  images:Yup.array().min(1,'حداقل یک عکس رو وارد کنید').required('  بارگذاری تصویر الزامیست'),
});

const AddBlog = () => {

  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(getBlogCategories())
  }, [dispatch])
  
  const {bCategories}=useSelector(state => state.bCategory)
  const {imgs}=useSelector((state)=>state.upload);
// console.log(bCategories)

const dbImg = useMemo(() => 
  imgs.map((image) => ({
    public_id: image.public_id,
    url: image.url,
  })), [imgs]);


  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: [{ type: "paragraph", children: [{ text: "" }] }],
      images:dbImg || [],
    },
    validationSchema: AddBlogSchema,
    onSubmit: (values) => {
      // console.log(values);
      const preparedValues = {
        ...values,
        description: JSON.stringify(values.description), // تبدیل به رشته JSON
      };
      // console.log(preparedValues)
      dispatch(createBlog(preparedValues))
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
      <form onSubmit={formik.handleSubmit} className="w-1/2 flex flex-col gap-5">
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
        <div className="flex flex-col gap-2 overflow-visible">
            <label>متن بلاگ</label>
            <EditorSlate
              formik={formik}
            />
        </div> 
        <div className="text-rose-500 text-xs">
          {formik.touched.description && formik.errors.description}
        </div>

        <Uploader
          formik={formik}
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

export default AddBlog;
