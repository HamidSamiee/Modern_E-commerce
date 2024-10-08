import { Route, Routes, useLocation } from "react-router-dom"
import Layout from "@layout/Layout"
import Home from "@pages/Home"
import routes, { dashboardRoutes } from "@routes/routes"
import 'animate.css';
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/admin/Dashboard";


function App() {

  const location=useLocation();
 

  return (
    <>
      <Routes>
          {
            location.pathname ==="/admin"
             ?
                <Route path="/admin" element={<DashboardLayout />} >
                    <Route index element={<Dashboard />} />
                    {
                      dashboardRoutes.map( (route,i)=> <Route key={i} {...route} /> )
                    }
                </Route> 
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
