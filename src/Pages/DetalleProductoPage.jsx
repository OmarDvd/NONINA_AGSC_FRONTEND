import { DetalleProducto } from "../Components/DetalleProducto";

import React,{ useEffect, useState, Suspense} from "react";

import "../styles.css";


export default function DetalleProductoPage({
    toggleState,logeado
}){
    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        const tokenExpiration = localStorage.getItem('tokenExpiration');
    
        if (authToken && tokenExpiration) {
            const now = Date.now();
            if (now > tokenExpiration) {
                // El token ha expirado, limpiar localStorage
                localStorage.clear();
                alert("Se ha terminado la sesión");

                toggleState(false); // Opcional: Cambiar el estado de autenticación a false
            } else {
                // El token aún es válido, actualizar estado de autenticación si es necesario
                toggleState(true); // Opcional: Cambiar el estado de autenticación a true si el usuario ya ha iniciado sesión
            }
        }
    }, []);

    return(
        // <div className="container-fluid" style={{backgroundImage:"url('fondototal.jpg')", backgroundSize: ' auto 20%', backgroundRepeat: 'repeat'}} >
        <>
        {/* <NavigationBar toggleState={toggleState} logeado={logeado} /> */}
        <div className="container-fluid"  style={{backgroundImage:"url('https://assets.website-files.com/5f50c8823485c166e14fc0d7/600981acad87646365032f2a_bg-paint-wall.jpg')",minHeight:"100vh"}} >

        <div className="container">
         <DetalleProducto toggleState={toggleState} logeado={logeado} />   </div>

  </div>
  {/* <Footer/> */}
</>

);
}