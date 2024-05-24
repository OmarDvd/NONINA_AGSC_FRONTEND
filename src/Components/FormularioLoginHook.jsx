import { useForm } from "react-hook-form"
import { TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useRef } from "react";


export function FormularioLoginHook({toggleState}){
  const formularioRef = useRef(null);
    const {register,handleSubmit,formState: { errors }}=useForm();

    
    const loginFuncion =  (data) => {


         fetch('https://fakestoreapi.com/auth/login',{
          method:'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username:"mor_2314",
            password:"83r5^_"
          })
      })
      .then(res => {
        console.log('Response:', res);
        return res.json();
    })        .then(data => {
          if (data.token) {
            console.log(data);
            toggleState(true);


            formularioRef.current.reset();
            // alert("Inicio de sesión exitoso");
          } else {
            alert("Usuario o contraseña incorrectos");
          }
        })
        
        
        

      .catch(error=> {
        console.error("Error al crear la lista:", error);
      }
    );}
    return (
        <div>
<form ref={formularioRef} onSubmit={handleSubmit(loginFuncion)} method="post" style={{
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '20px',
    borderRadius: '1px',
    color: 'white',
    boxShadow: '0 0 1px 2px rgba(0, 71, 171, 1)',
  }}>


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

<Button className="mt-3" type="submit" variant="contained" style={{ backgroundColor: 'rgba(0, 71, 171, 1)', color: 'white' }}>
  Login
</Button>

<Button className="ms-4 mt-3" type="reset" variant="contained" style={{ backgroundColor: 'rgba(0, 71, 171, 1)', color: 'white' }}>
  Reset
</Button>


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