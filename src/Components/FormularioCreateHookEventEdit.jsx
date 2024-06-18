import { useForm } from "react-hook-form";
import { TextField, Button} from '@mui/material';
import { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Spinner } from "./Spinner";


export function FormularioCreateHookEventEdit({ toggleState}) {
  const formularioRef = useRef(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  let { eventID } = useParams();
  const [cargando,setCargando]=useState(true);

  const [actualizado,setActualizado]=useState(false);

  const id = localStorage.getItem("id");
  const token = localStorage.getItem('authToken'); 



  useEffect(() => {

    if (eventID) {
      fetch(`https://noninabackendapi.work.gd/api/Evento/${eventID}`)
        .then(response => response.json())
        .then(data => {
          setValue("titulo", data.title.trim());
          setValue("descripcion", data.description.trim());
          setValue("fecha", data.date);
          setValue("hora", data.time);
          setValue("ubicacion", data.placeLabel.trim());
  setCargando(false);
        })
        .catch(error => {
          console.error('Error fetching event:', error);
          setCargando(false);

    });

    }
  }, [eventID,actualizado]);



  

  const editList = async (data) => {
    const token = localStorage.getItem('authToken'); 

    if (!token) {
        console.error('Token no encontrado. No se puede verificar la agenda.');
        return;
    }

        const tokenExpiration = localStorage.getItem('tokenExpiration');
    
        if (token && tokenExpiration) {
            const now = Date.now();
            if (now > tokenExpiration) {
              alert("Se ha caducado la sesión, no se han guardado los cambios");
              toggleState(false);
          
  }else{
    try {


      const response = await fetch('https://noninabackendapi.work.gd/api/Evento/UpdateEventoToken?Id='+eventID
        +'&Title=' + encodeURIComponent(data.titulo) 
        + '&Description=' + encodeURIComponent(data.descripcion) 
        + '&PlaceLabel=' + encodeURIComponent(data.ubicacion)      
        + '&Date=' + encodeURIComponent(data.fecha)
+'&year=' + data.fecha.slice(0, 4) 
+ '&month=' + data.fecha.slice(5, 7) 
+ '&day=' + data.fecha.slice(8, 10)      
+ '&Time=' + encodeURIComponent(data.hora)
+'&dayOfWeek=0&hour=' + data.hora.slice(0, 2) 
+ '&minute=' + data.hora.slice(3, 5) , {
        method: 'PUT', 
        headers: {
          'Authorization': `Bearer ${token}` 
      },
      mode: 'cors'
      });

      if (!response.ok) {
        throw new Error('Error al editar la lista');
      }

      const responseData = await response.json();
      alert("Evento editado");
setActualizado(!actualizado);
    } catch (error) {
      console.error("Error al editar la lista:", error);
    }
  }}
  };


  
  if(cargando){
    return (
<div style={{ color: '#00857d' }} className="d-flex flex-column"><p style={{ color: '#00857d' }}>Recuperando datos del servidor... </p><Spinner /></div>
    
    
    );      
   }


  return (
        <div>
<form ref={formularioRef} onSubmit={handleSubmit(editList)} method="post" style={{
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    paddingTop:"20px",
    borderRadius: '1px',
    color: 'black',
    boxShadow: '0 0 1px 2px rgba(0, 71, 171, 1)'
  }}>

<p>
<TextField
  id="titulo"
  label=""
  variant="outlined"
  margin="normal"
  style={{ width: '50%' }}
  size="small"
  {...register("titulo", {
    required: true,
    maxLength: 50,
  })}
  InputProps={{ style: { color: '#333' } }}
/>
{errors.titulo?.type === "required" && (
    <p role="alert" style={{ color: 'crimson' }}>El título del evento es obligatorio</p>
  )}
  {errors.titulo?.type === "maxLength" && (
    <p role="alert" style={{ color: 'crimson' }}>El título del evento debe tener máximo 50 caracteres</p>
  )}
</p>
<p>
<TextField
  id="descripcion"
  label=""
  variant="outlined"
  margin="normal"
  style={{ width: '50%' }}
  size="small"
  multiline
  rows={4}
  {...register("descripcion", { required: true })}
  InputProps={{ style: { color: '#333' } }}
/>
{errors.descripcion && (
    <p role="alert" style={{ color: 'crimson' }}>La descripción del evento es obligatoria</p>
  )}
</p>
<p>
<TextField
  id="fecha"
  label=""
  type="date"
  variant="outlined"
  margin="normal"
  style={{ width: '50%' }}
  size="small"
  {...register("fecha", { required: true })}
  InputProps={{ style: { color: '#333' } }}
/>

{errors.fecha && (
        <p role="alert" style={{ color: 'crimson' }}>Debe seleccionar una fecha para el evento</p>
      )}
</p>
<p>
<TextField
  id="hora"
  label=""
  type="time"
  variant="outlined"
  margin="normal"
  style={{ width: '50%' }}
  size="small"
  {...register("hora", { required: true })}
  InputProps={{ style: { color: '#333' } }}
/>
{errors.hora && (
        <p role="alert" style={{ color: 'crimson' }}>Debe seleccionar una hora para el evento</p>
      )}
</p>
<p>
<TextField
  id="ubicacion"
  label=""
  variant="outlined"
  margin="normal"
  style={{ width: '50%' }}
  size="small"
  {...register("ubicacion", { required: true })}
  InputProps={{ style: { color: '#333' } }}
/>
{errors.ubicacion && (
        <p role="alert" style={{ color: 'crimson' }}>Debe seleccionar una ubicación en el mapa para el evento</p>
      )}
</p>






  <Button type="submit" className="mt-3" variant="contained" style={{ backgroundColor: 'rgba(0,71,171,1)', color: 'white' }}>
    Editar evento
  </Button>

  <Button type="reset" className="ms-4 mt-3" variant="contained" style={{ backgroundColor: 'rgba(0,71,171,1)', color: 'white' }}>
    Reset
  </Button>
</form>
</div>
  );
}