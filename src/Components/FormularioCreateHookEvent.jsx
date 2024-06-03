import { useForm } from "react-hook-form"
import { TextField, Button, RadioGroup, FormControlLabel, Radio,Input } from '@mui/material';
import { useRef } from "react";
import { useEffect, useState } from "react";
import { MapaBuscar } from "../Components/MapaBuscar";
import { Select, MenuItem } from '@mui/material';


export function FormularioCreateHookEvent(){

  const [valueMap, setValueMap] = useState('');

  const id = localStorage.getItem("id");
  const token = localStorage.getItem('authToken'); // Obtén el token del local storage


  const [municipio, setMunicipio] = useState('cualquiera');
  const [municipioId, setMunicipioId] = useState(0);
  const [municipioOptions, setMunicipioOptions] = useState([]);

  const [tipo, setTipo] = useState('cualquiera');
  const [tipoId, setTipoId] = useState(0);
  const [tipoOptions, setTipoOptions] = useState([]);


  useEffect(() => {
    fetch('https://localhost:7070/api/Municipalities')
      .then(response => response.json())
      .then(data => {
  
  
        const options = data.map(municipio => (
          // <option key={municipio.id} value={municipio.name} >{municipio.name}</option>
  <option key={municipio.id} value={`${municipio.id}-${municipio.name}`}>
            {municipio.name}
          </option>
        ));
        // options.unshift(<option key="cualquiera" value={["0-cualquiera"]}>Toddos</option>);
        setMunicipioOptions(options);
        setMunicipioId(options[0].key);
      })
      .catch(error => console.error('Error fetching municipio :', error));
  }, []);
  

  useEffect(() => {
    fetch('https://localhost:7070/api/Categories')
      .then(response => response.json())
      .then(data => {
  
        const options = data.map(tipo => (
          // <option key={tipo.id} value={tipo.name} >{tipo.name}</option>
  <option key={tipo.id} value={`${tipo.id}-${tipo.name}`}>
          {tipo.name}
        </option>
        ));
        // options.unshift(<option key="cualquiera" value={["0-cualquiera"]}>Tosdos</option>);
        setTipoOptions(options);
        setTipoId(options[0].key);

      })
      .catch(error => console.error('Error fetching tipo :', error));
  }, []);
  





  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    // Separar el id y el name utilizando el guion medio como delimitador
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
      try {

        // const nuevoIdCliente =   await incrementaId(); 
  

        // const clienteData = {
        //   ...data,
        //  // Asignar el próximo ID también al objeto cliente
        // };

        const formData = new FormData();
    
        // Agregar los datos del formulario al FormData
        // for (const key in data) {
        //   formData.append(key, data[key]);
        // }
        
        // Agregar la imagen al FormData
        if (imagenSeleccionada) {
          formData.append("ImageFile", imagenSeleccionada);
        }
    console.log("Esto es loq ue enviamos para guardar:")
    console.log(formData);
    const url='https://localhost:7070/api/Evento?Id=1&Title=' + encodeURIComponent(data.titulo) 
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
    +'&UserId='+id+'&ImageEvento=dfdf';
    console.log(url);

        const response = await fetch(url, {
          method: 'POST',

            headers: {
                'Authorization': `Bearer ${token}`
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
        InputProps={{ style: { color: '#333' } }} // Estilo para el texto del input
      />
      {errors.ubicacion && (
        <p role="alert" style={{ color: 'crimson' }}>Debe seleccionar una ubicación en el mapa para el evento</p>
      )}

  {/* Agregar aquí el campo para seleccionar la ubicación en el mapa */}
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