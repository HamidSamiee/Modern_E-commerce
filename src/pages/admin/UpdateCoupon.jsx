import Input from "@/components/Input"
import { getCoupon, resetState, updateCoupon } from "@/features/couponSlice/couponSlice"
import DatePickerField from "@/ui/DataPickerField"
import { useFormik } from "formik"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import * as Yup from "yup"

const AddCouponSchema =Yup.object({
  name:Yup.string().required("ورود نام کد تخفیف الزامی است"),
  expiry:Yup.date().required("ورود زمان انقضاء الزامی است"),
  discount:Yup.number().required("ورود درصد تخفیف الزامی است"),
})

const UpdateCoupon = (Props) => {

  const {couponId,handleCloseModal}=Props;  
  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(getCoupon(couponId))
  }, [dispatch,couponId])
  
  const {coupons}=useSelector((state)=>state.coupon);


  const coupon = useMemo(() => {
    return coupons.filter(coupon => coupon._id === couponId)
  }, [coupons,couponId])

  const formik = useFormik({
    initialValues:{
      name:coupon[0]?.name || '',
      expiry:new Date(coupon[0]?.expiry).toISOString().split('T')[0] || '',
      discount:coupon[0]?.discount || '',
    },
    validationSchema:AddCouponSchema,
    onSubmit:values=>{
      // console.log(values)
      dispatch(updateCoupon({id:couponId,data:values}));
      handleCloseModal();
      setTimeout(() => {
        dispatch(resetState())
      }, 3000);
    },
  })

  return (
    <div className="w-full font-sans flex flex-col items-center gap-5">
       <h3 className=" font-extrabold text-2xl ">ویرایش کد تخفیف</h3>
       <form onSubmit={formik.handleSubmit}  className="w-full flex flex-col gap-5">
            <div className="space-y-2">
                <label>نام کد تخفیف </label>
                <Input 
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="name"
                  type="text"
                  className="w-full p-1 bg-white border rounded-lg border-secondary-900  focus:ring-secondary-900"
                  placeholder=" نام کد تخفیف"
                  class2="w-full"
                />
                <div className="text-rose-500 text-xs">
                  {
                    formik.touched.name && formik.errors.name
                  }
                </div>
            </div>
            <div className="space-y-2">
                <DatePickerField
                    formik={formik}
                    label="زمان انقضاء"
                />
            </div>
            <div className="space-y-2">
                <label>درصد تخفیف</label>
                <Input 
                  value={formik.values.discount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="discount"
                  type="text"
                  className="w-full p-1 bg-white border rounded-lg border-secondary-900  focus:ring-secondary-900"
                  placeholder="درصد تخفیف"
                  class2="w-full"
                />
                <div className="text-rose-500 text-xs">
                  {
                    formik.touched.discount && formik.errors.discount
                  }
                </div>
            </div>
            < button type="submit" disabled={!(formik.isValid && formik.dirty)} className={`self-end px-4 py-1 w-fit bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white rounded-xl ${!(formik.isValid && formik.dirty) && 'cursor-not-allowed'}`}>
               اعمال تغییرات 
            </button>
      </form>
    </div>
  )
}

export default UpdateCoupon