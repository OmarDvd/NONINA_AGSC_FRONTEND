import { useParams } from "react-router-dom";
import { Peticion , get} from "../utils/peticion"; 
import { useEffect, useState } from "react";
import { Spinner } from "./Spinner";
import { EventCard } from "./EventCard";
import NavigationBar from "./NavigationBar";
import { Footer } from "./Footer";
import {MapCoordinates} from "./MapCoordinates"

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import "../styles.css";
import { FaHeart } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';

import {CompartirEventoButton} from "./EventCard";


export  const MeGustaButton = ({evento,meGusta,setMeGusta,toggleState}) => {
  

  const [isPending, setIsPending] = useState(false);


  async function addAgenda( evento) {
    const token = localStorage.getItem('authToken'); // Obtén el token del local storage

    // Verifica si el token existe antes de continuar
    if (!token) {
        console.error('Token no encontrado. No se puede verificar la agenda.');
        
        return;
    }

        const tokenExpiration = localStorage.getItem('tokenExpiration');
    
        if (token && tokenExpiration) {
            const now = Date.now();
            if (now > tokenExpiration) {
              alert("Se ha caducado la sesión, no se han guardado los cambios");
              toggleState(false);
          
  }else{

    


    const url = 'https://localhost:7070/api/Agendas/AddAgendaToken';


    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Agrega el token a los encabezados
            },
            mode: 'cors',
            body: JSON.stringify(evento)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Agenda verificada exitosamente:', data);

            return data;
        } else {
            console.error('Error al verificar la agenda:', response.statusText);
        }
    } catch (error) {
        console.error('Error al verificar la agenda:', error);
    }

  }}



}


async function deleteAgenda( evento) {
  const token = localStorage.getItem('authToken'); // Obtén el token del local storage

  // Verifica si el token existe antes de continuar
  if (!token) {
      console.error('Token no encontrado. No se puede verificar la agenda.');
      return;
  }
  const tokenExpiration = localStorage.getItem('tokenExpiration');
    
  if (token && tokenExpiration) {
      const now = Date.now();
      if (now > tokenExpiration) {
        alert("Se ha caducado la sesión, no se han guardado los cambios");

        toggleState(false);
    
}else{



  const url = 'https://localhost:7070/api/Agendas/DeleteAgendaToken';

  try {
      const response = await fetch(url, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` 
          },
          mode: 'cors',
          body: JSON.stringify(evento)
      });

      if (response.ok) {
          const data = await response.json();
          console.log('Agenda verificada exitosamente:', data);

          return data;
      } else {
          console.error('Error al verificar la agenda:', response.statusText);
      }
  } catch (error) {
      console.error('Error al verificar la agenda:', error);
  }
}
}

}

const handleMeGustaClick = async  () => {
  const token = localStorage.getItem('authToken'); // Obtén el token del local storage

  // Verifica si el token existe antes de continuar
  if (!token) {
      console.error('Token no encontrado. No se puede verificar la agenda.');
      return;
  }
  const tokenExpiration = localStorage.getItem('tokenExpiration');
    
  if (token && tokenExpiration) {
      const now = Date.now();
      if (now > tokenExpiration) {
        alert("Se ha caducado la sesión, no se han guardado los cambios");
        localStorage.clear();
        toggleState(false);
    return;
}else{

  if (isPending) return;

  setIsPending(true);

  if (meGusta) {
    // Llamada al backend para eliminar el registro
    await deleteAgenda(evento);
} else {
    // Llamada al backend para crear el registro
    await addAgenda(evento);
}

// Actualizar el estado
setMeGusta(!meGusta);
setIsPending(false);
}}};



return (
  <button onClick={handleMeGustaClick} style={{ backgroundColor: 'transparent', border: 'none',cursor:'' }} disabled={isPending}>
    <FaHeart color={meGusta ? 'rgba(0,71,171,1)' : '#00857d'} style={{ transition: 'color 0.3s' }} size={24} />
  </button>
);
};




export function DetalleProducto({
  toggleState,
  logeado
}) {
  let { eventID } = useParams();
  const [cargando,setCargando]=useState(true);
  const [evento,setEvento]=useState();
  const [meGusta, setMeGusta] = useState();





/* ADD AGENDA */


/* DELETE AGENDA */




/* GET AGENDA  */



  async function isSaved( eventID) {
    const token = localStorage.getItem('authToken'); // Obtén el token del local storage

    // Verifica si el token existe antes de continuar
    if (!token) {
        console.error('Token no encontrado. No se puede verificar la agenda.');
        return;
    }


    const url = `https://localhost:7070/api/Agendas/${eventID}`;


    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Agrega el token a los encabezados
            },
            mode: 'cors'
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Agenda verificada exitosamente:', data);
            if (data) {
                setMeGusta(data);
            } else {
                setMeGusta(false);
            }
            return data;
        } else {
            console.error('Error al verificar la agendaaaa:', response.statusText);
        }
    } catch (error) {
        console.error('Error al verificar la agenda:', error);
    }
}


isSaved(eventID);





















/* CALL THE EVENTO */


useEffect(()=>{ 
    // aqui meteriamos un endpoint al que le pasariamos el eventID real
    get(`https://localhost:7070/api/Evento/${eventID}`)
    .then((data)=>{

        setEvento( data);

      setCargando(false);
      })},[])





      if(cargando){
        return (
<div style={{ color: '#00857d' }} className="d-flex flex-column"><p style={{ color: '#00857d' }}>Recuperando datos del servidor... </p><Spinner /></div>
        
        
        );      
       }





  return (
    <div >
    {/* <NavigationBar toggleState={toggleState} logeado={logeado} /> */}
     <div className="container-fluid"  style={{backgroundImage:"url('https://assets.website-files.com/5f50c8823485c166e14fc0d7/600981acad87646365032f2a_bg-paint-wall.jpg')", minHeight:"100vh"}} >

    <div className="container">
    <div className="row ">
    <div className=" ">

    {/* <EventCard key={evento[0].event_id} activity={evento[0]}  toggleState={toggleState} logeado={logeado} />   */}




<div className="container mt-5"  style={{minHeight:'50vh'}}  >
  <Card key={evento.id} className="m-3" style={{
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: '10px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,71,171,1), 0 4px 8px rgba(0,71,171,1), inset 0 0 10px rgba(0, 71, 113, 0.3)',
    zIndex:1
  }}>
      <div className="row">
        <div className="col-sm-12 col-xl-4   ">
          {/* <Card.Img src={primerElemento} style={{ width: '100%', height: 'auto' }} /> */}
              <Card.Img className="mt-lg-5 pt-lg-4"
                src={evento.imageEvento}
                style={{ width: '100%', minHeight: '300px', maxHeight:"300px",objectFit:"cover"}}
              />

        </div>
        <div className="col-sm-12 col-xl-4" >
          <Card.Body>
            <Card.Title className=""  style={{paddingBottom:"15px"}}><h1><b style={{color:"#00857d", fontFamily:"Granaina", fontSize:"1em"}}>{evento.title}</b></h1></Card.Title>
            {/* <Card.Subtitle className="mb-2 text-muted">Sesión ID: {sesion[0].sesion_id}</Card.Subtitle> */}
            <Card.Text style={{color:'rgba(0,71,171,1)',fontSize:"1.4em"}}><b  style={{color:'rgba(0,71,171,1)'}}></b> {evento.description}</Card.Text>
            <Card.Text style={{color:'rgba(0,71,171,1)',fontSize:"1.4em"}}><b  style={{color:'rgba(0,71,171,1)'}}></b>{evento.date.slice(8, 10)}-{evento.date.slice(5, 7) }-{evento.date.slice(0, 4) }</Card.Text>
            <Card.Text style={{color:'rgba(0,71,171,1)',fontSize:"1.4em"}}><b  style={{color:'rgba(0,71,171,1)'}}></b>{evento.time.slice(0,2)}:{evento.time.slice(3,5)} </Card.Text>
            <Card.Text style={{color:'rgba(0,71,171,1)',fontSize:"1.4em"}}> <b  style={{color:'rgba(0,71,171,1)'}}></b> {evento.categoryName}</Card.Text>
            <Card.Text style={{color:'rgba(0,71,171,1)',fontSize:"1.4em"}}> <b  style={{color:'rgba(0,71,171,1)'}}></b> {evento.municipalityName}</Card.Text>
            <Card.Text style={{color:'rgba(0,71,171,1)',fontSize:"1.4em"}}> <b  style={{color:'rgba(0,71,171,1)'}}></b> {evento.username}</Card.Text>
            <Card.Text style={{color:'rgba(0,71,171,1)',fontSize:"1.4em"}}> <b  style={{color:'rgba(0,71,171,1)'}}></b> {evento.placeLabel}</Card.Text>

            

        <div className="d-flex justify-content-around ">        {logeado && <MeGustaButton  evento={eventID} meGusta={meGusta} setMeGusta={setMeGusta} toggleState={toggleState}/>}
        <CompartirEventoButton evento={evento} />
        {/* {logeado && <QuieroConocerGente/>}*/}</div> 

        
  </Card.Body>
        </div>
        <div className="col-sm-12 col-xl-4" >

        {/* <MapCoordinates  latitud={37.70316035454358} longitud={-2.936689659621214} /> */}
        {/* <Mapa/> */}
        {evento && evento.placeCoordinates && (
    <MapCoordinates
      latitud={parseFloat(evento.placeCoordinates.split('latlon')[0])}
      longitud={parseFloat(evento.placeCoordinates.split('latlon')[1])}
    />
  )}
        </div>

      </div>
    </Card>
    </div>
  





 </div> </div>

 </div>
 <div class="container  d-flex ">

    
{/* <div className="mt-5 me-5"><h1 className="granaRegular">Vocabulario granaíno</h1></div> */}
<div className="typewriter mt-5 ms-5">
  <h1 className="grana">Bulanico</h1>
</div>
    </div>    
</div>



{/* <Footer/>    */}


</div>






  );

}
