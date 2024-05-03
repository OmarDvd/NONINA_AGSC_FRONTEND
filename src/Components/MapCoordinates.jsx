import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIconUrl = '/marcador-de-posicion.png';

export function MapCoordinates({ latitud, longitud }) {
  const position = [latitud, longitud];

  // Crear un icono personalizado
  const customIcon = L.icon({
    iconUrl: customIconUrl,
    iconSize: [32, 32], // Tamaño del icono
    iconAnchor: [16, 32], // Punto de anclaje del icono
    popupAnchor: [0, -32] // Punto de anclaje del popup
  });

  return (
    <div style={{ height: '400px' }} className="mt-lg-3">
      <MapContainer center={position} zoom={15} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={customIcon} >
          {/* <Popup>
            Ubicación
          </Popup> */}
        </Marker>
      </MapContainer>
    </div>
  );
}
