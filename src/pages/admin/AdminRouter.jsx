import { Route, Routes } from "react-router-dom"
import { dashboardRoutes } from "@routes/routes"
import 'animate.css';
import DashboardLayout from "@/layout/DashboardLayout";
// import Dashboard from "./Dashboard";



function AdminRouter() {
  return (
    <>
      <Routes>
                <Route path="/" element={<DashboardLayout />} >
                    {
                      dashboardRoutes.map( (route,i)=> <Route key={i} {...route} /> )
                    }
                </Route> 
      </Routes>
    </>
  )
}

export default AdminRouter
