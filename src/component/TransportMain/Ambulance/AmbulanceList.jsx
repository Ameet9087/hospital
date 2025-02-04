import React, { useState, useEffect, useRef } from 'react';
import './AmbulanceList.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import axios from 'axios';
import { API_BASE_URL } from '../../api/api';

const AmbulanceList = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [availableAmbulances, setAvailableAmbulances] = useState([]);
  const [onDutyAmbulances, setOnDutyAmbulances] = useState([]);
  const [isAvailableSelected, setIsAvailableSelected] = useState(true);

  useEffect(() => {
    const fetchAmbulances = async () => {
      try {
        const availableResponse = await axios.get(`${API_BASE_URL}/ambulances/available`);
        const onDutyResponse = await axios.get(`${API_BASE_URL}/ambulances/on-duty`);

        // Extracting data from responses
        const availableData = availableResponse.data.map(ambulance => ({
          id: ambulance.ambulanceId,
          licencePlate: ambulance.licencePlate,
          status: ambulance.status,
          driverName: ambulance.driver,
          lastChecked: ambulance.lastChecked
        }));

        const onDutyData = onDutyResponse.data.map(ambulance => ({
          id: ambulance.ambulanceId,
          licencePlate: ambulance.licencePlate,
          status: ambulance.status,
          driverName: ambulance.driver,
          lastChecked: ambulance.lastChecked
        }));

        // Update state with merged data
        setAvailableAmbulances(availableData);
        setOnDutyAmbulances(onDutyData);
      } catch (error) {
        console.error('Error fetching ambulance data:', error);
      }
    };

    fetchAmbulances();
  }, []);

  const renderTable = (ambulances) => (
    <table ref={tableRef}>
      <thead>
        <tr>
          {["License Plate", "Status", "Driver", "Last Checked"].map((header, index) => (
            <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
              <div className="header-content">
                <span>{header}</span>
                <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(index)}></div>
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ambulances.map((ambulance) => (
          <tr key={ambulance.id}>
            <td>{ambulance.licencePlate}</td>
            <td>{ambulance.status}</td>
            <td>{ambulance.driverName}</td>
            <td>{ambulance.lastChecked}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="ambulance-list-module-com">
      <h1 className="ambulance-details-com-module__heading">Ambulance List</h1>
      <div className="ambulance-details-com-module__buttons">
        <button
          className={`ambulance-details-com-module__button ${isAvailableSelected ? 'active' : ''}`}
          onClick={() => setIsAvailableSelected(true)}
        >
          Available
        </button>
        <button
          className={`ambulance-details-com-module__button ${!isAvailableSelected ? 'active' : ''}`}
          onClick={() => setIsAvailableSelected(false)}
        >
          On Duty
        </button>
      </div>
      <div className="ambulance-details-com-module__table">
        {isAvailableSelected ? (
          availableAmbulances.length > 0 ? (
            <div className="table-section">
              <h2>Available Ambulances</h2>
              {renderTable(availableAmbulances)}
            </div>
          ) : (
            <p>No available ambulances</p>
          )
        ) : (
          onDutyAmbulances.length > 0 ? (
            <div className="table-section">
              <h2>On-Duty Ambulances</h2>
              {renderTable(onDutyAmbulances)}
            </div>
          ) : (
            <p>No on-duty ambulances</p>
          )
        )}
      </div>
    </div>
  );
};

export default AmbulanceList;
