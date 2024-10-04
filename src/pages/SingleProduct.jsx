import { selectionProduct } from "@/assets/data/data"
import BreadCrumb from "@/components/BreadCrumb"
import Meta from "@/components/Meta"
import ProductCart from "@/components/ProductCart"
import { Link, useParams } from "react-router-dom"
import {  useRef, useState } from "react"
import { toPersianDigits, toPersianDigitsWithComma } from "@/utils/toPersianDigits"
// import { MagnifierContainer, MagnifierPreview, MagnifierZoom } from "react-image-magnifiers"
import { FiMinus, FiPlus } from "react-icons/fi"
import { FaCodeCompare, FaRegHeart } from "react-icons/fa6"
import Tabs from "@/components/Tabs/Tabs"
import { useDispatch } from "react-redux"
import { addToCart } from "@/features/CartSlice/CartSlice"
import Container from "@/components/Container"
import StarRating from "@/components/StarRating"
import ImageMagnifier from "@/components/ImageMagnifier"

const SingleProduct = () => {

    
    const dispatch=useDispatch();
    const reviewRef=useRef();
    const [ordereddProduct, setOrdereddProduct] = useState(false)
    const [addedProduct, setAddedProduct] = useState({
        size:"",
        color:"",
        quantity:1,
    })
// console.log(addedProduct)

    const {productId}=useParams();
    const product= selectionProduct.filter(p=>p.id == productId) ;
    const {imgA,imgB,brand,type,title,description,price,category,tags,details,color,size,discount,quantity,PriceWithDiscunt}=product[0];
    
    const [image, setImage] = useState(imgA);
    
    
    const isScroll=(ref)=>{ref.current.checked=true ; window.scrollTo({left:0,top:ref.current.offsetTop,behavior : "smooth"}); setOrdereddProduct(!ordereddProduct);}
        
    

  return (
    
    <>
       <Meta title={`${title}`} /> 
       <BreadCrumb title={`${title}`} /> 
       <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className="mx-5 rounded-3xl bg-white">
                <div className="grid grid-cols-12">
            {/* details Product */}
                    <div className="col-span-8  px-5 pt-5 ">
                        <div className="border-b border-b-black/25">
                                <h3 className="font-semibold text-lg mb-2 text-[var(--color-1c1c1b)]">
                                        {title}
                                </h3>
                        </div>
                        <div className="py-3 border-b border-b-black/25 flex flex-col items-end">
                            
                            <div className="w-full flex items-center justify-between ">
                                                <div className="flex items-center gap-0.5">
                                                    <StarRating /> 
                                                    <p className="text-xs text-[var(--color-777777)]">
                                                    {toPersianDigits(4)} (امتیاز  {toPersianDigits(2)} خریدار   ،   {toPersianDigits(2)} دیدگاه )
                                                    </p>
                                                    <Link className="mr-2 animate-bounce text-xs font-medium " onClick={()=>isScroll(reviewRef)} to="">
                                                            ثبت <span className="text-[var(--color-febd69)] drop-shadow-lg">دیدگاه</span>
                                                    </Link>
                                                </div>
                                                <div className="flex items-center gap-2 ">
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
                        <div className="flex items-center justify-between gap-5 py-3 border-b border-b-black/25">
                            <div className=" space-y-2">
                                <div className="flex items-center gap-2.5">
                                    <h3 className="text-sm mb-0 text-[var(--color-1c1c1b)]">نوع محصول :</h3>
                                    <p className="text-[13px] mb-0 text-[var(--color-777777)]">{type}</p>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <h3 className="text-sm mb-0 text-[var(--color-1c1c1b)]">برند :</h3>
                                    <p className="text-[13px] mb-0 text-[var(--color-777777)]">{brand}</p>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <h3 className="text-sm mb-0 text-[var(--color-1c1c1b)]">دسته بندی :</h3>
                                    <p className="text-[13px] mb-0 text-[var(--color-777777)]">{category}</p>
                                </div>
                                <div className="flex items-center gap-2.5">
                                    <h3 className="text-sm mb-0 text-[var(--color-1c1c1b)]"> tags&nbsp;:</h3>
                                    <p className="text-[13px] mb-0 text-[var(--color-777777)] flex items-center gap-3">
                                        {
                                            tags.map((tag,i)=><span key={i} className="py-0.5 px-2 rounded-md bg-slate-200">{tag}</span>)
                                        }
                                    </p>
                                </div>
                                <div className="flex items-center gap-2.5 mb-2">
                                    <h3 className="text-sm mb-0 text-[var(--color-1c1c1b)]">موجودی :</h3>
                                    <p className="text-[13px] mb-0 text-[var(--color-777777)]">{quantity > 0 ? ` ${toPersianDigits(quantity)} عدد در انبار` : "ناموجود"}</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex flex-col items-start gap-2">
                                    <div className="flex items-center gap-2.5">
                                        <h3 className="text-sm mb-0 text-[var(--color-1c1c1b)]"> سایز :</h3>
                                        <p className="">
                                            {addedProduct.size || '--'} 
                                        </p>
                                    </div>
                                    <div className="text-[13px]  mb-0 flex flex-row-reverse items-center gap-3">
                                        {
                                        size.map((s,i)=><span onClick={()=>setAddedProduct({...addedProduct,size:s})} className={`${addedProduct.size == s ? 'border-2 border-[var(--color-febd69)] text-[var(--color-febd69)]' : "text-white  border border-black/20"} cursor-pointer px-2  bg-[var(--color-777777)]`} key={i}>{s}</span>)
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 ">
                                    <div className="flex items-center gap-2.5">
                                        <h3 className="text-sm mb-0 text-[var(--color-1c1c1b)]"> رنگ :</h3>
                                        <p className="">{addedProduct.color == 'silver' ? "نقره ای" :
                                                            addedProduct.color == 'blue' ? "آبی" :
                                                            addedProduct.color == 'green' ? "سبز" :
                                                            addedProduct.color == 'red' ? "قرمز" :
                                                            addedProduct.color == 'white' ? "سفید" :
                                                            addedProduct.color == 'black' ? "مشکی" :
                                                            addedProduct.color == 'pink' ? "صورتی" : "--"
                                                        }
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {
                                            color.map((c,i)=><input type="checkbox" onChange={()=>setAddedProduct({...addedProduct,color:c})} className='form-checkbox checked:text-[var(--color-febd69)] cursor-pointer p-2 rounded-full border border-black focus:border-black focus:ring-[var(--color-febd69)]' style={{background: c}} key={i}/>)
                                        }
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-sm mb-0 text-[var(--color-1c1c1b)]"> تعداد :</h3>
                                    <div className="flex items-center border border-[var(--color-ededed)]">
                                        <button onClick={()=>setAddedProduct((prev)=>({...prev,quantity:addedProduct.quantity+1}))} className="cursor-pointer px-1 border-l">
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
                        <div className="mt-5 flex items-center justify-between ">
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
                                        <Link to='/wishList' className="flex items-center gap-1">
                                            <FaRegHeart  className="w-4 h-4  " />
                                            <p className=" text-xs">
                                                علاقه مندی ها
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                                <button onClick={()=>dispatch(addToCart(
                                    {
                                    id: productId,
                                    name: title,
                                    size: addedProduct.size ,
                                    color: addedProduct.color,
                                    img: imgA,
                                    text: description,
                                    price: price,
                                    quantity: addedProduct.quantity,
                                    totalPrice: addedProduct.quantity * price
                                    }
                                    ))} 
                                    type="submit" className="w-1/4 bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white px-2 py-1 rounded-xl">
                                افزودن به سبد خرید
                                </button>
                        </div>
                        
                    </div>
            {/* images product */}
                    <div className="pt-5 col-span-4 space-y-5">
                        <div className="relative mx-5 rounded-lg  border border-[var(--color-1c1c1b)]">
                            {
                                discount &&
                                <div className="">
                                    <span className="pl-0.5 pr-3 absolute top-3 left-0  bg-red-500 text-white font-extrabold">OFF%</span>
                                    <span className="p-2 absolute top-4 left-12 rotate-45  bg-white"></span>
                                </div>
                            }
                              <ImageMagnifier src={image} alt="تصویر " />
                        </div>
                        <div className=" w-full flex items-center justify-center gap-5">
                            <div  onClick={()=>setImage(imgA)} className="p-5 border border-[var(--color-1c1c1b)] object-cover w-1/4 h-1/4">
                                <img src={imgA} alt="" className="" />
                            </div>               
                            <div  onClick={()=>setImage(imgB)} className="p-5 border border-[var(--color-1c1c1b)] object-cover w-1/4 h-1/4">
                                <img src={imgB} alt="" className="" />
                            </div>
                        </div>
                    </div>
                </div>
            {/* Tabs */}
                <div className="grid grid-cols-12"> 
                    <div className="pt-0 p-5 col-span-12">
                        <Tabs details={details} description={description} ordereddProduct={ordereddProduct} setOrdereddProduct={setOrdereddProduct} ref={reviewRef}/>
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
                selectionProduct.slice(0,6).map((p,i)=><ProductCart key={i} dataSelection={p} />)
                }
            </div> 
        </Container>
    </> 
  )
}

export default SingleProduct

