import { BsSortDown } from "react-icons/bs";
import BreadCrumb from "./BreadCrumb"
import Meta from "./Meta"
import {hp,AirPodsPro,fourLine,threeLine,twoLine, threeLineV} from "@/utils/myimages";
import ReactStars from "react-rating-stars-component";
import Select from "react-select";
import { useState } from "react";
import { toPersianDigits } from "@/utils/toPersianDigits";
import ProductCart from "./ProductCart";
import { selectionProduct } from "@/assets/data/data";


const customStyles = {
    control: (base, state) => ({
      ...base,
      background: "#ffffff",
      // match with the menu
      borderRadius: state.isFocused ? 6 : 6,
      // Overwrittes the different states of border
      borderColor: state.isFocused ? "#000000" : "#000000",
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      
      "&:hover": {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? "#000000" : "",
        background: "#ededed",
      }
    }),
    menu: base => ({
      ...base,
      // override border radius to match the box
      borderRadius: 6,
      // kill the gap
      marginTop: 0,
      
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
      
    })
  };

const Shop = () => {

    const [select, setSelect] = useState('')
    const [grid, setGrid] = useState(4)


    const handleChange = (select) => {
        setSelect(select)
      };

    const ratingChanged = (newRating) => {
        console.log(newRating);
      };

  return (
    <>
        <Meta title="فروشگاه ما " /> 
        <BreadCrumb title="فروشگاه ما " />
        <div className="py-5 bg-[var(--color-f5f5f7)]">
            <div className="container xl:max-w-screen-xl">
                <div className="grid grid-cols-12 gap-5">
 {/* sidebar */}
                    <div className="col-span-3 flex flex-col ">
                            <div className=" bg-white rounded-lg mb-3 p-4">
                                <h3 className="text-[var(--color-1c1c1b)] font-semibold text-base pb-4 border-b border-[var(--color-ededed)] mb-5">دسته بندی محصولات</h3>
                                <div className="">
                                    <ul className="list-none text-xs text-[var(--color-7777777)] flex flex-col gap-3">
                                        <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">گوشی هوشمند</li>
                                        <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">تلویزیون</li>
                                        <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">دوربین</li>
                                        <li className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold">لپ تاپ</li>
                                    </ul>
                                </div>
                            </div>
                            <div className=" bg-white rounded-lg mb-3 p-4">
                                <h3 className="text-[var(--color-1c1c1b)] font-semibold text-base pb-4 border-b border-[var(--color-ededed)]  mb-5">فیلتر براساس</h3>
                                <div className="mb-5">
                                    <h5 className="text-[var(--color-1c1c1b)] font-semibold text-sm mb-3">موجودی</h5>
                                    <div >
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
                                <div className="w-full mb-5">
                                    <h5 className="text-[var(--color-1c1c1b)] font-semibold text-sm mb-3">قیمت</h5>
                                    <div className="flex items-center gap-2">
                                        <div className="w-1/2 flex items-center gap-2 text-xs mb-1">
                                            <input type="text" name="" id="stock" placeholder="از" className="w-11/12 h-7 form-input border-none bg-gray-100 rounded-[4px] focus:ring-0 " />
                                            <label htmlFor="stock  cursor-pointer  "> تومان </label>
                                        </div>
                                        <div className="w-1/2 flex items-center gap-2 text-xs">
                                            <input type="text" name="" id="outstock"  placeholder="تا" className="w-11/12 h-7 form-input border-none bg-gray-100 rounded-[4px] focus:ring-0   " />
                                            <label htmlFor="outstock  cursor-pointer  ">  تومان </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full mb-5">
                                    <h5 className="text-[var(--color-1c1c1b)] font-semibold text-sm mb-3">رنگ </h5>
                                    <div className="">
                                        <ul className="list-none flex items-cente justify-center gap-2 flex-wrap">
                                            <li className="w-5 h-5 bg-rose-400 rounded-full"></li>
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
                                <div className="mb-5">
                                    <h5 className="text-[var(--color-1c1c1b)] font-semibold text-sm mb-3">سایز</h5>
                                    <div className="flex flex-row-reverse items-center justify-evenly gap-4">
                                        <div className="flex items-center gap-1 text-xs mb-1">
                                            <input type="checkbox" name="" id="stock" className="form-checkbox ring-0 cursor-pointer border border-gray-400 rounded-full p-2  hover:text-[var(--color-febd69)] checked:bg-[var(--color-febd69)] checked:border-gray-400 text-[var(--color-febd69)] focus:ring-0 " />
                                            <label htmlFor="stock  cursor-pointer "> S </label>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs">
                                            <input type="checkbox" name="" id="outstock"  className="form-checkbox  ring-0 cursor-pointer border border-gray-400 rounded-full p-2  hover:text-[var(--color-febd69)] checked:bg-[var(--color-febd69)] checked:border-gray-400 text-[var(--color-febd69)]  focus:ring-0  " />
                                            <label htmlFor="outstock  cursor-pointer  "> M </label>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs">
                                            <input type="checkbox" name="" id="outstock"  className="form-checkbox  ring-0 cursor-pointer border border-gray-400 rounded-full p-2  hover:text-[var(--color-febd69)] checked:bg-[var(--color-febd69)] checked:border-gray-400 text-[var(--color-febd69)]  focus:ring-0  " />
                                            <label htmlFor="outstock  cursor-pointer  "> L </label>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs">
                                            <input type="checkbox" name="" id="outstock"  className="form-checkbox  ring-0 cursor-pointer border border-gray-400 rounded-full p-2  hover:text-[var(--color-febd69)] checked:bg-[var(--color-febd69)] checked:border-gray-400 text-[var(--color-febd69)]  focus:ring-0  " />
                                            <label htmlFor="outstock  cursor-pointer  "> XL </label>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs">
                                            <input type="checkbox" name="" id="outstock"  className="form-checkbox  ring-0 cursor-pointer border border-gray-400 rounded-full p-2  hover:text-[var(--color-febd69)] checked:bg-[var(--color-febd69)] checked:border-gray-400 text-[var(--color-febd69)]  focus:ring-0  " />
                                            <label htmlFor="outstock  cursor-pointer  "> XXL </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" bg-white rounded-lg mb-3 p-4">
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
                            <div className=" bg-white rounded-lg mb-3 p-4">
                                <h3 className="text-[var(--color-1c1c1b)] font-semibold text-base pb-4 border-b border-[var(--color-ededed)] mb-5">محصولات به صورت رندم</h3>
                                <div className="">
                                    <div className="w-full flex items-center justify-between gap-2 border-b border-[var(--color-ededed)]">
                                        <div className="w-2/3 flex flex-col">
                                            <h5 className="font-bold text-sm text-balance">لپ تاپ اچ پی 16.1 اینچی مدل OMEN 16</h5>
                                            <div className="self-end ">
                                                <ReactStars
                                                    classNames=""
                                                    count={5}
                                                    onChange={ratingChanged}
                                                    size={20}
                                                    isHalf={true}
                                                    emptyIcon={<i className="far fa-star"></i>}
                                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                    fullIcon={<i className="fa fa-star"></i>}
                                                    activeColor="#ffd700"
                                                />    
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
                                                <ReactStars
                                                    classNames=""
                                                    count={5}
                                                    onChange={ratingChanged}
                                                    size={20}
                                                    isHalf={true}
                                                    emptyIcon={<i className="far fa-star"></i>}
                                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                    fullIcon={<i className="fa fa-star"></i>}
                                                    activeColor="#ffd700"
                                                />    
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
                    <div className="col-span-9 ">
                        <div className="bg-white p-2 mb-5 rounded-lg flex items-center  justify-between">
                            <div className="flex items-center  gap-2">
                                <BsSortDown className="w-6 h-6" />
                                <p className="">
                                    مرتب سازی :
                                </p>
                                <Select
                                    styles={customStyles}
                                    value={select}
                                    onChange={handleChange}
                                    options={[
                                        { value: 'Best-Selling', label: 'پرفروش‌ ترین‌' },
                                        { value: 'TheLatest', label: 'جدیدترین' },
                                        { value: 'TheCheapest', label: 'ارزان‌ترین' },
                                        { value: 'mostExpensive', label: 'گران‌ترین' },
                                    ]}
                                />
                            </div>
                            <div className="flex items-center gap-1 ">
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
            </div>
        </div>
    </>
  )
}

export default Shop