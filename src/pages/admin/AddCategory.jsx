import Input from "@/components/Input"
import { createProductsCategory } from "@/features/pCategorySlice/pCategorySlice"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import * as Yup from "yup"

const AddcategorySchema =Yup.object({
  title:Yup.string().required("ورود عنوان  دسته بندی محصول  الزامی است"),
})

const AddCategory = () => {

  const dispatch=useDispatch();

  const formik = useFormik({
    initialValues:{
      title:'',
    },
    validationSchema:AddcategorySchema,
    onSubmit:values=>{
      // console.log(values)
      dispatch(createProductsCategory(values))
      formik.resetForm();
    },
  })

  return (
    <div className="w-full font-sans flex flex-col items-center gap-5">
       <h3 className="mb-5 font-extrabold text-4xl ">افزودن دسته بندی محصول</h3>
       <form onSubmit={formik.handleSubmit}  className="w-1/2 flex flex-col gap-5">
            <div className="space-y-2">
                <label>عنوان  دسته بندی محصول</label>
                <Input 
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="title"
                  type="text"
                  className="w-full p-1 bg-white border rounded-lg border-secondary-900  focus:ring-secondary-900"
                  placeholder="عنوان  دسته بندی محصول"
                  class2="w-full"
                />
                <div className="text-rose-500 text-xs">
                  {
                    formik.touched.title && formik.errors.title
                  }
                </div>
            </div>
            <button type="submit" disabled={!(formik.isValid && formik.dirty)} className={`self-end px-4 py-1 w-fit bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white rounded-xl ${!(formik.isValid && formik.dirty) && 'cursor-not-allowed'}`}>
              افزودن  دسته بندی محصول
            </button>
      </form>
    </div>
  )
}

export default AddCategory