import BreadCrumb from "@/components/BreadCrumb"
import Meta from "@/components/Meta"
import ProductCart from "@/components/ProductCart"
import { Link, useParams } from "react-router-dom"
import {  useEffect, useRef, useState } from "react"
import { toPersianDigits, toPersianDigitsWithComma } from "@/utils/toPersianDigits"
// import { MagnifierContainer, MagnifierPreview, MagnifierZoom } from "react-image-magnifiers"
import { FiMinus, FiPlus } from "react-icons/fi"
import { FaCodeCompare } from "react-icons/fa6"
import Tabs from "@/components/Tabs/Tabs"
import { useDispatch, useSelector } from "react-redux"
import { addProductToCart, addToCart } from "@/features/CartSlice/CartSlice"
import Container from "@/components/Container"
import StarRating from "@/components/StarRating"
// import ImageMagnifier from "@/components/ImageMagnifier"
import brandImg from "@assets/images/logo2.png"
import brandImg2 from "@assets/images/Spinner.gif"
import { Carousel } from "antd"
import { BiSupport } from "react-icons/bi"
import { LiaShippingFastSolid } from "react-icons/lia"
import { MdPayment } from "react-icons/md"
import { addToWishList, getAllProducts, removeFromWishList } from "@/features/ProductsSlice/productSlice"
import { getProductsCategory } from "@/features/pCategorySlice/pCategorySlice"
import { getAllbrands } from "@/features/BrandSlice/brandSlice"
import { getUserProductWishlist } from "@/features/userSlice/userSlice"
import { toast } from "react-toastify"

const SingleProduct = () => {

    
    const dispatch=useDispatch();
    const reviewRef=useRef();



  const productState=useSelector(state=>state?.product?.products)
  const {brands}=useSelector((state)=>state.brand);
  const {user}=useSelector((state)=>state.auth);
  const {pCategories}=useSelector((state)=>state.pCategory);

  const [ordereddProduct, setOrdereddProduct] = useState(false)
    const [addedProduct, setAddedProduct] = useState({
        color:"",
        quantity:1,
    })
    
//    console.log(productState)

    const {productId}=useParams();
    const product= productState.filter(p=>p._id == productId) ;
    // console.log(product)

    const {_id,images,brand,title,description,price,category,tags,ratings,totalrating,details,color,discount,quantity,PriceWithDiscunt}=product[0] || {};
    // console.log(details)


    
    // const img = Array.isArray(images) && images[0]?.url;
    const [image, setImage] = useState(null);
    
    
    const isScroll=(ref)=>{
        ref.current.checked=true ;
         window.scrollTo({left:0,top:ref.current.offsetTop,behavior : "smooth"});
          setOrdereddProduct(!ordereddProduct);
    }
   
    useEffect(() => {
        dispatch(getAllbrands());
        dispatch(getProductsCategory());
        dispatch(getAllProducts());
        if (user) {
         dispatch(getUserProductWishlist());
        }
      }, [dispatch])

      useEffect(() => {
        if (productState.length > 0) {
            const img = productState.filter(p => p._id == productId)[0]?.images[0]?.url || null;
            setImage(img);
        }
    }, [productState, productId]);

    useEffect(() => {
        // بررسی وجود شناسه در URL
        setTimeout(() => {
            const hash = window.location.hash;
            // console.log(hash)
            const section = hash.replace('#', ''); // حذف کردن علامت هش
            if (section == 'comments') {
                isScroll(reviewRef);         
            }  
         }, 0);
    }, [])


    const userWishlist=useSelector(state=>state.auth.wishList)
   
    const isLiked = userWishlist.some(item => item._id === _id); // بررسی لایک بودن محصول
   
    const [heartAnimation, setHeartAnimation] = useState(false); // State برای انیمیشن قلب
   
    const handleHeartClick = async() => {
        // شروع انیمیشن
        setHeartAnimation(true);
        setTimeout(() => {
            setHeartAnimation(false); // ریست انیمیشن بعد از 0.7 ثانیه
        }, 700);

      if (isLiked) {
        // حذف از لیست علاقه‌مندی‌ها
        await dispatch(removeFromWishList(_id));
      } else {
          // اضافه به لیست علاقه‌مندی‌ها
          await dispatch(addToWishList(_id));
      }
        
      // همگام‌سازی لیست علاقه‌مندی‌ها
      dispatch(getUserProductWishlist());
    
  };



    if (!product || product.length === 0) {  
        return <div className="h-[50vh] flex flex-col items-center justify-center">
                    
                           <img src={brandImg} alt="brand" className="w-44 sm:w-60  ml-1" />
                           <img src={brandImg2}  alt="brand" className="w-20 ml-1" />
                      
              </div>;  
    }  

    const handleAddtoCart = ()=>{
        if (addedProduct.color =="") {
            toast.error("لطفا رنگ مورد نظرتون رو وارد کنید");
            return false;
        }
        if (user) {
            dispatch(addProductToCart(
            {
                id: productId,
                name: title,
                color: addedProduct.color,
                img: images[0].url,
                desc: description,
                price: price,
                quantity: addedProduct.quantity,
                totalPrice: addedProduct.quantity * price
            }))
        }else{
            dispatch(addToCart(
                {
                    id: productId,
                    name: title,
                    color: addedProduct.color,
                    img: images[0].url,
                    desc: description,
                    price: price,
                    quantity: addedProduct.quantity,
                    totalPrice: addedProduct.quantity * price
                }
            ))
        }
    }


    
  return (
    
    <>
       <Meta title={`${title}`} /> 
       <BreadCrumb title={`${title}`} /> 
       <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className="mx-5 rounded-3xl bg-white">
                <div className="grid grid-cols-12">
                    {/* images product */}
                        {/* desktop  */}
                            <div className="col-span-12 md:col-span-4 pt-5  space-y-2">
                                <div className="relative mx-5 rounded-lg hidden md:flex items-center justify-center md:border md:border-[var(--color-1c1c1b)]">
                                    {
                                        discount &&
                                        <div className="">
                                            <span className="pl-0.5 pr-3 absolute top-3 left-0  bg-red-500 text-white font-extrabold">OFF%</span>
                                            <span className="p-2 absolute top-4 left-12 rotate-45  bg-white"></span>
                                        </div>
                                    }
                                    <img src={image} alt="تصویر " />
                                </div>
                                {
                                    images && 
                                <div className="hidden  w-full md:flex items-center justify-center gap-5">
                                    <div  onClick={()=>setImage(images[0]?.url)} className=" border border-[var(--color-1c1c1b)] object-cover w-1/3 h-1/3">
                                        <img src={images[0]?.url} alt="" className="cursor-pointer" />
                                    </div>               
                                    <div  onClick={()=>setImage(images[1]?.url)} className=" border border-[var(--color-1c1c1b)] object-cover w-1/3 h-1/3">
                                        <img src={images[1]?.url} alt="" className="cursor-pointer" />
                                    </div>
                                </div>
                                }
                            </div>
                            <div className="md:hidden col-span-12">
                                        <Carousel autoplay >
                                            {images && [images[0]?.url,images[1]?.url].map((src, index) => (
                                            <div key={index} >
                                                <img
                                                src={src}
                                                alt={`Slide ${index + 1}`}
                                                style={{
                                                    width: '100%',
                                                    height: 'auto',
                                                    objectFit: 'contain',
                                                }}
                                                />
                                            </div>
                                            ))}
                                        </Carousel>
                            </div>
                    {/* details Product */}
                        <div className="col-span-12 md:col-span-8  px-5 md:pt-5 ">
                                <div className="lg:border-b lg:border-b-black/25 lg:mb-2">
                                        <h3 className="font-semibold text-justify text-lg mb-2 text-[var(--color-1c1c1b)]">
                                                {title}
                                        </h3>
                                </div>
                                <div className="lg:py-5 border-b border-b-black/25 flex flex-col items-end">
                                    
                                    <div className="w-full flex sm-custom:flex-col items-center justify-between ">
                                                        <div className="flex  sm-custom:self-start items-center gap-0.5">
                                                            <StarRating star={parseFloat(totalrating)} setStar={null} /> 
                                                            <p className="text-xs text-[var(--color-777777)] sm-custom2:hidden">
                                                            {toPersianDigits(totalrating)} (امتیاز  {toPersianDigits(ratings.length)} خریدار   ،   {toPersianDigits(ratings.length)} دیدگاه )
                                                            </p>
                                                            <Link className="mr-2 animate-bounce text-xs font-medium " onClick={()=>isScroll(reviewRef)} to="">
                                                                    ثبت <span className="text-[var(--color-febd69)] text-sm drop-shadow-lg">نظر</span>
                                                            </Link>
                                                        </div>
                                                        <div className="flex  sm-custom:self-end items-center gap-2 ">
                                                            {
                                                                discount ? 
                                                                    (<>
                                                                    <strike className=" text-red-500 text-xs font-semibold ">{toPersianDigitsWithComma(price)} تومان </strike>
                                                                    <p className=" text-base font-semibold ">{toPersianDigitsWithComma(PriceWithDiscunt)} تومان </p>
                                                                    </>
                                                                    ):
                                                                    <p className=" text-base font-semibold ">{toPersianDigitsWithComma(price)} تومان </p>
                                                            }
                                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="flex sm-custom2:flex-col sm-custom2:items-start items-center justify-between gap-5 py-3 lg:py-5 border-b border-b-black/25">
                                    <div className=" space-y-2 lg:space-y-4">
                                        <div className="flex items-center gap-2.5">
                                            <h3 className="text-sm mb-0 text-[var(--color-1c1c1b)]">برند :</h3>
                                            <p className="text-[13px] mb-0 text-[var(--color-777777)]">
                                                {brands.find(b=>b._id == brand)?.title }
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <h3 className="text-sm mb-0 text-[var(--color-1c1c1b)]">دسته بندی :</h3>
                                            <p className="text-[13px] mb-0 text-[var(--color-777777)]">
                                                { pCategories.find(pCat => pCat._id == category)?.title }
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <h3 className="text-sm mb-0 text-[var(--color-1c1c1b)]"> tags&nbsp;:</h3>
                                            <p className="text-[13px]  sm-custom:text-xs mb-0 text-[var(--color-777777)] flex items-center  sm-custom:gap-1 gap-3">
                                                {
                                                    tags.map((tag,i)=><span key={i} className="py-0.5 px-2 rounded-md text-nowrap bg-slate-200">{tag}</span>)
                                                }
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2.5 mb-2">
                                            <h3 className="text-sm mb-0 text-[var(--color-1c1c1b)]">موجودی :</h3>
                                            <p className="text-[13px] mb-0 text-[var(--color-777777)]">{quantity > 0 ? ` ${toPersianDigits(quantity)} عدد در انبار` : "ناموجود"}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex sm-custom2:w-full sm-custom2:flex-row  sm-custom2:gap-x-6 flex-col gap-2 ">
                                            <div className="flex items-center gap-2.5">
                                                <h3 className="text-sm mb-0 text-[var(--color-1c1c1b)]"> رنگ :</h3>
                                                <p className="">
                                                    {
                                                       addedProduct.color 
                                                    }
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {
                                                    color.map((c,i)=><input 
                                                                        type="checkbox" 
                                                                        onChange={()=>setAddedProduct({...addedProduct,color:c})} 
                                                                        className='form-checkbox checked:text-[var(--color-febd69)] cursor-pointer p-2 rounded-full border border-black focus:border-black focus:ring-[var(--color-febd69)]' 
                                                                        style={{background: c == "نقره ای" ? 'silver' :
                                                                                            c == "زرد" ? 'yellow' :
                                                                                            c == "آبی" ? 'blue' :
                                                                                            c == "سبز" ? 'green' :
                                                                                            c == "قرمز" ? 'red' :
                                                                                            c == "سفید" ? 'white' :
                                                                                            c == "سیاه" ? 'black' :
                                                                                            c == "قهوه ای" ? 'brown' :
                                                                                            c == "طلایی" ? 'gold' :
                                                                                            c == "صورتی" ? 'pink' : ""}} 
                                                                        key={i}
                                                                     />)
                                                }
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-sm mb-0 text-[var(--color-1c1c1b)]"> تعداد :</h3>
                                            <div className="flex items-center border border-[var(--color-ededed)]">
                                                <button onClick={()=>setAddedProduct({...addedProduct,quantity:addedProduct.quantity+1})} className="cursor-pointer px-1 border-l">
                                                    <FiPlus />
                                                </button>
                                                <input  type="text" readOnly value={toPersianDigits(addedProduct.quantity)}  min={1} className="w-10 py-0 text-center text-[13px] mb-0 text-[var(--color-777777)] border-none "/>
                                                <button onClick={()=>{if(addedProduct.quantity > 1)setAddedProduct((prev)=>({...prev,quantity:addedProduct.quantity-1}))}} disabled={addedProduct.quantity == 1} className={`${addedProduct.quantity == 1 ? 'cursor-not-allowed' : 'cursor-pointer'} px-1 border-r`}>
                                                    <FiMinus className={`${addedProduct.quantity == 1 && 'opacity-20'}`}/>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 flex sm-custom2:flex-col items-center justify-between ">
                                        <div className="flex items-center gap-5">
                                            <div className="">
                                                <Link to='/compare-product' className="flex items-center gap-1">
                                                    <FaCodeCompare className="w-4 h-4 " />
                                                    <p className="flex items-center text-xs">
                                                    مقایسه محصول 
                                                    </p>
                                                </Link>
                                            </div>
                                            <div className="">
                                                <button onClick={handleHeartClick} className="flex items-center gap-1">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                        className={`hover:text-red-500 ${ isLiked ? 'fill-red-500' : ''} ${heartAnimation ? 'heart-animation' : ''}`}
                                                        >
                                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                                                    </svg>  
                                                    <p className=" text-xs">
                                                        علاقه مندی ها
                                                    </p>
                                                </button>
                                            </div>
                                        </div>
                                        <button onClick={handleAddtoCart} type="submit" className=" sm-custom:w-full w-fit sm-custom2:mt-5 text-nowrap bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white px-2 py-1 rounded-xl">
                                        افزودن به سبد خرید
                                        </button>
                                </div>
                                <div className="hidden w-full xl:flex items-center justify-between px-5 py-12">                                    
                                    <div className="flex items-center gap-3">
                                            <LiaShippingFastSolid className="w-14 h-14" />
                                            <div className="flex flex-col gap-3">
                                                <h6 className="font-bold text-xl text-nowrap">
                                                    ارسال فوری
                                                </h6>
                                                <p className="text-nowrap text-sm">
                                                </p>
                                            </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <BiSupport className="w-12 h-12" />
                                        <div className="flex flex-col gap-3">
                                            <h6 className="font-bold text-xl text-nowrap">
                                                {toPersianDigits(24)} / {toPersianDigits(7)}  
                                            </h6>
                                            <p className="text-nowrap text-sm">
                                                    کارشناس آنلاین
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                            <MdPayment className="w-12 h-12" />
                                            <div className="flex flex-col gap-3">
                                                <h6 className="font-bold text-xl text-nowrap">
                                                    پرداخت امن
                                                </h6>
                                                <p className="text-nowrap text-sm">
                                                {toPersianDigits(100)}% ایمن
                                                </p>
                                            </div>
                                    </div>
                                </div>
                        </div>
                </div>        
            {/* Tabs */}
                <div className="grid grid-cols-12 mt-5"> 
                    <div className="pt-0 p-5 col-span-12">
                        <Tabs details={details} description={description} productId={productId} ordereddProduct={ordereddProduct} setOrdereddProduct={setOrdereddProduct} ref={reviewRef}/>
                    </div>
                </div>
            </div>
       </Container>
{/* Featured Section */}        
        <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className=" px-5 mb-5 font-extrabold text-xl">
                    <h3 className="">   منتخب محصولات </h3>
            </div>
            <div className="grid grid-cols-12 gap-5 px-5">
                {
                productState.filter(product => product.tags.includes('popular')).map((p,i)=><ProductCart key={i} dataSelection={p} />)
                }
            </div> 
        </Container>
    </> 
  )
}

export default SingleProduct

