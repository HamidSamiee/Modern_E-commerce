import { Link, NavLink, useNavigate } from "react-router-dom"
import {BsCart4, BsSearch} from 'react-icons/bs'
import { FaChevronDown , FaRegUser, FaRotate } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { useDispatch, useSelector } from "react-redux";
import { FiHome, FiMenu } from "react-icons/fi";
import { LuStore } from "react-icons/lu";
import { TbBrandBlogger } from "react-icons/tb";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import brandImg from "@assets/images/imgBlog/brand.png"
import { IoClose } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAllProducts } from "@/features/ProductsSlice/productSlice";
import { getUserProductWishlist } from "@/features/userSlice/userSlice";
import { getAllbrands } from "@/features/BrandSlice/brandSlice";
import { getProductsCategory } from "@/features/pCategorySlice/pCategorySlice";
import useOutsideClick from "@/hooks/useOutSideClick";

const Header = () => {



  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {cart}=useSelector(state=>state.cart)
  const {user,wishList = []}=useSelector(state=>state.auth)
  const productState=useSelector(state=>state?.product?.products)
  const {pCategories}=useSelector(state=>state?.pCategory)
  const {brands}=useSelector(state=>state?.brand)
 
  const [openDesktop, setOpenDesktop] = useState(false);
  const [openMobile, setOpenMobile] = useState(false); 
 
  const [subMenuOpen, setSubMenuOpen] = useState({});
  
  const ref = useOutsideClick(() => {  
    setOpenDesktop(false); 
  });
  const toggleRefMobile=useRef();

  const toggleDropdownDesktop = () => {  
    setOpenDesktop(prev => !prev); 
};   
const toggleDropdownMobile = () => {  
  setOpenMobile(prev => !prev); 
};   
  const toggleSubMenu = (id) => {  
    setSubMenuOpen((prev) => ({ 
      [id]: !prev[id],  
    }));  
  };  

  const [paginate, setPaginate] = useState(true);
  const [productOption, setProductOption] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getProductsCategory());
    dispatch(getAllbrands());
    if(user){
      dispatch(getUserProductWishlist())
    }
  }, [dispatch])

  useEffect(() => {

    let data=[];
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      data.push({
        id:index,
        prod:element?._id,
        name:element?.title
      })
    }    
    setProductOption(data)
  }, [productState])
  
// console.log(brands)
  return (
    <>

     <header className="bg-[var(--color-131921)] border-b border-solid border-[var(--color-3b4149)] py-3">
        <section className="container xl:max-w-screen-xl">
            <div className="grid grid-cols-12">
              <div className="col-span-12 text-center md:text-start md:col-span-6 ">
                  <p className="text-white mb-0 ">
                         ارسال رایگان با خرید بالای  {toPersianDigits(1)} میلیون تومان 
                  </p>
              </div>
              <div className="hidden md:block md:col-span-6 ">
                  <p className="text-white mb-0 text-end">
                          شماره تماس : <Link to="tel : 09139734679"> {toPersianDigits(0) + toPersianDigits(9139734679)}</Link>
                  </p>
              </div>
            </div>
        </section>
      </header>
 {/* for mobile */}
      <div className=" flex items-center justify-between lg:hidden bg-[var(--color-131921)] border-b border-solid border-[var(--color-3b4149)] py-2">
          <div className="drawer drawer-start z-50">
            <input ref={toggleRefMobile} id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content m-2">
              {/* Page content here */}
              <label htmlFor="my-drawer-4" className="w-12 drawer-button cursor-pointer text-white hover:opacity-80  p-0"><FiMenu  className="w-6 h-6" /></label>
            </div>
            <div className="drawer-side">
              <label  htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 ">
                {/* Sidebar content here */}
                    <label htmlFor="my-drawer-4" className="w-12 drawer-button btn text-white hover:opacity-80 hover:bg-[var(--color-232f3e)] bg-[var(--color-232f3e)] p-0 mb-5"><IoClose className="w-6 h-6"/></label>    
                    <div className="accordion-menu text-white w-full">  
                        <button  
                            onClick={toggleDropdownMobile}  
                            className={`hover:opacity-80 hover:bg-[var(--color-232f3e)] focus:text-[var(--color-febd69)] mt-2 w-full bg-[var(--color-232f3e)] font-semibold py-2 px-4 rounded inline-flex items-center justify-between`}  
                        >  
                            <span className="flex items-center gap-6">  
                                <BiCategory className="w-6 h-6" />  
                                <span>دسته بندی فروشگاه</span>  
                            </span>  
                            <FaChevronDown className={`w-4 h-4 transition-transform ${openMobile ? 'rotate-180' : ''}`} />  
                        </button>  
                        {openMobile && (  
                            <ul className="mt-1 space-y-1 w-full">  
                                {pCategories.map((cate) => (  
                                    <li key={cate._id}
                                      onClick={(e) =>{ e.stopPropagation(); toggleSubMenu(cate._id);}}  
                                      className="border-b border-white px-4"
                                    >  
                                        <button  
                                            className="hover:opacity-80 hover:bg-[var(--color-febd69)] hover:text-[var(--color-232f3e)] focus:bg-[var(--color-febd69)] focus:text-[var(--color-232f3e)] w-full text-left bg-[var(--color-232f3e)] py-2 px-4 flex justify-between items-center"  
                                        >  
                                            <span>{cate.title}</span>  
                                            <FaChevronDown className={`w-4 h-4 transition-transform ${subMenuOpen[cate._id] ? 'rotate-180' : ''}`} />  
                                        </button>  
                                        {
                                        subMenuOpen[cate._id] &&
                                        (  
                                            <ul className="pl-6 py-2 space-y-1">  
                                                {brands  
                                                    .filter(brand => brand.category.includes(cate._id))  
                                                    .map((b) => (  
                                                      
                                                        <li  
                                                            key={b._id}  
                                                            className="block bg-[var(--color-232f3e)] hover:opacity-80 rounded-md "  
                                                            onClick={() => {  
                                                                navigate(`/product`, { state: { category: cate._id, brand: b._id } });  
                                                                toggleRefMobile.current.checked = false;  
                                                            }}  
                                                        >  
                                                            <Link className="w-full text-white px-4 block  focus:text-[var(--color-febd69)] whitespace-no-wrap ">  
                                                                👈 {b.title}
                                                            </Link>  
                                                        </li>  
                                                    ))}  
                                            </ul>  
                                        )
                                        }  
                                    </li>  
                                ))}  
                            </ul>  
                        )}  
                    </div>  
                    <div className="w-full flex flex-col items-start  ">
                            <NavLink to='/' onClick={()=>toggleRefMobile.current.checked = false} className={`hover:opacity-80 hover:bg-[var(--color-232f3e)] focus:text-[var(--color-febd69)] mt-2 w-full bg-[var(--color-232f3e)] font-semibold py-2 px-4 rounded inline-flex items-center text-white ${(isActive)=>isActive ? "active" : ""} text-sm font-normal py-3 focus:border-b-4  gap-6`} >
                                <FiHome className="w-6 h-6"  />  خانه
                            </NavLink>
                            <NavLink to='/product' onClick={()=>toggleRefMobile.current.checked = false} className={`hover:opacity-80 hover:bg-[var(--color-232f3e)] focus:text-[var(--color-febd69)] mt-2 w-full bg-[var(--color-232f3e)] font-semibold py-2 px-4 rounded inline-flex items-center text-white ${(isActive)=>isActive ? "active" : ""} text-sm font-normal py-3 focus:border-b-4 gap-6`}>
                                <LuStore className="w-6 h-6"  />  فروشگاه ما
                            </NavLink>
                            <NavLink to='/blogs' onClick={()=>toggleRefMobile.current.checked = false} className={`hover:opacity-80 hover:bg-[var(--color-232f3e)] focus:text-[var(--color-febd69)] mt-2 w-full bg-[var(--color-232f3e)] font-semibold py-2 px-4 rounded inline-flex items-center text-white ${(isActive)=>isActive ? "active" : ""} text-sm font-normal py-3 focus:border-b-4 gap-6`}>
                                <TbBrandBlogger className="w-6 h-6"  />  وبلاگ
                            </NavLink>
                            <NavLink to='/contact' onClick={()=>toggleRefMobile.current.checked = false} className={`hover:opacity-80 hover:bg-[var(--color-232f3e)] focus:text-[var(--color-febd69)] mt-2 w-full bg-[var(--color-232f3e)] font-semibold py-2 px-4 rounded inline-flex items-center text-white ${(isActive)=>isActive ? "active" : ""} text-sm font-normal py-3 focus:border-b-4 gap-6`}>
                                <MdOutlineConnectWithoutContact className="w-6 h-6"  />  تماس با ما
                            </NavLink>
                    </div>
              </ul>
            </div>
          </div>
          {/* brand */}
          <img src={brandImg} alt="brand" className="w-20 ml-1" />
      </div>
      <div className="lg:hidden flex items-center justify-evenly  bg-[var(--color-232f3e)] border-b border-solid border-[var(--color-3b4149)] py-1">
                <div className="relative w-4/5 mx-auto ">
                <Typeahead
                    className="w-full bg-white z-40 text-black  hover:bg-blue-200  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    id="pagination-example"
                    onPaginate={() => console.log('Results paginated')}
                    onChange={(selected) => {
                      navigate(`/product/${selected[0].prod}`)
                    }}
                    options={productOption}
                    paginate={paginate}
                    labelKey={"name"}
                    minLength={2}
                    placeholder="محصول رو اینجا جستجو کن"
                    align="justify"
                    inputProps={{ style: { width: '100%', padding: '8px', outline: "none" } }}
                    renderMenuItemChildren={(option) => (
                      <div className="menu-search line-clamp-2">
                        {option.name}
                      </div>
                    )}
                    
                  />
                  <button className="absolute inset-y-0 left-0 flex items-center p-3 z-40 ">
                      <BsSearch className="font-bold w-4 h-4 md:w-6 md:h-6 text-[var(--color-febd69)] "/>
                  </button>
                </div> 
                <div className="pl-5 relative flex items-center justify-between gap-1 " >
                    <div className="tooltip hover:tooltip-open tooltip-bottom" data-tip=" ثبت نام / ورود">
                        <Link to={`${user ? "/profile":"/login"}`} className="flex items-center gap-1">
                            <FaRegUser   className={` w-4 h-4  md:w-8 md:h-8 ${user ? "text-[var(--color-febd69)] animate-pulse":"text-white"} `} />
                        </Link>
                    </div>

                    <Link to='/cart' className="">
                        <BsCart4  className=" w-4 h-4  md:w-8 md:h-8 z-20 text-white"  />
                        <div className="z-10 absolute  -top-3 right-10 bg-[var(--color-febd69)] py-0.5 px-1 md:py-1 md:px-2 text-black text-xs font-medium rounded-full ">
                        {cart ? toPersianDigits(cart.length) : toPersianDigits(0)} 
                        </div>
                    </Link>

                </div>  
      </div>     
 {/* for desktop     */}     
      <header className="hidden lg:block bg-[var(--color-131921)] border-b border-solid border-[var(--color-3b4149)] py-3">
        <section className="container xl:max-w-screen-xl ">
            <div className="grid grid-cols-12 place-items-center ">
              <div className="col-span-6 sm:col-span-2 w-full">
                  <h2 className="text-white mb-0 ">
                       <Link to='/' className="text-xl md:text-2xl font-extrabold text-[var(--color-febd69)]">
                             دیجی مارکت 
                       </Link>
                  </h2>
              </div>
              <div className="pl-10  hidden  sm:col-span-8 md:col-span-6 sm:block w-full">
                <div className="relative w-full mx-auto">
                  <Typeahead
                    className="w-full bg-white z-40 text-black  hover:bg-blue-200  border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    id="pagination-example"
                    onPaginate={() => console.log('Results paginated')}
                    onChange={(selected) => {
                      navigate(`/product/${selected[0].prod}`)
                    }}
                    options={productOption}
                    paginate={paginate}
                    labelKey={"name"}
                    minLength={2}
                    placeholder="محصول رو اینجا جستجو کن"
                    align="justify"
                    inputProps={{ style: { width: '100%', padding: '8px', outline: "none" } }}
                    renderMenuItemChildren={(option) => (
                      <div className="menu-search line-clamp-2">
                        {option.name}
                      </div>
                    )}
                    
                  />
                  <button className="absolute inset-y-0 left-0 flex items-center p-3 z-40 ">
                      <BsSearch className="font-bold w-4 h-4 md:w-6 md:h-6 text-[var(--color-febd69)] "/>
                  </button>
                </div>
              </div>
              <div className="pr-10 col-span-6 sm:col-span-2 md:col-span-4 justify-end  w-full flex items-center md:justify-between gap-2 text-white">
                  <div className="hidden md:block">
                    <Link to='/compare-product' className="flex items-center gap-1">
                        <FaRotate className="w-8 h-8 " />
                        <p className="flex flex-col items-center text-sm">
                          مقایسه <span>محصولات</span> 
                        </p>
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <Link to='/wishList' className="flex items-center gap-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className={`w-8 h-8 ${wishList.length > 0 ? 'fill-red-500 blink' : ''}`}
                        >
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                        </svg>
                        <p className=" text-sm">
                              علاقه مندی ها
                        </p>
                    </Link>
                  </div>
                  <div className="">
                    <Link to={`${user ? "/profile":"/login"}`} className="flex items-center gap-1">
                        <FaRegUser   className=" w-4 h-4  md:w-8 md:h-8  " />
                        <p className="flex flex-col items-center text-sm">
                                      {
                                        user ? "":<>
                                                    <span className="">ورود</span>  ثبت نام 
                                                  </>
                                      } 
                        </p>
                    </Link>
                  </div>
                  <div className="relative">
                    <Link to='/cart' className="">
                        <BsCart4  className=" w-4 h-4  md:w-8 md:h-8 z-20 "  />
                        <div className="z-10 absolute  -top-3 right-1 bg-[var(--color-febd69)] py-0.5 px-1 md:py-1 md:px-2 text-black text-xs font-medium rounded-full ">
                        {cart && toPersianDigits(cart.length)} 
                        </div>
                    </Link>
                  </div>  
              </div>
            </div>
        </section>
      </header>
      <header className="hidden lg:block  bg-[var(--color-232f3e)] border-b border-solid border-[var(--color-3b4149)] ">
        <section className="container xl:max-w-screen-xl ">
            <div className=" text-white">
              <div className="flex gap-14">
                 
                 <div ref={ref} className="w-[25%]">  
                    <div className=" group dropdown inline-block relative text-white w-full">  
                      <button  
                        onClick={toggleDropdownDesktop}  
                        className="w-full bg-[var(--color-232f3e)] font-semibold py-2 px-4 rounded inline-flex items-center justify-between"  
                      >  
                        <span className="flex items-center gap-6">  
                          <BiCategory className="w-6 h-6" />  
                          <span>دسته بندی فروشگاه</span>  
                        </span>  
                        <FaChevronDown className={`w-4 h-4 transition-transform duration-300 ${openDesktop ? "rotate-180" : ""}`} />  
                      </button>  

                      {openDesktop && (  
                        <ul className="dropdown-content z-50 w-full absolute pt-1 space-y-2  bg-[var(--color-232f3e)] transition-all ease-in-out duration-500 mt-1">  
                          {pCategories.map((cate) => (  
                            <li key={cate._id}>  
                              <Link  
                                onClick={() => toggleSubMenu(cate._id)}  
                                className="flex justify-between items-center hover:bg-[var(--color-febd69)] bg-[var(--color-232f3e)] hover:text-[var(--color-232f3e)] py-2 px-4 whitespace-no-wrap"  
                              >  
                                <span>{cate.title}</span>  
                                <FaChevronDown className={`w-3 h-3 transition-transform duration-300 ${subMenuOpen[cate._id] ? "rotate-90" : ""}`} />  
                              </Link>  
                              {subMenuOpen[cate._id] && (  
                                <ul className="w-32 z-50 dropdown-content absolute -left-32 pl-5 -mt-10  bg-[var(--color-232f3e)] rounded shadow-lg">  
                                  {brands  
                                     .filter(brand => brand.category.includes(cate._id))  
                                     .map((b) => (  
                                      <li 
                                          key={b._id}
                                          className="w-full hover:bg-[var(--color-131921)] hover:text-[var(--color-febd69)]"
                                          onClick={()=>{
                                            navigate(`/product`,{state:{category:cate._id,brand :b._id}})
                                          }}                                    
                                      >  
                                        <Link  
                                          className=" w-full text-white py-2 px-4 block whitespace-no-wrap" 
                                        >  
                                          {b.title}  
                                        </Link>  
                                      </li>  
                                    ))
                                    }  
                                </ul>  
                              )}  
                            </li>  
                          ))}  
                        </ul>  
                      )}  
                    </div>  
                  </div>    
                 <div className=" my-2 border-r border-r-white">

                 </div>
                 <div className="  ">
                    <div className="flex items-center gap-20  ">
                        <NavLink to='/' className={`${(isActive)=>isActive ? "active" : ""} text-sm font-normal py-3 focus:border-b-4  `} >
                              خانه
                        </NavLink>
                        <NavLink to='/product' className={`${(isActive)=>isActive ? "active" : ""} text-sm font-normal py-3 focus:border-b-4 `}>
                              فروشگاه ما
                        </NavLink>
                        <NavLink to='/blogs' className={`${(isActive)=>isActive ? "active" : ""} text-sm font-normal py-3 focus:border-b-4 `}>
                              وبلاگ
                        </NavLink>
                        <NavLink to='/contact' className={`${(isActive)=>isActive ? "active" : ""} text-sm font-normal py-3 focus:border-b-4 `}>
                              تماس با ما
                        </NavLink>
                    </div>
                 </div>
              </div>
            </div>
        </section>
      </header>

    </> 
  )
}

export default Header


