import { useForm } from "react-hook-form"
import { TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useRef } from "react";


export function FormularioCreateHook(){
  const formularioRef = useRef(null);
    const {register,handleSubmit,formState: { errors }}=useForm();


    
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
    borderRadius: '1px',
    color: 'white',
    boxShadow: '0 0 1px 2px rgba(0, 71, 171, 1)',
  }}>

<TextField
  id="nombre"
  label="Nombre"
  variant="outlined"
  margin="normal"
  style={{ width: '50%' }}
  size="small"
  {...register("nombre", {
    required: true,
    maxLength: 20,
    pattern: /^[A-Z]/,
  })}
  InputProps={{ style: { color: '#333' } }} // Estilo para el texto del input

/>

<TextField
  id="apellidos"
  label="Apellidos"
  variant="outlined"
  margin="normal"
  style={{ width: '50%' }}
  size="small"
  {...register("apellidos", {
    required: true,
    maxLength: 20,
    pattern: /^[A-Z]/,
  })}
  InputProps={{ style: { color: '#333' } }} // Estilo para el texto del input

/>

<TextField
  id="edad"
  label="Edad"
  variant="outlined"
  margin="normal"
  style={{ width: '50%' }}
  size="small"
  type="number"
  inputProps={{ min: 1 }}
  {...register("edad", { required: true })}
  InputProps={{ style: { color: '#333' } }} // Estilo para el texto del input

/>

<TextField
  id="email"
  label="Email"
  variant="outlined"
  margin="normal"
  style={{ width: '50%' }}
  size="small"
  {...register("email", { required: true })}
  InputProps={{ style: { color: '#333' } }} // Estilo para el texto del input

/>

<TextField
  id="username"
  label="Usuario"
  variant="outlined"
  margin="normal"
  style={{ width: '50%' }}
  size="small"
  {...register("username", { required: true })}
  InputProps={{ style: { color: '#333' } }} // Estilo para el texto del input

/>

<TextField
  id="password"
  label="Contraseña"
  variant="outlined"
  margin="normal"
  style={{ width: '50%' }}
  size="small"
  type="password"
  {...register("password", { required: true })}
  InputProps={{ style: { color: '#333' } }} // Estilo para el texto del input

/>

<Button type="submit" className="mt-3" variant="contained" style={{ backgroundColor: 'rgba(0,71,171,1)', color: 'white' }}>
  Registrarse
</Button>

<Button type="reset" className="ms-4 mt-3" variant="contained" style={{ backgroundColor: 'rgba(0,71,171,1)', color: 'white' }}>
  Reset
</Button>

{errors.nombre?.type === "maxLength" && (
  <p role="alert" style={{ color: 'crimson' }}>El nombre debe tener máximo 20 caracteres</p>
)}

{errors.nombre?.type === "required" && (
  <p role="alert" style={{ color: 'crimson' }}>El nombre es obligatorio</p>
)}

{errors.nombre?.type === "pattern" && (
  <p role="alert" style={{ color: 'crimson' }}>El nombre debe comenzar con mayúscula</p>
)}

{errors.apellidos?.type === "maxLength" && (
  <p role="alert" style={{ color: 'crimson' }}>Los apellidos deben tener máximo 20 caracteres</p>
)}

{errors.apellidos?.type === "required" && (
  <p role="alert" style={{ color: 'crimson' }}>Los apellidos son obligatorios</p>
)}

{errors.apellidos?.type === "pattern" && (
  <p role="alert" style={{ color: 'crimson' }}>Los apellidos deben comenzar con mayúscula</p>
)}

{errors.edad && (
  <p role="alert" style={{ color: 'crimson' }}>La edad es obligatoria y debe ser mayor a 1899</p>
)}

{errors.email && (
  <p role="alert" style={{ color: 'crimson' }}>El email es obligatorio</p>
)}

{errors.username && (
  <p role="alert" style={{ color: 'crimson' }}>El usuario es obligatorio</p>
)}

{errors.password && (
  <p role="alert" style={{ color: 'crimson' }}>La contraseña es obligatoria</p>
)}

</form>


</div>
    )
}