import { Footer } from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react";
import { Spinner } from "../Components/Spinner";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import ModalPeople from "../Components/ModalPeople";

export function MiPerfil({ toggleState, logeado }) {
    const [cargando, setCargando] = useState(true);
    const owner = localStorage.getItem("owner");
    const id = localStorage.getItem("id");
    const token = localStorage.getItem('authToken'); 
    const [items, setItems] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                if (owner === "true") {

                    if (!token) {
                        console.error('Token no encontrado. No se puede verificar la agenda.');
                        return;
                    }
                    response = await fetch(`https://noninabackendapi.work.gd/api/Evento/GetEventosUserToken`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` 
                        },
                        mode: 'cors'
                    });
                } else {

                    response = await fetch(`https://noninabackendapi.work.gd/api/Agendas/GetAgendasUserToken`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` 
                        },
                        mode: 'cors'
                    });
                }

                const data = await response.json();

                setItems(data);
                setCargando(false);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };

        fetchData();
    }, []); 


    const handleDelete = async (id) => {

        const tokenExpiration = localStorage.getItem('tokenExpiration');
      
        if (token && tokenExpiration) {
            const now = Date.now();
            if (now > tokenExpiration) {
              alert("Se ha caducado la sesión, no se han guardado los cambios");
              toggleState(false);
          
      }else{
          // eslint-disable-next-line no-restricted-globals
          if (confirm("¿Estás seguro de que deseas eliminar?")) {
              const token = localStorage.getItem('authToken');
              const username = localStorage.getItem('username');
  
              if (!token) {
                  console.error('Token no encontrado. No se puede verificar la agenda.');
                  return;
              }
  
  
 
  
      
  
  
              let response;
              try {
                  if (owner === "true") {
                      response = await fetch(`https://noninabackendapi.work.gd/api/Evento/DeleteEventoToken`, {
                          method: 'DELETE',
                          headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`
                          },
                          mode: 'cors',
                          body: JSON.stringify(id)
  
                      });
                  } else {
                      response = await fetch(`https://noninabackendapi.work.gd/api/Agendas/DeleteAgendaToken`, {
                          method: 'DELETE',
                          headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`
                          },
                          mode: 'cors',
                          body: JSON.stringify(id)
                      });
                  }
  
                  if (response.ok) {
                      // Actualizar la lista de items después de eliminar
                      if (owner === "true") {
  
                      setItems(prevItems => prevItems.filter(item => item.id !== id));
                      }else{
                        setItems(prevItems => prevItems.filter(item => item.eventoId !== id));
  
                      }
                      alert("Evento eliminado con éxito");
                  } else {
                      alert("Error al eliminar el evento");
                  }
              } catch (error) {
                  console.error('Error deleting data', error);
                  alert("Error al eliminar el evento catch");
              }
          } else {
              alert("No se ha borrado nada");
          }
        }
      }
      };
    if (cargando) {
        return (
            <>
                <div style={{ backgroundImage: "url('https://assets.website-files.com/5f50c8823485c166e14fc0d7/600981acad87646365032f2a_bg-paint-wall.jpg')", minHeight: "100vh" }}>
                    <div class="container">
                        <div class="row">
                            <div className="py-2 my-5 col-12 col-lg-7">
                                <div class="bg-white shadow rounded overflow-hidden">
                                    <div class="px-4 pt-0 pb-4 cover" style={{ minHeight: "15vh" }}>
                                    </div>
                                    <div class="px-4 py-3">
                                        <h5 class="mb-5">Mis eventos - {localStorage.getItem("name")}</h5>
                                        <Table bordered hover className="table-centered"  >
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "8vw" }}>Ver más detalles</th>
                                                    <th style={{ width: "8vw" }}>Evento</th>
                                                    <th style={{ width: "8vw" }}>Lugar</th>
                                                    <th style={{ width: "8vw" }}>Fecha/Hora</th>
                                                    {owner ==="true" && <th style={{ width: "8vw" }}>Asistentes</th>}
                                                    <th style={{ width: "8vw" }}></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td colSpan="8">
                                                        <div style={{ color: '#00857d' }} className="d-flex flex-column">
                                                            <p style={{ color: '#00857d' }}>Recuperando datos del servidor...</p>
                                                            <Spinner />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </div>
                            </div>
                            <div className="d-none d-md-block col-lg-3">
                                <img width="500px" src="https://cdn1.iconfinder.com/data/icons/scenes-9/1000/Music_leisure___guitar_instrument_hobby_activity_woman_happy_relax_tunes_play-1024.png" />
                            </div>
                        </div>
                    </div>
                    <div class="container d-flex">
                        <div className="typewriter mt-5 ms-5">
                            <h1 className="grana">Mandaillo</h1>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div style={{ backgroundImage: "url('https://assets.website-files.com/5f50c8823485c166e14fc0d7/600981acad87646365032f2a_bg-paint-wall.jpg')", minHeight: "100vh" }}>
                <div class="container">
                    <div class="row">
                        <div className="py-2 my-5 col-12 col-lg-7">
                            <div class="bg-white shadow rounded overflow-hidden">
                                <div class="px-4 pt-0 pb-4 cover" style={{ minHeight: "15vh" }}>
                                </div>
                                <div class="px-4 py-3">
                                    <h5 class="mb-5">Mis eventos - {localStorage.getItem("name")}</h5>
                                    <Table bordered hover className="table-centered"  >
                                        <thead>
                                            <tr>
                                                <th style={{ width: "8vw" }}>Ver más detalles</th>
                                                <th style={{ width: "8vw" }}>Evento</th>
                                                <th style={{ width: "8vw" }}>Lugar</th>
                                                <th style={{ width: "8vw" }}>Fecha/Hora</th>
                                                {owner ==="true" && <th style={{ width: "8vw" }}>Asistentes</th>}
                                                <th style={{ width: "8vw" }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item) => (
                                                <tr key={item.id}>
                                                    <td style={{ maxWidth: "8vw" }}>
                                                    {owner === "true" ?
                                                        <Link to={"#" + item.eventoId} style={{ textDecoration: "none", cursor: "default", color: "black" }}>
                                                            <img src={item.imageEvento} alt="Evento" style={{ width:"100%",height:"80px", objectFit: "cover", paddingRight: "5px" }} />
                                                        </Link>
                                                        :
                                                        <Link to={"/detalle/" + item.eventoId} style={{ textDecoration: "none", cursor: "pointer", color: "black" }}>
                                                            <img src={item.imageEvento} alt="Evento" style={{ width:"100%",height:"80px", objectFit: "cover", paddingRight: "5px" }} />
                                                        </Link>}
                                                    </td>
                                                    <td style={{ maxWidth: "8vw" }}>
                                                        {item.title}
                                                    </td>
                                                    <td style={{ maxWidth: "8vw" }}>
                                                        {item.placeLabel} ({item.municipalityName})
                                                    </td>
                                                    <td style={{ maxWidth: "8vw" }}>
                                                        {/* {item.date} - {item.time} */}


                                                        {item.date.slice(8, 10)}-{item.date.slice(5, 7) }-{item.date.slice(0, 4) } - 
                                                        {item.time.slice(0,2)}:{item.time.slice(3,5)} 


                                                    </td>
                                                    {owner ==="true" && <td style={{ maxWidth: "8vw" }}>
                                                        <span style={{display:"inline-block",marginRight:"10px"}} >{item.agendasCount} </span>
                                                        <ModalPeople modalContent={item.userNames} />

                                                    </td>}

                                                    
                                                    <td style={{ maxWidth: "8vw" }}>
                                                        {owner === "true" && 
                                                        
                                                        <Link to={"/editevent/" + item.id} style={{textDecoration:'none',color:"black"}}>

                                                        <CiEdit  size={24} style={{ marginRight: "10", cursor: "pointer" }} />
                                                        </Link>
                                                        }
                                                        {owner === "true" ?
                                                            <RiDeleteBin6Line onClick={() => handleDelete(item.id)}  size={24} style={{ cursor: "pointer" }} />
                                                            :
                                                            <RiDeleteBin6Line onClick={() => handleDelete(item.eventoId)} size={24} style={{ cursor: "pointer" }} />
                                                        }
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                        <div className="d-none d-md-block col-lg-3">
                            <img width="500px" src="https://cdn1.iconfinder.com/data/icons/scenes-9/1000/Music_leisure___guitar_instrument_hobby_activity_woman_happy_relax_tunes_play-1024.png" />
                        </div>
                    </div>
                </div>
                <div class="container d-flex">
                    <div className="typewriter mt-5 ms-5">
                        <h1 className="grana">Mandaillo</h1>
                    </div>
                </div>
            </div>
        </>
    );
}
