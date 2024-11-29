import Input from "@/components/Input"
import { getProCategory, updateProCategory } from "@/features/pCategorySlice/pCategorySlice"
import { useFormik } from "formik"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"

const AddcategorySchema =Yup.object({
  title:Yup.string().required("ورود عنوان  دسته بندی محصول  الزامی است"),
})

const UpdateProCategory = (Props) => {

  const {pCategoryId,handleCloseModal} = Props;
//   console.log(pCategoryId)
  const dispatch=useDispatch();

    useEffect(() => {
     dispatch(getProCategory(pCategoryId))
    }, [dispatch,pCategoryId])
    

  const {pCategories}=useSelector(state=>state.pCategory)


  const pCategory = useMemo(() =>{ 
    return  pCategories.filter(p=>p._id === pCategoryId) || null ;
    }, [pCategories,pCategoryId])

    // console.log(pCategory?.title)

  const formik = useFormik({
    // enableReinitialize:true,
    initialValues:{
      title: pCategory[0]?.title || '',
    },
    validationSchema:AddcategorySchema,
    onSubmit:values=>{
      // console.log(values)
      dispatch(updateProCategory({id:pCategoryId,data:values}))
      handleCloseModal();  
    },
  })

  return (
    <div className="w-full font-sans flex flex-col items-start gap-5">
       <h3 className=" font-extrabold text-2xl ">ویرایش دسته بندی محصول</h3>
       <form onSubmit={formik.handleSubmit}  className="w-full flex flex-col gap-5">
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
              اعمال تغییرات 
            </button>
      </form>
    </div>
  )
}

export default UpdateProCategory