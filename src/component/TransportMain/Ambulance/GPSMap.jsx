import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import io from 'socket.io-client';
import 'leaflet/dist/leaflet.css';
import './GPSMap.css';

// Initialize your socket connection
// const socket = io('http://localhost:8000'); 

const GPSMap = () => {
  const [position, setPosition] = useState([51.505, -0.09]); 
  const [markerPosition, setMarkerPosition] = useState(position);

  // useEffect(() => {
  //   socket.on('locationUpdate', (newPosition) => {
  //     setPosition([newPosition.lat, newPosition.lng]);
  //     setMarkerPosition([newPosition.lat, newPosition.lng]);
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  return (
    <div className="gps-map-con-map-gps">
      <h1>GPS Tracking</h1>
      {/* <MapContainer className='map-con-gps-map' center={position} zoom={13} >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={markerPosition}>
          <Popup>
            Live Location
          </Popup>
        </Marker>
      </MapContainer> */}
    </div>
  );
};

export default GPSMap;
