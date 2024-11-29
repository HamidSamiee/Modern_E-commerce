
import * as Yup from "yup"
import { useFormik } from 'formik';
import Input from '@/components/Input';
// import Uploader from '@/components/Uploader';
import Editor from "@/components/Editor";
import { useDispatch , useSelector } from "react-redux";
import {  useEffect, useMemo, useState } from "react";
import { getAllbrands } from "@/features/BrandSlice/brandSlice";
import Spinner from "@/ui/Spinner";
import { getProductsCategory } from "@/features/pCategorySlice/pCategorySlice";
import { getColors } from "@/features/ColorSlice/colorSlice";
import { removeCommasAndPersianDigits, toPersianDigitsWithComma2 } from "@/utils/toPersianDigits";
import 'react-widgets/styles.css'; 
import { Multiselect } from "react-widgets";
import { getProductById, updateProduct } from "@/features/ProductsSlice/productSlice";
import UploaderUpdate from "@/components/UploaderUpdate";

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



const UpdateProduct = (Props) => {

  const {productId}=Props;
  // console.log(productId);

  const [displayValue, setDisplayValue] = useState('');

  const dispatch=useDispatch();

  const {brands}=useSelector((state)=>state.brand);
  const {pCategories}=useSelector((state)=>state.pCategory);
  const {colors}=useSelector((state)=>state.color);
  const {imgs}=useSelector((state)=>state.upload);
  
  useEffect(() => {
    
    dispatch(getAllbrands());
    dispatch(getProductsCategory());
    dispatch(getColors());
    dispatch(getProductById(productId));

    }, [productId])

    const {products}=useSelector((state)=>state.product);
    const product = useMemo(() => {
      return products.filter((product) => product._id === productId) || null;
    }, [products, productId]);
        // console.log(product[0].description)
    // console.log(product[0]?.images)

  const dbColor =[];
  colors.map((color)=>{
    dbColor.push({
      label:color.title,
      value:color._id,
    })
  })

  // const dbimg = product[0]?.images || [];

  const [images, setImages] = useState([]);

  //  imgs.map((image)=>{
  //   dbimg.push({
  //     public_id:image.public_id,
  //     url:image.url,
  //   })
  // })
//  console.log(dbimg)

useEffect(() => {
  if (product[0]?.images) {
    setImages(product[0].images);
    // فقط مقدار فیلد تصاویر را به‌روزرسانی کنید
    formik.setFieldValue('images', product[0].images);
  } else {
    setImages([]); // پاکسازی تصاویر
    formik.setFieldValue('images', []); 
  }
}, [product]);

const initialValues = useMemo(() => ({
  title: product[0]?.title || '',
  description: product[0]?.description || '',
  category: product[0]?.category || '',
  brand: product[0]?.brand || '',
  color: product[0]?.color || [],
  tags: product[0]?.tags || [],
  details: JSON.stringify(product[0]?.details || {}),
  price: product[0]?.price || '',
  quantity: product[0]?.quantity || '',
  images: images || [],
}), [product, images]);

const formik = useFormik({
    // enableReinitialize: true, 
    initialValues,
    validationSchema:AddProductSchema,
    onSubmit:async (values)=>{
      console.log(productId,values);

      try { 
        values.details = JSON.parse(values.details); 
        dispatch(updateProduct({ id: productId, data: values }));
      } catch (error) {
         console.error('Invalid JSON format for details:', error); 
         alert('فرمت JSON معتبر نیست');
         return; 
      };
    },
  })

 // اضافه کردن تصویر جدید 
 useEffect(() => {
  if (imgs.length > 0) {
    const updatedImages = [...images, ...imgs.map(img => ({
      public_id: img.public_id,
      url: img.url,
    }))];

    setImages(updatedImages); // به‌روزرسانی حافظه محلی تصاویر
    formik.setFieldValue('images', updatedImages); // همگام‌سازی با فرم
  }
}, [imgs]);


  useEffect(() => {
     setDisplayValue(formik.values.price);
      // همگام‌سازی مقدار نمایش داده شده با مقدار formik 
  }, [formik.values.price]);


  // handels foe product price

  const handleInput=(e) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, ''); // فقط اعداد
    const formattedValue = toPersianDigitsWithComma2(rawValue); // تبدیل به فرمت مناسب
    formik.setFieldValue('price', rawValue); // مقدار خام برای فرم
    setDisplayValue(formattedValue); // نمایش مقدار فرمت‌شده
  };

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

    


  return (
    <div className="relative w-full font-sans flex flex-col items-center gap-5"
        style={{
          maxHeight:'calc(100vh - 150px)',
          overflowY:"scroll",
          scrollBehavior:"smooth",
          scrollbarWidth:"none"
        }}
    >
        <h3 className="w-full fixed bg-white shadow-md pb-5 pr-10 font-extrabold text-2xl z-40 ">ویرایش محصول</h3>
        <form onSubmit={formik.handleSubmit}  className="mt-16 w-full flex flex-col gap-5">
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
                          pCategories.map((pCategory,index)=>{
                            return <option key={index} value={pCategory._id}>{pCategory.title}</option>
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
                          brands.map((brand,index)=>{
                            return <option key={index} value={brand._id}>{brand.title}</option>
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
                        className="rounded-xl z-30 scale-y-75 w-full"
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
                        className="rounded-xl z-20 scale-y-75 w-full"
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
                <UploaderUpdate 
                  formik={formik}
                  initialImages={images}
                  productId={productId}
                  setImages={setImages}
                />
                <div className="text-rose-500 text-xs">
                      {
                        formik.touched.images && formik.errors.images
                      }
                </div>
            </div> 
            
            <button type="submit"  className={`self-end px-4 py-1 w-fit bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white rounded-xl`}>
               اعمال تغییرات
            </button>
          
        </form>
        
    </div>
  )
}

export default UpdateProduct
