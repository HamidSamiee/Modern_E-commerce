
import * as Yup from "yup"
import { useFormik } from 'formik';
import Input from '@/components/Input';
import Uploader from '@/components/Uploader';
import Editor from "@/components/Editor";
import { useDispatch , useSelector } from "react-redux";
import {  useEffect, useState } from "react";
import { getAllbrands } from "@/features/BrandSlice/brandSlice";
import Spinner from "@/ui/Spinner";
import { getProductsCategory } from "@/features/pCategorySlice/pCategorySlice";
import { getColors } from "@/features/ColorSlice/colorSlice";
import { removeCommasAndPersianDigits, toPersianDigitsWithComma2 } from "@/utils/toPersianDigits";
import 'react-widgets/styles.css'; 
import { Multiselect } from "react-widgets";
import { createProducts } from "@/features/ProductsSlice/productSlice";

const AddProductSchema =Yup.object({
  title:Yup.string().required("ورود عنوان محصول  الزامی است"),
  description:Yup.string().required("ورود توضیحات محصول  الزامی است"),
  category:Yup.string().required('ورود  دسته بندی الزامیست'),
  brand:Yup.string().required('ورود  برند الزامیست'),
  color:Yup.array().min(1,'حداقل یک رنگ رو وارد کنید').required('ورود  رنگ  الزامیست'),
  tags:Yup.array().required('ورود  تگ الزامیست'),
  price:Yup.string().required('ورود قیمت محصول الزامیست').test('is-valid-number','لطفا یک کاراکتر معتبر وارد کنید',(value)=>{
    const cleanNumber=removeCommasAndPersianDigits(value);
    return !isNaN(Number(cleanNumber));
  }),
  quantity:Yup.string().required('ورود  تعداد  الزامیست').test('is-valid-number','لطفا یک کاراکتر معتبر وارد کنید',(value)=>{
    const cleanNumber=removeCommasAndPersianDigits(value);
    return !isNaN(Number(cleanNumber));
  }),
  images:Yup.array().min(1,'حداقل یک عکس رو وارد کنید').required('  بارگذاری تصویر الزامیست'),
})



const AddProduct = () => {

  const [displayValue, setDisplayValue] = useState('');

  const dispatch=useDispatch();

  const {brands}=useSelector((state)=>state.brand);
  const {pCategories}=useSelector((state)=>state.pCategory);
  const {colors}=useSelector((state)=>state.color);
  const {imgs}=useSelector((state)=>state.upload);
  
  const dbColor =[];
  colors.map((color)=>{
    dbColor.push({
      label:color.title,
      value:color._id,
    })
  })
console.log(imgs)
  const dbImg =[];
  imgs.map((image)=>{
    dbImg.push({
      public_id:image.public_id,
      url:image.url,
    })
  })
  // console.log(dbImg)
  const formik = useFormik({
    initialValues:{
      title:'',
      description:'',
      category:'',
      brand:'',
      color:[],
      tags:[],
      price:'',
      quantity:'',
      images:dbImg || [],
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
    formik.setFieldValue('price',value);
    setDisplayValue(value);
  }

  const handleBlur=()=>{
    const value = toPersianDigitsWithComma2(formik.values.price);
    if (formik.values.price) {
      setDisplayValue(value);
    }
  }

  const handleFocus=()=>{
    if (formik.values.price) {
            setDisplayValue(formik.values.price);
    }
  }
  // handles end for price  

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
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  id="title"
                  name="title"
                  type="text"
                  className="w-full p-1 bg-white border rounded-lg border-secondary-900  focus:ring-secondary-900"
                  placeholder="عنوان محصول"
                  class2="w-full"
                />
                <div className="text-rose-500 text-xs">
                  {
                    formik.touched.title && formik.errors.title
                  }
                </div>
            </div>
            <div className="flex flex-col gap-2 ">
                <label> توضیحات محصول</label>
                <Editor 
                  name="description" 
                  formik={formik}
                  
                />
            </div>
            <div className="text-rose-500 text-xs">
                  {
                    formik.touched.description && formik.errors.description
                  }
            </div>
            <div className="grid grid-cols-12 gap-5 ">
                  <div className="col-span-12 md:col-span-6  flex flex-col gap-2 ">    
                      <label> دسته بندی محصول</label>
                      <select 
                        className="select select-bordered select-sm w-full max-w-xs" 
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value='0'>انتخاب دسته بندی محصول</option>
                        {
                          pCategories ?
                          pCategories.map((pCategory)=>{
                            return <option key={pCategory._id} value={pCategory._id}>{pCategory.title}</option>
                          })
                          :
                          <Spinner />
                        }
                      </select>
                      <div className="text-rose-500 text-xs">
                        {
                          formik.touched.category && formik.errors.category
                        }
                      </div>
                  </div>
                  <div className="col-span-12 md:col-span-6  flex flex-col gap-2 ">    
                      <label> برند  محصول</label>
                      <select 
                        className="select select-bordered select-sm w-full max-w-xs" 
                        name="brand"
                        value={formik.values.brand}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value='0'>انتخاب برند محصول</option>
                        {
                          brands ?
                          brands.map((brand)=>{
                            return <option key={brand._id} value={brand._id}>{brand.title}</option>
                          })
                          :
                          <Spinner />
                        }
                      </select>
                      <div className="text-rose-500 text-xs">
                        {
                          formik.touched.brand && formik.errors.brand
                        }
                      </div>
                  </div>
                  <div className="col-span-12 md:col-span-6  space-y-2">
                      <label>قیمت محصول</label>
                      <input
                        id="price"
                        name="price" 
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
                          formik.touched.price && formik.errors.price
                        }
                      </div>
                  </div>
                  <div className="col-span-12 md:col-span-6  space-y-2">
                      <label>تعداد محصول</label>
                      <Input 
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="quantity"
                        type="text"
                        className="w-full p-1 bg-white border rounded-lg border-secondary-900  focus:ring-secondary-900"
                        placeholder="تعداد محصول"
                        class2="w-full"
                      />
                      <div className="text-rose-500 text-xs">
                        {
                          formik.touched.quantity && formik.errors.quantity
                        }
                      </div>
                  </div>
            </div>
            <div className="col-span-12 md:col-span-6  flex flex-col gap-2 ">    
                      <label> تگ ها </label>
                      <Multiselect
                        className="rounded-xl z-50 scale-y-75 w-full"
                        name="tags"
                        id="tags"
                        data={["موبایل", "تبلت",'هدفون','هندزفری','هدست',"ساعت هوشمند"," مچ بند هوشمند"," بلندگو", " اسپیکر","دوربین دیجیتال", "دوربین عکاسی","لپ‌‌ تاپ", "کامپیوتر"]} 
                        value={formik.values.tags} 
                        onChange={(value) => formik.setFieldValue('tags', value)}
                      />
                      <div className="text-rose-500 text-xs">
                        {
                          formik.touched.tags && formik.errors.tags
                        }
                      </div>
            </div>
            <div className="col-span-12 md:col-span-6  flex flex-col gap-1 ">    
                      <label> رنگ محصول</label>
                      <Multiselect
                        className="rounded-xl z-40 scale-y-75 w-full"
                        name="color"
                        id="color"
                        data={dbColor.map(color=>color.label)} 
                        value={formik.values.color} 
                        onChange={(value) => formik.setFieldValue('color', value)}
                      />
                      <div className="text-rose-500 text-xs">
                        {
                          formik.touched.color && formik.errors.color
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
