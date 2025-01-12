import BreadCrumb from "@/components/BreadCrumb"
import Container from "@/components/Container"
import Input from "@/components/Input"
import Meta from "@/components/Meta"
import { loginUser } from "@/features/userSlice/userSlice"
import { useFormik } from "formik"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import * as Yup from "yup"

const loginSchema =Yup.object({
  email:Yup.string().nullable().email('پست الکترونیکی معتبر نیست').required("پست الکترونیکی الزامی است"),
  password:Yup.string().required('ورود  پسورد الزامیست').min(8, 'رمز عبور می بایست حداقل شامل 8 کاراکتر باشد.')
              .matches(/[a-zA-Z]/, 'رمز عبور فقط می‌تواند شامل حروف لاتین باشد."'),
})


const Login = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {user}=useSelector(state =>state.auth)
// console.log(user.role)
  const formik = useFormik({
    initialValues:{
          email:'',
          password:'',
    },
    validationSchema:loginSchema,
    onSubmit:values=>{
      dispatch(loginUser(values))
      if(user.role == "Admin"){
        navigate("/admin");
      }else{
        navigate(sessionStorage.getItem('redirectPath') || "/");
        sessionStorage.removeItem('redirectPath');
      } 
    },
  })

  return (
    <>
       <Meta title=" ورود" /> 
       <BreadCrumb title=" ورود - ثبت نام " /> 
       <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className="h-80 grid grid-cols-12 place-items-center">
                  <div className="animate__animated animate__zoomIn  sm-custom:w-full w-3/5  md:w-1/2  lg:w-1/3 col-span-12 bg-white rounded-lg">
                    <div className="p-5 space-y-5">
                        <h3 className="text-xl text-center font-bold">ورود</h3>
                        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3">
                          <Input  
                            name="email"
                            type="email"
                            className="p-1 w-full bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent  focus:ring-[var(--color-febd69)]"
                            placeholder="آدرس پست الکترونیکی شما" 
                            class2="w-full"
                            value={formik.values.email}
                            onChange={formik.handleChange('')}
                            onBlur={formik.handleBlur('email')}
                          /> 
                          <div className="text-rose-500 text-xs">
                            {
                              formik.touched.email && formik.errors.email
                            }
                          </div>   
                          <Input 
                            name="password"
                            type="password"
                            className="p-1 w-full bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent  focus:ring-[var(--color-febd69)]"
                            placeholder="پسورد شما" 
                            class2="w-full"
                            value={formik.values.password}
                            onChange={formik.handleChange('')}
                            onBlur={formik.handleBlur('password')}
                          />
                          <div className="text-rose-500 text-xs">
                            {
                              formik.touched.password && formik.errors.password
                            }
                          </div>  
                          <div className="">
                            <Link to="/forget-password" className=" mr-3 text-xs font-normal text-[var(--color-1c1c1b)]">
                              فراموشی رمز عبور ؟
                            </Link>
                          </div>
                          <div className="mt-2 flex items-center justify-evenly">
                            <button type="submit" className="w-1/4 bg-black text-white  px-2 py-1 rounded-xl">
                                ورود
                            </button>
                            <Link to='/signUp' className="w-1/4 bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white text-center px-2 py-1 rounded-xl transition-all duration-300 ease-in-out">
                                    ثبت نام
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

export default Login