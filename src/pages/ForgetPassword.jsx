import BreadCrumb from "@/components/BreadCrumb"
import Container from "@/components/Container"
import Input from "@/components/Input"
import Meta from "@/components/Meta"
import { Link } from "react-router-dom"


const ForgetPassword = () => {
  return (
    <>
       <Meta title=" فراموشی رمز عبور" /> 
       <BreadCrumb title=" فراموشی رمز عبور" /> 
       <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className="h-80 grid grid-cols-12 place-items-center">
                  <div className="w-1/3 col-span-12 bg-white rounded-lg">
                    <div className="p-5 space-y-5">
                        <h3 className="text-xl text-center font-bold">بازنشانی رمز عبور</h3>
                        <p className="text-xs text-[var(--color-777777)]"> ما برای شما یک ایمیل ارسال خواهیم کرد تا رمز عبور خود را بازنشانی کنید .</p>
                        <form className="flex flex-col gap-3">
                          <Input  name="email" type="email" className="p-1  w-full bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent  focus:ring-[var(--color-febd69)]" placeholder="آدرس پست الکترونیکی شما" class2="w-full" />   
                          <div className="mt-2 flex flex-col items-center gap-2">
                            <button type="submit" className="w-1/3 bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white  px-2 py-1 rounded-xl">
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