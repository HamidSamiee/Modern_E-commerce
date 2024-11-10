
import * as Yup from "yup"
import { useFormik } from 'formik';
import Input from '@/components/Input';
import Uploader from '@/components/Uploader';
import Editor from "@/components/Editor";
import { useDispatch , useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { getAllbrands } from "@/features/BrandSlice/brandSlice";
import Spinner from "@/ui/Spinner";
import { getProductsCategory } from "@/features/pCategorySlice/pCategorySlice";
import { getColors } from "@/features/ColorSlice/colorSlice";
import { removeCommasAndPersianDigits, toPersianDigits, toPersianDigitsWithComma2 } from "@/utils/toPersianDigits";
import 'react-widgets/styles.css'; 
import { Multiselect } from "react-widgets";
import { createProducts } from "@/features/ProductsSlice/productSlice";

const AddProductSchema =Yup.object({
  productTitle:Yup.string().required("ورود عنوان محصول  الزامی است"),
  productDescription:Yup.string().required("ورود توضیحات محصول  الزامی است"),
  productCategory:Yup.string().required('ورود  دسته بندی الزامیست'),
  productBrand:Yup.string().required('ورود  برند الزامیست'),
  productColor:Yup.array().min(1,'حداقل یک رنگ رو وارد کنید').required('ورود  رنگ  الزامیست'),
  productPrice:Yup.string().required('ورود قیمت محصول الزامیست').test('is-valid-number','لطفا یک کاراکتر معتبر وارد کنید',(value)=>{
    const cleanNumber=removeCommasAndPersianDigits(value);
    return !isNaN(Number(cleanNumber));
  }),
  productQuantity:Yup.string().required('ورود  تعداد  الزامیست').test('is-valid-number','لطفا یک کاراکتر معتبر وارد کنید',(value)=>{
    const cleanNumber=removeCommasAndPersianDigits(value);
    return !isNaN(Number(cleanNumber));
  }),
  images:Yup.mixed().required('  بارگذاری تصویر الزامیست'),
})



const AddProduct = () => {

  const [displayValue, setDisplayValue] = useState('');
  console.log(displayValue)
  const dispatch=useDispatch();

  const {brands}=useSelector((state)=>state.brand);
  const {pCategories}=useSelector((state)=>state.pCategory);
  const {colors}=useSelector((state)=>state.color);
  
  const dbColor =[];
  colors.map((color)=>{
    dbColor.push(color.title)
  })
 
console.log(colors.map((color)=><Fragment key={color._id}>{color}</Fragment>))

  const formik = useFormik({
    initialValues:{
      productTitle:'',
      productDescription:'',
      productCategory:'',
      productBrand:'',
      productColor:[],
      productPrice:'',
      productQuantity:'',
      images:null,
    },
    validationSchema:AddProductSchema,
    onSubmit:async (values)=>{
      console.log(values)
      dispatch(createProducts(values))
    },
  })


    

  // handels foe product price

  const handleInput=(e)=>{
    const value = e.target.value.replace(/[^0-9۰-۹]/g, '');
    formik.setFieldValue('productPrice',value);
    setDisplayValue(value);
  }

  const handleBlur=()=>{
    const value = toPersianDigitsWithComma2(formik.values.productPrice);
    if (formik.values.productPrice) {
      setDisplayValue(value);
    }
  }

  const handleFocus=()=>{
    if (formik.values.productPrice) {
            setDisplayValue(formik.values.productPrice);
    }
  }
  // handles end for productPrice  

    useEffect(() => {
    
      dispatch(getAllbrands());
      dispatch(getProductsCategory());
      dispatch(getColors());
  
      }, [dispatch])


  return (
    <div className="w-full font-sans flex flex-col items-center gap-5"
        style={{
          maxHeight:'calc(100vh - 150px)',
          overflowY:"scroll",
          scrollBehavior:"smooth",
          scrollbarWidth:"none"
        }}
    >
        <h3 className="mb-5 font-extrabold text-4xl ">افزودن محصول</h3>
        <form onSubmit={formik.handleSubmit}  className="w-1/2 flex flex-col gap-5">
            <div className="space-y-2">
                <label>عنوان محصول</label>
                <Input 
                  value={formik.values.productTitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="productTitle"
                  name="productTitle"
                  type="text"
                  className="w-full p-1 bg-white border rounded-lg border-secondary-900  focus:ring-secondary-900"
                  placeholder="عنوان محصول"
                  class2="w-full"
                />
                <div className="text-rose-500 text-xs">
                  {
                    formik.touched.productTitle && formik.errors.productTitle
                  }
                </div>
            </div>
            <div className="flex flex-col gap-2 ">
                <label> توضیحات محصول</label>
                <Editor 
                  name="productDescription" 
                  formik={formik}
                  
                />
            </div>
            <div className="text-rose-500 text-xs">
                  {
                    formik.touched.productDescription && formik.errors.productDescription
                  }
            </div>
            <div className="grid grid-cols-12 gap-5 ">
                  <div className="col-span-12 md:col-span-6  flex flex-col gap-2 ">    
                      <label> دسته بندی محصول</label>
                      <select 
                        className="select select-bordered select-sm w-full max-w-xs" 
                        name="productCategory"
                        value={formik.values.productCategory}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value='0'>انتخاب دسته بندی محصول</option>
                        {
                          pCategories ?
                          pCategories.map((pCategory,index)=>{
                            return <option key={pCategory._id} value={index + 1}>{pCategory.title}</option>
                          })
                          :
                          <Spinner />
                        }
                      </select>
                      <div className="text-rose-500 text-xs">
                        {
                          formik.touched.productCategory && formik.errors.productCategory
                        }
                      </div>
                  </div>
                  <div className="col-span-12 md:col-span-6  flex flex-col gap-2 ">    
                      <label> برند  محصول</label>
                      <select 
                        className="select select-bordered select-sm w-full max-w-xs" 
                        name="productBrand"
                        value={formik.values.productBrand}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value='0'>انتخاب برند محصول</option>
                        {
                          brands ?
                          brands.map((brand,index)=>{
                            return <option key={brand._id} value={index + 1}>{brand.title}</option>
                          })
                          :
                          <Spinner />
                        }
                      </select>
                      <div className="text-rose-500 text-xs">
                        {
                          formik.touched.productBrand && formik.errors.productBrand
                        }
                      </div>
                  </div>
                  <div className="col-span-12 md:col-span-6  space-y-2">
                      <label>قیمت محصول</label>
                      <input
                        id="productPrice"
                        name="productPrice" 
                        type="text"
                        value={displayValue}
                        onChange={handleInput}
                        onBlur={handleBlur}
                        onFocus={handleFocus}
                        className="w-full p-1 bg-white border rounded-lg border-secondary-900  focus:ring-secondary-900"
                        placeholder="قیمت محصول"
                      />
                      <div className="text-rose-500 text-xs">
                        {
                          formik.touched.productPrice && formik.errors.productPrice
                        }
                      </div>
                  </div>
                  <div className="col-span-12 md:col-span-6  space-y-2">
                      <label>تعداد محصول</label>
                      <Input 
                        value={toPersianDigits(formik.values.productQuantity)}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="productQuantity"
                        type="text"
                        className="w-full p-1 bg-white border rounded-lg border-secondary-900  focus:ring-secondary-900"
                        placeholder="تعداد محصول"
                        class2="w-full"
                      />
                      <div className="text-rose-500 text-xs">
                        {
                          formik.touched.productQuantity && formik.errors.productQuantity
                        }
                      </div>
                  </div>
            </div>
            <div className="col-span-12 md:col-span-6  flex flex-col gap-1 ">    
                      <label> رنگ محصول</label>
                      <Multiselect
                        className="rounded-xl z-50 scale-y-75 w-full"
                        name="productColor"
                        id="productColor"
                        data={dbColor} 
                        value={formik.values.productColor} 
                        onChange={(value) => formik.setFieldValue('productColor', value)}
                      />
                      <div className="text-rose-500 text-xs">
                        {
                          formik.touched.productColor && formik.errors.productColor
                        }
                      </div>
            </div>
            <div className="flex flex-col gap-2 ">
                <label> تصویر محصول</label>
                <Uploader 
                  formik={formik}
                />
                <div className="text-rose-500 text-xs">
                      {
                        formik.touched.images && formik.errors.images
                      }
                </div>
            </div> 
            <button type="submit"  className={`self-end px-4 py-1 w-fit bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white rounded-xl`}>
              افزودن محصول
            </button>
          
        </form>
        
    </div>
  )
}

export default AddProduct
