import { forwardRef, Fragment, useState, } from "react"
import Reviews from "../Reviews";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";


const Tabs = forwardRef((Props , ref)=>{

    const {description,details,ordereddProduct,setOrdereddProduct,productId}={...Props};

    const [activeIndex,setActiveIndex]=useState();

    const toggleCollapse=(index)=>{
        setActiveIndex(activeIndex === index ? null : index)
    }

  return (
    <div role="tablist" className="tabs  tabs-lifted">
{/* Introduction TAB */}
            <input type="radio" name="my_tabs_2" role="tab" className={`tab text-[var(--color-1c1c1b)] [--tab-border-color:var(--color-7777777)] [--tab-bg:var(--color-f5f5f7)]  text-nowrap`} aria-label="معرفی" defaultChecked />
            <div role="tabpanel" className="tab-content   sm-custom3:text-sm bg-base-100 border-[var(--color-777777)] rounded-box p-6 text-justify  text-[var(--color-777777)">
                {
                    description
                }
            </div>
{/* details TAB */}
            <input type="radio" name="my_tabs_2" role="tab" className="tab [--tab-border-color:var(--color-7777777)] [--tab-bg:var(--color-f5f5f7)]" aria-label="مشخصات" />
            <div role="tabpanel" className=" tab-content bg-base-100  border-[var(--color-777777)] rounded-box p-6">
                <div className="hidden lg:block">
                        <div role="tablist" className=" tabs tabs-lifted ">
                        {
                                Object.entries(details).map((spec,i)=>{
                                    return(
                                        <Fragment key={i}>
                                                <input type="radio" name="my_tabs_4" role="tab" className={`tab [--tab-border-color:var(--color-999999)]  text-[var(--color-1c1c1b)]  text-nowrap`} aria-label={spec[0]} defaultChecked />
                                                <div role="tabpanel" className="tab-content bg-base-100 border-[var(--color-999999)] rounded-box p-6 text-justify text-[var(--color-777777)">
                                                    <div  className="pt-3 grid grid-cols-12">
                                                            <div className="col-span-12">
                                                                <table className="table-auto">
                                                                    <tbody>
                                                                        {
                                                                        Object.entries(spec[1]).map((d,i)=>{
                                                                            return <tr className="grid grid-cols-12 gap-5 " key={i}>
                                                                                <td className=" lg:col-span-3 text-right align-top  mb-4">{d[0]}</td>
                                                                                <td className=" lg:col-span-9 mb-4">{d[1]}</td>
                                                                            </tr>  
                                                                        })   
                                                                        }
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                    </div>
                                                </div>
                                        </Fragment>
                                    )
                                }
                                )
                            } 
                        </div>
                        
                </div>
                <div className="grid grid-cols-12 gap-1 lg:hidden">
                      {
                        Object.entries(details).map((spec,i)=>{
                            return(
                                <div className="col-span-12 bg-base-200 rounded-b-md transition-all duration-150 ease-linear " key={i} onClick={()=>toggleCollapse(i)}>
                                        <h3 className="bg-[var(--color-232f3e)] flex items-center justify-between cursor-pointer text-white py-0.5 px-1 -mr-2 text-sm font-medium ">
                                            {spec[0]}
                                            {
                                                activeIndex === i ?
                                                  <FaChevronDown className="w-3 h-3"/>
                                                :
                                                  <FaChevronUp  className="w-3 h-3"/>     
                                            }
                                        </h3>
                                        {
                                            activeIndex === i 
                                            && 
                                                <div  className=" pt-3 grid grid-cols-12  transition-all duration-150 ease-linear">
                                                        <div className="col-span-12">
                                                            <table className="table-auto">
                                                                <tbody className="sm-custom:space-y-3">
                                                                    {
                                                                    Object.entries(spec[1]).map((d,i)=>{
                                                                        return <tr className="grid grid-cols-12 gap-x-3 " key={i}>
                                                                            <td className="sm-custom:col-span-12  sm-custom:bg-slate-300 col-span-5 text-right align-top ">{d[0]}:</td>
                                                                            <td className="sm-custom:col-span-12 sm-custom:pr-2 col-span-7 text-justify">{d[1]}</td>
                                                                        </tr>  
                                                                    })   
                                                                    }
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                </div>  
                                        }
                                </div>  
                        )})
                      }     
                </div>
            </div>
{/* Reviws Tab */}
            <input ref={ref}  type="radio" name="my_tabs_2" role="tab" className="tab  w-fit  [--tab-bg:var(--color-f5f5f7)] [--tab-border-color:var(--color-7777777)]  text-nowrap" aria-label="دیدگاه ها" />
            <div role="tabpanel" className="tab-content bg-base-100 border-[var(--color-777777)] rounded-box p-6">
                <Reviews ordereddProduct={ordereddProduct} setOrdereddProduct={setOrdereddProduct} productId={productId} />
            </div>
    </div>
  )
}
)

Tabs.displayName = "Tabs";

export default Tabs