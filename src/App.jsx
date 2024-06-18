import "./styles.css";
import React,{ useEffect, useState, Suspense} from "react";
import ProtectedRoute from './Components/ProtectedRoute';

import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";



import Events from "./Pages/Events";
import {PostPage} from "./Pages/PostPage";
import {EditEvent} from "./Pages/EditEvent";

import {Footer} from "./Components/Footer";

import Login from "./Pages/Login";
import {CreateEvent} from "./Pages/CreateEvent";


import DetalleProductoPage from "./Pages/DetalleProductoPage";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
var admin;
var owner;
if(localStorage.getItem('admin') === "true"){
  admin="true";
}else if(localStorage.getItem('admin') === "false"){
  admin="false";

}else{
  admin="";

}



if(localStorage.getItem('owner') === "true"){
  owner="true";
}else if(localStorage.getItem('owner') === "false"){
  owner="false";

}else{
  owner="";

}


  const Rincones = React.lazy(() => import('./Pages/Rincones'));

  const [logeado, setLogeado] = useState(false);
  const [registro, setRegistro] = useState(false); 
  const [rincones, setRincones] = useState(true); 


  function toggleState(valor)  {
    setLogeado(valor);
    }
    useEffect(() => {
      const authToken = localStorage.getItem('authToken');
      const tokenExpiration = localStorage.getItem('tokenExpiration');
  
      if (authToken && tokenExpiration) {
          const now = Date.now();
          if (now > tokenExpiration) {
              // El token ha expirado, limpiar localStorage
              localStorage.clear();
              toggleState(false); // Opcional: Cambiar el estado de autenticación a false
          } else {
              // El token aún es válido, actualizar estado de autenticación si es necesario
              toggleState(true); // Opcional: Cambiar el estado de autenticación a true si el usuario ya ha iniciado sesión
          }
      }
  }, []);
  


    function cambiarRegistro (valor)  {
      setRegistro(valor);
      }
  
      function cambiarRincones(valor)  {
        setRincones(valor);
        }
        return (
          <>
          <Router>
          <NavigationBar toggleState={toggleState} logeado={logeado} />
          <ScrollToTop /> 
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
              <Route path="/" element={
          <ProtectedRoute condition={owner!=="true" && admin!=="true"} redirectTo="/login" admin={admin}>
            <Events toggleState={toggleState} logeado={logeado} />
          </ProtectedRoute>
        } />                
              <Route path="/events" element={
          <ProtectedRoute condition={owner!=="true" && admin!=="true"} redirectTo="/login" admin={admin}>
            <Events toggleState={toggleState} logeado={logeado} />
          </ProtectedRoute>
        } />
                <Route path="/rincones" element={<Rincones rincones={rincones} setRincones={setRincones} toggleState={toggleState} />} />
                <Route path="/login" element={
          <ProtectedRoute condition={true===true} redirectTo="/login" admin={admin}>
                <Login logeado={logeado} toggleState={toggleState} cambiarRegistro={cambiarRegistro} />
          </ProtectedRoute>
        } />
<Route path="/createevent" element={
          <ProtectedRoute condition={owner==="true" && admin!=="true"} redirectTo="/login" admin={admin}>
<CreateEvent logeado={logeado} toggleState={toggleState} cambiarRegistro={cambiarRegistro} />          
</ProtectedRoute>
        } />
        <Route path="/detalle/:eventID" element={
<DetalleProductoPage logeado={logeado} toggleState={toggleState}/>}/>

<Route path="/editevent/:eventID" element={
  <ProtectedRoute condition={owner==="true" && admin!=="true"} redirectTo="/login" admin={admin}>
<EditEvent logeado={logeado} toggleState={toggleState}/>
</ProtectedRoute>
        } />
 </Routes>
            </Suspense>
            <Footer />

          </Router>

          </>
        );


      }