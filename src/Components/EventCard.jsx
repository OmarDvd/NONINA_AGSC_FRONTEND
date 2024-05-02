import React from "react";
import { Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import "../styles.css";
import { FaHeart } from 'react-icons/fa';
import { useEffect, useState, Suspense} from "react";
import { FaShare } from 'react-icons/fa';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import { FaUsers } from 'react-icons/fa';
import { FaHandshake } from 'react-icons/fa';
import { FaShareAlt } from 'react-icons/fa';



export  const MeGustaButton = () => {
  const [meGusta, setMeGusta] = useState(false);

  const handleMeGustaClick = () => {
    /*Aqui deberiamos evaluar que funcion ejecutar con endpoint para
    guardar en base de datos nuestros fvoritos o borrar
    */
    setMeGusta(!meGusta);
  };



  return (
    <button onClick={handleMeGustaClick} style={{ backgroundColor: 'transparent', border: 'none',cursor:'' }}>
      <FaHeart color={meGusta ? 'crimson' : 'rgba(0,71,171,1)'} style={{ transition: 'color 0.3s' }} size={24} />
    </button>
  );
};


export  const QuieroConocerGente = () => {
  const [conocer, setConocer] = useState(false);

  const handleConocerClick = () => {
    /*Aqui deberiamos evaluar que funcion ejecutar con endpoint para
    guardar en base de datos nuestros fvoritos o borrar
    */
    setConocer(!conocer);
  };

  

  return (
    <button onClick={handleConocerClick} style={{ backgroundColor: 'transparent', border: 'none',cursor:'' }}>
      <FaUsers    color={conocer ? 'crimson' : 'rgba(0,71,171,1)'} style={{ transition: 'color 0.3s' }} size={24} />
    </button>
  );
};


export const CompartirEventoButton = ({ evento }) => {
  const handleCompartirClick = () => {
    const url = window.location.href; // Obtener la URL actual de la página
    const texto = `¡No te pierdas este evento! ${evento.title} el ${evento.datetime} en ${evento.description}. Más detalles: ${url}`;
    if (navigator.share) {
      navigator.share({
        title: 'Compartir evento',
        text: texto,
        url: url,
      })
      .then(() => console.log('Evento compartido'))
      .catch((error) => console.error('Error al compartir el evento', error));
    } else {
      alert('Tu navegador no soporta la función de compartir.');
    }
  };

  return (
    <button onClick={handleCompartirClick} aria-label="Compartir" style={{border:"0px",marginBottom:"8px",backgroundColor:"transparent"}}>
    <FaShareAlt  style={{color:'rgba(0,71,171,1)',backgroundColor:"transparent"} }  size={24}/>
  </button>
  );
};
export function EventCard({
  activity,
  toggleState,
   logeado

}) {





  















  return(
    // <Link to={"/detalle/" + "a"}>
  <Card className="cardStyles" style={{ margin:40,marginTop:40,width: '13vw', height: 'auto',display:"inline-block"}}
 

  >

<Link to={"/detalle/" + activity.event_id}>
  <Card.Img  className="imageCard" variant="top" src="/fondo.webp" />
  {/* <Card.Img variant="top" src={`${activity.image}`} /> */}
  </Link>
  <Link to={"/detalle/" + activity.event_id} style={{textDecoration:'none'}}>

  <Card.Body>
    <Card.Title style={{color:"rgba(0,71,171,1)",fontSize:"1.4em"}}>{activity.title}</Card.Title>
    <Card.Text  style={{color:"#00857d",fontSize:"1.1em"}} >
    {activity.description}
    </Card.Text>
    <Card.Text  style={{color:"#00857d",fontSize:"1.1em"}}>
    {activity.datetime}
    </Card.Text>    <Card.Text  style={{color:"#00857d",fontSize:"1.1em"}}>
    {activity.location}
    </Card.Text>    <Card.Text  style={{color:"#00857d",fontSize:"1.1em"}}>
    {activity.city}
    </Card.Text>
    
        </Card.Body>
        </Link>
        {logeado && <MeGustaButton/>}
        <CompartirEventoButton evento={activity} />
        {logeado && <QuieroConocerGente/>}

</Card>

)
}