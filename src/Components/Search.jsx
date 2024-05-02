import styles from "./Search.module.css";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { useQuery } from "../utils/utilidades";

export function Search() {
  const history = useNavigate();

  const [search, setSearch] = useState("");
  const handAlert = () => {
    let searchText = document.querySelector("#texto").value;

    history("/filtrar/?search=" + searchText);

  };

//   const MyComponent = () => {
//     const location = useLocation();
//   const currentPath = location.pathname;
// console.log(currentPath);
// if(currentPath===""){

// }else{

// }
// const MyComponent = () => {
//   const location = useLocation();

//   // Accede a la ruta actual
//   const currentPath = location.pathname;

//   return (
//     <div>
//       <p>Ruta actual: {currentPath}</p>
//     </div>
//   );
// };

// MyComponent();

  const navegar=(e)=>{
    e.preventDefault();
    let value = e.target.value;
    setSearch(value);
    history("/events/?search=" + value);
    // console.log({value});
    // tener cuidado con el renderizado para que vaya cogiendo la ultima letra 
  }

  // useEffect(() => {
  //   setSearch("")
  //   }, [history]);

  // const query = useQuery();
  // const sBusqueda = query.get("search");

  //   useEffect(() => {
  //   setSearch(sBusqueda || '')
  //   }, [sBusqueda]);


  return (
    <div className={styles.formulario}>
      <input type="text" name="texto" id="texto" value={search} onChange={navegar} autoComplete="off" />
       <FaSearch className="ms-1 fs-5 " onClick={handAlert} style={{cursor:'pointer'}}/>
    </div>
  );
  
}
