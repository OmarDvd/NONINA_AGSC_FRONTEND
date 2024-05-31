import "../styles.css";
import NavigationBar from "../Components/NavigationBar";
import {MiPerfil} from "../Pages/MiPerfil";

import { Footer } from "../Components/Footer";
import React,{ useEffect, useState, Suspense} from "react";
import {Registro} from "../Components/Registro";
import { FormularioLoginHook } from "../Components/FormularioLoginHook";



export default function Login({toggleState,cambiarRegistro,logeado}) {

  
  const [registro, setRegistro] = useState(false);

  const handleRegistroClick = () => {
    /*Aqui deberiamos evaluar que funcion ejecutar con endpoint para
    guardar en base de datos nuestros fvoritos o borrar
    */
    setRegistro(true);
  };



if(logeado){
  return (<MiPerfil toggleState={toggleState} logeado={logeado}/>);
}else{

  if(registro){
    return(<Registro registro={registro} setRegistro={setRegistro} toggleState={toggleState} cambiarRegistro={cambiarRegistro} logeado={logeado}/>);
  }else{

 

  return (
    <>
        {/* <NavigationBar toggleState={toggleState} logeado={logeado} /> */}
      <div  style={{color: "white", backgroundImage:"url('https://assets.website-files.com/5f50c8823485c166e14fc0d7/600981acad87646365032f2a_bg-paint-wall.jpg')", minHeight:"100vh"}}>
  
 <div className='container' >
<div className="row">


<div className="col-12">
<p className="d-block text-center mb-4  " style={{fontSize:"4.2em", color:"rgba(0,71,171,1"}}>LOGIN</p>
      <FormularioLoginHook toggleState={toggleState}  />
      <button className=" btn  mt-4 fs-4 mb-5" style={{background:'rgba(0,71,171,1)',color:'white'}} onClick={() => handleRegistroClick()}>Regístrate</button>
    </div>
    </div>

    <div class="container  d-flex ">

    
{/* <div className="mt-5 me-5"><h1 className="granaRegular">Vocabulario granaíno</h1></div> */}
<div className="typewriter mt-5 ms-5">
  <h1 className="grana">Malafollá</h1>
</div>
    </div>    
    </div>
    </div>
    
    
    {/* <Footer/>     */}


</>
  );
}} }
