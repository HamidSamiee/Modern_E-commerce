import BreadCrumb from "@/components/BreadCrumb"
import Container from "@/components/Container"
import Input from "@/components/Input"
import Meta from "@/components/Meta"


const ResetPassword = () => {
  return (
    <>
       <Meta title=" ورود" /> 
       <BreadCrumb title=" ورود - ثبت نام " />
       <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className="h-80 grid grid-cols-12 place-items-center">
                  <div className=" sm-custom:w-full w-3/5  md:w-1/2  lg:w-1/3  col-span-12 bg-white rounded-lg">
                    <div className="p-5 space-y-5">
                        <h3 className="text-xl text-center font-bold">تنظیم مجدد رمز عبور</h3>
                        <form className="flex flex-col gap-3">
                          <Input name="password" type="password" className="p-1  w-full bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent  focus:ring-[var(--color-febd69)]" placeholder="پسورد شما"  class2="w-full" />  
                          <Input name="confirmPassword" type="password" className="p-1  w-full bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent  focus:ring-[var(--color-febd69)]" placeholder="تکرار پسورد " class2="w-full" />
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