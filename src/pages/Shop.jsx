import { BsSortDown } from "react-icons/bs";
import BreadCrumb from "../components/BreadCrumb"
import Meta from "../components/Meta"
import {fourLine,threeLine,twoLine, threeLineV} from "@/utils/myimages";
import { useEffect, useState } from "react";
import { toPersianDigits } from "@/utils/toPersianDigits";
import ProductCart from "../components/ProductCart";
import Container from "@/components/Container";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/features/ProductsSlice/productSlice";
import brandImg from "@assets/images/logo2.png"
import brandImg2 from "@assets/images/Spinner.gif"
import { getProductsCategory } from "@/features/pCategorySlice/pCategorySlice";
import { getAllbrands } from "@/features/BrandSlice/brandSlice";
import { useLocation } from "react-router-dom";


const Shop = () => {

    const {state}=useLocation();

    useEffect(() => {
        setFilter((prev) => ({
            ...prev,
            category: state?.category || null,
            brand: state?.brand || null,
        }));
    }, [state]);
    
   
    const [grid, setGrid] = useState(4)
    const [openSections, setOpenSections] = useState({});
    const [filter, setFilter] = useState({
          inStock:null,
          category:null,
          tag: null,
          brand: null,
          minPrice:null ,
          maxPrice: null,
          sort: null,
          fields: null,
          page: null,
          limit:null
    });

    
    const toggleSection = (section) => {
      setOpenSections((prev) => ({
        ...prev,
        [section]: !prev[section],
      }));
    };

      const {products,isLoading}=useSelector(state=>state?.product)
      const {pCategories}=useSelector(state=>state?.pCategory)
      const {brands}=useSelector(state =>state?.brand)

      const validBrands = ["موتورولا", "ایسوس", "سامسونگ", "اپل", "سونی", "شیائومی"];
      const result = brands.filter((brand) => validBrands.includes(brand.title))
                            .map((brand) => ({ _id: brand._id, title: brand.title }));

      const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllProducts(filter));
        dispatch(getProductsCategory())
        dispatch(getAllbrands())
    }, [dispatch,filter,state])
    
    // const handleFilter = (x) => {
    //     // دسته‌بندی x را پیدا کنید.
    //     const pCategory = pCategories.find(c => c.title === x);
        
    //     if (pCategory) {
    //         // محصولات مرتبط با دسته‌بندی x را فیلتر کنید.
    //         const filteredProducts = products.filter(p => p.category === pCategory._id);
    //         setFilter(filteredProducts); // محصولات فیلتر شده را به state اختصاص دهید.
    //     } else {
    //         console.error("دسته‌بندی  پیدا نشد.");
    //     }
    // };
 
    if (!products ) {  
        return <div className="h-[50vh] flex flex-col items-center justify-center text-red-500">
                            محصولی پیدا نشد !!!                      
              </div>;  
    } 

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
                                            <div className={`flex items-center justify-center md:justify-normal`}>
                                                <ul className="w-full list-none  text-xs text-[var(--color-7777777)] flex overflow-x-auto  gap-5 lg:flex-col lg:h-28 lg:overflow-y-scroll lg:gap-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                                                    {
                                                        pCategories &&
                                                        pCategories.map(pCategory =>{
                                                            return <li key={pCategory?._id} onClick={()=>setFilter({...filter,category:pCategory?._id})} className="cursor-pointer hover:text-[var(--color-febd69)] hover:font-semibold text-nowrap">{pCategory.title}</li>
                                                        })
                                                    }
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
                                                <input 
                                                  type="checkbox" 
                                                  onChange={()=>setFilter({...filter,inStock:true})} 
                                                  name="stock" 
                                                  id="stock" 
                                                  className="form-checkbox ring-0 cursor-pointer border border-gray-400 rounded-[4px] hover:text-[var(--color-febd69)] checked:bg-[var(--color-febd69)] checked:border-gray-400 text-[var(--color-febd69)] focus:ring-0 "
                                                  checked={filter.inStock === true}
                                                />
                                                <label htmlFor="stock  cursor-pointer  ">موجود در انبار</label>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <input 
                                                  type="checkbox" 
                                                  name="stock" 
                                                  id="outstock"  
                                                  onChange={()=>setFilter({...filter,inStock:false})} 
                                                  className="form-checkbox  ring-0 cursor-pointer border border-gray-400 rounded-[4px] hover:text-[var(--color-febd69)] checked:bg-[var(--color-febd69)] checked:border-gray-400 text-[var(--color-febd69)]  focus:ring-0  "
                                                  checked={filter.inStock === false}
                                                />
                                                <label htmlFor="outstock  cursor-pointer  ">عدم موجودی در انبار</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden lg:block  lg:mb-5">
                                        <h5 className="text-[var(--color-1c1c1b)] font-semibold text-sm mb-3">قیمت</h5>
                                        <div className="hidden items-center justify-center gap-2 lg:flex lg:flex-col">
                                            <div className="w-full flex items-center gap-2 text-xs mb-1">
                                                <input type="number"  onChange={(e)=>setFilter({...filter,minPrice:e.target.value})} name="" id="stock" placeholder="از" className="w-11/12 h-7 form-input border-none bg-gray-100 rounded-[4px] focus:ring-0 " />
                                                <label htmlFor="stock  cursor-pointer  "> تومان </label>
                                            </div>
                                            <div className="w-full flex items-center gap-2 text-xs">
                                                <input type="number" name="" id="outstock"    onChange={(e)=>setTimeout(() => { setFilter({...filter,maxPrice:e.target.value})}, 5000)} placeholder="تا" className="w-11/12 h-7 form-input border-none bg-gray-100 rounded-[4px] focus:ring-0   " />
                                                <label htmlFor="outstock  cursor-pointer  ">  تومان </label>
                                            </div>
                                        </div>
                                    </div>
                                    {/* mobile and desktop md:block */}
                                    <div role="tablist" className=" tabs tabs-lifted lg:hidden">
                                        <input type="radio" name="my_tabs_2" role="tab" className={`tab text-[var(--color-febd69))] font-semibold text-sm text-nowrap`} aria-label="موجودی" />
                                        <div role="tabpanel" className=" tab-content  px-3 pt-5  text-justify ">
                                        <div className=" items-center gap-x-10  lg:flex lg:flex-col lg:items-start">
                                            <div className="flex items-center gap-2 text-xs mb-1">
                                                <input 
                                                  type="checkbox" 
                                                  onChange={()=>setFilter({...filter,inStock:true})} 
                                                  name="stock" 
                                                  id="stock" 
                                                  className="form-checkbox ring-0 cursor-pointer border border-gray-400 rounded-[4px] hover:text-[var(--color-febd69)] checked:bg-[var(--color-febd69)] checked:border-gray-400 text-[var(--color-febd69)] focus:ring-0 "
                                                  checked={filter.inStock === true}
                                                />
                                                <label htmlFor="stock  cursor-pointer  ">موجود در انبار</label>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <input 
                                                  type="checkbox" 
                                                  name="stock" 
                                                  id="outstock"  
                                                  onChange={()=>setFilter({...filter,inStock:false})} 
                                                  className="form-checkbox  ring-0 cursor-pointer border border-gray-400 rounded-[4px] hover:text-[var(--color-febd69)] checked:bg-[var(--color-febd69)] checked:border-gray-400 text-[var(--color-febd69)]  focus:ring-0  "
                                                  checked={filter.inStock === false}
                                                />
                                                <label htmlFor="outstock  cursor-pointer  ">عدم موجودی در انبار</label>
                                            </div>
                                        </div>
                                        </div>
                                        <input type="radio" name="my_tabs_2" role="tab" className={`tab text-[var(--color-febd69))] font-semibold text-sm text-nowrap`} aria-label="قیمت" />
                                        <div role="tabpanel" className="tab-content    px-3 pt-5  text-justify ">
                                        <div className=" items-center justify-center gap-2 lg:flex lg:flex-col">
                                            <div className="w-full flex items-center gap-2 text-xs mb-1">
                                                <input type="text"  onChange={(e)=>setFilter({...filter,minPrice:e.target.value})} name="" id="stock" placeholder="از" className="w-11/12 h-7 form-input border-none bg-gray-100 rounded-[4px] focus:ring-0 " />
                                                <label htmlFor="stock  cursor-pointer  "> تومان </label>
                                            </div>
                                            <div className="w-full flex items-center gap-2 text-xs">
                                                <input type="text" name="" id="outstock"   onChange={(e)=>setTimeout(() => { setFilter({...filter,maxPrice:e.target.value})}, 5000)}  placeholder="تا" className="w-11/12 h-7 form-input border-none bg-gray-100 rounded-[4px] focus:ring-0   " />
                                                <label htmlFor="outstock  cursor-pointer  ">  تومان </label>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="hidden lg:block bg-white rounded-lg mb-3 p-4">
                            <h3 className="text-[var(--color-1c1c1b)] font-semibold text-base pb-4 border-b border-[var(--color-ededed)] mb-5">محصولات تگ شده</h3>
                            <div className="flex flex-wrap items-center gap-2">
                                <button onClick={()=>setFilter({...filter,tag:"popular"})}  className="py-1 px-2 rounded-md bg-slate-200">
                                    محبوب ترین ها
                                </button>
                                
                            </div>
                        </div>
                        <div className="hidden lg:block bg-white rounded-lg mb-3 p-4">
                            <h3 className="text-[var(--color-1c1c1b)] font-semibold text-base pb-4 border-b border-[var(--color-ededed)] mb-5">محصولات برند</h3>
                            <div className="flex flex-wrap items-center gap-2">
                                {                                    
                                    result.map((b,i)=>{
                                        return <button key={i} onClick={()=>setFilter({...filter,brand:b._id})}  className="py-1 px-2 rounded-md bg-slate-200">
                                                            {b.title}  
                                                </button>
                                    })   
                                }
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
                                    onChange={(e)=>setFilter({...filter,sort:e.target.value})}
                                >
                                    <option value='-createdAt'> تاریخ : از جدید به قدیم </option>
                                    <option value='createdAt'>تاریخ : از قدیم به جدید</option>
                                    <option value='-price'>قیمت : از بالا به پایین</option>
                                    <option value='price'>قیمت : از پایین به بالا</option>
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
                        {isLoading || products.length === 0 ?
                                <div className="col-span-12 h-[50vh] flex flex-col items-center justify-center">
                                    
                                    <img src={brandImg} alt="brand" className="w-44 sm:w-60  ml-1" />
                                    <img src={brandImg2}  alt="brand" className="w-20 ml-1" />
                                
                                </div>
                            :              
                                products.slice(0,9).map((p,i)=><ProductCart key={i} dataSelection={p} grid={grid} />)
                        }        
                        </div>            
                    </div>
            </div>
        </Container>
    </>
  )
}

export default Shop