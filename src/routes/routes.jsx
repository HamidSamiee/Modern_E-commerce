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


const routes=[
    {path:"about" ,element:<About />},
    {path:"contact" ,element:<Contact />},
    {path:"shop" ,element:<Shop />},
    {path:"blogs" ,element:<Blogs />},
    {path:"product/:productId" ,element:<SingleProduct />},
    {path:"compare-product" ,element:<CompareProducts />},
    {path:"login" ,element:<Login />},
    {path:"signUp" ,element:<SignUp />},
    {path:"cart" ,element:<Cart />},
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


export default routes;