import BreadCrumb from "@/components/BreadCrumb"
import Container from "@/components/Container"
import Input from "@/components/Input"
import Meta from "@/components/Meta"
import { registerUser } from "@/features/userSlice/userSlice"
import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"

const signUpSchema =Yup.object({
  firstname:Yup.string().required('ورود نام الزامیست'),
  lastname:Yup.string().required('ورود نام خانوادگی الزامیست'),
  email:Yup.string().nullable().email('پست الکترونیکی معتبر نیست').required("پست الکترونیکی الزامی است"),
  mobile:Yup.string().required('ورود شماره تلفن الزامیست'),
  password:Yup.string().required('ورود  پسورد الزامیست').min(8, 'رمز عبور می بایست حداقل شامل 8 کاراکتر باشد.')
              .matches(/[a-zA-Z]/, 'رمز عبور فقط می‌تواند شامل حروف لاتین باشد."'),
})

const SignUp = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const formik = useFormik({
    initialValues:{
          firstname:'',
          lastname:'',
          email:'',
          mobile:'',
          password:'',
    },
    validationSchema:signUpSchema,
    onSubmit:values=>{
      dispatch(registerUser(values));
      navigate("/login");
    },
  })

  return (
    <>
       <Meta title=" ثبت نام  " /> 
       <BreadCrumb title=" ثبت نام " />
       <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className="h-[500px] grid grid-cols-12 place-items-center">
                  <div className="animate__animated animate__fadeInLeftBig w-1/3 col-span-12 bg-white rounded-lg">
                    <div className="p-5 space-y-5">
                        <h3 className="text-xl text-center font-bold">ثبت نام</h3>
                        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
                          <Input 
                                value={formik.values.firstname}
                                onChange={formik.handleChange('')}
                                onBlur={formik.handleBlur('firstname')}
                                name="firstname"
                                type="text"
                                className="w-full p-1 bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent  focus:ring-[var(--color-febd69)]"
                                placeholder="نام"
                                class2="w-full"
                          />
                          <div className="text-rose-500 text-xs">
                            {
                              formik.touched.firstname && formik.errors.firstname
                            }
                          </div>  
                          <Input 
                                value={formik.values.lastname}
                                onChange={formik.handleChange('lastname')}
                                onBlur={formik.handleBlur('lastname')}
                                name="lastname"
                                type="text"
                                className="w-full p-1 bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent  focus:ring-[var(--color-febd69)]"
                                placeholder="نام خانوادگی"
                                class2="w-full"
                          />
                          <div className="text-rose-500 text-xs">
                            {
                              formik.touched.lastname && formik.errors.lastname
                            }

                          </div>
                          <Input 
                                value={formik.values.email}
                                onChange={formik.handleChange('email')}
                                onBlur={formik.handleBlur('email')}
                                name="email"
                                type="email"
                                className="w-full p-1 bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent  focus:ring-[var(--color-febd69)]"
                                placeholder="آدرس پست الکترونیکی شما"
                                class2="w-full"
                          />
                          <div className="text-rose-500 text-xs">
                            {
                              formik.touched.email && formik.errors.email
                            }
                          </div>   
                          <Input 
                                value={formik.values.mobile}
                                onChange={formik.handleChange('mobile')}
                                onBlur={formik.handleBlur('mobile')}
                                name="mobile"
                                type="tel"
                                className="w-full p-1 text-right bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent  focus:ring-[var(--color-febd69)]"
                                placeholder=" شماره تلفن"
                                class2="w-full"
                          />
                          <div className="text-rose-500 text-xs">
                            {
                              formik.touched.mobile && formik.errors.mobile
                            }
                          </div>  
                          <Input 
                                value={formik.values.password}
                                onChange={formik.handleChange('password')}
                                onBlur={formik.handleBlur('password')}
                                name="password"
                                type="password"
                                className="w-full p-1 bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent  focus:ring-[var(--color-febd69)]"
                                placeholder="پسورد شما"
                                class2="w-full"
                          />
                          <div className="text-rose-500 text-xs">
                            {
                              formik.touched.password && formik.errors.password
                            }
                          </div>                           
                          <div className="mt-2 flex items-center justify-evenly">
                            <button type="submit" disabled={!(formik.isValid && formik.dirty)} className={`w-1/4 bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white px-2 py-1 rounded-xl ${!(formik.isValid && formik.dirty) && 'cursor-not-allowed'}`}>
                                      ثبت نام
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

export default SignUp