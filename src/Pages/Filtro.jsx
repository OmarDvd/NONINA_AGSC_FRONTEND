// import "../styles.css";

import InfiniteScroll from 'react-infinite-scroll-component';
import { Footer } from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import Card from 'react-bootstrap/Card';
import { Peticion , get} from "../utils/peticion"; 

import   {MeGustaButton}  from "../Components/EventCard";
import {CompartirEventoButton} from "../Components/EventCard";
import { EventCard } from "../Components/EventCard";




//////////////
import { useLocation } from "react-router-dom";
// import { ProductoCard } from "../paginas/ProductCard";
import { useEffect, useState } from "react";
// import styles from "../paginas/ProductosGrid.module.css";
import {Spinner}from "../Components/Spinner";



export function Filtro({
  toggleState,
  logeado
}) {


  const [mounted, setMounted] = useState(false);

  useEffect(() => {
      setMounted(true);
      return () => {
          setMounted(false);
      };
  }, []);

  function Parametro(objeto) {
    let parametro = objeto.search.split("?search=")[1];
    return parametro;
  }
  

  const location = useLocation();

  const [cargando,setCargando]=useState(true);
  console.log("este es el location"+location);
  const busqueda = Parametro(location);

  console.log("esta es la busqueda"+busqueda);
  const [evento,setEvento]=useState([]);







      useEffect(()=>{ 
        // aqui meteriamos un endpoint al que le pasariamos la busqueda real
        get(`http://localhost:8003/0`)
        .then((data)=>{
          console.log(data);
          data.objects.forEach(item => {
            setEvento(prevItems => [...prevItems, item]);
          });
          setCargando(false);
    
          })},[])
          if(cargando){
            return (
              <div className="container mt-5" style={{ color: '#00857d' }} >
                    <h6>Recuperando datos del servidor...</h6>
                    <Spinner />
        
            </div>
            
            
            );       }
    
      return (
        <div >
        <NavigationBar toggleState={toggleState} logeado={logeado} />
        {mounted && <div className="container-fluid"  style={{backgroundImage:"url('https://assets.website-files.com/5f50c8823485c166e14fc0d7/600981acad87646365032f2a_bg-paint-wall.jpg')"}} >
    
        <div className="container">
          <p className='grana'>Coincidencias encontradas para: </p>
          <span className='granaRegular'>{busqueda}</span>
        <div className="row ">
        <div className=" ">
        {evento.map((item) => (
          <EventCard key={item.event_id} activity={item} toggleState={toggleState} logeado={logeado} />
        ))}
    </div></div>
    
     </div>
     <div class="container  d-flex ">
    
        
    <div className="mt-5 me-5"><h1 className="granaRegular">Vocabulario granaíno</h1></div>
    <div className="typewriter mt-5 ms-5">
      <h1 className="grana">Tapas</h1>
    </div>
        </div>    
    </div>}  
    
    
    
    <Footer/>   
    
    
    </div>
    
    
    
    
    
    
      );
    
    }