import Input from "@/components/Input"
import { useFormik } from "formik"
import * as Yup from "yup"

const AddcolorSchema =Yup.object({
  color:Yup.string().required("رنگ را وارد کنید"),
})


const AddColor = () => {

  const formik = useFormik({
    initialValues:{
      color:'',
    },
    validationSchema:AddcolorSchema,
    onSubmit:values=>{
      console.log(values)
    },
  })

  return (
    <div className="w-full font-sans flex flex-col items-center gap-5">
    <h3 className="mb-5 font-extrabold text-4xl ">افزودن رنگ</h3>
    <form onSubmit={formik.handleSubmit}  className="w-1/2 flex flex-col gap-5">
         <div className="space-y-2">
             <label> انتخاب رنگ</label>
             <Input 
               value={formik.values.color}
               onChange={formik.handleChange('')}
               onBlur={formik.handleBlur('color')}
               name="color"
               type="color"
               className="w-full p-1 bg-white border rounded-lg border-secondary-900  focus:ring-secondary-900"
               
               class2="w-full"
             />
             <div className="text-rose-500 text-xs">
               {
                 formik.touched.color && formik.errors.color
               }
             </div>
         </div>
         <button type="submit" disabled={!(formik.isValid && formik.dirty)} className={`self-end px-4 py-1 w-fit bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white rounded-xl ${!(formik.isValid && formik.dirty) && 'cursor-not-allowed'}`}>
          افزودن رنگ
         </button>
   </form>
 </div>
  )
}

export default AddColor