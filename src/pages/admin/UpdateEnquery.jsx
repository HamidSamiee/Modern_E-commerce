import { getEnquiry, updateEnquiries } from "@/features/enquirySlice/enquirySlice"
import { toPersianDigits } from "@/utils/toPersianDigits"
import { useFormik } from "formik"
import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"



const UpdateEnquery = (Props) => {

  const {enqueryId,handleCloseModal}=Props;  
  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(getEnquiry(enqueryId))
  }, [dispatch,enqueryId])
  
  const {enquiries}=useSelector((state)=>state.enquiry);


  const enquery = useMemo(() => {
    return enquiries.filter(enquery => enquery._id === enqueryId)
  }, [enquiries,enqueryId])

  const formik = useFormik({
    initialValues:{
      status:enquery[0]?.status || '' ,
    },
    onSubmit:values=>{
      console.log(values)
      dispatch(updateEnquiries({id:enqueryId,data:values}));
      handleCloseModal();  
    },
  })

  return (
    <div className="w-full font-sans flex flex-col items-start gap-5">
       <h3 className=" font-extrabold text-2xl ">  نمایش وضعیت مشتریان   </h3>
       <form onSubmit={formik.handleSubmit}  className="w-full flex flex-col gap-5">
            <div className="grid grid-cols-12">
                <h6 className="col-span-6">نام و نام خانوادگی :  </h6>
                <p className="col-span-6">{enquery[0]?.name}</p>
            </div>
            <div className="grid grid-cols-12">
                <h6 className="col-span-6"> آدرس پست الکترونیکی :</h6>
                <p className="col-span-6">{enquery[0]?.email}</p>
            </div>
            <div className="grid grid-cols-12">
                <h6 className="col-span-6"> شماره تلفن :</h6>
                <p className="col-span-6">{toPersianDigits(enquery[0]?.mobile)}</p>
            </div>
            <div className="grid grid-cols-12">
                <h6 className="col-span-6"> نظر : </h6>
                <p className="col-span-6">{enquery[0]?.comment}</p>
            </div>
            <div className="grid grid-cols-12">    
                      <h6 className="col-span-6">  وضعیت : </h6>
                      <select 
                        className="col-span-6 select select-bordered select-sm w-full max-w-xs " 
                        name="status"
                        value={formik.values.status}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                            <option value='0'>  وضعیت </option>
                            <option value='Submitted'> Submitted </option>
                            <option value='Contacted'> Contacted </option>
                            <option value='In Progress'> In Progress </option>
                            <option value='Resolved'> Resolved </option>
                      </select>
            </div>
            < button type="submit" disabled={!(formik.isValid && formik.dirty)} className={`self-center px-4 py-1 w-fit bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white rounded-xl ${!(formik.isValid && formik.dirty) && 'cursor-not-allowed'}`}>
               اعمال تغییرات 
            </button>
      </form>
    </div>
  )
}

export default UpdateEnquery