import Input from "@/components/Input"
import { addBrand } from "@/features/BrandSlice/brandSlice"
import { getProductsCategory } from "@/features/pCategorySlice/pCategorySlice"
import { useFormik } from "formik"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"
import Select from 'react-select'

const AddBrandSchema =Yup.object({
  title:Yup.string().required("ورود عنوان برند الزامی است"),
  category:Yup.array().required("ورود دسته بندی های برند الزامی است"),
})

const AddBrand = () => {

  const dispatch=useDispatch();
  const {pCategories}=useSelector(state=>state?.pCategory)

  const formik = useFormik({
    initialValues:{
      title:'',
      category:[],
    },
    validationSchema:AddBrandSchema,
    onSubmit:values=>{
      console.log(values)
      dispatch(addBrand(values))
    },
  })

  useEffect(() => {
    dispatch(getProductsCategory());
  }, [dispatch])
  
  const options = pCategories.map(pCategory => ({  
    value: pCategory._id, // فرض می‌کنیم که یک شناسه دارد  
    label: pCategory.title, // عنوان برای نمایش  
  }));

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
            <div className="col-span-12 md:col-span-6  flex flex-col gap-2 ">    
                      <label> دسته بندی محصول</label>
                      <Select  
                        className="w-full"  
                        name="category"  
                        options={options}  
                        value={formik.values.category}  
                        onChange={selectedOptions => formik.setFieldValue('category', selectedOptions || [])} 
                        onBlur={formik.handleBlur}  
                        isMulti  
                      />  
                      <div className="text-rose-500 text-xs">  
                        {formik.touched.category && formik.errors.category}  
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