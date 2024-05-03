import { useParams } from "react-router-dom";
import { Peticion , get} from "../utils/peticion"; 
import { useEffect, useState } from "react";
import { Spinner } from "../Components/Spinner";
import { EventCard } from "../Components/EventCard";
import NavigationBar from "../Components/NavigationBar";
import { Footer } from "../Components/Footer";
import {MapCoordinates} from "../Components/MapCoordinates"

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import "../styles.css";








import   {MeGustaButton}  from "../Components/EventCard";
import {CompartirEventoButton} from "../Components/EventCard";
import {QuieroConocerGente} from "../Components/EventCard";


// import L from 'leaflet';
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
// import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

// export function Mapa() {
//   const [coordenadas, setCoordenadas] = useState(null);
//   const customIconUrl = '/marcador-de-posicion.png';


//   const customIcon = L.icon({
//     iconUrl: customIconUrl,
//     iconSize: [32, 32], // Tamaño del icono
//     iconAnchor: [16, 32], // Punto de anclaje del icono
//     popupAnchor: [0, -32] // Punto de anclaje del popup
//   });

//   function handleMapClick(event) {
//     setCoordenadas(event.latlng);
//     console.log(coordenadas);
//   }

//   return (
//     <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "400px" }}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <MarcadorSeleccion onClick={handleMapClick} />
//       {coordenadas && <Marker position={coordenadas} icon={customIcon} ><Popup>Coordenadas: {coordenadas.toString()}</Popup></Marker>}
//       <LeafletControlGeocoder />
//     </MapContainer>
//   );
// }

// function MarcadorSeleccion({ onClick }) {
//   useMapEvents({
//     click: (event) => {
//       onClick(event);
      
//     },
//   });
//   return null;
// }

// function LeafletControlGeocoder() {
//   const map = useMapEvents({
//     geocoder: false
//   });
  
//   // Asegúrate de que el control de búsqueda se añada solo una vez al mapa
//   const addGeocoderToMap = () => {
//     if (!map.geocoderAdded) {
//       map.geocoderAdded = true;
//       const geocoder = L.Control.geocoder({
//         defaultMarkGeocode: false
//       }).on('markgeocode', function (e) {
//         map.setView(e.geocode.center, map.getZoom());
//       }).addTo(map);
//     }
//   };
  
//   map.whenReady(addGeocoderToMap);
  
//   return null;
// }







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
        <div className="col-sm-12 col-md-4 col-lg-4   ">
          {/* <Card.Img src={primerElemento} style={{ width: '100%', height: 'auto' }} /> */}
              <Card.Img className="mt-lg-3"
                src=
                "https://img.freepik.com/vector-premium/azulejo-decorativo-azul-blanco-patron_52756-246.jpg?w=900" // Obteniendo el primer elemento de la cadena dividida
                style={{ width: '100%', height: 'auto' }}
              />

        </div>
        <div className="col-sm-12 col-md-4 col-lg-4" >
          <Card.Body>
            <Card.Title className=""  style={{paddingBottom:"15px"}}><h1><b style={{color:"#00857d", fontFamily:"Granaina", fontSize:"1em"}}>{evento[0].title}</b></h1></Card.Title>
            {/* <Card.Subtitle className="mb-2 text-muted">Sesión ID: {sesion[0].sesion_id}</Card.Subtitle> */}
            <Card.Text style={{color:'rgba(0,71,171,1)',fontSize:"1.4em"}}><b  style={{color:'rgba(0,71,171,1)'}}></b> {evento[0].description}</Card.Text>
            <Card.Text style={{color:'rgba(0,71,171,1)',fontSize:"1.4em"}}><b  style={{color:'rgba(0,71,171,1)'}}></b> {evento[0].datetime}</Card.Text>
            <Card.Text style={{color:'rgba(0,71,171,1)',fontSize:"1.4em"}}><b  style={{color:'rgba(0,71,171,1)'}}></b> {evento[0].location}</Card.Text>
            <Card.Text style={{color:'rgba(0,71,171,1)',fontSize:"1.4em"}}> <b  style={{color:'rgba(0,71,171,1)'}}></b> {evento[0].city}</Card.Text>
            <Card.Text style={{color:'rgba(0,71,171,1)',fontSize:"1.4em"}}> <b  style={{color:'rgba(0,71,171,1)'}}></b> Concierto</Card.Text>
            

        <div className="d-flex justify-content-around ">        {logeado && <MeGustaButton/>}
        <CompartirEventoButton evento={evento[0]} />
        {logeado && <QuieroConocerGente/>}</div>

        
  </Card.Body>
        </div>
        <div className="col-sm-12 col-md-4 col-lg-4" >

        <MapCoordinates  latitud={37.70316035454358} longitud={-2.936689659621214} />
        {/* <Mapa/> */}
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
