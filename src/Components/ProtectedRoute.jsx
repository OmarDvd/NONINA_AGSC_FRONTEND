import React from 'react';
import { Navigate } from 'react-router-dom';

export default  function ProtectedRoute({ condition, redirectTo, children,admin }) {


  // Función para leer una cookie por nombre
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null; // Retorna null si no se encuentra la cookie
}

const authToken = getCookie('authToken');


 
  if (!condition) {
    if (admin==="true") {
      localStorage.clear();
      window.location.href = "https://noninabackendmvc.work.gd";
      return null; // Retorna null para no renderizar nada mientras se redirige
    }
    return <Navigate to={redirectTo} />;
  }
  return children;
};

