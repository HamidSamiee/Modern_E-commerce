import { forwardRef, Fragment} from "react"
import Reviews from "../Reviews";


const Tabs = forwardRef((Props , ref)=>{

    const {description,details,ordereddProduct,setOrdereddProduct}={...Props};

  return (
    <div role="tablist" className="tabs  tabs-lifted">
{/* Introduction TAB */}
            <input type="radio" name="my_tabs_2" role="tab" className={`tab text-[var(--color-1c1c1b)] [--tab-border-color:var(--color-7777777)] [--tab-bg:var(--color-f5f5f7)]  text-nowrap`} aria-label="معرفی" defaultChecked />
            <div role="tabpanel" className="tab-content bg-base-100 border-[var(--color-777777)] rounded-box p-6 text-justify  text-[var(--color-777777)">
                {
                    description
                }
            </div>
{/* details TAB */}
            <input type="radio" name="my_tabs_2" role="tab" className="tab [--tab-border-color:var(--color-7777777)] [--tab-bg:var(--color-f5f5f7)]" aria-label="مشخصات" />
            <div role="tabpanel" className="tab-content bg-base-100  border-[var(--color-777777)] rounded-box p-6">
                <div role="tablist" className=" tabs tabs-lifted">
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
                                                                        <td className="text-right align-top col-span-3 mb-4">{d[0]}</td>
                                                                        <td className="col-span-9 mb-4">{d[1]}</td>
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
{/* Reviws Tab */}
            <input ref={ref}  type="radio" name="my_tabs_2" role="tab" className="tab  w-fit  [--tab-bg:var(--color-f5f5f7)] [--tab-border-color:var(--color-7777777)]  text-nowrap" aria-label="دیدگاه ها" />
            <div role="tabpanel" className="tab-content bg-base-100 border-[var(--color-777777)] rounded-box p-6">
                <Reviews ordereddProduct={ordereddProduct} setOrdereddProduct={setOrdereddProduct} />
            </div>
    </div>
  )
}
)

Tabs.displayName = "Tabs";

export default Tabs