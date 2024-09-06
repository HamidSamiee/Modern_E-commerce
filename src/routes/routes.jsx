import Blogs from "@/pages/Blogs";
import Shop from "@/components/Shop";
import About from "@/pages/About";
import Contact from "@/pages/Contact";


const routes=[
    {path:"about" ,element:<About />},
    {path:"contact" ,element:<Contact />},
    {path:"shop" ,element:<Shop />},
    {path:"blogs" ,element:<Blogs />},
]


export default routes;