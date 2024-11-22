import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './LocationMaster.css'; // Custom CSS for styling

function SearchPopup() {
  const [searchText, setSearchText] = useState('');
  const [locNames, setLocNames] = useState([]); // State to hold the location names
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Hook for navigation

  // Fetch location names from the API
  const fetchLocNames = async () => {
    try {
      setLoading(true); // Set loading to true while the API call is in progress
      const response = await axios.get('http://192.168.0.101:8086/api/location-masters');
      const locData = response.data; // Assuming the response is an array of objects
      setLocNames(locData.map(loc => loc.locationName)); // Extract only locationName from the response
    } catch (error) {
      console.error("Error fetching location names:", error);
    } finally {
      setLoading(false); // Set loading to false when the API call is done
    }
  };

  // Call the fetchLocNames function when the component mounts
  useEffect(() => {
    fetchLocNames();
  }, []);

  // Handle click on a location name
  const handleLocNameClick = (locationName) => {
    // Navigate to the previous page and pass the selected locationName
    navigate('/location-master', { state: { selectedLocationName: locationName } });
  };

  return (
    <div className="SearchPopup">
      {/* Search Bar */}
      <div className="SearchPopup-search-bar">
        <label>Search With :</label>
        <input
          type="text"
          placeholder="Type Here To Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="SearchPopup-input"
        />
      </div>

      {/* Table */}
      <table className="SearchPopup-table">
        <thead>
          <tr>
            <th>LOCATION NAME</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : (
            locNames
              .filter((locationName) => locationName.toLowerCase().includes(searchText.toLowerCase()))
              .map((locationName, index) => (
                <tr key={index} onClick={() => handleLocNameClick(locationName)}>
                  <td>{locationName}</td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SearchPopup;
