import { Footer } from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import { useEffect, useState } from "react";

export function PostPage(
    { toggleState, logeado }
) {
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
    return (
        <>
        {/* <NavigationBar toggleState={toggleState} logeado={logeado} /> */}
        <div  style={{ backgroundImage: "url('https://assets.website-files.com/5f50c8823485c166e14fc0d7/600981acad87646365032f2a_bg-paint-wall.jpg')",minHeight:"100vh" }}>
        <div class="container">
        
            <div class="row">
        <div className="py-2 my-5 col-12 col-lg-7">
        <div class="bg-white shadow rounded overflow-hidden">
                                    <div class="px-4 pt-0 pb-4 cover " style={{minHeight:"15vh"}}>
         
                                    </div> 
                                    
                                    <div class="row"> 
                                    <select>
                                        <option>
                                        Ver mis post
                                        </option>
                                        <option>
                                        Ver otros post
                                        </option>
                                    </select>
                                  
                                    </div> 
                                    
                                </div>
        </div>
        
        <div className="  d-none d-md-block col-lg-3">
<img width="500px" src="https://cdn1.iconfinder.com/data/icons/scenes-1-2/1000/transportation___bicycle_bike_woman_transport_delivery-512.png"/>
        </div>
            </div>
        
        </div>
        <div class="container  d-flex ">

    
{/* <div className="mt-5 me-5"><h1 className="granaRegular">Vocabulario granaíno</h1></div> */}
<div className="typewriter mt-5 ms-5">
  <h1 className="grana">Una Milnoh</h1>
</div>
    </div>   
        </div>
        
        
        {/* <Footer /> */}
        
        </>

    );

}
