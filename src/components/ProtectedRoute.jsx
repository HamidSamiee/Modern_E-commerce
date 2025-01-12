import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ roles,children }) => {
  const { user } = useSelector((state) => state.auth);
// console.log(user.role)
  if (!user) {
    return <Navigate to="/login" replace/>;
  }


  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
