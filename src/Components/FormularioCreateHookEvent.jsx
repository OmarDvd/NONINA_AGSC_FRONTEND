import { useForm } from "react-hook-form"
import { TextField, Button, RadioGroup, FormControlLabel, Radio,Input } from '@mui/material';
import { useRef } from "react";
import { useEffect, useState } from "react";
import { MapaBuscar } from "../Components/MapaBuscar";


export function FormularioCreateHookEvent({
  toggleState
}){


// Función para obtener el valor de una cookie específica por su nombre
function getCookie(name) {
  const cookieName = name + "=";
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim();
      if (cookie.indexOf(cookieName) === 0) {
          return cookie.substring(cookieName.length, cookie.length);
      }
  }
  
  return null; // Retorna null si la cookie no se encuentra
}

// Obtener el valor de la cookie 'authToken'
const authToken = getCookie('authToken');

  
  


  const [valueMap, setValueMap] = useState('');

  const id = localStorage.getItem("id");
  const token = localStorage.getItem('authToken'); 


  const [municipio, setMunicipio] = useState('cualquiera');
  const [municipioId, setMunicipioId] = useState(0);
  const [municipioOptions, setMunicipioOptions] = useState([]);

  const [tipo, setTipo] = useState('cualquiera');
  const [tipoId, setTipoId] = useState(0);
  const [tipoOptions, setTipoOptions] = useState([]);


  useEffect(() => {
    fetch('https://noninabackendapigr.work.gd/api/Municipalities')
      .then(response => response.json())
      .then(data => {
  
  
        const options = data.map(municipio => (
  <option key={municipio.id} value={`${municipio.id}-${municipio.name}`}>
            {municipio.name}
          </option>
        ));
        setMunicipioOptions(options);
        setMunicipioId(options[0].key);
      })
      .catch(error => console.error('Error fetching municipio :', error));
  }, []);
  

  useEffect(() => {
    fetch('https://noninabackendapigr.work.gd/api/Categories')
      .then(response => response.json())
      .then(data => {
  
        const options = data.map(tipo => (
  <option key={tipo.id} value={`${tipo.id}-${tipo.name}`}>
          {tipo.name}
        </option>
        ));
        setTipoOptions(options);
        setTipoId(options[0].key);

      })
      .catch(error => console.error('Error fetching tipo :', error));
  }, []);
  





  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    const [selectedId, selectedName] = value.split("-");
  
    // Actualizar el estado con el id y el name separados
    switch (name) {
      case 'municipio':
        setMunicipio(value);
        setMunicipioId(selectedId);

        break;

    
      case 'tipo':
        setTipo(value);
        setTipoId(selectedId);


        break;
      default:
        break;
    }

  };









  const formularioRef = useRef(null);
    const {register,handleSubmit,formState: { errors }}=useForm();
    const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

    const handleImagenChange = (event) => {
      // Capturar la imagen seleccionada y almacenarla en el estado
      const imagen = event.target.files[0];
      setImagenSeleccionada(imagen);
    };

    
    const createList = async (data) => {
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



        const formData = new FormData();
    
        // Agregar la imagen al FormData
    if (imagenSeleccionada) {
      formData.append("ImageFile", imagenSeleccionada);
      console.error(imagenSeleccionada);

    } else {
      console.error("No image selected");
      return;
    }

    // Log formData entries for debugging
    for (let pair of formData.entries()) {
      console.error(" image yeah ");

    }


    
    const url='https://noninabackendapigr.work.gd/api/Evento/AddEventoToken?Id=1&Title=' + encodeURIComponent(data.titulo) 
    + '&Description=' + encodeURIComponent(data.descripcion) 
    + '&PlaceLabel=' + encodeURIComponent(data.ubicacion) 
    + '&PlaceCoordinates=' + valueMap
    + '&Date=' + encodeURIComponent(data.fecha)
    + '&year=' + data.fecha.slice(0, 4) 
    + '&month=' + data.fecha.slice(5, 7) 
    + '&day=' + data.fecha.slice(8, 10) 
    + '&dayOfWeek=0&hour=' + data.fecha.slice(0, 2) 
    + '&minute=' + data.hora.slice(3, 5) 
    + '&Time=' + encodeURIComponent(data.hora)
    + '&MunicipalityId='+ municipioId
    + '&CategoryId='+ tipoId 
   +'&ImageEvento=dfdf';

        const response = await fetch(url, {
          method: 'POST',

            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
            mode: 'cors',

            body: formData,
        
        });
    
        if (!response.ok) {
          throw new Error('Error al crear la listaa');
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
        style={{color:"#333"}}
        {...register("imagen", { required: true })}
        onChange={handleImagenChange} // Capturar cambios en la imagen seleccionada
        inputProps={{ style: { display: 'none' } }}
      />
      <label htmlFor="imagen">
        <Button component="span" variant="outlined" style={{ textTransform: 'none' ,color:"#333"}}>
          Seleccionar imagen
        </Button>
      </label>

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
    InputProps={{ style: { color: '#333' } }} 
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
    InputProps={{ style: { color: '#333' } }} 
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
  <p className="mt-3 ms-4 d-block text-center">
    <span className="me-1" style={{ fontSize: "1.3em", color: "#333" }}>Municipio</span>
  </p>
  <select className="select-placeholder" name="municipio" value={municipio} onChange={handleSelectChange} style={{ width: '100%',backgroundColor:"white",padding:"10px" }}>

{municipioOptions}
</select>
</p>

<p>
  <p className="mt-3 ms-4 d-block text-center">
    <span className="me-1" style={{ fontSize: "1.3em", color: "#333" }}>Tipo de evento</span>
  </p>
  <select className="select-placeholder" name="tipo" value={tipo} onChange={handleSelectChange} style={{ width: '100%', backgroundColor:"white",padding:"10px" }}>

            {tipoOptions}
          </select>

</p>

      <TextField
        id="ubicacion"
        label="Dirección del lugar/establecimiento"
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

<p className="mb-2 mt-4" style={{fontSize: "1.3em", color: "#333"}} >Busca y marca abajo en el mapa para más exactitud</p>
<MapaBuscar valueMap={valueMap} setValueMap={setValueMap}/>




  <Button type="submit" className="mt-3" variant="contained" style={{ backgroundColor: 'rgba(0,71,171,1)', color: 'white' }}>
    Crear evento
  </Button>

  <Button type="reset" className="ms-4 mt-3" variant="contained" style={{ backgroundColor: 'rgba(0,71,171,1)', color: 'white' }}>
    Reset
  </Button>
</form>
</div>)}