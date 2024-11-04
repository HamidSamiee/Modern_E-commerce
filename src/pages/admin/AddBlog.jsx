
import * as Yup from "yup"
import { useFormik } from 'formik';
import Input from '@/components/Input';
import Uploader from '@/components/Uploader';
import Editor from "@/components/Editor";

const AddBlogSchema =Yup.object({
  blogTitle:Yup.string().required("ورود عنوان بلاگ  الزامی است"),
  blogCategory:Yup.string().required('ورود  دسته بندی الزامیست'),
  richtextBlog:Yup.string().required('ورود  بلاگ الزامیست'),
  // uploadFile:Yup.string().required('  بارگذاری فایل الزامیست'),
})


const AddBlog = () => {

  
    const formik = useFormik({
      initialValues:{
        blogTitle:'',
        blogCategory:'',
        richtextBlog:'',
        // uploadFile:'',
      },
      validationSchema:AddBlogSchema,
      onSubmit:values=>{
        console.log(values)
      },
    })
    

  return (
    <div className="w-full font-sans flex flex-col items-center gap-5"
        style={{
          maxHeight:'calc(100vh - 150px)',
          overflowY:"scroll",
          scrollBehavior:"smooth",
          scrollbarWidth:"none"
        }}
    >
        <h3 className="mb-5 font-extrabold text-4xl ">افزودن بلاگ</h3>
        <form onSubmit={formik.handleSubmit}  className="w-1/2 flex flex-col gap-5">
          
            <div className="space-y-2">
                <label>عنوان بلاگ</label>
                <Input 
                  value={formik.values.blogTitle}
                  onChange={formik.handleChange('')}
                  onBlur={formik.handleBlur('blogTitle')}
                  name="blogTitle"
                  type="text"
                  className="w-full p-1 bg-white border rounded-lg border-secondary-900  focus:ring-secondary-900"
                  placeholder="عنوان بلاگ"
                  class2="w-full"
                />
                <div className="text-rose-500 text-xs">
                  {
                    formik.touched.blogTitle && formik.errors.blogTitle
                  }
                </div>
            </div>
            <div className="flex flex-col  gap-2 ">    
                <label> دسته بندی بلاگ</label>
                <select 
                  className="select select-bordered select-sm w-full max-w-xs" 
                  name="blogCategory"
                  value={formik.values.blogCategory}
                  onChange={formik.handleChange('')}
                  onBlur={formik.handleBlur('blogCategory')}
                >
                  <option disabled value={0}>انتخاب دسته بندی بلاگ</option>
                  <option value={1}>Han Solo</option>
                  <option value={2}>Greedo</option>
                </select>
                <div className="text-rose-500 text-xs">
                  {
                    formik.touched.blogCategory && formik.errors.blogCategory
                  }
                </div>
            </div>
             <Editor 
              name="richtextBlog" 
              contentValue={formik.values.richtextBlog}
              onChange={formik.handleChange('')}
              onBlur={formik.handleBlur('richtextBlog')}
            />
            <div className="text-rose-500 text-xs">
                  {
                    formik.touched.richtextBlog && formik.errors.richtextBlog
                  }
            </div>
           {/* <Uploader 
              name='uploadFile'
              value={formik.values.uploadFile}
              onChange={formik.handleChange('')}
              onBlur={formik.handleBlur('uploadFile')} 
            />
            <div className="text-rose-500 text-xs">
                  {
                    formik.touched.uploadFile && formik.errors.uploadFile
                  }
            </div> */}
            <button type="submit" disabled={!(formik.isValid && formik.dirty)} className={`self-end px-4 py-1 w-fit bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white rounded-xl ${!(formik.isValid && formik.dirty) && 'cursor-not-allowed'}`}>
              افزودن بلاگ
            </button>
          
        </form>
        
    </div>
  )
}

export default AddBlog
