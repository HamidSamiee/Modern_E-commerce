import Blogs from "@/pages/Blogs";
import Shop from "@/pages/Shop";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import CompareProducts from "@/pages/CompareProducts";
import WishList from "@/pages/WishList";
import Cart from "@/pages/Cart";
import Login from "@/pages/Login";
import NotFound from "@/pages/Not-Found";
import ForgetPassword from "@/pages/ForgetPassword";
import SignUp from "@/pages/SignUp";
import ResetPassword from "@/pages/ResetPassword";
import SingleBlog from "@/pages/SingleBlog";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import RefundPolicy from "@/pages/RefundPolicy";
import ShippingPolicy from "@/pages/ShippingPolicy";
import TermAndConditons from "@/pages/TermAndConditons";
import SingleProduct from "@/pages/SingleProduct";
import Checkout from "@/pages/Checkout";
import Enquiries from "@/pages/admin/Enquiries";
import AdminRouter from "@/pages/admin/AdminRouter";
import Dashboard from "@/pages/admin/Dashboard";
import BlogList from "@/pages/admin/blogList/BlogList";
import BlogCatgorylist from "@/pages/admin/blogCategoryList/BlogCatgorylist";
import Orders from "@/pages/admin/Orders";
import Customers from "@/pages/admin/Customers";
import ColorList from "@/pages/admin/ColorList";
import CategoryList from "@/pages/admin/categoryList/CategoryList";
import BrandList from "@/pages/admin/brandList/BrandList";
import ProductList from "@/pages/admin/productList/ProductList";
import AddBlog from "@/pages/admin/AddBlog";
import AddBlogCategory from "@/pages/admin/AddBlogCategory";
import AddColor from "@/pages/admin/AddColor";
import AddCategory from "@/pages/admin/AddCategory";
import AddBrand from "@/pages/admin/AddBrand";
import AddProduct from "@/pages/admin/AddProduct";
import Profile from "@/pages/Profile";
import AddCoupon from "@/pages/admin/AddCoupon";
import CouponList from "@/pages/admin/couponList/CouponList";
import SendMethod from "@/pages/SendMethod";
// import LoginAdmin from "@/pages/admin/Login";
// import ForgetPasswordAdmin from "@/pages/admin/ForgetPassword";
// import ResetPasswordAdmin from "@/pages/admin/ResetPassword";


const routes=[
    {path:"about" ,element:<About />},
    {path:"contact" ,element:<Contact />},
    {path:"admin" ,element:<AdminRouter />},
    {path:"profile" ,element:<Profile />},
    {path:"shop" ,element:<Shop />},
    {path:"blogs" ,element:<Blogs />},
    {path:"product/:productId" ,element:<SingleProduct />},
    {path:"compare-product" ,element:<CompareProducts />},
    {path:"login" ,element:<Login />},
    {path:"signUp" ,element:<SignUp />},
    {path:"cart" ,element:<Cart />},
    {path:"checkout" ,element:<Checkout />},
    {path:"sendMethod" ,element:<SendMethod />},
    {path:"wishList" ,element:<WishList />},
    {path:"forget-password" ,element:<ForgetPassword />},
    {path:"reset-password/:token" ,element:<ResetPassword />},
    {path:"blog/:id" ,element:<SingleBlog />},
    {path:"privacy-policy" ,element:<PrivacyPolicy />},
    {path:"refund-policy" ,element:<RefundPolicy />},
    {path:"shipping-policy" ,element:<ShippingPolicy />},
    {path:"term-conditons" ,element:<TermAndConditons />},
    {path:"*" ,element:<NotFound />},
]
export const dashboardRoutes=[
    {path:"/enquiries" ,element:<Enquiries />},
    {path:"/dashboard" ,element:<Dashboard />},
    {path:"/blog-list" ,element:<BlogList />},
    {path:"/blog-category-list" ,element:<BlogCatgorylist />},
    {path:"/orders" ,element:<Orders />},
    {path:"/customers" ,element:<Customers />},
    {path:"/color-list" ,element:<ColorList />},
    {path:"/category-list" ,element:<CategoryList />},
    {path:"/brand-list" ,element:<BrandList />},
    {path:"/product-list" ,element:<ProductList />},
    {path:"/coupon" ,element:<AddCoupon />},
    {path:"/coupon-list" ,element:<CouponList/>},
    {path:"/add-blog" ,element:<AddBlog />},
    {path:"/add-blog-category" ,element:<AddBlogCategory />},
    {path:"/add-color" ,element:<AddColor />},
    {path:"/add-category" ,element:<AddCategory />},
    {path:"/add-brand" ,element:<AddBrand />},
    {path:"/add-product" ,element:<AddProduct />},
    // {path:"login" ,element:<LoginAdmin />},
    // {path:"forget-password" ,element:<ForgetPasswordAdmin />},
    // {path:"reset-password" ,element:<ResetPasswordAdmin />},
    {path:"*" ,element:<NotFound />},
]

export default routes;