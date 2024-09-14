import BreadCrumb from "@/components/BreadCrumb"
import Meta from "@/components/Meta"


const NotFound = () => {
  return (
    <>
       <Meta title=" صفحه 404 " /> 
       <BreadCrumb title=" صفحه 404" /> 
       <div className="py-5 bg-[var(--color-f5f5f7)]">
            <div className="container xl:max-w-screen-xl">
                
                <p className="">
                    صفحه مورد نظر شما یافت نشد
                </p>
            </div>
       </div> 
    </>
  )
}

export default NotFound