import "../styles.css";
import NavigationBar from "./NavigationBar";
import { Footer } from "./Footer";
import React,{ useEffect, useState, Suspense} from "react";

import { FormularioCreateHook } from "./FormularioCreateHook";

import { FormularioLoginHook } from "./FormularioLoginHook";
export  function Registro({registro,setRegistro,toggleState,cambiarRegistro,logeado}) {
  const handleLoginClick = () => {
    /*Aqui deberiamos evaluar que funcion ejecutar con endpoint para
    guardar en base de datos nuestros fvoritos o borrar
    */
    setRegistro(false);
  };
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
      setMounted(true);
      return () => {
          setMounted(false);
      };
  }, []);
  return (
    <>
        <NavigationBar toggleState={toggleState} logeado={logeado} />
        {mounted && <div  style={{color: "white", backgroundImage:"url('https://assets.website-files.com/5f50c8823485c166e14fc0d7/600981acad87646365032f2a_bg-paint-wall.jpg')"}}>
  
 <div className='container'>
<div className="row">


<div className="col-12">
      <p className="d-block text-center mb-4  " style={{fontSize:"4.2em", color:"rgba(0,71,171,1"}}>REGISTRO</p>
      <FormularioCreateHook/>
      <button className=" btn  mt-4 fs-4 mb-5 " style={{background:'rgba(0,71,171,1)',color:'white'}} onClick={() => handleLoginClick()}>Ir a login</button>
    </div>
    </div>

    <div class="container  d-flex ">

    
<div className="mt-5 me-5"><h1 className="granaRegular">Vocabulario granaíno</h1></div>
<div className="typewriter mt-5 ms-5 ">
  <h1 className="grana ">La vin compae</h1>
</div>
    </div>    
    </div>
    </div>}
    
    
    <Footer/>    <Footer/>
    <Footer/>
    <Footer/>
    <Footer/>
    <Footer/>
    <Footer/>


</>
  );
}
