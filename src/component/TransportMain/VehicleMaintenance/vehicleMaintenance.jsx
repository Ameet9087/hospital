/* Ajhar Tamboli vehicleMaintenance.jsx 25-09-24 */
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import "../VehicleMaintenance/vehicleMaintenance.css";
import VMAddNewVehicle from './vMAddNewVehicle';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import CustomModal from '../../../CustomModel/CustomModal';
import { API_BASE_URL } from '../../api/api';
import { useFilter } from '../../ShortCuts/useFilter';

const VehicleMaintenance = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const [labTests, setLabTests] = useState([]);
  const tableRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState([])
  const [vehicleData, setVehicleData] = useState([]);

  // Fetch vehicle data from API when the component is mounted
  const handleEditClick = (labTests) => {
    setSelectedVehicle(labTests); // Set the selected vehicle for editing
    setShowPopup(true);
  };
  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/vehicle-maintenance`);
        setLabTests(response.data); // Update the state with the fetched data
        console.log(response);

      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    fetchVehicleData();
  }, []);

  const handleAddNewLabTestClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  useEffect(() => {
    if (selectedVehicle) {
      setVehicleData({
        vehicleId: selectedVehicle.vehicleId,
        vehicleType: selectedVehicle.vehicleType,
        registrationNumber: selectedVehicle.vehicleDTO?.registrationNumber,
        vehicleCompanyName: selectedVehicle.vehicleCompanyName,
        yearOfManufacture: selectedVehicle.yearOfManufacture,
        fuelType: selectedVehicle.fuelType,
      });
    }
  }, [selectedVehicle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({ ...vehicleData, [name]: value });
  };

  const handlePrint = () => {
    const printContent = tableRef.current;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
  const addVehicles = useFilter(labTests, searchTerm);



  return (
    <div className="vehicleMaintenance-container">
      <div className="vehicleMaintenance-firstRow">
        <div className="vehicleMaintenance-addBtn">
          <button className="vehicleMaintenance-add-button" onClick={handleAddNewLabTestClick}>+Add New Vehicle</button>
        </div>
      </div>

      <div className="vehicleMaintenance-search-N-result">
        <div className="vehicleMaintenance-search-bar">
          {/* <i className="fa-solid fa-magnifying-glass"></i> */}
          <input type="text" placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />


        </div>
        <div className="vehicleMaintenance-results-info">
          <span>Showing {labTests.length} / {labTests.length} results</span>
          <button className="vehicleMaintenance-print-button"><i className="fa-solid fa-file-excel"></i> Export</button>
          <button className="vehicleMaintenance-print-button" onClick={handlePrint}><i className="fa-solid fa-print"></i> Print</button>
        </div>
      </div>


      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>{[
              "Vehicle Id",
              "Vehicle Type",
              "Registration Number",
              "Vehicle Company Name",
              "Year Of Manufacture",
              "Fuel Type",
              "Service Provider",
              "Actions",
            ].map((header, index) => (
              <th
                key={index}
                style={{ width: columnWidths[index] }}
                className="resizable-th"
              >
                <div className="header-content">
                  <span>{header}</span>
                  <div
                    className="resizer"
                    onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                  ></div>
                </div>
              </th>
            ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(labTests) && labTests.length > 0 ? (
              labTests.map((test, index) => (
                <tr key={index}>
                  <td>{test.vehicleId}</td>
                  <td>{test.vehicleType}</td>
                  <td>{test.vehicleDTO?.registrationNumber}</td>
                  <td>{test.vehicleCompanyName}</td>
                  <td>{test.yeareOfManufacture}</td>
                  <td>{test.fuelType}</td>
                  <td>{test.vehicleDTO?.make} - {test.vehicleDTO?.model}</td>
                  <td>
                    <button className="vehicleMaintenance-edit-button" onClick={() => handleEditClick(test)}>Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="14" style={{ textAlign: 'center' }}>No vehicle maintenance data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="vehicleMaintenance-modal">
          <CustomModal isOpen={setShowPopup} onClose={handleClosePopup}>
            <VMAddNewVehicle
              selectedVehicle={selectedVehicle}
              vehicleData={vehicleData}
              onClose={() => setShowPopup(false)}
            />
          </CustomModal>
        </div>
      )}
    </div>
  );
};
export default VehicleMaintenance;
