import React from "react";
import { Link } from "react-router-dom";

export function ProductoCard({ movie }) {
  let urlImagen = "https://image.tmdb.org/t/p/w300/ldfCF9RhR40mppkzmftxapaHeTo.jpg";

  const cardStyle = {
    borderRadius:"20px",

    width: "80%", // Reducir el ancho de la tarjeta al 80% del contenedor padre
    margin: "0 auto",
    cursor:"pointer",
    opacity: movie.sesion_plazas === 0 ? 0.4 : 1, // Reducir la opacidad si sesion_plazas es 0
    backgroundColor: movie.sesion_plazas === 0 ? "lightgray" : "white" // Cambiar el color de fondo si sesion_plazas es 0
  };
  const imagenStyle = {
    maxWidth: "100%", // Establecer el ancho máximo al 100% del contenedor
    height: "auto",// Permitir que la altura se ajuste automáticamente según el ancho
  };


  var cadenaCompleta = movie.pelicula_imagen;

  // Dividir la cadena en partes usando el carácter '+'
  var partes = cadenaCompleta.split('+');
  
  // Tomar el primer elemento
  var primerElemento = partes[0];


  return (
    <div className="col-md-6 col-lg-4 mb-3 " >
      <div className="card carde principal" style={cardStyle}>

        <div className="card-body face face1">
          <div className="content">
            <img className="card-img-top mb-2" src={primerElemento} alt=""  style={imagenStyle} />
            <h5 className="card-title"><b>Título:</b> {movie.pelicula_titulo}</h5>
            <p className="card-text mt-3"><b>Cine:</b> {movie.user_nombre}</p>
            <p className="card-text"><b>Fecha:</b> {movie.sesion_fecha} &nbsp;21:00 h</p>
          </div>
        </div>

        <div className="card-body pt-2 face face2">
          <div className="content">
            <p className="card-text"><b>Género:</b> {movie.pelicula_genero}</p>
            <p className="card-text"><b>Puntuación:</b> {movie.pelicula_puntuacion}</p>
            <p className="card-text"><b>Plazas disponibles:</b> {movie.sesion_plazas}</p>
            {movie.sesion_plazas > 0 ? (
              <Link to={"/detalle/" + movie.sesion_id} className="btn" style={{ backgroundColor: 'rgba(150, 0, 255, 1)', color: 'white' }}><b>Ir a zona de reservas</b></Link>
            ) : (
              <button className="btn btn-danger" disabled>No hay plazas disponibles</button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

// Estilos CSS
const styles = `

.principal{
  background-color: #333 !important;
}

.carde {
  color: white;
  background-color: #333;

  position: relative;
}

.face {
  width: 100%;
  height: auto;
  transition: all 0.5s;
}

.face1 {
  z-index: 1;
  position: relative;
  background-color: #333;
  transform: translateY(100px);
}

.carde:hover .face.face1 {
  box-shadow: inset 0 0 10px whitesmoke,
              inset 20px 0 80px #f0f,
              inset 0px 0 50px #0ff,
              0 0 20px #333;
  transform: translateY(0);
}


.face1 .content {
  opacity: 0.9;
}

.carde:hover .face1 .content {
  opacity: 1;
}

.face1 .content h5 {
  color: white;
  font-size: 1em;
}

.face2 {
  position: relative;
  background-color: #333;
  display: flex;
  align-items: center;
  padding: 20px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.8);
  transform: translateY(-100px);
}

.container .carde:hover .face.face2 {
  transform: translateY(0);
}
`;

// Agregar estilos CSS al final del archivo
const styleElement = document.createElement("style");
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
