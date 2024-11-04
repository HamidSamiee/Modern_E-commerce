import Input from "@/components/Input"
import { addBrand } from "@/features/BrandSlice/brandSlice"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import * as Yup from "yup"

const AddBrandSchema =Yup.object({
  title:Yup.string().required("ورود عنوان برند الزامی است"),
})

const AddBrand = () => {

  const dispatch=useDispatch();

  const formik = useFormik({
    initialValues:{
      title:'',
    },
    validationSchema:AddBrandSchema,
    onSubmit:values=>{
      // console.log(values)
      dispatch(addBrand(values))
    },
  })

  return (
    <div className="w-full font-sans flex flex-col items-center gap-5">
       <h3 className="mb-5 font-extrabold text-4xl ">افزودن برند</h3>
       <form onSubmit={formik.handleSubmit}  className="w-1/2 flex flex-col gap-5">
            <div className="space-y-2">
                <label>عنوان برند</label>
                <Input 
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="title"
                  type="text"
                  className="w-full p-1 bg-white border rounded-lg border-secondary-900  focus:ring-secondary-900"
                  placeholder="عنوان برند"
                  class2="w-full"
                />
                <div className="text-rose-500 text-xs">
                  {
                    formik.touched.title && formik.errors.title
                  }
                </div>
            </div>
            < button type="submit" disabled={!(formik.isValid && formik.dirty)} className={`self-end px-4 py-1 w-fit bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white rounded-xl ${!(formik.isValid && formik.dirty) && 'cursor-not-allowed'}`}>
              افزودن برند
            </button>
      </form>
    </div>
  )
}

export default AddBrand