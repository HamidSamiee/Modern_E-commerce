import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import Layout from "@layout/Layout"
import Home from "@pages/Home"
import routes from "@routes/routes"
import 'animate.css';

import AdminRouter from "./pages/admin/AdminRouter";
import { useSelector } from "react-redux";


function App() {

  const location=useLocation();
  const {user}=useSelector(state=>state.auth)

  return (
    <>
      <Routes>
      {location.pathname.includes("/admin") ? (
          // Check if user role is 'admin'
          user?.role === "Admin" ? (
            <Route path="/admin/*" element={<AdminRouter />} />
          ) : (
            // Redirect non-admin users to home or an unauthorized page
            <Route path="*" element={<Navigate to="/unauthorized" />} />
          )
        ) : (
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            {routes.map((route, i) => (
              <Route key={i} {...route} />
            ))}
          </Route>
        )}
      </Routes>
    </>
  )
}

export default App
