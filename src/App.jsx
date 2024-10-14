import { Route, Routes, useLocation } from "react-router-dom"
import Layout from "@layout/Layout"
import Home from "@pages/Home"
import routes from "@routes/routes"
import 'animate.css';

import AdminRouter from "./pages/admin/AdminRouter";


function App() {

  const location=useLocation();
 

  return (
    <>
      <Routes>
          {
            location.pathname.includes('/admin')
             ?
                <Route path="/admin/*" element={<AdminRouter />} />
            :
                <Route path="/" element={<Layout />} >
                    <Route index element={<Home />} />
                    {
                      routes.map( (route,i)=> <Route key={i} {...route} /> )
                    }
                </Route>
          }
      </Routes>
    </>
  )
}

export default App
