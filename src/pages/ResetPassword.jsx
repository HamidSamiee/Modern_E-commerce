import BreadCrumb from "@/components/BreadCrumb"
import Container from "@/components/Container"
import Input from "@/components/Input"
import Meta from "@/components/Meta"
import { useFormik } from "formik"
import { useLocation } from "react-router-dom"
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "@/features/userSlice/userSlice"
import { useDispatch } from "react-redux"

const passwordSchema = Yup.object({
  password: Yup.string().required('پسورد ضروری است'),
  confirmPassword: Yup.string().required('تکرار پسورد ضروری است')
     .oneOf([Yup.ref('password'), null], 'پسورد مطابقت ندارد  ')
});

const ResetPassword = () => {

  const dispatch=useDispatch();
  const location=useLocation();
  const getToken=location.pathname.split("/")[2];
  const navigate=useNavigate();

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: passwordSchema,
    onSubmit: values => {
      console.log(values)
      dispatch(resetPassword({token:getToken,password:values?.password}));
      navigate('/login')
    },
  });
  return (
    <>
       <Meta title=" ورود" /> 
       <BreadCrumb title=" ورود - ثبت نام " />
       <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className="h-80 grid grid-cols-12 place-items-center">
                  <div className=" sm-custom:w-full w-3/5  md:w-1/2  lg:w-1/3  col-span-12 bg-white rounded-lg">
                    <div className="p-5 space-y-5">
                        <h3 className="text-xl text-center font-bold">تنظیم مجدد رمز عبور</h3>
                        <form  onSubmit={formik.handleSubmit}  className="flex flex-col gap-3">
                          <Input 
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="password"
                            type="password"
                            className={`w-full p-1 bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)]`}         
                            placeholder="پسورد"
                          />
                          <div className={`text-rose-500 text-xs ${formik.touched.password && formik.errors.password && 'mb-1'}`}>
                            {formik.touched.password && formik.errors.password}
                          </div>
                          <Input 
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="confirmPassword"
                            type="password"
                            className={`w-full p-1 bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)]`}      
                            placeholder="تکرار پسورد"
                          />
                          <div className={`text-rose-500 text-xs ${formik.touched.confirmPassword && formik.errors.confirmPassword && 'mb-1'}`}>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword}
                          </div>
                          <div className="mt-2 flex items-center justify-evenly">
                            <button type="submit" className="w-1/4 bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white  px-2 py-1 rounded-xl">
                                تایید
                            </button>
                          </div>
                        </form>
                    </div>
                  </div>
            </div>
        </Container>
    </>
  )
}

export default ResetPassword