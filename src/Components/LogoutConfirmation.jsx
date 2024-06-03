

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";

export function LogoutConfirmation({ toggleState, logeado }){

    


    const handleLogout = () => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("¿Estás seguro de que deseas cerrar sesion?")) {
        localStorage.clear();
        alert("Se ha terminado la sesión");
        toggleState(false);}

    };
  
    return (
      <>
        <Nav.Link
          style={{ fontSize: "1.5em" }}
          className="ms-3 ps-3 min-width-150"
          onClick={handleLogout}
        >
          Logout
        </Nav.Link>
        {/* {showConfirmation && (
          <div className="confirmation-dialog">
            <p>¿Estás seguro que deseas cerrar sesión?</p>
            <button onClick={handleLogout}>Sí</button>
            <button onClick={() => setShowConfirmation(false)}>No</button>
          </div> */}
      </>
    );
  }