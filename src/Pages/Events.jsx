import { EventCard } from "../Components/EventCard";
import { EventsGrid } from "../Components/EventsGrid";
import { Footer } from "../Components/Footer";

import NavigationBar from "../Components/NavigationBar";
import React,{ useEffect, useState, Suspense} from "react";

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
    return(
        // <div className="container-fluid" style={{backgroundImage:"url('fondototal.jpg')", backgroundSize: ' auto 20%', backgroundRepeat: 'repeat'}} >
        <>
        <NavigationBar toggleState={toggleState} logeado={logeado} />
        <div className="container-fluid"  style={{backgroundImage:"url('https://assets.website-files.com/5f50c8823485c166e14fc0d7/600981acad87646365032f2a_bg-paint-wall.jpg')"}} >

        <div className="container">
        {mounted && <EventsGrid toggleState={toggleState} logeado={logeado} />}    </div>

  </div>
  <Footer/>
</>

);
}