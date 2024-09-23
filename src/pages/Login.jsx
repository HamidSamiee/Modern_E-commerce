import BreadCrumb from "@/components/BreadCrumb"
import Container from "@/components/Container"
import Input from "@/components/Input"
import Meta from "@/components/Meta"
import { Link } from "react-router-dom"


const Login = () => {
  return (
    <>
       <Meta title=" ورود" /> 
       <BreadCrumb title=" ورود - ثبت نام " /> 
       <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className="h-80 grid grid-cols-12 place-items-center">
                  <div className="w-1/3 col-span-12 bg-white rounded-lg">
                    <div className="p-5 space-y-5">
                        <h3 className="text-xl text-center font-bold">ورود</h3>
                        <form className="flex flex-col gap-3">
                          <Input  name="email" type="email" className="p-1 w-full bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent  focus:ring-[var(--color-febd69)]" placeholder="آدرس پست الکترونیکی شما" class2="w-full" />   
                          <Input name="password" type="password" className="p-1 w-full bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent  focus:ring-[var(--color-febd69)]" placeholder="پسورد شما"  class2="w-full" />  
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