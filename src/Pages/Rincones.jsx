import "../styles.css";
import Plx from "react-plx";
import {Parallax} from "react-parallax";
import {Link} from "react-router-dom";
import { useEffect, useState } from "react";


export default function Rincones({rincones, setRincones,toggleState}) {
  const handleClick = () => {
    setRincones(false);
  };

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

  return (
    <div     id="target"
 className="" style={{backgroundColor:"#333", zIndex:2,position:"absolute", top:0}}>

 <Plx
        parallaxData={[
          {
            start: 0,
            end: 700,
            easing: "ease-in",
            properties: [
              {
                startValue: 1,
                endValue: 1.6,
                property: "scale"
              }
            ]
          }
        ]}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%",
          zIndex: 100
        }}
      >

        <img style={{ width: "100%" }} src="bg.png" alt="foreground" />

      </Plx>
      <Plx
        parallaxData={[
          {
            start: 0,
            end: 800,
            properties: [
              {
                startValue: 1,
                endValue: 1.18,
                property: "scale"
              },
              {
                startValue: 1,
                endValue: 0.2,
                property: "opacity"
              }
            ]
          }
        ]}
        style={{  
          zIndex:3,
          position: "fixed",
          left: 0,
          top: 0,
          width: "100%"
        }}
      >
        <img style={{ width: "100%" }} src="dimitry.jpg" alt="background" />
      </Plx>
      <Plx
        parallaxData={[
          {
            start: 0,
            end: 400,
            properties: [
              {
                startValue: 1,
                endValue: 0,
                property: "opacity"
              }
            ]
          }
        ]}
        style={{
          zIndex:3,

          position: "fixed",
          left: 0,
          top: "10vw",
          width: "100%"
        }}
      >
<div>
<div class="container">
	
<p className="grana">GRANADA</p>
	
	<div class="bird-container bird-container--one">
		<div class="bird bird--one"></div>
	</div>
	
	<div class="bird-container bird-container--two">
		<div class="bird bird--two"></div>
	</div>
	
	<div class="bird-container bird-container--three">
		<div class="bird bird--three"></div>
	</div>
	
	<div class="bird-container bird-container--four">
		<div class="bird bird--four"></div>
	</div>
	
</div>

</div>
      </Plx>

    




<Plx
  parallaxData={[
    {
      start: 900, 
      end: 2000, 
      properties: [
        {
          startValue: 1,
          endValue: 1, 
          property: "scale"
        },
        
            ]
    }
  ]}
  style={{
    position: "relative", 
    left:"5%",
    width: "85%",
    top:"190vh",
    zIndex: 101 
  }}
>
<div style={{
    display: "flex",
    justifyContent:"space-between"}}>

<p className="granaRegular">Conoce los lugares más puros</p>
<div style={{
    width: "35%"}}>
      <img style={{ width: "100%" }} src="amapola.jpg" alt="background" />

      </div>
  </div></Plx>











  <Plx
  parallaxData={[
    {
      start: 900, 
      end: 2000, 
      properties: [
        {
          startValue: 1,
          endValue: 1, 
          property: "scale"
        },
        
            ]
    }
  ]}
  style={{
    position: "relative", 
    left:"5%",
    width: "85%",
    top:"270vh",
    zIndex: 101 
  }}
>
  <div style={{
    display: "flex",
    justifyContent:"space-between"}}>
      <div style={{
    width: "35%"}}>
      <img style={{ width: "100%" }} src="albaicin.jpg" alt="background" />

      </div>
<p className="granaRegular">Visita el barrio del Albaicín</p>
  </div>
</Plx>



  <Parallax strength={-600} bgImage="./fondillodos.png" style={{position:"relative",top:"400vh",zIndex:400}}>
  <div className="content">
  </div>
</Parallax>



  <Plx
  parallaxData={[
    {
      start: 900, 
      end: 2000, 
      properties: [
        {
          startValue: 1,
          endValue: 1, 
          property: "scale"
        },
        
            ]
    }
  ]}
  style={{
    position: "relative", 
    left:"5%",
    width: "90%",
    top:"330vh",
    height:"60vh",
    zIndex: 401 
  }}
>
<div>

<p className="granaBoton">

  <a href="#target" style={{
    background: "rgba(0, 71, 171, 1)",
    textDecoration:"none",
    padding:"10px"}}
    className="granaBoton"> Volver al mirador</a>
</p>

  </div></Plx>




    </div>
  );
}