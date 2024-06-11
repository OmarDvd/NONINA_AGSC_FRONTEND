import React from 'react';
import { Navigate } from 'react-router-dom';

export default  function ProtectedRoute({ condition, redirectTo, children,admin }) {

 
  if (!condition) {
    if (admin==="true") {
      window.location.href = "https://localhost:44363/";
      return null; // Retorna null para no renderizar nada mientras se redirige
    }
    return <Navigate to={redirectTo} />;
  }
  return children;
};

