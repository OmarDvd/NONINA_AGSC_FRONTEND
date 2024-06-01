import { Footer } from "../Components/Footer";
import NavigationBar from "../Components/NavigationBar";
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from "react";
import { Spinner } from "../Components/Spinner";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";

export function MiPerfil({ toggleState, logeado }) {
    const [cargando, setCargando] = useState(true);
    const owner = localStorage.getItem("owner");
    const id = localStorage.getItem("id");
    const token = localStorage.getItem('authToken'); // Obtén el token del local storage
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response;
                console.log(owner);
                if (owner === "true") {
                    console.log("ownerrrrrrrr");

                    if (!token) {
                        console.error('Token no encontrado. No se puede verificar la agenda.');
                        return;
                    }
                    response = await fetch(`https://localhost:7070/api/Evento/allUserOwner?userId=${id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` // Agrega el token a los encabezados
                        },
                        mode: 'cors'
                    });
                } else {
                    console.log("clienteeee");

                    response = await fetch(`https://localhost:7070/api/Agendas/allUserPeople?userId=${id}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}` // Agrega el token a los encabezados
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
    }, []); // El array vacío [] significa que este efecto se ejecuta una sola vez al montar el componente

    const handleEdit = (id) => {
        // Aquí iría la lógica para editar el evento
        console.log('Editar evento con id:', id);
    };

    const handleDelete = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("¿Estás seguro de que deseas eliminar?")) {
            const token = localStorage.getItem('authToken');
            const username = localStorage.getItem('username');

            // Verifica si el token existe antes de continuar
            if (!token) {
                console.error('Token no encontrado. No se puede verificar la agenda.');
                return;
            }

            console.log("Este es el id de borrar en mi perfil", id);

            const body = {
                username: username,
                eventoId: id
            };

            let response;
            try {
                if (owner === "true") {
                    response = await fetch(`https://localhost:7070/api/Evento/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        mode: 'cors',
                    });
                } else {
                    response = await fetch(`https://localhost:7070/api/Agendas/DeleteAgenda`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        mode: 'cors',
                        body: JSON.stringify(body)
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
                    console.log(response);
                    alert("Error al eliminar el evento");
                }
            } catch (error) {
                console.error('Error deleting data', error);
                alert("Error al eliminar el evento catch");
            }
        } else {
            alert("No se ha borrado nada");
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
                                        <Table bordered hover>
                                            <thead>
                                                <tr>
                                                    <th style={{ width: "8vw" }}>Ver más detalles</th>
                                                    <th style={{ width: "8vw" }}>Evento</th>
                                                    <th style={{ width: "8vw" }}>Lugar</th>
                                                    <th style={{ width: "8vw" }}>Fecha/Hora</th>
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
                                    <Table bordered hover>
                                        <thead>
                                            <tr>
                                                <th style={{ width: "8vw" }}>Ver más detalles</th>
                                                <th style={{ width: "8vw" }}>Evento</th>
                                                <th style={{ width: "8vw" }}>Lugar</th>
                                                <th style={{ width: "8vw" }}>Fecha/Hora</th>
                                                <th style={{ width: "8vw" }}></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {items.map((item) => (
                                                <tr key={item.id}>
                                                    <td style={{ maxWidth: "8vw" }}>
                                                        <Link to={"/detalle/" + item.eventoId} style={{ textDecoration: "none", cursor: "pointer", color: "black" }}>
                                                            <img src={item.imageEvento} alt="Evento" style={{ maxWidth: "75px", objectFit: "cover", paddingRight: "5px" }} />
                                                        </Link>
                                                    </td>
                                                    <td style={{ maxWidth: "8vw" }}>
                                                        {item.title}
                                                    </td>
                                                    <td style={{ maxWidth: "8vw" }}>
                                                        {item.placeLabel} ({item.municipalityName})
                                                    </td>
                                                    <td style={{ maxWidth: "8vw" }}>
                                                        {item.date} - {item.time}
                                                    </td>
                                                    <td style={{ maxWidth: "8vw" }}>
                                                        {owner === "true" && <CiEdit onClick={() => handleEdit(item.id)} size={24} style={{ marginRight: "10", cursor: "pointer" }} />}
                                                        {owner === "true" ?
                                                            <RiDeleteBin6Line onClick={() => handleDelete(item.id)} size={24} style={{ cursor: "pointer" }} />
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
