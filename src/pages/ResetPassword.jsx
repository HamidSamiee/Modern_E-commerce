import BreadCrumb from "@/components/BreadCrumb"
import Meta from "@/components/Meta"


const ResetPassword = () => {
  return (
    <>
        <Meta title=" ورود" /> 
       <BreadCrumb title=" ورود - ثبت نام " /> 
       <div className="py-5 bg-[var(--color-f5f5f7)]">
            <div className="container xl:max-w-screen-xl">
                <div className="h-80 grid grid-cols-12 place-items-center">
                      <div className="w-1/3 col-span-12 bg-white rounded-lg">
                        <div className="p-5 space-y-5">
                            <h3 className="text-xl text-center font-bold">تنظیم مجدد رمز عبور</h3>
                            <form className="flex flex-col gap-3">
                              <div className="w-full">  
                                <input type="password" className="w-full bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent  focus:ring-[var(--color-febd69)]" placeholder="پسورد شما"/>
                              </div>
                              <div className="w-full">  
                                <input type="password" className="w-full bg-[var(--color-f5f5f7)] border-none rounded-lg border-transparent  focus:ring-[var(--color-febd69)]" placeholder="تکرار پسورد "/>
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
            </div>
       </div> 
    </>
  )
}

export default ResetPassword