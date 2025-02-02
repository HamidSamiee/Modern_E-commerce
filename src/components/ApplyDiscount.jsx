import { applyCoupon } from "@/features/CartSlice/CartSlice";
import { useState } from "react";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ApplyDiscount = () => {
  const [showOff, setShowOff] = useState(false)
  const [couponName, setCouponName] = useState("");
  const dispatch = useDispatch();
  const { coupons , isError, message } = useSelector((state) => state.coupon);
  const { totalAfterDiscount } = useSelector((state) => state.cart);

  const applyCartCoupon = () => {
    if (!couponName.trim()) {
      toast.error("لطفاً کد تخفیف را وارد کنید.");
      return;
    }
    dispatch(applyCoupon(couponName));
  };

  return (
    <div className="w-full my-2 flex flex-col items-center gap-4">
      <div className="w-full flex items-center justify-center gap-3 mt-1">
        <MdOutlineLocalOffer />
        <p className={`text-base font-extrabold ${showOff ? 'hidden' : 'block'}`} onClick={()=>setShowOff(true)} >ثبت کد تخفیف ?</p>
        <div className={`flex items-center justify-center gap-3 ${showOff ? 'block' : 'hidden'}`}>
            <input
                type="text"
                value={couponName}
                onChange={(e) => setCouponName(e.target.value)}
                className="border border-black rounded px-1"
                placeholder="کد تخفیف را وارد کنید"
            />
            <button
                onClick={applyCartCoupon}
                className="sm-custom:w-[80%] sm-custom:mx-2 sm-custom:self-center  self-end w-fit bg-[var(--color-febd69)] text-nowrap text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white text-center px-2 py-1 rounded-xl transition-all duration-300 ease-in-out"            >
                اعمال
            </button>
        </div>
        
      </div>
      
        <p className="text-green-500">
          { totalAfterDiscount ? `کد تخفیف اعمال شد.` : ""}
        </p>
      
      {isError && <p className="text-red-500">{message}</p>}
    </div>
  );
};

export default ApplyDiscount;
