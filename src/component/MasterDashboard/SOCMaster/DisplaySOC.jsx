import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './socMaster.css'; // Custom CSS for styling

function SearchPopup() {
  const [searchText, setSearchText] = useState('');
  const [socNames, setSocNames] = useState([]); // State to hold the SOC names
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Hook for navigation

  // Fetch SOC names from the API
  const fetchSocNames = async () => {
    try {
      setLoading(true); // Set loading to true while the API call is in progress
      const response = await axios.get('http://192.168.0.101:8086/api/socmasters');
      const socData = response.data; // Assuming the response is an array
      setSocNames(socData.map(soc => soc.socName)); // Extract only socName from the response
    } catch (error) {
      console.error("Error fetching SOC names:", error);
    } finally {
      setLoading(false); // Set loading to false when the API call is done
    }
  };

  // Call the fetchSocNames function when the component mounts
  useEffect(() => {
    fetchSocNames();
  }, []);

  // Handle click on a SOC name
  const handleSocNameClick = (socName) => {
    // Navigate to the previous page and pass the selected socName
    navigate('/location-master', { state: { selectedSocName: socName } });
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
            <th>SOC NAME</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : (
            socNames
              .filter((socName) => socName.toLowerCase().includes(searchText.toLowerCase()))
              .map((socName, index) => (
                <tr key={index} onClick={() => handleSocNameClick(socName)}>
                  <td>{socName}</td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SearchPopup;
