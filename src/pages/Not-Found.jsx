import BreadCrumb from "@/components/BreadCrumb"
import Container from "@/components/Container"
import Meta from "@/components/Meta"
import { useNavigate } from "react-router-dom";
import { Error404 } from "@/utils/myimages";

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <>
       <Meta title=" صفحه 404 " /> 
       <BreadCrumb title=" صفحه 404" />
       <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            {/* <div className="min-w-screen min-h-screen bg-blue-100 flex items-center p-5 lg:p-20 overflow-hidden relative"> */}
             <div className="relative">
              <div className="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
                <div className="w-full md:w-1/2">
                  <div className="mb-10 lg:mb-20">
                    <svg
                      id="logoipsum"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="15 30 147.778 40"
                      className="w-48"
                    >
                      <path
                        d="M41.419,48.371A3.656,3.656,0,0,0,40.373,51.3l-.018-.018a4.344,4.344,0,0,1-4.694,4.694l.018.018A3.678,3.678,0,1,0,39,59.312l.019.018a4.344,4.344,0,0,1,4.694-4.694l-.019-.018a3.671,3.671,0,1,0-2.272-6.247Z"
                        fill="#0582C1"
                      />
                      {/* Add remaining paths here */}
                    </svg>
                  </div>
                  <div className="mb-10 md:mb-20 text-gray-600 font-light">
                    <h1 className="font-black  text-right  text-3xl lg:text-5xl text-yellow-500 mb-10 ">
                  به نظر می‌رسه مسیر رو اشتباهی اومدی!
                    </h1>
                    <p className="font-extrabold md:ml-28">صفحه مورد نظر شما در دسترس نمی باشد.</p>
                  </div>
                  <div className="mb-20 md:mb-0">
                    <button
                      className="text-lg animate-pulse font-extrabold outline-none focus:outline-none transform transition-all hover:scale-110 text-yellow-500 hover:text-yellow-600"
                      onClick={() => navigate(-1)}
                    >
                   بازگشت به صفحه قبلی
                    </button>
                  </div>
                </div>
                <div className="w-full md:w-1/2 text-center">  
                  <img  
                    src={Error404}  
                    alt="404 Not Found"  
                    className="w-full h-auto"  
                  />  
                </div>  
              </div>
              <div className="w-64 md:w-96 h-36 md:h-full bg-blue-200 bg-opacity-30 absolute bottom-[15px] right-20 md:right-16 rounded-full pointer-events-none -rotate-45 transform"></div>
              <div className="w-96 h-full bg-yellow-200 bg-opacity-20 absolute bottom-[15px] left-16 rounded-full pointer-events-none -rotate-45 transform"></div>
            {/* </div> */}
            </div>
      </Container> 
    </>
  )
}

export default NotFound

