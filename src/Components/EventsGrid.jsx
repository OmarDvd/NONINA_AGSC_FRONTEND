import styles from "./EventsGrid.module.css";
import { EventCard } from "./EventCard";
import { useEffect, useState,  useRef } from "react";
import { Spinner } from "../Components/Spinner"
import { useLocation } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";
import InfiniteScroll from 'react-infinite-scroll-component';
import {Search} from "../Components/Search"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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
  const [selectedDate, setSelectedDate] = useState(null);

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
        // console.log("Id del municipio: " + selectedId);
        // console.log("Nombre del municipio: " + selectedName);
        break;

    
      case 'tipo':
        setTipo(value);
        setTipoId(selectedId);

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

  const handleDateChange = (date) => {
    // Asegúrate de ajustar la fecha a la zona horaria local si es necesario
    const localDate = date ? new Date(date.getTime() - date.getTimezoneOffset() * 60000) : null;
    setSelectedDate(localDate);
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


      const options = data.map(municipio => (
        // <option key={municipio.id} value={municipio.name} >{municipio.name}</option>
<option key={municipio.id} value={`${municipio.id}-${municipio.name}`}>
          {municipio.name}
        </option>
      ));
      // options.unshift(<option key="cualquiera" value={["0-cualquiera"]}>Toddos</option>);
      setMunicipioOptions(options);
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
},[cine,municipio,tipo,selectedDate]);









  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {

    const limit = 6; 
    const offset = page * limit; 
    let url="";
    if((query!==null)&&(query!=='')){
      setItems([]);
      setItemsDebounce([]);
       url =`http://localhost:8006/${page}`;
      const response = await fetch(url);
      const data = await response.json();
      data.objects.forEach(item => {
        setItems(prevItems => [...prevItems, item]);
      });
      if(data.length===0){
        setHasMore(false);
      }

    }else{


      // if((municipio !== 'cualquiera')&&(tipo !== 'cualquiera')){


      if(selectedDate !=null){
        url=`https://localhost:7070/api/Evento/allDepend/?municipalityId=${municipioId}&categoryId=${tipoId}&date=${selectedDate.toISOString().split('T')[0]}&limit=${limit}&offset=${offset}`;

      }else{
        url=`https://localhost:7070/api/Evento/allDepend/?municipalityId=${municipioId}&categoryId=${tipoId}&date=${selectedDate}&limit=${limit}&offset=${offset}`;

      }
        console.log(url);

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
    <div className="row">
      <div className="col-lg-4 col-6">
        <p className="mt-3 ms-4 d-block text-start">
          <span className="me-1" style={{ fontSize: "1.8em", color: "rgba(0,71,171,1)" }}>Municipio</span>
        </p>
        <p className="d-block text-start">
          <select className="select-placeholder" name="municipio" value={municipio} onChange={handleSelectChange} style={{ width: '100%',padding:"10px",fontSize:"1.2rem" }}>
     <option key="cualquiera" value={["0-cualquiera"]}>Todos</option>;

            {municipioOptions}
          </select>
        </p>
      </div>
      <div className="col-lg-4 col-6">
        <p className="mt-3 ms-4 d-block text-start">
          <span className="me-1" style={{ fontSize: "1.8em", color: "rgba(0,71,171,1)" }}>Evento</span>
        </p>
        <p className="d-block text-start">
          <select className="select-placeholder" name="tipo" value={tipo} onChange={handleSelectChange} style={{ width: '100%',padding:"10px",fontSize:"1.2rem" }}>
          <option key="cualquiera" value={["0-cualquiera"]}>Todos</option>;

            {tipoOptions}
          </select>
        </p>
      </div>
      <div className="col-lg-4 col-12 ">
        <p className="mt-3 ms-4 d-block text-start">
          <span className="me-1" style={{ fontSize: "1.8em", color: "rgba(0,71,171,1)" ,paddingLeft:"10px",display:"block"}}>Fecha</span>
        </p>
        <p className="d-block text-start custom-datepicker">
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText="Selecciona una fecha"
            isClearable
            className="form-control "
            style={{fontSize:"1.2rem"}}
            
          />
        </p>
      </div>
      {/* <div className="col-lg-3 col-6">
        <p className="mt-3 ms-4 d-block text-start">
        </p>
        <p className="d-block text-start">
          <Search />
        </p>
      </div> */}


   
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
  












