import BreadCrumb from "@/components/BreadCrumb"
import Container from "@/components/Container"
import Input from "@/components/Input"
import Meta from "@/components/Meta"
import { Link } from "react-router-dom"
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { forgetPassword } from "@/features/userSlice/userSlice"

const emailSchema = Yup.object({
  email: Yup.string().nullable().email('پست الکترونیکی معتبر نیست').required("پست الکترونیکی الزامی است"),
})

const ForgetPassword = () => {

  const navigate=useNavigate();
  const dispatch=useDispatch();
  const formik = useFormik({
    initialValues: {
      email:'',
    },
    validationSchema: emailSchema,
    onSubmit: values => {
      console.log(values)
      dispatch(forgetPassword(values));
      navigate('/');
    },
  });

  return (
    <>
       <Meta title=" فراموشی رمز عبور" /> 
       <BreadCrumb title=" فراموشی رمز عبور" /> 
       <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className="h-80 grid grid-cols-12 place-items-center">
                  <div className=" sm-custom:w-full w-3/5  md:w-1/2  lg:w-1/3  col-span-12 bg-white rounded-lg">
                    <div className="p-5 space-y-5">
                        <h3 className="text-xl text-center font-bold">بازنشانی رمز عبور</h3>
                        <p className="text-xs text-[var(--color-777777)]"> ما برای شما یک ایمیل ارسال خواهیم کرد تا رمز عبور خود را بازنشانی کنید .</p>
                        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
                          <Input 
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name="email"
                            type="email"
                            className={`w-full p-1 bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)]`}    
                            placeholder="آدرس پست الکترونیکی"
                          />
                          <div className={`text-rose-500 text-xs ${formik.touched.email && formik.errors.email && 'mb-1'}`}>
                            {formik.touched.email && formik.errors.email}
                          </div>
                          <div className="mt-2 flex flex-col items-center gap-2">
                            <button type="submit"  disabled={!(formik.isValid && formik.dirty)} className="w-1/3 bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white  px-2 py-1 rounded-xl">
                                  ارسال
                            </button>
                            <Link to='/login'  className="w-1/3 bg-white text-[var(--color-131921)] border border-[var(--color-131921)] text-center px-2 py-1 rounded-xl transition-all duration-300 ease-in-out">
                                    لغو
                            </Link>
                          </div>
                        </form>
                    </div>
                  </div>
            </div>
       </Container>
    </>
  )
}

export default ForgetPassword