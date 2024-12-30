import { Link, NavLink, useNavigate } from "react-router-dom"
import {BsCart4, BsSearch} from 'react-icons/bs'
import { FaChevronDown, FaRegHeart , FaRegUser, FaRotate } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { useDispatch, useSelector } from "react-redux";
import { FiHome, FiMenu } from "react-icons/fi";
import { LuStore } from "react-icons/lu";
import { TbBrandBlogger } from "react-icons/tb";
import { MdOutlineConnectWithoutContact } from "react-icons/md";
import brandImg from "@assets/images/imgBlog/brand.png"
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAllProducts } from "@/features/ProductsSlice/productSlice";

const Header = () => {



  const navigate=useNavigate();
  const dispatch=useDispatch();
  const {cart}=useSelector(state=>state.cart)
  const {user}=useSelector(state=>state.auth)
  const productState=useSelector(state=>state?.product?.products)
  console.log(productState)
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const [paginate, setPaginate] = useState(true);
  const [productOption, setProductOption] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts())
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
  

  return (
    <>
{/* for desktop     */}
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
                        <FaRegHeart  className="w-8 h-8  " />
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
                      {toPersianDigits(cart.length)}
                      </div>
                  </Link></div>  
              </div>
            </div>
        </section>
      </header>
      <header className="hidden lg:block  bg-[var(--color-232f3e)] border-b border-solid border-[var(--color-3b4149)] ">
        <section className="container xl:max-w-screen-xl ">
            <div className=" text-white">
              <div className="grid grid-cols-12 ">
                 <div className="col-span-3">
                      <div className="group dropdown inline-block relative text-white w-full ">
                        <button className=" w-full bg-[var(--color-232f3e)] font-semibold py-2 px-4 rounded inline-flex items-center justify-between">
                          <span className=" flex items-center gap-6">
                              <BiCategory className="w-6 h-6" />
                              <span className="">دسته بندی فروشگاه</span>
                          </span>
                          <FaChevronDown className="w-4 h-4 group-hover:rotate-180 transition-all ease-in-out duration-300"  />
                        </button>
                        <ul className="dropdown-content z-50 w-full absolute hidden pt-1  transition-all ease-in-out duration-500">
                          <li><Link className="rounded-t bg-[var(--color-232f3e)]  hover:text-[var(--color-febd69)] py-2 px-4 block whitespace-no-wrap" to="#">موبایل</Link></li>
                          <li><Link className="bg-[var(--color-232f3e)]  hover:text-[var(--color-febd69)] py-2 px-4 block whitespace-no-wrap" to="#">هدفون</Link></li>
                          <li className="dropdown w-full ">
                                <Link className="bg-[var(--color-232f3e)]  hover:text-[var(--color-febd69)] py-2 px-4 whitespace-no-wrap flex items-center justify-between" to="#">
                                  <span className="">لپ تاپ</span>
                                  <FaChevronDown className="w-4 h-4 group-hover:rotate-90 "  />
                                </Link>
                                
                                <ul className="dropdown-content absolute -translate-x-full left-0 hidden  pl-5 -mt-10 ">
                                    <li><Link className="bg-[var(--color-232f3e)]  hover:text-[var(--color-febd69)] py-2 px-4 block whitespace-no-wrap" to="#">Asus</Link></li>
                                      <li><Link className="bg-[var(--color-232f3e)]  hover:text-[var(--color-febd69)] py-2 px-4 block whitespace-no-wrap" to="#">Msi</Link></li>
                                </ul>
                          </li>
                          <li><Link className="rounded-b bg-[var(--color-232f3e)]  hover:text-[var(--color-febd69)] py-2 px-4 block whitespace-no-wrap" to="#">ساعت مچی</Link></li>
                        </ul>
                      </div>
                 </div>
                 <div className="col-span-1 my-2 border-r border-r-white">

                 </div>
                 <div className=" col-span-8 place-content-center ">
                    <div className="flex items-center gap-20  ">
                        <NavLink to='/' className={`${(isActive)=>isActive ? "active" : ""} text-sm font-normal py-3 focus:border-b-4  `} >
                              خانه
                        </NavLink>
                        <NavLink to='/shop' className={`${(isActive)=>isActive ? "active" : ""} text-sm font-normal py-3 focus:border-b-4 `}>
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
{/* for mobile */}
      <div className="lg:hidden flex  items-center justify-between bg-[var(--color-131921)] border-b border-solid border-[var(--color-3b4149)] py-2">
          <div className="drawer drawer-start z-50">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content m-2">
              {/* Page content here */}
              <label htmlFor="my-drawer-4" className="w-12 drawer-button cursor-pointer text-white hover:opacity-80  p-0"><FiMenu  className="w-6 h-6" /></label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu bg-base-200 text-base-content min-h-full w-80 ">
                {/* Sidebar content here */}
                <label htmlFor="my-drawer-4" className="w-12 drawer-button btn text-white hover:opacity-80 hover:bg-[var(--color-232f3e)] bg-[var(--color-232f3e)] p-0 mb-5"><IoClose className="w-6 h-6"/></label>    
                    <div className="accordion-menu text-white w-full">
                            <NavLink to='/category' 
                             onClick={() => toggleSection('category')}
                             className={`hover:opacity-80 hover:bg-[var(--color-232f3e)] focus:text-[var(--color-febd69)] mt-2 w-full bg-[var(--color-232f3e)] font-semibold py-2 px-4 rounded inline-flex items-center text-white ${(isActive)=>isActive ? "active" : ""} text-sm font-normal py-3 focus:border-b-4 justify-between`}>
                              <span className="flex items-center gap-6">
                                <BiCategory className="w-6 h-6" />
                                <span>دسته بندی فروشگاه</span>
                              </span>
                              <FaChevronDown className={`w-4 h-4 transition-transform ${openSections['category'] ? 'rotate-180' : ''}`} />
                            </NavLink >
                         {openSections['category'] &&( 
                              <ul className="mt-1 space-y-1 w-full ">
                                <li className="border-b border-white px-4 ">
                                  <button
                                    onClick={() => toggleSection('mobile')}
                                    className="hover:opacity-80 hover:bg-[var(--color-232f3e)] focus:text-[var(--color-febd69)] focus:bg-[var(--color-232f3e)] w-full text-left bg-[var(--color-232f3e)] py-2 px-4 flex justify-between items-center"
                                  >
                                    <span>موبایل</span>
                                    <FaChevronDown
                                      className={`w-4 h-4 transition-transform ${openSections['mobile'] ? 'rotate-180' : ''}`}
                                    />
                                  </button>
                                </li>
                                <li className="border-b border-white px-4 ">
                                  <button
                                    onClick={() => toggleSection('headphones')}
                                    className="hover:opacity-80 hover:bg-[var(--color-232f3e)] focus:bg-[var(--color-232f3e)] focus:text-[var(--color-febd69)] w-full text-left bg-[var(--color-232f3e)] py-2 px-4 flex justify-between items-center"
                                  >
                                    <span>هدفون</span>
                                    <FaChevronDown
                                      className={`w-4 h-4 transition-transform ${openSections['headphones'] ? 'rotate-180' : ''}`}
                                    />
                                  </button>
                                </li>
                                <li className="border-b border-white px-4 ">
                                  <button
                                    onClick={() => toggleSection('laptops')}
                                    className="hover:opacity-80 hover:bg-[var(--color-232f3e)] focus:bg-[var(--color-232f3e)] focus:text-[var(--color-febd69)] w-full text-left bg-[var(--color-232f3e)] py-2 px-4 flex justify-between items-center"
                                  >
                                    <span>لپ تاپ</span>
                                    <FaChevronDown
                                      className={`w-4 h-4 transition-transform ${openSections['laptops'] ? 'rotate-180' : ''}`}
                                    />
                                  </button>
                                  {openSections['laptops'] && (
                                    <ul className="pl-6 py-2 space-y-1">
                                      <li>
                                        <Link
                                          className="block bg-[var(--color-232f3e)] hover:opacity-80 focus:bg-[var(--color-232f3e)] hover:bg-[var(--color-232f3e)] focus:text-[var(--color-febd69)] py-1 px-4"
                                          to="#"
                                        >
                                          Asus
                                        </Link>
                                      </li>
                                      <li>
                                        <Link
                                          className="block bg-[var(--color-232f3e)] hover:opacity-80 focus:bg-[var(--color-232f3e)] hover:bg-[var(--color-232f3e)] focus:text-[var(--color-febd69)] py-1 px-4"
                                          to="#"
                                        >
                                          Msi
                                        </Link>
                                      </li>
                                    </ul>
                                  )}
                                </li>
                                <li className="border-b border-white px-4 ">
                                  <button
                                    onClick={() => toggleSection('watches')}
                                    className="hover:opacity-80 hover:bg-[var(--color-232f3e)] focus:bg-[var(--color-232f3e)] focus:text-[var(--color-febd69)] w-full text-left bg-[var(--color-232f3e)] py-2 px-4 flex justify-between items-center"
                                  >
                                    <span>ساعت مچی</span>
                                    <FaChevronDown
                                      className={`w-4 h-4 transition-transform ${openSections['watches'] ? 'rotate-180' : ''}`}
                                    />
                                  </button>
                                </li>
                              </ul>
                             )}
                    </div>
                    <div className="w-full flex flex-col items-start  ">
                            <NavLink to='/' className={`hover:opacity-80 hover:bg-[var(--color-232f3e)] focus:text-[var(--color-febd69)] mt-2 w-full bg-[var(--color-232f3e)] font-semibold py-2 px-4 rounded inline-flex items-center text-white ${(isActive)=>isActive ? "active" : ""} text-sm font-normal py-3 focus:border-b-4  gap-6`} >
                                <FiHome className="w-6 h-6"  />  خانه
                            </NavLink>
                            <NavLink to='/shop' className={`hover:opacity-80 hover:bg-[var(--color-232f3e)] focus:text-[var(--color-febd69)] mt-2 w-full bg-[var(--color-232f3e)] font-semibold py-2 px-4 rounded inline-flex items-center text-white ${(isActive)=>isActive ? "active" : ""} text-sm font-normal py-3 focus:border-b-4 gap-6`}>
                                <LuStore className="w-6 h-6"  />  فروشگاه ما
                            </NavLink>
                            <NavLink to='/blogs' className={`hover:opacity-80 hover:bg-[var(--color-232f3e)] focus:text-[var(--color-febd69)] mt-2 w-full bg-[var(--color-232f3e)] font-semibold py-2 px-4 rounded inline-flex items-center text-white ${(isActive)=>isActive ? "active" : ""} text-sm font-normal py-3 focus:border-b-4 gap-6`}>
                                <TbBrandBlogger className="w-6 h-6"  />  وبلاگ
                            </NavLink>
                            <NavLink to='/contact' className={`hover:opacity-80 hover:bg-[var(--color-232f3e)] focus:text-[var(--color-febd69)] mt-2 w-full bg-[var(--color-232f3e)] font-semibold py-2 px-4 rounded inline-flex items-center text-white ${(isActive)=>isActive ? "active" : ""} text-sm font-normal py-3 focus:border-b-4 gap-6`}>
                                <MdOutlineConnectWithoutContact className="w-6 h-6"  />  تماس با ما
                            </NavLink>
                    </div>
              </ul>
            </div>
          </div>
          {/* brand */}
          <img src={brandImg} alt="brand" className="w-20 ml-1" />
      </div>
      <div className="lg:hidden flex items-center justify-center  bg-[var(--color-232f3e)] border-b border-solid border-[var(--color-3b4149)] py-1">
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
      </div>
    </> 
  )
}

export default Header


