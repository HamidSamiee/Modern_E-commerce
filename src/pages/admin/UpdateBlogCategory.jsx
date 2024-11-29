import Input from "@/components/Input"
import { getBlogCategory, updateBlogCategory } from "@/features/bCategorySlice/bCategorySlice"
import { useFormik } from "formik"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"

const AddBlogCategorySchema =Yup.object({
  title:Yup.string().required("ورود عنوان  دسته بندی بلاگ  الزامی است"),
})

const UpdateBlogCategory = (Props) => {

  const {handleCloseModal,bCategoryId} =Props; 
  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(getBlogCategory(bCategoryId))
  }, [dispatch,bCategoryId])
    
  const {bCategories}=useSelector(state=>state.bCategory)

  const blogCategory =useMemo(() => {
    return bCategories.filter(bCategory=> bCategory._id === bCategoryId)
  }, [bCategories,bCategoryId])


  const formik = useFormik({
    initialValues:{
      title:blogCategory[0].title || '',
    },
    validationSchema:AddBlogCategorySchema,
    onSubmit:values=>{
      // console.log(values)
      dispatch(updateBlogCategory({id:bCategoryId,data:values}))
      handleCloseModal();
    },
  })

  return (
    <div className="w-full font-sans flex flex-col items-start gap-5">
       <h3 className=" font-extrabold text-2xl ">ویرایش دسته بندی بلاگ</h3>
       <form onSubmit={formik.handleSubmit}  className="w-full flex flex-col gap-5">
            <div className="space-y-2">
                <label>عنوان  دسته بندی بلاگ</label>
                <Input 
                  value={formik.values.title}
                  onChange={formik.handleChange('')}
                  onBlur={formik.handleBlur('title')}
                  name="title"
                  type="text"
                  className="w-full p-1 bg-white border rounded-lg border-secondary-900  focus:ring-secondary-900"
                  placeholder="عنوان  دسته بندی بلاگ"
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

export default UpdateBlogCategory