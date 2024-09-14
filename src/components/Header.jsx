import { Link, NavLink } from "react-router-dom"
import {BsCart4, BsSearch} from 'react-icons/bs'
import { FaChevronDown, FaRegHeart , FaRegUser, FaRotate } from "react-icons/fa6";
import { BiCategory } from "react-icons/bi";
import { toPersianDigits } from "@/utils/toPersianDigits";


const Header = () => {
  return (
    <>
      <header className="bg-[var(--color-131921)] border-b border-solid border-[var(--color-3b4149)] py-3">
        <section className="container xl:max-w-screen-xl">
            <div className="grid grid-cols-12">
              <div className="col-span-6 ">
                  <p className="text-white mb-0 ">
                         ارسال رایگان با خرید بالای  {toPersianDigits(1)} میلیون تومان 
                  </p>
              </div>
              <div className="col-span-6 ">
                  <p className="text-white mb-0 text-end">
                          شماره تماس : <Link to="tel : 09139734679"> {toPersianDigits(0) + toPersianDigits(9139734679)}</Link>
                  </p>
              </div>
            </div>
        </section>
      </header>
      <header className="bg-[var(--color-131921)] border-b border-solid border-[var(--color-3b4149)] py-3">
        <section className="container xl:max-w-screen-xl ">
            <div className="grid grid-cols-12 place-items-center ">
              <div className="col-span-2 w-full">
                  <h2 className="text-white mb-0 ">
                       <Link to='/' className="text-2xl font-extrabold text-[var(--color-febd69)]">
                             دیجی مارکت 
                       </Link>
                  </h2>
              </div>
              <div className="pl-10 col-span-6 w-full">
                <div className="relative w-full mx-auto ">
                    <input className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" type="search" placeholder="محصول رو اینجا جستجو کن" />
                    <button className="absolute inset-y-0 left-0 flex items-center p-3 text-gray-700 bg-[var(--color-febd69)] border border-gray-300 rounded-l-md hover:bg-[var(--color-131921)] hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <BsSearch className="font-bold w-6 h-6"/>
                    </button>
                </div>
              </div>
              <div className="pr-10 col-span-4 w-full flex items-center justify-between gap-2 text-white">
                  <div className="">
                    <Link to='/compare-product' className="flex items-center gap-1">
                        <FaRotate className="w-8 h-8 " />
                        <p className="flex flex-col items-center text-sm">
                          مقایسه <span>محصولات</span> 
                        </p>
                    </Link>
                  </div>
                  <div className="">
                    <Link to='/wishList' className="flex items-center gap-1">
                        <FaRegHeart  className="w-8 h-8  " />
                        <p className=" text-sm">
                              علاقه مندی ها
                        </p>
                    </Link>
                  </div>
                  <div className="">
                    <Link to='/login' className="flex items-center gap-1">
                        <FaRegUser   className="w-8 h-8  " />
                        <p className="flex flex-col items-center text-sm">
                                      <span className="">ورود</span>  ثبت نام  
                        </p>
                    </Link>
                  </div>
                  <div className="relative">
                    <Link to='/cart' className="">
                        <BsCart4  className="w-8 h-8 z-20 "  />
                        <div className="z-10 absolute  -top-3 right-1 bg-[var(--color-febd69)] py-1 px-2 text-black text-xs font-medium rounded-full ">
                        {toPersianDigits(0)}
                        </div>
                    </Link></div>  
              </div>
            </div>
        </section>
      </header>
      <header className="bg-[var(--color-232f3e)] border-b border-solid border-[var(--color-3b4149)] ">
        <section className="container xl:max-w-screen-xl ">
            <div className=" text-white">
              <div className="grid grid-cols-12 ">
                 <div className="col-span-3">
                      <div className="group dropdown inline-block relative text-white w-full ">
                        <button className=" w-full bg-[var(--color-232f3e)] font-semibold py-2 px-4 rounded inline-flex items-center justify-between">
                          <span className=" flex items-center gap-6">
                              <BiCategory className="w-6 h-6" />
                              <span>دسته بندی فروشگاه</span>
                          </span>
                          <FaChevronDown className="w-4 h-4 group-hover:rotate-180 transition-all ease-in-out duration-300"  />
                        </button>
                        <ul className="dropdown-content z-50 w-full absolute hidden pt-1  transition-all ease-in-out duration-500">
                          <li><Link className="rounded-t bg-[var(--color-232f3e)]  hover:text-[var(--color-febd69)] py-2 px-4 block whitespace-no-wrap" to="#">Option 1</Link></li>
                          <li><Link className="bg-[var(--color-232f3e)]  hover:text-[var(--color-febd69)] py-2 px-4 block whitespace-no-wrap" to="#">Option 2</Link></li>
                          <li className="dropdown w-full ">
                                <Link className="bg-[var(--color-232f3e)]  hover:text-[var(--color-febd69)] py-2 px-4 whitespace-no-wrap flex items-center justify-between" to="#">
                                  <span className="">Option 3 ?</span>
                                  <FaChevronDown className="w-4 h-4 group-hover:rotate-90 "  />
                                </Link>
                                
                                <ul className="dropdown-content absolute -translate-x-full left-0 hidden  pl-5 -mt-10 ">
                                    <li><Link className="bg-[var(--color-232f3e)]  hover:text-[var(--color-febd69)] py-2 px-4 block whitespace-no-wrap" to="#">Option 3-1</Link></li>
                                      <li><Link className="bg-[var(--color-232f3e)]  hover:text-[var(--color-febd69)] py-2 px-4 block whitespace-no-wrap" to="#">Option 3-2</Link></li>
                                </ul>
                          </li>
                          <li><Link className="rounded-b bg-[var(--color-232f3e)]  hover:text-[var(--color-febd69)] py-2 px-4 block whitespace-no-wrap" to="#">Option 4</Link></li>
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
    </> 
  )
}

export default Header


