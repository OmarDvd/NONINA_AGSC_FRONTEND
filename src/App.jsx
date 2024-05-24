import "./styles.css";
import Plx from "react-plx";
import {Parallax} from "react-parallax";
import React,{ useEffect, useState, Suspense} from "react";

import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import NavigationBar from "./Components/NavigationBar";



// import Rincones from "./Pages/Rincones";
import Events from "./Pages/Events";
import {Filtro} from "./Pages/Filtro";
import {PostPage} from "./Pages/PostPage";

import Login from "./Pages/Login";
import {CreateEvent} from "./Pages/CreateEvent";


import {DetalleProducto} from "./Pages/DetalleProducto";



export default function App() {
  const Rincones = React.lazy(() => import('./Pages/Rincones'));

  const [logeado, setLogeado] = useState(false);
  const [registro, setRegistro] = useState(false); 
  const [rincones, setRincones] = useState(true); 


  function toggleState(valor)  {
    setLogeado(valor);
    }

    function cambiarRegistro (valor)  {
      setRegistro(valor);
      }
  
      function cambiarRincones(valor)  {
        setRincones(valor);
        }
        return (
          <>
          <Router>
            
            <Suspense fallback={<div>Loading...</div>}>
              
              <Routes>
                
                <Route path="/" element={<Rincones rincones={rincones} setRincones={setRincones} />} />
                
                <Route path="/events" element={<Events toggleState={toggleState} logeado={logeado}/>} />
                <Route path="/rincones" element={<Rincones rincones={rincones} setRincones={setRincones} />} />
                <Route path="/login" element={<Login logeado={logeado} toggleState={toggleState} cambiarRegistro={cambiarRegistro} />} />
                <Route path="/postpage" element={<PostPage logeado={logeado} toggleState={toggleState} cambiarRegistro={cambiarRegistro} />} />
                <Route path="/createevent" element={<CreateEvent logeado={logeado} toggleState={toggleState} cambiarRegistro={cambiarRegistro} />} />
                <Route path="/detalle/:eventID" element={<DetalleProducto logeado={logeado} toggleState={toggleState}/>}></Route>
                <Route path="/filtrar" element={<Filtro logeado={logeado} toggleState={toggleState}/>}></Route>

              </Routes>
            </Suspense>
          </Router>
          </>
        );

//         return (
//           <Router>
//           <Suspense fallback={<div>Loading...</div>}>
//             {rincones ? <Rincones rincones={rincones} setRincones={setRincones}/> : <NavigationBar toggleState={toggleState} logeado={logeado} />
// }
//             <Routes>
//             <Route path="/" element={<Events />} />

//               <Route path="/events" element={<Events />} />
//               <Route path="/rincones" element={<Rincones rincones={rincones} setRincones={setRincones} />} />
//               <Route path="/login" element={<Login toggleState={toggleState} />} />
//             </Routes>
//           </Suspense>
//         </Router>
//         );
      }