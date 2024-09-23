import BreadCrumb from "@/components/BreadCrumb"
import Container from "@/components/Container"
import Meta from "@/components/Meta"

const About = () => {
  return (
    <>
       <Meta title=" درباره ما " /> 
       <BreadCrumb title=" درباره ما " /> 
       <Container class1="py-5 bg-[var(--color-f5f5f7)]">
                <div className="grid grid-cols-12 gap-5">

                </div>
       </Container>
    </>
  )
}

export default About