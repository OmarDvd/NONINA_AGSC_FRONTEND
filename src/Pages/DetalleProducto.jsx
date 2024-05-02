import { useParams } from "react-router-dom";
import { Peticion , get} from "../utils/peticion"; 
import { useEffect, useState } from "react";
import { Spinner } from "../Components/Spinner";
import { EventCard } from "../Components/EventCard";
import NavigationBar from "../Components/NavigationBar";
import { Footer } from "../Components/Footer";

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import "../styles.css";








import   {MeGustaButton}  from "../Components/EventCard";
import {CompartirEventoButton} from "../Components/EventCard";









export function DetalleProducto({
  toggleState,
  logeado
}) {
  let { eventID } = useParams();
  const [cargando,setCargando]=useState(true);
  const [evento,setEvento]=useState([]);
  // const [sesion,setSesion]=useState();
  // const [cantidad, setCantidad] = useState(1); 

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
      setMounted(true);
      return () => {
          setMounted(false);
      };
  }, []);






//   const empezarReserva = async (id) => {
//     try {
//         console.log("Hemos pulsado " + id);
//         const url =`http://127.0.0.1:8000/restarplazassesion_api/${id}/${cantidad}`;
//         const response = await fetch(url, { method: 'GET' });
//         if (!response.ok) {
//             throw new Error('Error al actualizar plazas');
//         }else{
//             // alert("Has actualizado las plazas con exito");
//             crearReserva(id);
//         }


//     } catch (error) {
//         console.error(error);
//     }
// };





// const crearReserva = async (id) => {
//     try {
//         console.log("Hemos pulsado " + id);
//         let username=sessionStorage.getItem("username");
//         // Realizar la solicitud GET (o DELETE si lo prefieres)
//         const url =`http://127.0.0.1:8000/crearreserva_api/${id}/${cantidad}/${username}`;
//         const response = await fetch(url, { method: 'GET' });
//         if (!response.ok) {
//             throw new Error('Error al eliminar la reserva.');
//         }else{
//             alert("Reserva realizada con éxito");
//             setCargando(true);
//             get(`http://127.0.0.1:8000/sesion/detalle/api/${movieID}`)
//         .then((data) => {
//           console.log(data);
//           setSesion(data)
//           setCargando(false);
//           setCantidad(1);
//         })
//         .catch((error) => console.error("Error al recargar los datos:", error));
//         }


//     } catch (error) {
//         console.error(error);
//     }
// };


























//   console.log("el useParam es:"+ movieID);
  useEffect(()=>{ 
    // aqui meteriamos un endpoint al que le pasariamos el eventID real
    get(`http://localhost:8003/0`)
    .then((data)=>{
      console.log(data);
      data.objects.forEach(item => {
        setEvento(prevItems => [...prevItems, item]);
      });
      setCargando(false);

      })},[eventID])

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
    <div className="row ">
    <div className=" ">

    {/* <EventCard key={evento[0].event_id} activity={evento[0]}  toggleState={toggleState} logeado={logeado} />   */}




<div className="container mt-5"  style={{minHeight:'50vh'}}  >
  <Card key={evento[0].event_id} className="m-3" style={{
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,71,171,1), 0 4px 8px rgba(0,71,171,1), inset 0 0 10px rgba(0, 71, 113, 0.3)',
    zIndex:1
  }}>
      <div className="row">
        <div className="col-sm-11 col-md-6 col-lg-4   ">
          {/* <Card.Img src={primerElemento} style={{ width: '100%', height: 'auto' }} /> */}
              <Card.Img className="mt-lg-3"
                src=
                "https://img.freepik.com/vector-premium/azulejo-decorativo-azul-blanco-patron_52756-246.jpg?w=900" // Obteniendo el primer elemento de la cadena dividida
                style={{ width: '100%', height: 'auto' }}
              />

        </div>
        <div className="col-sm-6 col-md-6 col-lg-8" >
          <Card.Body>
            <Card.Title className=""  style={{paddingBottom:"15px"}}><h1><b style={{color:"#00857d", fontFamily:"Granaina", fontSize:"1em"}}>{evento[0].title}</b></h1></Card.Title>
            {/* <Card.Subtitle className="mb-2 text-muted">Sesión ID: {sesion[0].sesion_id}</Card.Subtitle> */}
            <Card.Text style={{color:'rgba(0,71,171,1)',fontSize:"1.4em"}}><b  style={{color:'rgba(0,71,171,1)'}}></b> {evento[0].description}</Card.Text>
            <Card.Text style={{color:'rgba(0,71,171,1)',fontSize:"1.4em"}}><b  style={{color:'rgba(0,71,171,1)'}}></b> {evento[0].datetime}</Card.Text>
            <Card.Text style={{color:'rgba(0,71,171,1)',fontSize:"1.4em"}}><b  style={{color:'rgba(0,71,171,1)'}}></b> {evento[0].location}</Card.Text>
            <Card.Text style={{color:'rgba(0,71,171,1)',fontSize:"1.4em"}}> <b  style={{color:'rgba(0,71,171,1)'}}></b> {evento[0].city}</Card.Text>
            <Card.Text style={{color:'rgba(0,71,171,1)',fontSize:"1.4em"}}> <b  style={{color:'rgba(0,71,171,1)'}}></b> Concierto</Card.Text>
            {logeado && <MeGustaButton/>}
        <CompartirEventoButton evento={evento[0]} />
  </Card.Body>
        </div>
      </div>
    </Card>
    </div>
  





 </div> </div>

 </div>
 <div class="container  d-flex ">

    
<div className="mt-5 me-5"><h1 className="granaRegular">Vocabulario granaíno</h1></div>
<div className="typewriter mt-5 ms-5">
  <h1 className="grana">Bulanico</h1>
</div>
    </div>    
</div>}  



<Footer/>   


</div>






  );

}
