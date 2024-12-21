import { BsSortDown } from "react-icons/bs";
import BreadCrumb from "../components/BreadCrumb"
import Meta from "../components/Meta"
import {hp,AirPodsPro,fourLine,threeLine,twoLine, threeLineV} from "@/utils/myimages";
import { useEffect, useState } from "react";
import { toPersianDigits } from "@/utils/toPersianDigits";
import ProductCart from "../components/ProductCart";
import { selectionProduct } from "@/assets/data/data";
import Container from "@/components/Container";
import StarRating from "@/components/StarRating";
import { useDispatch } from "react-redux";
import { getAllProducts } from "@/features/ProductsSlice/productSlice";



const Shop = () => {

    const [select, setSelect] = useState('')
    const [grid, setGrid] = useState(4)
    const [openSections, setOpenSections] = useState({});

    const toggleSection = (section) => {
      setOpenSections((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    };

    const handleChange = (e) => {
        setSelect(e.target.value)
      };

    // const productState = useSelector(state=>state?.product?.product)
    const dispatch = useDispatch();

    // console.log(productState)
    
    useEffect(() => {
      
    const getProducts=()=>{
        dispatch(getAllProducts())
    }
    
    getProducts();
      
    }, [dispatch])
    


  return (
    <>
        <Meta title="فروشگاه ما " /> 
        <BreadCrumb title="فروشگاه ما " />
        <Container class1="py-5 bg-[var(--color-f5f5f7)]">
            <div className="grid grid-cols-12 gap-5">
{/* sidebar */}
                <div className="col-span-12 lg:col-span-3 flex flex-col ">
                        <div className=" bg-white rounded-lg mb-3 p-4 ">
                                        <h3
                                        className={`inline-block text-[var(--color-1c1c1b)] font-semibold text-base transition-all ease-in-out duration-300 ${openSections['category'] && "pb-4 border-b border-[var(--color-ededed)] mb-5"} `}
                                        onClick={() => toggleSection('category')}
                                        >
                                        دسته بندی محصولات
                                        </h3>
                                        {openSections['category'] && (
                                            <div className="flex items-center justify-center md:justify-normal">
                                                <ul className="list-none text-xs text-[var(--color-7777777)] flex gap-5 md:flex-col md:gap-3">
                                                    <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">گوشی هوشمند</li>
                                                    <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">تلویزیون</li>
                                                    <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">دوربین</li>
                                                    <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">لپ تاپ</li>
                                                </ul>
                                            </div>
                                        )}
                        </div>
                        <div className="flex gap-x-5 lg:block bg-white rounded-lg lg:mb-3 p-4">
                            <h3 
                              className={`inline-block text-[var(--color-1c1c1b)] text-nowrap font-semibold text-base transition-all ease-in-out duration-300 ${openSections['filter'] && "lg:pb-4 lg:border-b lg:border-[var(--color-ededed)] lg:mb-2"} `}
                              onClick={() => toggleSection('filter')}
                            > 
                                فیلتر براساس :
                            </h3>
                            {openSections['filter'] && (
                                <div className="flex items-start gap-x-5 lg:flex-col">                              
                                   {/* desktop lg:block */}
                                    <div className="hidden lg:block lg:mb-5">
                                        <h5 className="text-[var(--color-1c1c1b)] font-semibold text-sm mb-3 ">موجودی</h5>
                                        <div className="hidden items-center gap-x-10  lg:flex lg:flex-col lg:items-start">
                                            <div className="flex items-center gap-2 text-xs mb-1">
                                                <input type="checkbox" name="" id="stock" className="form-checkbox ring-0 cursor-pointer border border-gray-400 rounded-[4px] hover:text-[var(--color-febd69)] checked:bg-[var(--color-febd69)] checked:border-gray-400 text-[var(--color-febd69)] focus:ring-0 " />
                                                <label htmlFor="stock  cursor-pointer  ">موجود در انبار</label>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <input type="checkbox" name="" id="outstock"  className="form-checkbox  ring-0 cursor-pointer border border-gray-400 rounded-[4px] hover:text-[var(--color-febd69)] checked:bg-[var(--color-febd69)] checked:border-gray-400 text-[var(--color-febd69)]  focus:ring-0  " />
                                                <label htmlFor="outstock  cursor-pointer  ">عدم موجودی در انبار</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden lg:block  lg:mb-5">
                                        <h5 className="text-[var(--color-1c1c1b)] font-semibold text-sm mb-3">قیمت</h5>
                                        <div className="hidden items-center justify-center gap-2 lg:flex lg:flex-col">
                                            <div className="w-full flex items-center gap-2 text-xs mb-1">
                                                <input type="text" name="" id="stock" placeholder="از" className="w-11/12 h-7 form-input border-none bg-gray-100 rounded-[4px] focus:ring-0 " />
                                                <label htmlFor="stock  cursor-pointer  "> تومان </label>
                                            </div>
                                            <div className="w-full flex items-center gap-2 text-xs">
                                                <input type="text" name="" id="outstock"  placeholder="تا" className="w-11/12 h-7 form-input border-none bg-gray-100 rounded-[4px] focus:ring-0   " />
                                                <label htmlFor="outstock  cursor-pointer  ">  تومان </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden lg:block ">
                                        <h5 className="text-[var(--color-1c1c1b)] font-semibold text-sm mb-3">رنگ </h5>
                                        <div className="hidden lg:block">
                                            <ul className="list-none flex items-cente justify-center gap-2 flex-wrap">
                                                <li className="w-5 h-5 bg-rose-400 rounded-full"></li>
                                                <li className="w-5 h-5 bg-rose-400 rounded-full"></li>
                                                <li className="w-5 h-5 bg-rose-400 rounded-full"></li>
                                                <li className="w-5 h-5 bg-rose-400 rounded-full"></li>
                                                <li className="w-5 h-5 bg-rose-400 rounded-full"></li>
                                                <li className="w-5 h-5 bg-rose-400 rounded-full"></li>
                                                <li className="w-5 h-5 bg-rose-400 rounded-full"></li>
                                                
                                            </ul>
                                        </div>
                                    </div>
                                    {/* mobile and desktop md:block */}
                                    <div role="tablist" className=" tabs tabs-lifted lg:hidden">
                                        <input type="radio" name="my_tabs_2" role="tab" className={`tab text-[var(--color-febd69))] font-semibold text-sm text-nowrap`} aria-label="موجودی" />
                                        <div role="tabpanel" className=" tab-content  px-3 pt-5  text-justify ">
                                            <div className="flex items-center gap-x-10   lg:flex-col lg:items-start">
                                                <div className="flex items-center gap-2 text-xs mb-1">
                                                    <input type="checkbox" name="" id="stock" className="form-checkbox ring-0 cursor-pointer border border-gray-400 rounded-[4px] hover:text-[var(--color-febd69)] checked:bg-[var(--color-febd69)] checked:border-gray-400 text-[var(--color-febd69)] focus:ring-0 " />
                                                    <label htmlFor="stock  cursor-pointer  " className="text-nowrap">موجود در انبار</label>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <input type="checkbox" name="" id="outstock"  className="form-checkbox  ring-0 cursor-pointer border border-gray-400 rounded-[4px] hover:text-[var(--color-febd69)] checked:bg-[var(--color-febd69)] checked:border-gray-400 text-[var(--color-febd69)]  focus:ring-0  " />
                                                    <label htmlFor="outstock  cursor-pointer  " className="text-nowrap">عدم موجودی در انبار</label>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="radio" name="my_tabs_2" role="tab" className={`tab text-[var(--color-febd69))] font-semibold text-sm text-nowrap`} aria-label="قیمت" />
                                        <div role="tabpanel" className="tab-content    px-3 pt-5  text-justify ">
                                            <div className="">
                                                <div className=" items-center justify-center gap-2 flex">
                                                    <div className="w-full flex items-center gap-2 text-xs mb-1">
                                                        <input type="text" name="" id="stock" placeholder="از" className="w-11/12 h-7 form-input border-none bg-gray-100 rounded-[4px] focus:ring-0 " />
                                                        <label htmlFor="stock  cursor-pointer  "> تومان </label>
                                                    </div>
                                                    <div className="w-full flex items-center gap-2 text-xs">
                                                        <input type="text" name="" id="outstock"  placeholder="تا" className="w-11/12 h-7 form-input border-none bg-gray-100 rounded-[4px] focus:ring-0   " />
                                                        <label htmlFor="outstock  cursor-pointer  ">  تومان </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                        <input type="radio" name="my_tabs_2" role="tab" className={`tab text-[var(--color-febd69))] font-semibold text-sm text-nowrap`} aria-label="رنگ" />
                                        <div role="tabpanel" className="tab-content  px-3 pt-5 text-justify ">
                                            <div className="">
                                                <ul className="list-none flex items-cente justify-center gap-2 flex-wrap">
                                                    <li className="w-5 h-5 bg-rose-400 rounded-full"></li>
                                                    <li className="w-5 h-5 bg-rose-400 rounded-full"></li>
                                                    <li className="w-5 h-5 bg-rose-400 rounded-full"></li>
                                                    <li className="w-5 h-5 bg-rose-400 rounded-full"></li>
                                                    <li className="w-5 h-5 bg-rose-400 rounded-full"></li>
                                                    <li className="w-5 h-5 bg-rose-400 rounded-full"></li>
                                                    <li className="w-5 h-5 bg-rose-400 rounded-full"></li>
                                                    
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="hidden lg:block bg-white rounded-lg mb-3 p-4">
                            <h3 className="text-[var(--color-1c1c1b)] font-semibold text-base pb-4 border-b border-[var(--color-ededed)] mb-5">محصولات تگ شده</h3>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="py-1 px-2 rounded-md bg-slate-200">
                                    هدفون
                                </span>
                                <span className="py-1 px-2 rounded-md bg-slate-200">
                                    لپ تاپ
                                </span>
                                <span className="py-1 px-2 rounded-md bg-slate-200">
                                    موبایل
                                </span>
                                <span className="py-1 px-2 rounded-md bg-slate-200">
                                    اسپیکر
                                </span>
                                <span className="py-1 px-2 rounded-md bg-slate-200">
                                    تبلت
                                </span>
                                
                            </div>
                        </div>
                        <div className="hidden lg:block bg-white rounded-lg mb-3 p-4">
                            <h3 className="text-[var(--color-1c1c1b)] font-semibold text-base pb-4 border-b border-[var(--color-ededed)] mb-5">محصولات به صورت رندم</h3>
                            <div className="">
                                <div className="w-full flex items-center justify-between gap-2 border-b border-[var(--color-ededed)]">
                                    <div className="w-2/3 flex flex-col">
                                        <h5 className="font-bold text-sm text-balance">لپ تاپ اچ پی 16.1 اینچی مدل OMEN 16</h5>
                                        <div className="self-end ">
                                            <StarRating />    
                                        </div>
                                        <b className="self-end text-xs">۶۲,۰۰۰,۰۰۰ تومان</b>
                                    </div>
                                    <div className="w-1/3">
                                        <img src={hp} alt="" className="w-24" />
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 pt-4">
                                    <div className="w-2/3 flex flex-col ">
                                        <h5 className="font-bold text-sm text-balance">هندزفری بلوتوثی مدل AirPods Pro 2nd</h5>
                                        <div className="self-end ">
                                           <StarRating />    
                                        </div>
                                        <b className="self-end text-xs">۳,۰۰۰,۰۰۰ تومان</b>
                                    </div>
                                    <div className="w-1/3">
                                        <img src={AirPodsPro} alt="" className="w-24" />
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
{/* content */}
                <div className="col-span-12 lg:col-span-9 ">
                    <div className="bg-white p-2 mb-5 rounded-lg flex items-center  justify-between">
                        <div className="flex items-center  gap-2">
                            <BsSortDown className="w-14 h-w-14" />
                            <p className="text-nowrap">
                                مرتب سازی :
                            </p>
                            <select 
                             className="select select-bordered select-sm w-full max-w-xs"
                             value={select}
                             onChange={handleChange}
                            >
                                <option value='Best-Selling'>پرفروش‌ ترین‌ </option>
                                <option value='TheLatest'>جدیدترین</option>
                                <option value='TheCheapest'>ارزان‌ترین</option>
                                <option value='mostExpensive'>گران‌ترین</option>
                            </select>
                        </div>
                        <div className="hidden lg:flex lg:items-center lg:gap-1 ">
                                    <p className="text-xs"> {toPersianDigits(22)} محصول</p>
                                    <div className="mr-2 flex items-center gap-2">
                                        <img src={fourLine} alt="" onClick={()=>setGrid(3)} className="w-8 h-8 border border-gray-300  rounded-sm p-1 cursor-pointer" />  
                                        <img src={threeLineV} alt="" onClick={()=>setGrid(4)} className="w-8 h-8 border border-gray-300  rounded-sm p-1 cursor-pointer" /> 
                                        <img src={twoLine} alt="" onClick={()=>setGrid(6)} className="w-8 h-8 border border-gray-300  rounded-sm p-1 cursor-pointer" /> 
                                        <img src={threeLine} alt="" onClick={()=>setGrid(12)} className="w-8 h-8 border border-gray-300  rounded-sm p-1 cursor-pointer" /> 
                                    </div>
                        </div>    
                    </div>
                    <div className="grid grid-cols-12 gap-5 pb-5">
                    {
                                selectionProduct.map((p,i)=><ProductCart key={i} dataSelection={p} grid={grid} />)
                    }        
                    </div>            
                </div>
            </div>
        </Container>
    </>
  )
}

export default Shop