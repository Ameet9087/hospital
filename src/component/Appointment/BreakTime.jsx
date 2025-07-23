import React, { useState, useEffect } from 'react';
import BreakTimeForm from './BreakTimeForm';  // Assuming it's the form for adding break times
import './BreakTime.css';  // External CSS file for styling
import CustomModal from '../../CustomModel/CustomModal';
import { useFilter } from "../ShortCuts/useFilter";
import { API_BASE_URL } from '../api/api';

const BreakTime = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [breakTimes, setBreakTimes] = useState([]); // State to store break time data
  const [loading, setLoading] = useState(true); // Loading state for API request
  const [error, setError] = useState(null); // State to handle any errors

  const [searchTerm, setSearchTerm] = useState("");



  const handleClose = () => {
    setShowPopup(false);
  };


  // Fetch break time data from API
  const fetchBreakTimes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/breakTime`);
      if (!response.ok) {
        throw new Error('Failed to fetch break time data');
      }
      const data = await response.json();
      setBreakTimes(data); // Set the fetched break time data into the state
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Stop loading after fetching
    }
  };

  const filteredItems = useFilter(breakTimes, searchTerm);

  // Handle search input changes
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Fetch break times on component mount
  useEffect(() => {
    fetchBreakTimes();
  }, [showPopup]);

  return (
    <div className="break-time-container">
      <div className="break-time-header">
        <button className="add-break-time-btn" onClick={() => setShowPopup(true)}>
          Add Break Time
        </button>
       
      </div>
       <div className='break-time-search-bar'>
       <input
            type="text"
            placeholder="Search by break remark"
            className="manage-department-search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
       </div>
      {/* Display loading state or error message */}
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <table>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Break Time Start</th>
            <th>Break Time End</th>
            <th>Break Time Remark</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map((breakTime, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{breakTime.breakTimeStart}</td>
                <td>{breakTime.breakTimeEnd}</td>
                <td>{breakTime.breakTimeRemark || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No break times available.</td>
            </tr>
          )}
        </tbody>
      </table>
      <CustomModal isOpen={showPopup} onClose={handleClose}>
        <BreakTimeForm onClose={handleClose} />
      </CustomModal>
    </div>
  );
};

export default BreakTime;
