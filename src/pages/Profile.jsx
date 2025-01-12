import Container from "@/components/Container";
import { toPersianDigits, toPersianDigitsWithComma } from "@/utils/toPersianDigits";
import { useEffect, useState } from "react";
import { MdAdminPanelSettings, MdDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ImExit, ImProfile } from "react-icons/im";
import { getOrderByUser, logoutUser, updateProfile } from "@/features/userSlice/userSlice";
import toLocalDate from "@/utils/toLocalDate";
import * as Yup from "yup";
import { useFormik } from "formik";
import Input from "@/components/Input";
import { FaRegEdit } from "react-icons/fa";
import { VscListOrdered } from "react-icons/vsc";
import { Link, Navigate, useNavigate } from "react-router-dom";

const signUpSchema = Yup.object({
  firstname: Yup.string().required('ورود نام الزامیست'),
  lastname: Yup.string().required('ورود نام خانوادگی الزامیست'),
  email: Yup.string().nullable().email('پست الکترونیکی معتبر نیست').required("پست الکترونیکی الزامی است"),
  mobile: Yup.string().required('ورود شماره تلفن الزامیست'),
})

const Profile = () => {

  const navigate=useNavigate();
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { getOrderedProduct } = useSelector(state => state.auth);
  const { products } = getOrderedProduct || [];
  
  const [activeSection, setActiveSection] = useState('dashboard');
  const [edit, setEdit] = useState(true)

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      email: user?.email || '',
      mobile: user?.mobile || '',
    },
    validationSchema: signUpSchema,
    onSubmit: values => {
      dispatch(updateProfile(values));
      dispatch(getOrderByUser());
    },
  });

  useEffect(() => {
    dispatch(getOrderByUser())
  }, [dispatch, user]);

  if (!user) {
    return <Navigate to="/unauthorized" />
  }


  return (
    <div>
      <Container class1="py-5 bg-[var(--color-f5f5f7)]">
        <div className="flex h-[70vh]">
          {/* Sidebar */}
          <div className="sm-custom2:w-2/12 w-1/12 md:w-1/4 bg-gray-200 p-4 flex flex-col items-center md:items-start">
            <h2 className="w-full hidden md:block text-xl font-bold mb-4  pb-2 border-b border-b-black">پنل کاربری {user?.role == "Admin" && "( کاربر ادمین )"}</h2>
            <ImProfile className="w-8 md:hidden self-center mb-2" />
            <ul className="flex flex-col gap-3 md:gap-2 w-full border-t border-t-black md:border-t-0 pt-5 md:pt-0">
              <li>
                <button 
                  className="sm-custom2:justify-center flex items-center gap-2 text-nowrap w-full md:p-2 hover:bg-gray-300 text-lg transition-all duration-300 ease-linear"
                  onClick={() => setActiveSection('dashboard')}
                >
                  <span className={`tooltip ${window.innerWidth < 768 ? 'hover:tooltip-open hover:tooltip-left' : ''}`} data-tip="داشبورد">
                    <MdDashboard />
                  </span>
                  <span className="hidden md:block">داشبورد</span>
                </button>
              </li>
              { user?.role == "Admin" &&
                <li>
                <button 
                  className="sm-custom2:justify-center flex items-center gap-2 text-nowrap w-full md:p-2 hover:bg-gray-300 text-lg transition-all duration-300 ease-linear"
                  onClick={() => setActiveSection('dashboard')}
                >
                  <span className={`tooltip ${window.innerWidth < 768 ? 'hover:tooltip-open hover:tooltip-left' : ''}`} data-tip="داشبورد">
                  <MdAdminPanelSettings />
                  </span>
                  <Link to="/admin" className="hidden md:block">مدیریت سایت</Link>
                </button>
              </li>
              }
              <li>
                <button 
                  className="sm-custom2:justify-center flex items-center gap-2 text-nowrap w-full md:p-2 hover:bg-gray-300 text-lg transition-all duration-300 ease-linear"
                  onClick={() => setActiveSection('orders')}
                >
                  <span className={`tooltip ${window.innerWidth < 768 ? 'hover:tooltip-open hover:tooltip-left' : ''}`} data-tip="سفارش‌های من">
                    <VscListOrdered />
                  </span>
                  <span className="hidden md:block">سفارش‌های من</span>
                </button>
              </li>
              <li>
                <button 
                  className="sm-custom2:justify-center flex items-center gap-2 text-nowrap w-full md:p-2 hover:bg-gray-300 text-lg transition-all duration-300 ease-linear"
                  onClick={() => {dispatch(logoutUser()); navigate("/")}}
                >
                  <span className={`tooltip ${window.innerWidth < 768 ? 'hover:tooltip-open hover:tooltip-left' : ''}`} data-tip="خروج">
                    <ImExit />
                  </span>
                  <span className="hidden md:block">خروج</span>
                </button>
              </li>
            </ul>
          </div>
          {/* Main Content */}
          <div className="w-11/12 md:w-3/4 p-4 bg-white flex flex-col items-center">
            {activeSection === 'dashboard' && (
              <>
                <h2 className="text-2xl pt-5 mb-10 self-start">
                  <span className="text-green-400">{user.firstname} {user.lastname}</span>
                  &nbsp; عزیز خوش آمدید
                </h2>
                <div className="w-full sm:w-1/2 mb-4 pb-2 flex items-center justify-between border-b border-b-slate-300">
                  <h3 className="text-xl font-bold">بروزرسانی پروفایل</h3>
                  <div className=" tooltip tooltip-open  " data-tip="دکمه ویرایش">
                  <FaRegEdit onClick={()=>setEdit(false)} className="cursor-pointer animate-pulse"/>
                  </div>
                </div>
                <form onSubmit={formik.handleSubmit} className="w-full sm:w-1/2 flex flex-col gap-3 ">
                  <Input 
                    value={formik.values.firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="firstname"
                    type="text"
                    className={`w-full p-1  ${edit === false ? 'bg-[var(--color-f5f5f7)]' : 'bg-gray-200'} border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)]"
        `}           placeholder="نام"
                    disabled={edit}
                  />
                  <div className={`text-rose-500 text-xs ${formik.touched.firstname && formik.errors.firstname && 'mb-1'}`}>
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                  <Input 
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="lastname"
                    type="text"
                    className={`w-full p-1  ${edit === false ? 'bg-[var(--color-f5f5f7)]' : 'bg-gray-200'} border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)]"
        `}           placeholder="نام خانوادگی"
                    disabled={edit}
                  />
                  <div className={`text-rose-500 text-xs ${formik.touched.lastname && formik.errors.lastname && 'mb-1'}`}>
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                  <Input 
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="email"
                    type="email"
                    className={`w-full p-1  ${edit === false ? 'bg-[var(--color-f5f5f7)]' : 'bg-gray-200'} text-left border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)]`}
                    placeholder="آدرس پست الکترونیکی شما"
                    disabled={edit}
                  />
                  <div className={`text-rose-500 text-xs ${formik.touched.email && formik.errors.email && 'mb-1'}`}>
                    {formik.touched.email && formik.errors.email}
                  </div>
                  <Input 
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="mobile"
                    type="tel"
                    className={`w-full p-1  ${edit === false ? 'bg-[var(--color-f5f5f7)]' : 'bg-gray-200'} text-left border-none rounded-lg border-transparent focus:ring-[var(--color-febd69)]`}
                    placeholder=" شماره تلفن"
                    disabled={edit}
                  />
                  <div className={`text-rose-500 text-xs ${formik.touched.mobile && formik.errors.mobile && 'mb-1'}`}>
                    {formik.touched.mobile && formik.errors.mobile}
                  </div>
                  {
                    edit === false && 
                    <div className="flex items-center justify-end">
                      <button type="submit" disabled={!(formik.isValid && formik.dirty)} className={`w-1/4 bg-[var(--color-febd69)] text-[var(--color-131921)] hover:bg-[var(--color-131921)] hover:text-white px-2 py-1 rounded-xl ${!(formik.isValid && formik.dirty) && 'cursor-not-allowed'}`}>
                        ذخیره    
                      </button>
                    </div> 
                  }
                  
                </form>
              </>
            )}
            {/* Section for Orders */}
            {activeSection === 'orders' && (
              <div className="w-full flex-1 bg-white p-6">
                <h2 className="text-2xl text-center font-bold mb-4">سفارش‌های من</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2 text-center">شماره سفارش</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">تاریخ</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">محصول</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">وضعیت</th>
                        <th className="border border-gray-300 px-4 py-2 text-center">مبلغ</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getOrderedProduct && getOrderedProduct?._id ? (
                        <tr>
                          <td className="border border-gray-300 px-4 py-2 text-center">{toPersianDigits(getOrderedProduct?._id.slice(-6))}</td>
                          <td className="border border-gray-300 px-4 py-2 text-center">{toLocalDate(getOrderedProduct?.createdAt)}</td>
                          <td className="border border-gray-300 px-4 py-2 text-right">
                            {products.map((p, i) => (
                              <p key={i} className={`flex gap-1 mb-2 text-justify ${i !== products.length - 1 ? 'border-b border-gray-200 pb-2 mb-2' : ''}`}>
                                <span>🛒</span>{p.product.title}
                              </p>
                            ))}
                          </td>
                          <td className="border border-gray-300 px-4 py-2 text-center">{getOrderedProduct?.orderStatus}</td>
                          <td className="border border-gray-300 px-4 py-2 text-center">{toPersianDigitsWithComma(getOrderedProduct?.paymentIntent?.amount)} تومان</td>
                        </tr>
                      ) : (
                        <tr>
                          <td colSpan={5} className="text-center py-5 text-rose-600">
                            برای شما هیچ سفارشی ثبت نشده است
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  )
};

export default Profile;