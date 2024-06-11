import { useLocation} from "react-router-dom";

import React from 'react';


export function Footer(){

    const location = useLocation();

    // Comprueba si la ubicación actual corresponde a la página de Rincones
    const isRinconesPage = location.pathname === "/rincones";
    const admin = localStorage.getItem("admin");

    if (admin === "true") {
        return null;
      }

    return(


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


