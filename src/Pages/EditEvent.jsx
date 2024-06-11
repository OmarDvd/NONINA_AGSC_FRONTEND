import { Footer } from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import { FormularioCreateHookEventEdit } from "../Components/FormularioCreateHookEventEdit";
import { useEffect, useState,useParams } from "react";


export function EditEvent(
    { toggleState, logeado,cambiarRegistro }
) {




    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        const tokenExpiration = localStorage.getItem('tokenExpiration');
    
        if (authToken && tokenExpiration) {
            const now = Date.now();
            if (now > tokenExpiration) {
                localStorage.clear();
                alert("Se ha terminado la sesión");
                toggleState(false); 

            } else {
                toggleState(true);
            }
        }
    }, []);
if(localStorage.getItem('authToken')!==""){
    toggleState(true);
}else{
    toggleState(false);

}

    return (
        <>
        <div  style={{ backgroundImage: "url('https://assets.website-files.com/5f50c8823485c166e14fc0d7/600981acad87646365032f2a_bg-paint-wall.jpg')" }}>
        <div class="container">
        
            <div class="row">
        <div className="py-2 my-5 col-12 col-lg-7 ">
        <div class="bg-white shadow rounded overflow-hidden ">
                                    <div class="px-4 pt-0 pb-4 cover " style={{minHeight:"15vh"}}>
         
                                    </div> 
                                    
                                    <div class="px-4 py-3" > 
                                        <h5 class="mb-3">Editar evento</h5> 






<FormularioCreateHookEventEdit toggleState={toggleState} />


                                    </div> 
                                    
                                </div>
        </div>
        
        <div className="my-5 py-5 d-none d-md-block col-lg-3">
<img width="500px" src="https://cdn1.iconfinder.com/data/icons/scenes-9/1000/Startup_Success_technology_growth___innovation_idea_thought_woman_statistics-1024.png"/>
        </div>
            </div>
        
        </div>
        <div class="container  d-flex ">

    
<div className="typewriter mt-5 ms-5">
  <h1 className="grana">Me encarta</h1>
</div>
    </div>   
        </div>
        
        
        
        </>

    );

}