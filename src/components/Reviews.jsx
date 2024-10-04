import { toPersianDigits } from "@/utils/toPersianDigits";
import StarRating from "./StarRating";

const Reviews = (Props) => {
    
    const {ordereddProduct,setOrdereddProduct}=Props;

  return (
    <section  className="">
                        <div className="grid grid-cols-12">
                            <div className="col-span-12 px-5">
                                <div className=" rounded-md flex flex-col items-center gap-5 ">
                                    <div className={`w-full pb-3 ${ordereddProduct && "border-b border-b-black/25"}`}>
                                        <h4 className="mb-2 text-lg font-bold text-[var(--color-1c1c1b)]">
                                                نظرات مشتریان
                                        </h4>
                                        <div  className="w-full flex items-center justify-between ">
                                            <div className="flex items-center gap-2">
                                                <StarRating /> 
                                                <p className="text-xs text-[var(--color-777777)]">
                                                    ( {toPersianDigits(2)} نظر )
                                                </p>
                                            </div>
                                            <button  onClick={()=>setOrdereddProduct(!ordereddProduct)} className="text-blue-400 text-sm ">
                                                نوشتن نظر
                                            </button>   
                                        </div>
                                    </div>
                                    <div className={`w-10/12 ${ordereddProduct ? "flex flex-col" : "hidden"} gap-1  transition-all duration-500 ease-in-out `}>
                                            <h4 className="  w-full font-bold text-base text-right text-[var(--color-777777)">
                                             ثبت نظرات
                                            </h4>
                                            <div className=" w-full flex flex-col  ">
                                                 <StarRating />
                                            </div>        
                                            <form  className="w-full flex flex-col items-center gap-5">
                                                <textarea className=" w-full bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)] " name="" id="" cols="30" rows="3" placeholder="نظرات">
                                                </textarea>
                                                <div className=" w-full flex justify-end ">
                                                    <button className=" w-fit px-2 py-1 rounded-full bg-[var(--color-febd69)]">
                                                        ارسال
                                                    </button>
                                                </div>
                                            </form>    
                                    </div>
                                    <div className="w-full py-2 border-t border-t-[var(--color-ededed)] ">
                                          <div className="flex items-center justify-start gap-2">
                                                <h6 className="  font-bold text-base text-[var(--color-777777)">
                                                نوید 
                                                </h6>
                                                <div className="flex  ">
                                                  <StarRating />
                                                </div>
                                          </div>
                                          <p className="mt-3 text-sm text-[var(--color-777777)">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores praesentium autem natus expedita iusto similique esse saepe nulla placeat et nemo vitae iure unde excepturi nobis, tenetur, omnis obcaecati reiciendis!
                                          </p>
                                    </div>
                                    <div className="w-full py-2 border-t border-t-[var(--color-ededed)] ">
                                          <div className="flex items-center justify-start gap-2">
                                                <h6 className="  font-bold text-base text-[var(--color-777777)">
                                                محسن 
                                                </h6>
                                                <div className="flex  ">
                                                    <StarRating />
                                                </div>
                                          </div>
                                          <p className="mt-3 text-sm text-[var(--color-777777)">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores praesentium autem natus expedita iusto similique esse saepe nulla placeat et nemo vitae iure unde excepturi nobis, tenetur, omnis obcaecati reiciendis!
                                          </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                </section>
  )
}

export default Reviews