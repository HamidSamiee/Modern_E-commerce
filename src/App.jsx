import {  Route, Routes } from "react-router-dom"
import Layout from "@layout/Layout"
import routes from "@routes/routes"
import 'animate.css';

import AdminRouter from "./pages/admin/AdminRouter";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Home from "./pages/Home";


function App() {



  return (
    <>
      <Routes>
        {/* Public Routes */}
            <Route  path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    {routes.map((route, index) => (
                      <Route key={index} {...route} />
                    ))}
            </Route>

        {/* Protected Admin Routes */}
            <Route path="/admin/*"
                element={
                  <ProtectedRoute roles={['Admin']}>
                     <AdminRouter />
                  </ProtectedRoute>
                }
            /> 

        {/* Protected User Route */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute roles={['user', 'Admin']}>
                  <Profile />
                </ProtectedRoute>
              }
            />
      </Routes>
      <ScrollToTop />
    </>
  )
}

export default App
