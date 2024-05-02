import styles from "./ProductosGrid.module.css";
import { ProductoCard } from "./ProductCard";
import { useEffect, useState,  useRef } from "react";
import { Spinner } from "../componentes/Spinner"
import { useLocation } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import InfiniteScroll from 'react-infinite-scroll-component';
import {Footer} from '../componentes/Footer'; // Importa tu componente Spinner

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

export function ProductosGrid({}) {

  const [cadenaQuery, setCadenaQuery] = useState('');
  const [items, setItems] = useState([]);
  const [itemsDebounce, setItemsDebounce] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [pageControl, setPageControl] = useState(1);
  const [hasMore, setHasMore] = useState(true); 

  /*Variables para pasarle a mi api
  funcion asignada para cambiar su valor cuando se cambie,
  peticion para cargar las categorias*/
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [genero, setGenero] = useState('cualquiera');
  const [generoOptions, setGeneroOptions] = useState([]);

  const [permiso, setPermiso] = useState(false);


  const [fecha, setFecha] = useState('cualquiera');

  const [cine, setCine] = useState('cualquiera');
  const [cineOptions, setCineOptions] = useState([]);


  const [puntuacion, setPuntuacion] = useState('ASC');

  const [categorias, setCategorias] = useState(true);


  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'genero':

        setGenero(value);
        break;
      case 'puntuacion':
        setPuntuacion(value);
        break;
      case 'fecha':
        setFecha(value);
        break;
      case 'cine':

        setCine(value);
        break;
      default:
        break;
    }
    setPage(0);
    setItems([]);
    setHasMore(true);
    setPermiso(true);
  };

/*LLAMADAS A CINES*/
useEffect(() => {
  // Fetch para obtener el JSON de la URL
  fetch('http://127.0.0.1:8000/api/user/cine')
    .then(response => response.json())
    .then(data => {
      // Construir opciones para el select
      const options = data.map(user => (
        <option key={user.username} value={user.username}>{user.nombre}</option>
      ));
      // Añadir opción "cualquiera" como valor por defecto
      options.unshift(<option key="cualquiera" value="cualquiera">Cualquiera</option>);
      // Establecer las opciones del select
      setCineOptions(options);
    })
    .catch(error => console.error('Error fetching cine users:', error));
}, []);


/*LLAMADAS A GENERO*/
useEffect(() => {
  // Fetch para obtener el JSON de la URL
  fetch('http://127.0.0.1:8000/api/user/genero')
    .then(response => response.json())
    .then(data => {
      // Construir opciones para el select
      const options = data.map(pelicula => (
        <option key={pelicula.genero.genero} value={pelicula.genero.genero}>{pelicula.genero.genero}</option>
      ));
      // Añadir opción "cualquiera" como valor por defecto
      options.unshift(<option key="cualquiera" value="cualquiera">Todos</option>);
      // Establecer las opciones del select
      setGeneroOptions(options);
    })
    .catch(error => console.error('Error fetching pelicula genero:', error));
}, []);

/////////////////////////////////////////////////////////////////////////////////////////////

  const effectRan=useRef(false);
  const effectRanDos=useRef(false);

  const query=useQuery().get('search');

  const debounceSearch = useDebounce(query,500);

   useEffect(() => {
     setCadenaQuery(query);
     if(query===""){
      // setItems([]);    
    setPage(0);
    setItems([]);
    setHasMore(true);
    setPermiso(true);

      }
   }, [debounceSearch]);



  useEffect(() => {
    if(effectRan.current===false){

      fetchData();

    }
    if(page>1){
      setPermiso(false);
      fetchData();
    }
    if(permiso){
      // setItems([]);
      fetchData();
      // setHasMore(false);

    }

    return ()=>{
      effectRan.current=true;
    }
    
  }, [categorias,debounceSearch]);


 
// }, [categorias,debounceSearch]);






useEffect(() => {
  if(effectRanDos.current===true){
    if (categorias){
      setCategorias(false);
  }else{
    setCategorias(true);
  }
}
  return ()=>{

    effectRanDos.current=true;
  }
},[cine,genero]);
// },[genero, puntuacion, fecha, cine]);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {

    const limit = 6; // Número de elementos por página
    const offset = page * limit; // Calcula el offset basado en la página actual
    let url="";
    console.log(query);
    if((cadenaQuery!==null)&&(cadenaQuery!=='')){
      console.log(page);
      setItems([]);
      setItemsDebounce([]);
      // setPage(0);
       url =`http://127.0.0.1:8000/sesion/apii/${query}`;
       console.log("imprime query "+query);
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      if(data.length===0){
        setHasMore(false);
      }
        setItemsDebounce(prevItems => [...prevItems, ...data]);
    }else{

      // setCine(cine);
      console.log("eeee");

       url =`http://127.0.0.1:8000/sesion/api/${genero}/${fecha}/${cine}/${limit}/${offset}`
       console.log(url);
       const response = await fetch(url);
       const data = await response.json();
       console.log(data);
 
       if(data.length===0){
         setHasMore(false);
       }
         setItems(prevItems => [...prevItems, ...data]);
         setPage(prevPage => prevPage + 1);

    }
    //  const url = !query ?
    //  `http://127.0.0.1:8000/sesion/api/${genero}/${fecha}/${cine}/${limit}/${offset}`
    //   : `http://127.0.0.1:8000/sesion/apii/${query}`;

  

    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }





























if((cadenaQuery!==null)&&(cadenaQuery!=='')){
  return (<div>
<div className="container-fluid">
    <h1>Coincidencias encontradas:</h1>
 <div className="lista">
          <ul className={styles.contenedor}>
            {itemsDebounce.map((item) => (
              <ProductoCard key={item.sesion_id} movie={item} />
            ))}
          </ul>
        </div>  
        </div> <Footer/>
                </div>);
}else{
  return (       <div>
    <div className="container">

    <div ><p className="mt-3 ms-5 mb-4 ps-2 d-inline-block"><span className="me-4">Género</span><select name="genero" value={genero} onChange={handleSelectChange}>
    {generoOptions}
</select></p></div>




{/* <select name="puntuacion" value={puntuacion} onChange={handleSelectChange}>
</select>
<select name="fecha" value={fecha} onChange={handleSelectChange}>
</select>
<p>Cine<select name="cine" value={cine} onChange={handleSelectChange}>
  {cineOptions}
</select></p> */}
   
<InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<div style={{ color: 'white' }}>Recuperando datos del servidor... <Spinner /></div>}
      endMessage={<p style={{ color: 'white' }}>No más coincidencias encontradas</p>}
      style={{ minHeight: 'calc(100vh - 100px)' }} 
    >
    <div className="container">
      <div className="row ">
        {items.map((item) => (
          <ProductoCard key={item.sesion_id} movie={item} />
        ))}
      </div>
    </div>
    </InfiniteScroll>
      </div><Footer/>
                </div>);

}
  
}











