import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { LogoutConfirmation } from "./LogoutConfirmation";

export default function NavigationBar({ toggleState, logeado }) {
  const BanderaEspanola = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25">
      <rect width="512" height="512" fill="#FFDA44" />
      <g fill="#D80027">
        <path d="M0 0h512v170.667H0zM0 341.333h512V512H0z" />
      </g>
    </svg>
  );

  const BanderaUK = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="25" height="25">
      <rect fill="#012169" width="512" height="512" />
      <path fill="#FFF" d="M512 85.3h-85.3L256 256 85.3 85.3H0v85.4L170.7 256 0 426.7v85.3h85.3L256 256l170.7 170.7H512v-85.4L341.3 256 512 85.3z" />
      <path fill="#C8102E" d="M512 116.5h-49.5L256 256 49.5 116.5H0v49.5L206.5 256 0 396.5v49.5h49.5L256 256l206.5 190.5H512v-49.5L305.5 256 512 116.5z" />
      <path fill="#FFF" d="M0 0v66.7h512V0H0zm0 445.3V512h512v-66.7H0zM200.3 0v512h111.4V0H200.3zM0 200.3v111.4h512V200.3H0z" />
      <path fill="#C8102E" d="M0 0v33.3h512V0H0zm0 478.7V512h512v-33.3H0zM222.6 0v512h66.8V0h-66.8zM0 222.6v66.8h512v-66.8H0z" />
    </svg>
  );
  

  const [spanish, setSpanish] = useState(true);

  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    if (spanish) {
      setMensajes(["Eventos", "Login/Registro", "Mi perfil", "Socialicemos", "Logout", "Crear evento"]);
    } else {
      setMensajes(["Events", "Login/Register", "My profile", "Meet people", "Logout", "Create event"]);
    }
  }, [spanish]);

  const owner = localStorage.getItem("owner");
  const admin = localStorage.getItem("admin");
  const location = useLocation();

  const isRinconesPage = location.pathname === "/rincones";
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "iconononina.jpg";
    img.onload = () => setImageLoaded(true);
  }, []);

  const handleSelectLanguage = () => {
    setSpanish(!spanish);
  };


  const handleOpenInNewTab = (event) => {
    // Prevenir la navegación predeterminada
    event.preventDefault();
    // Obtener la URL del enlace
    const url = event.currentTarget.getAttribute('href');
    // Abrir en una nueva pestaña
    const newWindow = window.open(url, '_blank');
    // Asegurarse de que el nuevo contexto no pueda acceder al contexto actual
    if (newWindow) newWindow.opener = null;
  };

  if (admin === "true") {
    return null;
  }

  return (
    <Navbar style={{ backgroundColor: 'rgba(0, 71, 171, 1)', position: 'sticky', top: '0', zIndex: '3', display: isRinconesPage ? "none" : "block" }} variant="dark" expand="lg">
      <Container className='d-flex '>
        <Navbar.Brand as={NavLink} to="/rincones" onClick={handleOpenInNewTab}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ height: '80px', width: '80px', marginRight: '20px', borderRadius: "50%", backgroundColor: '#ccc' }}>
              {imageLoaded ? (
                <img src="iconononina.jpg" style={{ height: '80px', width: '80px', borderRadius: "50%" }} alt="Granada logo" />
              ) : (
                <div style={{ height: '80px', width: '80px', borderRadius: "50%", backgroundColor: '#ccc' }}></div>
              )}
            </div>
            <div style={{ borderLeft: '2px solid white', paddingLeft: '20px' }}>
              <h3 style={{ margin: 0, color: 'white', fontFamily: 'Granaina', fontSize: '2.5em' }}>NO NI NÁ</h3>
              <p style={{ margin: 0, color: 'white', fontFamily: 'Granaina', fontSize: '0.7em' }}>Agenda Gastro-Socio-Cultural</p>
            </div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {owner !== "true" && (
              <Nav.Link as={NavLink} to="/events" style={{ fontSize: "1.5em" }} className="ms-3 ps-3 nav-link-fixed-width">{mensajes[0]}</Nav.Link>
            )}
            {logeado === false ? (
              <Nav.Link as={NavLink} to="/login" style={{ fontSize: "1.5em" }} className="ms-3 ps-3 nav-link-fixed-width">
{mensajes[1]}              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" style={{ fontSize: "1.5em" }} className="ms-3 ps-3 nav-link-fixed-width">
                {mensajes[2]}                </Nav.Link>
                {/* {owner !== "true" && (
                  <Nav.Link as={NavLink} to="/postpage" style={{ fontSize: "1.5em" }} className="ms-3 ps-3 nav-link-fixed-width">
{mensajes[3]}                  </Nav.Link>
                )} */}
                {owner !== "false" && (
                  <Nav.Link as={NavLink} to="/createevent" style={{ fontSize: "1.5em" }} className="ms-3 ps-3 nav-link-fixed-width">
{mensajes[5]}                  
</Nav.Link>
                )}
                {admin !== "true" && <LogoutConfirmation toggleState={toggleState} logeado={logeado} />}
              </>
            )}
            
            <div onClick={handleSelectLanguage} style={{ cursor: "pointer", position:"absolute",left:"93%", top:"43%" }}>
              {spanish ? <BanderaUK /> : <BanderaEspanola />}
            </div>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
