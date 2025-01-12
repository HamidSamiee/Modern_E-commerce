import { toPersianDigits } from "@/utils/toPersianDigits";
import StarRating from "./StarRating";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addRating, getAllProducts } from "@/features/ProductsSlice/productSlice";
import { getAllUsers } from "@/features/userSlice/userSlice";
import { useNavigate } from "react-router-dom";

const Reviews = (Props) => {
    
    const {ordereddProduct,setOrdereddProduct,productId}=Props;
    
    const [star, setStar] = useState(null);
    const [comment, setComment] = useState(null);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const prodId = productId.includes("#comments") ? productId.split("#comments")[0] : productId ;

    const addRatingToProduct = () => {
        if (star === null) {
          toast.error("امتیازت رو ثبت نکردی");
          return false;
        } else if (!comment || comment.trim() === "") {
          toast.error("نظرت رو ثبت نکردی");
          return false;
        } else {
          dispatch(addRating({data:{ star, prodId, comment }, navigate}));
          setComment(null); // پاک کردن نظر کاربر بعد از ارسال
          setStar(null);    // ریست امتیاز بعد از ارسال
          setTimeout(() => {
            dispatch(getAllProducts());
          }, 100);
        }
      };
      

    const productState=useSelector(state=>state?.product?.products)
    const product= productState.filter(p=>p._id == productId) ;
    const {ratings,totalrating} = product[0];
    const { customers } = useSelector(state => state.auth);

    useEffect(() => {
      dispatch(getAllUsers())
    }, [dispatch])
    
  return (
    <section  className="">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12 sm-custom3:-mx-8 px-5">
                                <div className=" rounded-md flex flex-col items-center gap-5">
                                    <div className={`w-full ${ordereddProduct && "border-b border-b-black/25"}`}>
                                        <h4 className="mb-2 sm-custom:text-base text-lg font-bold text-[var(--color-1c1c1b)]">
                                                نظرات مشتریان
                                        </h4>
                                        <div  className="w-full flex items-center justify-between ">
                                            <div className="flex  items-center gap-2">
                                                <StarRating star={parseFloat(totalrating)} setStar={null} /> 
                                                <p className="text-xs text-[var(--color-777777)]">
                                                    ( {toPersianDigits(ratings.length)} نظر )
                                                </p>
                                            </div>
                                            <button  onClick={()=>setOrdereddProduct(!ordereddProduct)} className="text-blue-400 text-sm ">
                                                نوشتن نظر
                                            </button>   
                                        </div>
                                    </div>
                                    <div id="comments" className={`w-10/12 ${ordereddProduct ? "flex flex-col" : "hidden"} gap-1 transition-all duration-500 ease-in-out`}>
                                            <h4 className="w-full font-bold text-base text-right text-[var(--color-777777)]">
                                                ثبت نظرات
                                            </h4>
                                            <div className="w-full flex flex-col">
                                                <StarRating star={star} setStar={setStar} />
                                            </div>
                                            <div className="w-full flex flex-col items-center gap-5">
                                                <textarea
                                                className="w-full bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)]"
                                                cols="30"
                                                rows="3"
                                                placeholder="نظرات"
                                                value={comment || ""}
                                                onChange={(e) => setComment(e.target.value)}
                                                />
                                                <div className="w-full flex justify-end">
                                                    <button
                                                        onClick={addRatingToProduct}
                                                        className="w-fit px-2 py-1 rounded-full bg-[var(--color-febd69)]"
                                                    >
                                                        ارسال
                                                    </button>
                                                </div>
                                            </div>
                                    </div>

                                    {product &&
                                        product[0]?.ratings.map((rate, i) => (
                                            <div key={i} className="w-full pt-2  border-t border-t-[var(--color-ededed)] ">
                                                <div className="flex items-center justify-start gap-2">
                                                    <h6 className="font-bold text-base text-[var(--color-777777)]">
                                                    {customers.find((customer) => customer._id === rate.postedby)?.firstname}
                                                    </h6>
                                                    <div className="flex">
                                                    {/* StarRating برای نمایش فقط خواندن */}
                                                    <StarRating star={parseFloat(rate?.star)} setStar={null} />
                                                    </div>
                                                </div>
                                                <p className="pr-10 text-sm text-justify text-[var(--color-777777)]">
                                                    {rate.comment}
                                                </p>
                                            </div>
                                        ))
                                    }                                 
                                </div>
                            </div>
                        </div>
                    
                </section>
  )
}

export default Reviews