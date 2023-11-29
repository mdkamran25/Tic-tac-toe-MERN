import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PublicRoute = ({ route, children }) => {
  const navigate = useNavigate();
  const publicRoutes = ['login', 'signup'];
  // Check if the route is a public route
  
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const isPublicRoute = publicRoutes.includes(route);
    if (token && isPublicRoute) {
      navigate("/");
    }
  }, []);

  return <>{children}</>;

};

export default PublicRoute;
