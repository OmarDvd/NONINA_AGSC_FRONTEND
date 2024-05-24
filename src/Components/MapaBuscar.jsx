import { useEffect, useState } from "react";

import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

export function MapaBuscar() {
    const [coordenadas, setCoordenadas] = useState(null);
    const customIconUrl = '/marcador-de-posicion.png';
  
  
    const customIcon = L.icon({
      iconUrl: customIconUrl,
      iconSize: [32, 32], // Tamaño del icono
      iconAnchor: [16, 32], // Punto de anclaje del icono
      popupAnchor: [0, -32] // Punto de anclaje del popup
    });
  
    function handleMapClick(event) {
      setCoordenadas(event.latlng);
      console.log(coordenadas);
    }
  
    return (
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "300px",zIndex:1}}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MarcadorSeleccion onClick={handleMapClick} />
        {coordenadas && <Marker position={coordenadas} icon={customIcon} ><Popup>Coordenadas: {coordenadas.toString()}</Popup></Marker>}
        <LeafletControlGeocoder />
      </MapContainer>
    );
  }
  
  function MarcadorSeleccion({ onClick }) {
    useMapEvents({
      click: (event) => {
        onClick(event);
        
      },
    });
    return null;
  }
  
  function LeafletControlGeocoder() {
    const map = useMapEvents({
      geocoder: false
    });
    
    // Asegúrate de que el control de búsqueda se añada solo una vez al mapa
    const addGeocoderToMap = () => {
      if (!map.geocoderAdded) {
        map.geocoderAdded = true;
        const geocoder = L.Control.geocoder({
          defaultMarkGeocode: false
        }).on('markgeocode', function (e) {
          map.setView(e.geocode.center, map.getZoom());
        }).addTo(map);
      }
    };
    
    map.whenReady(addGeocoderToMap);
    
    return null;
  }