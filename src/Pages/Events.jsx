import { EventsGrid } from "../Components/EventsGrid";

import React,{ useEffect, useState} from "react";

import "../styles.css";


export default function Events({
    toggleState,logeado
}){

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => {
            setMounted(false);
        };
    }, []);

    useEffect(() => {
        const authToken = localStorage.getItem('authToken');
        const tokenExpiration = localStorage.getItem('tokenExpiration');
    
        if (authToken && tokenExpiration) {
            const now = Date.now();
            if (now > tokenExpiration) {
                localStorage.clear();
                alert("Se ha terminado la sesión");

                toggleState(false); 
            } else {
                toggleState(true);
            }
        }
    }, []);
    return(
        <>
        <div className="container-fluid"  style={{backgroundImage:"url('https://assets.website-files.com/5f50c8823485c166e14fc0d7/600981acad87646365032f2a_bg-paint-wall.jpg')"}} >

        <div className="container">
         <EventsGrid toggleState={toggleState} logeado={logeado} />   </div>

  </div>
</>

);
}