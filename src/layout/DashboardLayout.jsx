import { useState } from 'react';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
import { AiOutlineBgColors, AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { SiBrandfolder } from 'react-icons/si';
import { BiCategoryAlt } from 'react-icons/bi';
import { ImBlog } from 'react-icons/im';
import { RiCouponLine } from 'react-icons/ri';
import { FaBloggerB, FaClipboardList } from 'react-icons/fa6';
import { IoCaretBackSharp,IoCaretForwardSharp} from 'react-icons/io5';
import { IoIosNotifications} from 'react-icons/io';
import { useSelector } from 'react-redux';
import pic from "@assets/images/pro.jpg"
import { toPersianDigits } from '@/utils/toPersianDigits';
import { ToastContainer } from 'react-toastify';


const DashboardLayout = () => {
  
    const location=useLocation();
    const navigate=useNavigate();
    const {user}=useSelector(state =>state.auth)   
  // console.log(user.firstname)
    const [collapsed, setCollapsed] = useState(false);
    const {
      token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    
    return (
      <Layout className='h-screen'>
        <Sider trigger={null} collapsible collapsed={collapsed} width={230} className=''
          style={{position:"relative" }}
        >
          <div className="bg-[#fdd333] m-0 h-16 flex justify-center items-center" >
                <h5 className=' text-white text-xl py-2 font-extrabold font-sans'>
                  <span className="sm-logo">DM</span>
                  <span className="lg-logo">دیجی مارکت</span>
                </h5>
          </div>  
          <Menu
            style={{
              maxHeight:'calc(100vh - 64px)',
              overflowY:"scroll",
              scrollBehavior:"smooth",
              scrollbarWidth:"none"
            }}
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            defaultSelectedKeys={['/admin/dashboard']}
            onClick={({ key }) => {
              if (key == "signout") {
                console.log("signout")
              } else {
                navigate(key.startsWith("/admin") ? key : `/admin/${key}`);
              }
            }}
            items={[
              {
                key: "/admin/dashboard",
                icon: <AiOutlineDashboard className="text-lg" />,
                label: "داشبورد",
              },
              {
                key: "customers",
                icon: <AiOutlineUser className="text-lg" />,
                label: "مشتریان",
              },
              {
                key: "Catalog",
                icon: <AiOutlineShoppingCart className="text-lg" />,
                label: "کاتالوگ",
                children: [
                  {
                    key: "add-product",
                    icon: <AiOutlineShoppingCart className="text-lg" />,
                    label: "افزودن محصول",
                  },
                  {
                    key: "product-list",
                    icon: <AiOutlineShoppingCart className="text-lg" />,
                    label: "لیست محصولات",
                  },
                  {
                    key: "add-brand",
                    icon: <SiBrandfolder className="text-lg" />,
                    label: " افزودن برند",
                  },
                  {
                    key: "brand-list",
                    icon: <SiBrandfolder className="text-lg" />,
                    label: "لیست برند ها",
                  },
                  {
                    key: "add-category",
                    icon: <BiCategoryAlt className="text-lg" />,
                    label: "افزودن دسته بندی",
                  },
                  {
                    key: "category-list",
                    icon: <BiCategoryAlt className="text-lg" />,
                    label: "لیست دسته بندی ها",
                  },
                  {
                    key: "add-color",
                    icon: <AiOutlineBgColors className="text-lg" />,
                    label: "افزودن رنگ",
                  },
                  {
                    key: "color-list",
                    icon: <AiOutlineBgColors className="text-lg" />,
                    label: "لیست رنگ ها",
                  },
                ],
              },
              {
                key: "orders",
                icon: <FaClipboardList className="text-lg" />,
                label: "لیست سفارشات",
              },
              {
                key: "marketing",
                icon: <RiCouponLine className="text-lg" />,
                label: "بازاریابی",
                children: [
                  {
                    key: "coupon",
                    icon: <ImBlog className="text-lg" />,
                    label: "افزودن تخفیف",
                  },
                  {
                    key: "coupon-list",
                    icon: <RiCouponLine className="text-lg" />,
                    label: "لیست تخفیفات",
                  },
                ],
              },
              {
                key: "blogs",
                icon: <FaBloggerB className="text-lg" />,
                label: "بلاگ ها",
                children: [
                  {
                    key: "add-blog",
                    icon: <ImBlog className="text-lg" />,
                    label: "افزودن بلاگ",
                  },
                  {
                    key: "blog-list",
                    icon: <FaBloggerB className="text-lg" />,
                    label: "لیست بلاگ ها",
                  },
                  {
                    key: "add-blog-category",
                    icon: <ImBlog className="text-lg" />,
                    label: "افزودن دسته بندی بلاگ ها",
                  },
                  {
                    key: "blog-category-list",
                    icon: <FaBloggerB className="text-lg" />,
                    label: "لیست دسته بندی بلاگ ها",
                  },
                ],
              },
              {
                key: "enquiries",
                icon: <FaClipboardList className="text-lg" />,
                label: <div className="">  پشتیبانی و خدمات مشتریان </div>,
              },
            ]}
          />
           <Button
              type="text"
              icon={collapsed ? <IoCaretBackSharp /> : <IoCaretForwardSharp />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: '15px',
                height: '50px',
                border: '2px',
                borderColor:"white",
                backgroundColor:'#fdd333',
                position:"absolute",
                top:"50%",
                left: "-7px"
              }}
            />
        </Sider>
        <Layout>
          <Header
            className='flex items-center justify-between'
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            
            <div className=" pl-5 ">
              <div className='flex items-center gap-5 px-10'>
                <div className="rounded-full overflow-hidden border border-[#fdd333]">
                  <img src={pic} alt="" className="w-10 h-10" />
                </div>
                <div className=" flex flex-col items-start justify-center h-16 ">
                  <h5 className='font-sans text-base'>{user.firstname} {user.lastname}</h5>
                  <p className='font-sans text-base'>{user.email}</p>
                </div>
                <div className='relative'>
                  <IoIosNotifications className='w-6 h-6'/>
                  <span className="w-4 h-4 absolute -right-1 -top-1 p-1 rounded-full bg-red-500 badge text-white text-sm">
                    {toPersianDigits(3)}
                  </span>
                </div>
              </div>
            </div>
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              // background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
          
              <Outlet />
            
          </Content>
        </Layout>
        <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition: Bounce
        />
      </Layout>
  )
}

export default DashboardLayout