import { useForm } from "react-hook-form"
import { TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useRef } from "react";
import jwtDecode from 'jwt-decode';


export function FormularioLoginHook({toggleState}){



  const formularioRef = useRef(null);
    const {register,handleSubmit,formState: { errors }}=useForm();

    
    // const loginFuncion =  (data) => {


    //      fetch('https://fakestoreapi.com/auth/login',{
    //       method:'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         username:"mor_2314",
    //         password:"83r5^_"
    //       })
    //   })
    //   .then(res => {
    //     console.log('Response:', res);
    //     return res.json();
    // })        .then(data => {
    //       if (data.token) {
    //         console.log(data);
    //         toggleState(true);


    //         formularioRef.current.reset();
    //         // alert("Inicio de sesión exitoso");
    //       } else {
    //         alert("Usuario o contraseña incorrectos");
    //       }
    //     })
        
        
        

    //   .catch(error=> {
    //     console.error("Error al crear la lista:", error);
    //   }
    // );}


    
    const loginFuncion =  (data) => {

      var usernameReceived=data.username;

      fetch('https://localhost:7070/api/Autentication/validar',{
       method:'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         username:data.username,
         clave:data.password
       })
   })
   .then(res => {
     console.log('Response:', res);
     return res.json();
 })        .then(data => {
       if (data.token) {
         console.log(data);
         toggleState(true);

         const expiresInMinutes = parseInt(data.expiresIn);
         console.log(expiresInMinutes);
         const tokenExpiration = Date.now() + (expiresInMinutes * 60000);
         console.log(tokenExpiration);


         // Guardar el token y la hora de expiración en el localStorage
         localStorage.setItem('authToken', data.token);
         localStorage.setItem('tokenExpiration', tokenExpiration);



         localStorage.setItem('name', data.name); // Guarda el token en el local storage
         localStorage.setItem('email', data.email); // Guarda el token en el local storage
         localStorage.setItem('owner', data.owner); // Guarda el token en el local storage
         localStorage.setItem('admin', data.admin); // Guarda el token en el local storage
         localStorage.setItem('authToken', data.token); // Guarda el token en el local storage
         localStorage.setItem('id', data.id); // Guarda el token en el local storage

         localStorage.setItem('username', usernameReceived); // Guarda el token en el local storage


         formularioRef.current.reset();
        } else {
          alert("Contraseña incorrecta");
        }
      })
      .catch(error => {
        console.error("Error al iniciar sesión:", error);
        alert("Usuario inexistente");

      });
  };

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