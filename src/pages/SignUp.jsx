import BreadCrumb from "@/components/BreadCrumb"
import Container from "@/components/Container"
import Input from "@/components/Input"
import Meta from "@/components/Meta"


const SignUp = () => {
  return (
    <>
       <Meta title=" ثبت نام  " /> 
       <BreadCrumb title=" ثبت نام " />
       <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className="h-96 grid grid-cols-12 place-items-center">
                  <div className="w-1/3 col-span-12 bg-white rounded-lg">
                    <div className="p-5 space-y-5">
                        <h3 className="text-xl text-center font-bold">ثبت نام</h3>
                        <form className="flex flex-col gap-3">
                          <Input name="firstName_lastName" type="text" className="w-full p-1 bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent  focus:ring-[var(--color-febd69)]" placeholder="  نام و نام خانوادگی" class2="w-full" />  
                          <Input name="email" type="email" className="w-full p-1 bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent  focus:ring-[var(--color-febd69)]" placeholder="آدرس پست الکترونیکی شما" class2="w-full" />   
                          <Input name="phoneNumber" type="tel" className="w-full p-1 text-right bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent  focus:ring-[var(--color-febd69)]" placeholder=" شماره تلفن" class2="w-full" />  
                          <Input name="password" type="password" className="w-full p-1 bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent  focus:ring-[var(--color-febd69)]" placeholder="پسورد شما"  class2="w-full" />                           
                          <div className="mt-2 flex items-center justify-evenly">
                            <button type="submit" className="w-1/4 bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white px-2 py-1 rounded-xl">
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