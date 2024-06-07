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
import {MapCoordinates} from "./MapCoordinates"




export const CompartirEventoButton = ({ evento }) => {
  const handleCompartirClick = () => {
    const url = window.location.href;
    const texto = `¡No te pierdas este evento! ${evento.title} el ${evento.date} en ${evento.description}. Más detalles: ${url}`;

    if (navigator.share) {
      navigator.share({
        title: 'Compartir evento',
        text: texto,
        url: url,
      })
      .then(() => console.log('Evento compartido'))
      .catch((error) => console.error('Error al compartir el evento', error));
    } else {
      const opciones = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=600, height=600';
      const compartirUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(texto)}`;

      window.open(compartirUrl, '_blank', opciones);
    }
  };

  return (
    <button onClick={handleCompartirClick} aria-label="Compartir" style={{ border: "0px", marginBottom: "8px", backgroundColor: "transparent" }}>
      <FaShareAlt style={{ color: '#00857d', backgroundColor: "transparent" }} size={24} />
    </button>
  );
};











export function EventCard({
  activity,
  toggleState,
   logeado

}) {






  



  return(<Card className="cardStyles">
  <Link to={"/detalle/" + activity.id}>
    <Card.Img className="imageCard" variant="top" src={activity.imageEvento} />
  </Link>
  <Link to={"/detalle/" + activity.id} style={{ textDecoration: 'none' }}>
    <Card.Body className="cardBody">
      <Card.Title className="cardTitle">{activity.title}</Card.Title>
      <Card.Text className="cardText">{activity.date.slice(8, 10)}-{activity.date.slice(5, 7) }-{activity.date.slice(0, 4) }</Card.Text>
      <Card.Text className="cardText">{activity.placeLabel}</Card.Text>
      <Card.Text className="cardText">{activity.municipalityName}</Card.Text>
    </Card.Body>
  </Link>
  {/* <div className="cardFooter">
    {logeado && <MeGustaButton evento={activity} meGusta={meGusta} setMeGusta={setMeGusta}/>}
    <CompartirEventoButton evento={activity} />
    {logeado && <QuieroConocerGente />}
  </div> */}
</Card>
);
}