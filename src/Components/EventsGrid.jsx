import styles from "./EventsGrid.module.css";
import { EventCard } from "./EventCard";
import { useEffect, useState,  useRef } from "react";
import { Spinner } from "../Components/Spinner"
import { useLocation } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import InfiniteScroll from 'react-infinite-scroll-component';
import {Search} from "../Components/Search"

import "../styles.css";

// import {Footer} from '../Components/Footer'; 

function useQuery(){
  return new URLSearchParams(useLocation().search);
}

export function EventsGrid({
  toggleState,
  logeado 
}) {

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
  const [municipio, setMunicipio] = useState('cualquiera');
  const [municipioId, setMunicipioId] = useState(0);

  const [municipioOptions, setMunicipioOptions] = useState([]);

  const [tipo, setTipo] = useState('cualquiera');
  const [tipoId, setTipoId] = useState(0);

  const [tipoOptions, setTipoOptions] = useState([]);

  const [fecha, setFecha] = useState("2024-02-02");
  const [fechaOptions, setFechaOptions] = useState([]);

  const [permiso, setPermiso] = useState(false);



  const [cine, setCine] = useState('cualquiera');
  const [cineOptions, setCineOptions] = useState([]);


  const [puntuacion, setPuntuacion] = useState('ASC');

  const [categorias, setCategorias] = useState(true);


  const handleSelectChange = (e) => {
    const { name, value } = e.target;

    // Separar el id y el name utilizando el guion medio como delimitador
    const [selectedId, selectedName] = value.split("-");
  
    // Actualizar el estado con el id y el name separados
    switch (name) {
      case 'municipio':
        setMunicipio(value);
        setMunicipioId(selectedId);
        console.log("Id del municipio: " + selectedId);
        console.log("Nombre del municipio: " + selectedName);
        break;

    
      case 'tipo':
        setTipo(value);
        setTipoId(selectedId);

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

// useEffect(() => {
//   fetch('http://localhost:8000/0')
//     .then(response => response.json())
//     .then(data => {
//       const options = data.map(user => (
//         <option key={user.username} value={user.username}>{user.nombre}</option>
//       ));
//       options.unshift(<option key="cualquiera" value="cualquiera">Cualquiera</option>);
//       setCineOptions(options);
//     })
//     .catch(error => console.error('Error fetching cine users:', error));
// }, []);


useEffect(() => {
  fetch('https://localhost:7070/api/Municipalities')
    .then(response => response.json())
    .then(data => {
      console.log("trtrtrtttttttt");

      console.log(data[0].id);

      const options = data.map(municipio => (
        // <option key={municipio.id} value={municipio.name} >{municipio.name}</option>
<option key={municipio.id} value={`${municipio.id}-${municipio.name}`}>
          {municipio.name}
        </option>
      ));
      options.unshift(<option key="cualquiera" value={["0-cualquiera"]}>Todos</option>);
      setMunicipioOptions(options);
    })
    .catch(error => console.error('Error fetching municipio :', error));
}, []);


useEffect(() => {
  fetch('https://localhost:7070/api/Categories')
    .then(response => response.json())
    .then(data => {
      console.log(data[0]);

      const options = data.map(tipo => (
        // <option key={tipo.id} value={tipo.name} >{tipo.name}</option>
<option key={tipo.id} value={`${tipo.id}-${tipo.name}`}>
        {tipo.name}
      </option>
      ));
      options.unshift(<option key="cualquiera" value={["0-cualquiera"]}>Todos</option>);
      setTipoOptions(options);
    })
    .catch(error => console.error('Error fetching tipo :', error));
}, []);

/////////////////////////////////////////////////////////////////////////////////////////////

  const effectRan=useRef(false);
  const effectRanDos=useRef(false);

  const query=useQuery().get('search');

  const debounceSearch = useDebounce(query,500);

   useEffect(() => {

    setMunicipio("cualquiera");
    setTipo("cualquiera");
    setPage(0);
    setItems([]);
     setCadenaQuery(query);
     if(query===""){

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
      fetchData();

    }

    return ()=>{
      effectRan.current=true;
    }
    
  }, [categorias,debounceSearch]);


 






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
},[cine,municipio,tipo]);









  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {

    const limit = 6; 
    const offset = page * limit; 
    let url="";
    console.log(query+"frdfd");
    if((query!==null)&&(query!=='')){
      console.log(page);
      setItems([]);
      setItemsDebounce([]);
       url =`http://localhost:8006/${page}`;
       console.log("imprime query "+query);
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      data.objects.forEach(item => {
        setItems(prevItems => [...prevItems, item]);
      });
      if(data.length===0){
        setHasMore(false);
      }

    }else{



      // if((municipio !== 'cualquiera')&&(tipo !== 'cualquiera')){
        console.log(municipioId);
        url=`https://localhost:7070/api/Evento/allDepend/?municipalityId=${municipioId}&categoryId=${tipoId}&limit=${limit}&offset=${offset}`;

      // }else if((municipio !== 'cualquiera')||(tipo !== 'cualquiera')){
      //   if (municipio !== 'cualquiera') {
      //     url=`http://localhost:8004/${page}?`;
  
      //   }
        
      //   if (tipo !== 'cualquiera') {
      //     url=`http://localhost:8005/${page}?`;
      //   }
      // }else{
      //   url=`http://localhost:8000/${page}?`;

      // }


       
      console.log(url);
       const response = await fetch(url);
       const data = await response.json();
 
       if(data.length===0){
         setHasMore(false);
       }
       console.log(data);
       data.forEach(item => {
        setItems(prevItems => [...prevItems, item]);
      });
               setPage(prevPage => prevPage + 1);

    }

  

    } catch (error) {
      setHasMore(false);

      setError(error);
    } finally {
      setIsLoading(false);
    }
  }






























 return (       
   <div className="row ">

    <div className="col-lg-3 col-4"><p className="mt-3 ms-4  mb-4 d-block text-start"><span className="me-4" style={{fontSize:"1.8em",color:"rgba(0,71,171,1"}}>Municipio</span><select name="municipio" value={municipio} onChange={handleSelectChange}>
    {municipioOptions}
</select></p></div>
<div className="col-lg-3  col-4"><p className="mt-3 ms-3 mb-4  d-block"><span className="me-4"  style={{fontSize:"1.8em",color:"rgba(0,71,171,1"}}>Evento</span><select name="tipo" value={tipo} onChange={handleSelectChange}>
    {tipoOptions}
</select></p></div>

<div className="col-lg-3  col-4"><p className="mt-3 ms-3 mb-4  d-block"><span className="me-4"  style={{fontSize:"1.8em",color:"rgba(0,71,171,1"}}>Fecha</span><select name="genero" value={fecha} onChange={handleSelectChange}>
    {fechaOptions}
</select></p></div>
<div className="col-lg-3 col-12">
<Search />
</div>

   
<InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={hasMore}
      loader={<div style={{ color: '#00857d' }} className="d-flex flex-column"><p style={{ color: '#00857d' }}>Recuperando datos del servidor... </p><Spinner /></div>}
      endMessage={<p style={{ color: '#00857d' }}>No más coincidencias encontradas</p>}
      style={{ minHeight: 'calc(100vh - 100px)' }} 
    >
      <div className=" ">
        {items.map((item) => (
          <EventCard key={item.event_id} activity={item} toggleState={toggleState} logeado={logeado} />
        ))}
    </div>
    </InfiniteScroll>
                 </div>
              );

}
  












