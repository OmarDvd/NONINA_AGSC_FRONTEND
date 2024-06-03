import { NavLink,useLocation} from "react-router-dom";

import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

export function Footer(){

    const location = useLocation();

    // Comprueba si la ubicación actual corresponde a la página de Rincones
    const isRinconesPage = location.pathname === "/rincones";
    


    return(
        // <footer className=" p-3" style={{backgroundColor:"rgba(0,71,171,1",display: isRinconesPage ? "none" : "block" }}>
        //     <div className="container text-center">


        //         <nav className="d-flex justify-content-evenly mb-2">


        //             <a href="http://facebook.com" target="_blank" className="enlacecontenedor"><i className="bi bi-facebook fs-3" ></i></a>
        //             <a href="http://twitter.com" target="_blank"><i className="bi bi-twitter fs-3"></i></a>
        //             <a href="http://github.com" target="_blank"><i className="bi bi-github fs-3"></i></a>
        //             <a href="http://youtube.com" target="_blank"><i className="bi bi-youtube fs-3"></i></a>
        //             <a href="http://instagram.com" target="_blank"><i className="bi bi-instagram fs-3"></i></a>
        //             <a href="http://m.me/user.com" target="_blank"><i className="bi bi-messenger fs-3"></i></a>
        //             <a href="http://whatsapp.com/send?phone=number" target="_blank"><i
        //                     className="bi bi-whatsapp fs-3"></i></a>


        //         </nav>
        //         <small className="text-white ">&copy; 2024 Autocine Omar Escámez</small>
        //     </div>

        // </footer>
        
      <footer className="footer" style={{ backgroundColor:"rgba(0,71,171,1)",       display: isRinconesPage ? "none" : "block"    }}>


        <div className="footer-social-media">
            <ul className="social-media">
                <li className="social-media-item">
                    <a href="#" className="social-media-link">
                        <i className="fab fa-facebook-square"></i>
                    </a>
                </li>

                <li className="social-media-item">
                    <a href="#" className="social-media-link">
                        <i className="fab fa-instagram"></i>
                    </a>
                </li>

                <li className="social-media-item">
                    <a href="#" className="social-media-link">
                        <i className="fab fa-google-plus-square"></i>
                    </a>
                </li>

                <li className="social-media-item">
                    <a href="#" className="social-media-link">
                        <i className="fab fa-youtube"></i>
                    </a>
                </li>
            </ul>
        </div>

        <div className="footer-copyright">
            <p className="footer-copyright-paragraph">
                &copy; Copyeight. 2024.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; NONINÁ - Agenda Gastro-Socio-Cultural
            </p>
        </div>



    </footer>

    );
}


