import { useForm } from "react-hook-form";
import { TextField, Button } from '@mui/material';
import { useRef, useEffect, useState } from "react";

export function FormularioCreateHookEventEdit({ id,toggleState }) {
  const formularioRef = useRef(null);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  const handleImagenChange = (event) => {
    const imagen = event.target.files[0];
    setImagenSeleccionada(imagen);
  };

  useEffect(() => {
    const eventID = id; // Usar el id pasado como prop
    fetch(`https://localhost:7070/api/Evento/${eventID}`)
      .then(response => response.json())
      .then(data => {
        // Prellenar los valores en el formulario
        setValue("Title", data.Title);
        setValue("Description", data.Description);
        setValue("Date", data.Date);
        setValue("Time", data.Time);
        setValue("PlaceCoordinates", data.PlaceCoordinates);
        setValue("PlaceLabel", data.PlaceLabel);
        setValue("MunicipalityId", data.MunicipalityId);
        setValue("CategoryId", data.CategoryId);

      })
      .catch(error => console.error('Error fetching event:', error));
  }, []);

  const createList = async (data) => {
    const token = localStorage.getItem('authToken'); // Obtén el token del local storage

    // Verifica si el token existe antes de continuar
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
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }
      if (imagenSeleccionada) {
        formData.append("ImageFile", imagenSeleccionada);
      }

      const response = await fetch('https://localhost:7070/api/EventoEditToken?Id='+data.Id+'&Title=' + encodeURIComponent(data.Title) + '&Description=' + encodeURIComponent(data.Description) + '&PlaceLabel=' + encodeURIComponent(data.PlaceLabel) + '&PlaceCoordinates=' + encodeURIComponent(data.PlaceCoordinates) + '&year=' + data.Date.slice(0, 4) + '&month=' + data.Date.slice(5, 7) + '&day=' + data.Date.slice(8, 10) + '&dayOfWeek=0&hour=' + data.Time.slice(0, 2) + '&minute=' + data.Time.slice(3, 5) + '&MunicipalityId='+data.MunicipalityId+'&CategoryId='+data.CategoryId, {
        method: 'PUT', 
        headers: {
          'Authorization': `Bearer ${token}` // Agrega el token a los encabezados
      },
      mode: 'cors',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al crear la lista');
      }

      const responseData = await response.json();
      alert("Evento creado");
      formularioRef.current.reset();

    } catch (error) {
      console.error("Error al crear la lista:", error);
    }
  }}
  };

  return (
    <div>
      <form ref={formularioRef} onSubmit={handleSubmit(createList)} method="post" style={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        paddingTop: "20px",
        borderRadius: '1px',
        color: 'black',
        boxShadow: '0 0 1px 2px rgba(0, 71, 171, 1)',
      }}>
        {/* <p>
          <input
            type="file"
            accept="image/jpeg, image/png, image/gif, image/webp"
            id="ImageFile"
            name="ImageFile"
            {...register("ImageFile", { required: true })}
            onChange={handleImagenChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="ImageFile">
            <Button component="span" variant="outlined" style={{ textTransform: 'none' }}>
              Seleccionar imagen
            </Button>
          </label>
          {imagenSeleccionada && <p>{imagenSeleccionada.name}</p>}
          {errors.ImageFile && (
            <p role="alert" style={{ color: 'crimson' }}>Debe seleccionar una imagen</p>
          )}
        </p> */}
        <p>
          <TextField
            id="Title"
            name="Title"
            label="Título del evento"
            variant="outlined"
            margin="normal"
            style={{ width: '50%' }}
            size="small"
            {...register("Title", {
              required: true,
              maxLength: 50,
            })}
            InputProps={{ style: { color: '#333' } }}
          />
          {errors.Title?.type === "required" && (
            <p role="alert" style={{ color: 'crimson' }}>El título del evento es obligatorio</p>
          )}
          {errors.Title?.type === "maxLength" && (
            <p role="alert" style={{ color: 'crimson' }}>El título del evento debe tener máximo 50 caracteres</p>
          )}
        </p>
        <TextField
          id="Description"
          name="Description"
          label="Descripción"
          variant="outlined"
          margin="normal"
          style={{ width: '50%' }}
          size="small"
          multiline
          rows={4}
          {...register("Description", { required: true })}
          InputProps={{ style: { color: '#333' } }}
        />
        {errors.Description && (
          <p role="alert" style={{ color: 'crimson' }}>La descripción del evento es obligatoria</p>
        )}
        <p>
          <TextField
            id="Date"
            name="Date"
            label=""
            type="date"
            variant="outlined"
            margin="normal"
            style={{ width: '50%' }}
            size="small"
            {...register("Date", { required: true })}
            InputProps={{ style: { color: '#333' } }}
          />
          {errors.Date && (
            <p role="alert" style={{ color: 'crimson' }}>Debe seleccionar una fecha para el evento</p>
          )}
        </p>
        <p>
          <TextField
            id="Time"
            name="Time"
            label=""
            type="time"
            variant="outlined"
            margin="normal"
            style={{ width: '50%' }}
            size="small"
            {...register("Time", { required: true })}
            InputProps={{ style: { color: '#333' } }}
          />
          {errors.Time && (
            <p role="alert" style={{ color: 'crimson' }}>Debe seleccionar una hora para el evento</p>
          )}
        </p>
        <p>
          <TextField
            id="PlaceCoordinates"
            label="PlaceCoordinates"
            variant="outlined"
            margin="normal"
            style={{ width: '50%' }}
            size="small"
            {...register("PlaceCoordinates", { required: true })}
            InputProps={{ style: { color: '#333' } }}
          />
          {errors.PlaceCoordinates && (
            <p role="alert" style={{ color: 'crimson' }}>Debe seleccionar una ubicación en el mapa para el evento</p>
          )}
          <TextField
            id="PlaceLabel"
            label="PlaceLabel"
            variant="outlined"
            margin="normal"
            style={{ width: '50%' }}
            size="small"
            {...register("PlaceLabel", { required: true })}
            InputProps={{ style: { color: '#333' } }}
          />
          {errors.PlaceLabel && (
            <p role="alert" style={{ color: 'crimson' }}>Debe seleccionar una ubicación en el mapa para el evento</p>
          )}
        </p>
        <Button type="submit" className="mt-3" variant="contained" style={{ backgroundColor: 'rgba(0,71,171,1)', color: 'white' }}>
          Crear evento
        </Button>
        <Button type="reset" className="ms-4 mt-3" variant="contained" style={{ backgroundColor: 'rgba(0,71,171,1)', color: 'white' }}>
          Reset
        </Button>
      </form>
    </div>
  );
}