import { useForm } from "react-hook-form"
import { TextField, Button, RadioGroup, FormControlLabel, Radio,Input } from '@mui/material';
import { useRef } from "react";
import { useEffect, useState } from "react";
import { MapaBuscar } from "../Components/MapaBuscar";


export function FormularioCreateHookEvent(){
  const formularioRef = useRef(null);
    const {register,handleSubmit,formState: { errors }}=useForm();

    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

    const handleImagenChange = (event) => {
      // Capturar la imagen seleccionada y almacenarla en el estado
      const imagen = event.target.files[0];
      setImagenSeleccionada(imagen);
    };

    
    const createList = async (data) => {
      try {

        // const nuevoIdCliente =   await incrementaId(); 
  

        // const clienteData = {
        //   ...data,
        //  // Asignar el próximo ID también al objeto cliente
        // };
        const token = sessionStorage.getItem('token');

        await fetch('http://localhost:8000/api/newuser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(data),
        });
        alert("Cliente creado");
        formularioRef.current.reset();

      } catch (error) {
        console.error("Error al crear la lista:", error);
      }
    };
    return (
        <div>
<form ref={formularioRef} onSubmit={handleSubmit(createList)} method="post" style={{
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    paddingTop:"20px",
    borderRadius: '1px',
    color: 'black',
    boxShadow: '0 0 1px 2px rgba(0, 71, 171, 1)'
  }}>
<p><Input
        type="file"
        accept="image/jpeg, image/png, image/gif, image/webp"
        id="imagen"
        name="imagen"
        {...register("imagen", { required: true })}
        onChange={handleImagenChange} // Capturar cambios en la imagen seleccionada
        inputProps={{ style: { display: 'none' } }}
      />
      <label htmlFor="imagen">
        <Button component="span" variant="outlined" style={{ textTransform: 'none' }}>
          Seleccionar imagen
        </Button>
      </label>

      {/* Mostrar el nombre de la imagen seleccionada (opcional) */}
      {imagenSeleccionada && <p>{imagenSeleccionada.name}</p>}
  {errors.imagen && (
    <p role="alert" style={{ color: 'crimson' }}>Debe seleccionar una imagen</p>
  )}
</p>
<p>
  <TextField
    id="titulo"
    label="Título del evento"
    variant="outlined"
    margin="normal"
    style={{ width: '50%' }}
    size="small"
    {...register("titulo", {
      required: true,
      maxLength: 50,
    })}
    InputProps={{ style: { color: '#333' } }} // Estilo para el texto del input
  />
  {errors.titulo?.type === "required" && (
    <p role="alert" style={{ color: 'crimson' }}>El título del evento es obligatorio</p>
  )}
  {errors.titulo?.type === "maxLength" && (
    <p role="alert" style={{ color: 'crimson' }}>El título del evento debe tener máximo 50 caracteres</p>
  )}
</p>
  <TextField
    id="descripcion"
    label="Descripción"
    variant="outlined"
    margin="normal"
    style={{ width: '50%' }}
    size="small"
    multiline
    rows={4}
    {...register("descripcion", { required: true })}
    InputProps={{ style: { color: '#333' } }} // Estilo para el texto del input
  />
  {errors.descripcion && (
    <p role="alert" style={{ color: 'crimson' }}>La descripción del evento es obligatoria</p>
  )}
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
        InputProps={{ style: { color: '#333' } }} // Estilo para el texto del input
      />
      {errors.fecha && (
        <p role="alert" style={{ color: 'crimson' }}>Debe seleccionar una fecha para el evento</p>
      )}
</p>
      {/* Campo de entrada de hora */}
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
        InputProps={{ style: { color: '#333' } }} // Estilo para el texto del input
      />
      {errors.hora && (
        <p role="alert" style={{ color: 'crimson' }}>Debe seleccionar una hora para el evento</p>
      )}
</p>
      {/* Campo de entrada de ubicación en mapa */}
      
      <p>


      <TextField
        id="ubicacion"
        label="Dirección del lugar/establecimiento"
        variant="outlined"
        margin="normal"
        style={{ width: '50%' }}
        size="small"
        {...register("ubicacion", { required: true })}
        InputProps={{ style: { color: '#333' } }} // Estilo para el texto del input
      />
      {errors.ubicacion && (
        <p role="alert" style={{ color: 'crimson' }}>Debe seleccionar una ubicación en el mapa para el evento</p>
      )}
</p>

  {/* Agregar aquí el campo para seleccionar la ubicación en el mapa */}
<p className="Granaina fs-2" style={{color:"rgba(0,71,171,1)"}} >Busca y marca abajo en el mapa para más exactitud</p>
<MapaBuscar/>




  <Button type="submit" className="mt-3" variant="contained" style={{ backgroundColor: 'rgba(0,71,171,1)', color: 'white' }}>
    Crear evento
  </Button>

  <Button type="reset" className="ms-4 mt-3" variant="contained" style={{ backgroundColor: 'rgba(0,71,171,1)', color: 'white' }}>
    Reset
  </Button>
</form>
</div>)}