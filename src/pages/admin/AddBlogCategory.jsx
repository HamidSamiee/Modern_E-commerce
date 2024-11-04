import Input from "@/components/Input"
import { useFormik } from "formik"
import * as Yup from "yup"

const AddBlogCategorySchema =Yup.object({
  blogCategory:Yup.string().required("ورود عنوان  دسته بندی بلاگ  الزامی است"),
})

const AddBlogCategory = () => {

  const formik = useFormik({
    initialValues:{
      blogCategory:'',
    },
    validationSchema:AddBlogCategorySchema,
    onSubmit:values=>{
      console.log(values)
    },
  })

  return (
    <div className="w-full font-sans flex flex-col items-center gap-5">
       <h3 className="mb-5 font-extrabold text-4xl ">افزودن دسته بندی بلاگ</h3>
       <form onSubmit={formik.handleSubmit}  className="w-1/2 flex flex-col gap-5">
            <div className="space-y-2">
                <label>عنوان  دسته بندی بلاگ</label>
                <Input 
                  value={formik.values.blogCategory}
                  onChange={formik.handleChange('')}
                  onBlur={formik.handleBlur('blogCategory')}
                  name="blogCategory"
                  type="text"
                  className="w-full p-1 bg-white border rounded-lg border-secondary-900  focus:ring-secondary-900"
                  placeholder="عنوان  دسته بندی بلاگ"
                  class2="w-full"
                />
                <div className="text-rose-500 text-xs">
                  {
                    formik.touched.blogCategory && formik.errors.blogCategory
                  }
                </div>
            </div>
            <button type="submit" disabled={!(formik.isValid && formik.dirty)} className={`self-end px-4 py-1 w-fit bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white rounded-xl ${!(formik.isValid && formik.dirty) && 'cursor-not-allowed'}`}>
              افزودن  دسته بندی بلاگ
            </button>
      </form>
    </div>
  )
}

export default AddBlogCategory