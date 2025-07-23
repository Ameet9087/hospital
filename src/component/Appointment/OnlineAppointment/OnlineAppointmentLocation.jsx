import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OnlineAppointmentLocation.css";
import { FaLocationDot } from "react-icons/fa6";
import Speciality from "./OnlineAppointmentSpeciality";
import { API_BASE_URL } from "../../api/api";
import { FloatingInput } from "../../../FloatingInputs";

function Location({ searchQuery = "" }) {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/location-masters`);
        setLocations(response.data);
      } catch (error) {
        setError("Failed to fetch locations. Please try again later.");
        console.error("Error fetching locations:", error);
      }
    };
    fetchLocations();
  }, []);

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    console.log(location);
  };

  // Filter locations based on the search query
  const filteredLocations =locations.length>0 && locations.filter((location) =>
    location?.locationName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {error && <p className="error-message">{error}</p>}
      {!selectedLocation && !error && locations.length === 0 && (
        <p>Loading locations...</p>
      )}
      {!selectedLocation && !error && locations.length > 0 && (
        <div className="Location-locations-list">
          {filteredLocations.map((location) => (
            <span
              key={location.locationCode || location.id}
              className="Location-item"
              onClick={() => handleLocationClick(location)}
            >
              <FaLocationDot className="location-icon" />
              <h3>{location.locationName}</h3>
            </span>
          ))}
        </div>
      )}
      {selectedLocation && (
        <div>
          <h2>{selectedLocation.locationName}</h2>
          <Speciality location={selectedLocation} searchQuery={searchQuery} />
        </div>
      )}
    </>
  );
}

export default Location;
