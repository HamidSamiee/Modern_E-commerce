import BreadCrumb from "@/components/BreadCrumb"
import Container from "@/components/Container"
import Meta from "@/components/Meta"


const NotFound = () => {
  return (
    <>
       <Meta title=" صفحه 404 " /> 
       <BreadCrumb title=" صفحه 404" />
       <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <p className="">
                    صفحه مورد نظر شما یافت نشد
            </p>
      </Container> 
    </>
  )
}

export default NotFound