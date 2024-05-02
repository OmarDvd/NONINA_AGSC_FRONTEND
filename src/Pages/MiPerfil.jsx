import { Footer } from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
export function MiPerfil(
    { toggleState, logeado }
) {

    return (
        <>
        <NavigationBar toggleState={toggleState} logeado={logeado} />
        <div  style={{ backgroundImage: "url('https://assets.website-files.com/5f50c8823485c166e14fc0d7/600981acad87646365032f2a_bg-paint-wall.jpg')" }}>
        <div class="container">
        
            <div class="row">
        <div className="py-2 my-5 col-12 col-lg-7">
        <div class="bg-white shadow rounded overflow-hidden">
                                    <div class="px-4 pt-0 pb-4 cover " style={{minHeight:"15vh"}}>
         
                                    </div> 
                                    
                                    <div class="px-4 py-3"> 
                                        <h5 class="mb-5">Mis eventos</h5> 

                                    </div> 
                                    
                                </div>
        </div>
        
        <div className="  d-none d-md-block col-lg-3">
<img width="500px" src="https://cdn1.iconfinder.com/data/icons/scenes-9/1000/Music_leisure___guitar_instrument_hobby_activity_woman_happy_relax_tunes_play-1024.png"/>
        </div>
            </div>
        
        </div>
        <div class="container  d-flex ">

    
<div className="mt-5 me-5"><h1 className="granaRegular">Vocabulario granaíno</h1></div>
<div className="typewriter mt-5 ms-5">
  <h1 className="grana">Mandaillo</h1>
</div>
    </div>   
        </div>
        
        
        <Footer />
        
        </>

    );

}
