import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink,useLocation} from "react-router-dom";
import React, { useEffect, useState } from "react";
import  {  LogoutConfirmation } from "./LogoutConfirmation";




export default function NavigationBar({ toggleState, logeado }) {


  const owner = localStorage.getItem("owner");
  const admin = localStorage.getItem("admin");

  const id = localStorage.getItem("id");
  const token = localStorage.getItem('authToken');

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      toggleState(false);
    }
  };
  const location = useLocation();

  // Comprueba si la ubicación actual corresponde a la página de Rincones
  const isRinconesPage = location.pathname === "/rincones";
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "iconononina.jpg";
    img.onload = () => setImageLoaded(true);
  }, []);





  if (admin == "true") {
    console.log(admin+"eeee");
    
    return null;
  }

  return (
    
    <Navbar style={{ backgroundColor: 'rgba(0, 71, 171, 1)', position: 'sticky', top: '0', zIndex: '3',display: isRinconesPage ? "none" : "block" }} variant="dark" expand="md">
      <Container className='d-flex '>
        <Navbar.Brand as={NavLink} to="/rincones">
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
              <Nav.Link as={NavLink} to="/events" style={{ fontSize: "1.5em" }} className="ms-3 ps-3 min-width-150">Eventos</Nav.Link>
            )}            {logeado === false ? (
              <Nav.Link as={NavLink} to="/login" style={{ fontSize: "1.5em" }} className="ms-3 ps-3 min-width-150">
                Login/Registro
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" style={{ fontSize: "1.5em" }} className="ms-3 ps-3 min-width-150">
                  Ir a mi perfil
                </Nav.Link>
                {owner !== "true" && (

                <Nav.Link as={NavLink} to="/postpage" style={{ fontSize: "1.5em" }} className="ms-3 ps-3 min-width-150">
                  Socialicemos
                </Nav.Link>
                )}
                {owner !== "false" && (
                  <Nav.Link as={NavLink} to="/createevent" style={{ fontSize: "1.5em" }} className="ms-3 ps-3 min-width-150">
                    Crear evento
                  </Nav.Link>
                  )}
                {admin !== "true" && <LogoutConfirmation  toggleState={toggleState} logeado={logeado} />}

              </>
            )}
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
