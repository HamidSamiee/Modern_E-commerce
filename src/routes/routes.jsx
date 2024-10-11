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
import Dashboard from "@/pages/admin/Dashboard";
// import LoginAdmin from "@/pages/admin/Login";
// import ForgetPasswordAdmin from "@/pages/admin/ForgetPassword";
// import ResetPasswordAdmin from "@/pages/admin/ResetPassword";


const routes=[
    {path:"about" ,element:<About />},
    {path:"contact" ,element:<Contact />},
    {path:"admin" ,element:<Dashboard />},
    {path:"shop" ,element:<Shop />},
    {path:"blogs" ,element:<Blogs />},
    {path:"product/:productId" ,element:<SingleProduct />},
    {path:"compare-product" ,element:<CompareProducts />},
    {path:"login" ,element:<Login />},
    {path:"signUp" ,element:<SignUp />},
    {path:"cart" ,element:<Cart />},
    {path:"checkout" ,element:<Checkout />},
    {path:"wishList" ,element:<WishList />},
    {path:"forget-password" ,element:<ForgetPassword />},
    {path:"reset-password" ,element:<ResetPassword />},
    {path:"blog/:id" ,element:<SingleBlog />},
    {path:"privacy-policy" ,element:<PrivacyPolicy />},
    {path:"refund-policy" ,element:<RefundPolicy />},
    {path:"shipping-policy" ,element:<ShippingPolicy />},
    {path:"term-conditons" ,element:<TermAndConditons />},
    {path:"*" ,element:<NotFound />},
]
export const dashboardRoutes=[
    {path:"admin" ,element:<Dashboard />},
    // {path:"login" ,element:<LoginAdmin />},
    // {path:"forget-password" ,element:<ForgetPasswordAdmin />},
    // {path:"reset-password" ,element:<ResetPasswordAdmin />},
    {path:"*" ,element:<NotFound />},
]

export default routes;