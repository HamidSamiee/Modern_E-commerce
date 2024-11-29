import Input from "@/components/Input"
import { getColor, updateColor } from "@/features/ColorSlice/colorSlice"
import { useFormik } from "formik"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"

const AddcolorSchema =Yup.object({
  title:Yup.string().required("رنگ را وارد کنید"),
})


const UpdateColor = (Props) => {

  const {colorId,handleCloseModal} = Props; 
  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(getColor(colorId))
  }, [dispatch,colorId])
  
  const {colors}=useSelector(state=>state.color)

  const productColor = useMemo(() =>{ 
    return colors.filter(color=>color._id === colorId)
    }, [colorId,colors])

  const formik = useFormik({
    initialValues:{
      title:productColor[0]?.title || '',
    },
    validationSchema:AddcolorSchema,
    onSubmit:values=>{
      console.log(values)
      dispatch(updateColor({id:colorId,data:values}));
      handleCloseModal(); 
    },
  })

  return (
    <div className="w-full font-sans flex flex-col items-start gap-5">
    <h3 className=" font-extrabold text-2xl ">ویرایش رنگ</h3>
    <form onSubmit={formik.handleSubmit}  className="w-full flex flex-col gap-5">
         <div className="space-y-2">
             <label> عنوان رنگ</label>
             <Input 
               value={formik.values.title}
               onChange={formik.handleChange}
               onBlur={formik.handleBlur}
               name="title"
               type="text"
               className="w-full p-1 bg-white border rounded-lg border-secondary-900  focus:ring-secondary-900"
               
               class2="w-full"
             />
             <div className="text-rose-500 text-xs">
               {
                 formik.touched.title && formik.errors.title
               }
             </div>
         </div>
         <button type="submit" disabled={!(formik.isValid && formik.dirty)} className={`self-end px-4 py-1 w-fit bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white rounded-xl ${!(formik.isValid && formik.dirty) && 'cursor-not-allowed'}`}>
           اعمال تغییرات
         </button>
   </form>
 </div>
  )
}

export default UpdateColor