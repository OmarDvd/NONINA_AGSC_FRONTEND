import { DetalleProducto } from "../Components/DetalleProducto";

import React,{ useEffect, useState, Suspense} from "react";

import "../styles.css";


export default function DetalleProductoPage({
    toggleState,logeado
}){


    return(
        <>
        <div className="container-fluid"  style={{backgroundImage:"url('https://assets.website-files.com/5f50c8823485c166e14fc0d7/600981acad87646365032f2a_bg-paint-wall.jpg')",minHeight:"100vh"}} >

        <div className="container">
         <DetalleProducto toggleState={toggleState} logeado={logeado} />   </div>

  </div>
</>

);
}