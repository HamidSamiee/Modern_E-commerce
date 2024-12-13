
import * as Yup from "yup"
import { useFormik } from 'formik';
import Input from '@/components/Input';
import Uploader from '@/components/Uploader';
import Editor from "@/components/Editor";
import { useDispatch , useSelector } from "react-redux";
import {  useCallback, useEffect, useMemo, useState } from "react";
import { getAllbrands } from "@/features/BrandSlice/brandSlice";
import Spinner from "@/ui/Spinner";
import { getProductsCategory } from "@/features/pCategorySlice/pCategorySlice";
import { getColors } from "@/features/ColorSlice/colorSlice";
import { removeCommasAndPersianDigits, toPersianDigitsWithComma2 } from "@/utils/toPersianDigits";
import Select from "react-select";
import { createProducts } from "@/features/ProductsSlice/productSlice";

const AddProductSchema =Yup.object({
  title:Yup.string().required("ورود عنوان محصول  الزامی است"),
  description:Yup.string().required("ورود توضیحات محصول  الزامی است"),
  category:Yup.string().required('ورود  دسته بندی الزامیست'),
  brand:Yup.string().required('ورود  برند الزامیست'),
  color:Yup.array().min(1,'حداقل یک رنگ رو وارد کنید').required('ورود  رنگ  الزامیست'),
  tags:Yup.array().required('ورود  تگ الزامیست'),
  details: Yup.mixed().required('Details are required'),
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
  
  // console.log(imgs)
  // const dbColor =[];
  // colors.map((color)=>{
  //   dbColor.push({
  //     label:color.title,
  //     value:color.title,
  //   })
  // })
  const dbColor = useMemo(() => {
    return colors.map((color) => ({
      label: color.title,
      value: color.title,
    }));
  }, [colors]);
// console.log(imgs)
  const dbImg =[];
  imgs.map((image)=>{
    dbImg.push({
      public_id:image.public_id,
      url:image.url,
    })
  })
  // const dbImg = useMemo(() => 
  //   imgs.map((image) => ({
  //     public_id: image.public_id,
  //     url: image.url,
  //   })), [imgs]);
  // console.log(dbImg)
  const formik = useFormik({
    initialValues:{
      title:'',
      description:'',
      category:'',
      brand:'',
      color:[],
      tags:[],
      details:{},
      price:'',
      quantity:'',
      images:dbImg || [],
    },
    validationSchema:AddProductSchema,
    onSubmit:(values)=>{

      console.log(values);
      try { 
        values.details = JSON.parse(values.details); 
      } catch (error) {
         console.error('Invalid JSON format for details:', error); 
         alert('فرمت JSON معتبر نیست');
         return; 
      };
      dispatch(createProducts(values));
      formik.resetForm({ 
        values: {
          ...formik.initialValues,
          images: [], // مقدار تصاویر را خالی کنید
        }
      });
    },
  })


  useEffect(() => {

     setDisplayValue(formik.values.price);
      // همگام‌سازی مقدار نمایش داده شده با مقدار formik 
  }, [formik.values.price]);


  // handels foe product price

  const handleInput=useCallback((e)=>{
    const value = e.target.value.replace(/[^0-9۰-۹]/g, '');
    formik.setFieldValue('price',value);
    setDisplayValue(value);
  },[formik] )
  

  const handleBlur=useCallback( ()=>{
      const value = toPersianDigitsWithComma2(formik.values.price);
      if (formik.values.price) {
        setDisplayValue(value);
      }
    }, [formik.values.price])
  

  const handleFocus=useCallback(()=>{
    if (formik.values.price) {
            setDisplayValue(formik.values.price);
    }
  },[formik.values.price])
  
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
                  value={formik.values.description}
                  onChange={(value) => formik.setFieldValue("description", value)} 
                />
            </div>
            <div className="text-rose-500 text-xs">
                  {
                    formik.touched.description && formik.errors.description
                  }
            </div>
            <div className="flex flex-col gap-2 ">
                <label> جزئیات محصول (به فرمت JSON وارد کنید)</label>
                <textarea 
                 name="details"
                 id="details" 
                 value={formik.values.details}
                 onChange={formik.handleChange}
                 onBlur={formik.handleBlur}
                 placeholder="جزئیات محصول"
                 className="w-full p-1 bg-white border rounded-lg border-secondary-900  focus:ring-secondary-900"
                />
            </div>
            <div className="text-rose-500 text-xs">
                  {
                    formik.touched.details && formik.errors.details
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
                      <Select
                        className="rounded-xl z-50 scale-y-75 w-full"
                        name="tags"
                        id="tags"
                        options={[ { value: 'موبایل', label: 'موبایل' }, { value: 'تبلت', label: 'تبلت' }, { value: 'هدفون', label: 'هدفون' }, { value: 'هندزفری', label: 'هندزفری' }, { value: 'هدست', label: 'هدست' }, { value: 'ساعت هوشمند', label: 'ساعت هوشمند' }, { value: 'مچ بند هوشمند', label: 'مچ بند هوشمند' }, { value: 'بلندگو', label: 'بلندگو' }, { value: 'اسپیکر', label: 'اسپیکر' }, { value: 'دوربین دیجیتال', label: 'دوربین دیجیتال' }, { value: 'دوربین عکاسی', label: 'دوربین عکاسی' }, { value: 'لپ‌‌ تاپ', label: 'لپ‌‌ تاپ' }, { value: 'کامپیوتر', label: 'کامپیوتر' }, ]}
                        isMulti
                        value={formik.values.tags.map(tag => ({ value: tag, label: tag }))}
                        onChange={(selectedOptions) => {
                          const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
                          formik.setFieldValue('tags', values);
                        }}
                      />

                      <div className="text-rose-500 text-xs">
                        {
                          formik.touched.tags && formik.errors.tags
                        }
                      </div>
            </div>
            <div className="col-span-12 md:col-span-6  flex flex-col gap-1 ">    
                      <label> رنگ محصول</label>
                      <Select
                        className="rounded-xl z-40 scale-y-75 w-full"
                        name="color"
                        id="color"
                        options={dbColor}
                        isMulti
                        value={formik.values.color.map(color => ({ value: color, label: color }))}
                        onChange={(selectedOptions) => {
                          const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
                          formik.setFieldValue('color', values);
                        }}
                      />

                      <div className="text-rose-500 text-xs">
                        {
                          formik.touched.color && formik.errors.color
                        }
                      </div>
            </div>
            <div className=" flex flex-col gap-2 ">
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
            
            <button type="submit"  className={` self-end px-4 py-1 w-fit bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white rounded-xl`}>
              افزودن محصول
            </button>
          
        </form>
        
    </div>
  )
}

export default AddProduct
