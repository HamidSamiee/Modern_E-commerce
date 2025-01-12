import Input from "@/components/Input"
import {  getBrand, updateBrand } from "@/features/BrandSlice/brandSlice"
import { useFormik } from "formik"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"
import Select from 'react-select'
import { getProductsCategory } from "@/features/pCategorySlice/pCategorySlice"

const AddBrandSchema =Yup.object({
  title:Yup.string().required("ورود عنوان برند الزامی است"),
  category:Yup.array().required("ورود دسته بندی های برند الزامی است"),
})

const UpdateBrand = (Props) => {

  const {brandId,onClose}=Props;
  const dispatch=useDispatch();
  const {pCategories}=useSelector(state=>state?.pCategory)

  useEffect(() => {
    dispatch(getBrand(brandId))
    dispatch(getProductsCategory());
  }, [dispatch,brandId])
  
  const {brands}=useSelector(state=>state.brand)
  const brand = useMemo(() => 
    Array.isArray(brands) ? brands.find(brand => brand._id === brandId) : null,
    [brands, brandId]
  );
  
  const catBrandName =  brand.category  
  .map(catId => {  
    const category = pCategories.find(pc => pc._id === catId);  
    return category ? { value: category._id, label: category.title } : null;  
  })  
  .filter(item => item !== null);

  const formik = useFormik({
    initialValues:{
      title: brand?.title ||'',
      category:catBrandName || [],
    },
    validationSchema:AddBrandSchema,
    onSubmit:values=>{
      // console.log(values)
      dispatch(updateBrand({ id: brandId, data: values }));
      onClose();
    },
  })

  const options = pCategories.map(pCategory => ({  
    value: pCategory._id || "", // فرض می‌کنیم که یک شناسه دارد  
    label: pCategory.title || "", // عنوان برای نمایش  
  })).filter(option => option.value && option.label);;

  return (
    <div className="w-full  font-sans flex flex-col items-start gap-5">
       <h3 className="font-extrabold text-2xl ">ویرایش برند</h3>
       <form onSubmit={formik.handleSubmit}  className="w-full h-[40vh] flex flex-col gap-5 ">
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
                        className="w-full "  
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
                  اعمال تغییرات
            </button>
      </form>
    </div>
  )
}

export default UpdateBrand