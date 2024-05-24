import "../styles.css";
import Plx from "react-plx";
import {Parallax} from "react-parallax";
import {Link} from "react-router-dom";


export default function Rincones({rincones, setRincones}) {
  const handleClick = () => {
    setRincones(false);
  };
  return (
    <div     id="target"
 className="" style={{backgroundColor:"#333", zIndex:2,position:"absolute", top:0}}>

<Link
    to="/events" 
    className="linkHoverEffect"
    style={{
      position: 'absolute',
      top: '30px',
      right: '30px',
      zIndex: '2333',
      border:'2px solid black',
      backgroundColor: 'white',
      cursor: 'pointer',
      textDecoration: 'none', 
      color: 'rgba(0, 71, 171, 1)',
      padding: '3px',
      boxShadow: '5px 5px 5px rgba(0, 0, 0, 1)',
      transition: 'transform 0.3s ease'

      
    }}
    onClick={handleClick}
  >
    <div className="d-flex flex-column">
      <small style={{ fontSize: "1.5em" }}>Ver eventos</small>
    </div>
  </Link>
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
    top:"150vh",
    zIndex: 101 
  }}
>
  <div style={{
    display: "flex",
    justifyContent:"space-between"}}>
      <div style={{
    width: "35%"}}>
      <img style={{ width: "100%" }} src="https://assets.buendiatours.com/s3fs-public/styles/gallery_mobile_800_580_/public/2023-10/visita-guiada-albaicin-sacromonte_espectaculo-flamenco_granada_cuevas_excursion_andalucia_buendia%20%284%29.jpg.webp?VersionId=NtVvR6N02iYkO785ogx6DpaHnW4Yh7Jn&itok=VMwFhhbo" alt="background" />

      </div>
<p className="granaRegular" >Piérdete por el barrio del Realejo</p>
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
    top:"230vh",
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

{/* 

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

<p className="granaRegular">Conoce los lugares más puros</p>
<div style={{
    width: "35%"}}>
      <img style={{ width: "100%" }} src="amapola.jpg" alt="background" />

      </div>
  </div></Plx> */}
























































  <Parallax strength={-600} bgImage="./fondillodos.png" style={{position:"relative",top:"400vh",zIndex:400}}>
  <div className="content">
    {/* <div className="text-content"></div> */}
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
    className="granaBoton"> Subir arriba</a>
</p>

  </div></Plx>
























    </div>
  );
}