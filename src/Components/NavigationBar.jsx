import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";
import React,{ useEffect, useState, Suspense} from "react";

// import camaraIcono from '../camaraicono.ico'

export default function NavigationBar({ toggleState,logeado }) {
  const handleLogout = () => {
    if (window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      toggleState(false);
    }
  };
  // useEffect(() => {
  //   const handleNavLinkClick = () => {
  //     window.scrollTo({ top: 0, behavior: 'smooth' });
  //   };

  //   const navLinks = document.querySelectorAll('.nav-link');
  //   navLinks.forEach(link => {
  //     link.addEventListener('click', handleNavLinkClick);
  //   });

  //   return () => {
  //     navLinks.forEach(link => {
  //       link.removeEventListener('click', handleNavLinkClick);
  //     });
  //   };
  // }, []);


  return (
<Navbar style={{ backgroundColor: 'rgba(0, 71, 171, 1)',position:'sticky', top:'0',zIndex:'3', zIndex:2 }} variant="dark" expand="md">
      <Container className='d-flex '>

      <Navbar.Brand as={NavLink} to="/events">
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <img src="https://img.freepik.com/vector-premium/azulejo-decorativo-azul-blanco-patron_52756-246.jpg?w=900" style={{ height: '80px', marginRight: '20px', borderRadius: "50%" }} alt="Granada logo" />
    <div style={{ borderLeft: '2px solid white', paddingLeft: '20px' }}>
      <h3 style={{ margin: 0, color: 'white', fontFamily: 'Granaina',fontSize: '2.5em' }}>NO NI NÁ </h3>
      <p style={{ margin: 0, color: 'white', fontFamily: 'Granaina', fontSize: '0.7em' }}>Agenda Gastro-Socio-Cultural</p>
    </div>
  </div>
</Navbar.Brand>


        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/events"  style={{fontSize:"1.5em"}} className="ms-3 ps-3 ">Eventos</Nav.Link>

          {/* <Nav.Link as={NavLink} to="/rincones" style={{fontSize:"1.5em"}}  className="ms-3 ps-3">Rincones</Nav.Link> */}
          {logeado === false ? (
  <Nav.Link as={NavLink} to="/login" style={{ fontSize: "1.5em" }} className="ms-3 ps-3 ">
    Login/Registro
  </Nav.Link>
) : (
/*Crear evento solo será para usuarios tipo negocio*/
/*Crear evento solo será para usuarios tipo negocio*/


  <>
  <Nav.Link as={NavLink} to="/login" style={{ fontSize: "1.5em" }} className="ms-3 ps-3">
    Ir a mi perfil
  </Nav.Link>

  
    <Nav.Link as={NavLink} to="/createevent" style={{ fontSize: "1.5em" }} className="ms-3 ps-3">
    Crear evento
  </Nav.Link>
  </>
)}

{/* <Nav.Link as={NavLink} to="/createevent"  style={{fontSize:"1.5em"}} className="ms-3 ps-3 ">Crear evento</Nav.Link>
<Nav.Link as={NavLink} to="/mycreatedevents"  style={{fontSize:"1.5em"}} className="ms-3 ps-3 ">Mis eventos creados</Nav.Link>

<Nav.Link as={NavLink} to="/createevent"  style={{fontSize:"1.5em"}} className="ms-3 ps-3 ">Crear evento</Nav.Link>
<Nav.Link as={NavLink} to="/mysavedevents"  style={{fontSize:"1.5em"}} className="ms-3 ps-3 ">Mis eventos guardados</Nav.Link>
<Nav.Link as={NavLink} to="/mysavedevents"  style={{fontSize:"1.5em"}} className="ms-3 ps-3 ">Busco engalío con gente</Nav.Link> */}


          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
