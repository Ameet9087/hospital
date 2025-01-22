import React, { useState, useEffect } from 'react';
import './PmCalibrationFromPopUp.css';
import { API_BASE_URL } from '../../../api/api';
const PmCalibrationFromPopUp = ({ closePopup }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [equipmentList, setEquipmentList] = useState([]);  // State for storing the list of equipment names
  const [selectedEquipment, setSelectedEquipment] = useState(''); // State for selected equipment
  const [equipmentDetails, setEquipmentDetails] = useState({}); // State for storing selected equipment details
  const [maintenanceTypes, setMaintenanceTypes] = useState([]);  // State for storing maintenance types
  const [selectedMaintenanceType, setSelectedMaintenanceType] = useState('');
  const [periodType, setPeriodType] = useState(''); // State for periodType
  const [maintenanceDate, setMaintenanceDate] = useState(''); // State for maintenanceDate
  const [scheduledMaintenanceDate, setScheduledMaintenanceDate] = useState(''); // State for scheduledMaintenanceDate
  const [nextScheduleDate, setNextScheduleDate] = useState(''); // State for nextScheduleDate
  const [remarks, setRemarks] = useState(''); // State for remarks
  const [sparePart, setSparePart] = useState(''); // State for sparePart

  // Fetch the equipment list from the API
  useEffect(() => {
    fetch(`${API_BASE_URL}/equipment-masters`)
      .then((response) => response.json())
      .then((data) => {
        setEquipmentList(data);  // Assuming the API returns a list of equipment objects
      })
      .catch((error) => {
        console.error('Error fetching equipment list:', error);
      });
  }, []);

  useEffect(() => {
    fetch(`${API_BASE_URL}/maintenance-type`)
      .then((response) => response.json())
      .then((data) => {
        setMaintenanceTypes(data);  // Assuming the API returns a list of maintenance type objects
      })
      .catch((error) => {
        console.error('Error fetching maintenance types:', error);
      });
  }, []);

  useEffect(() => {
    // Find the selected equipment based on the ID
    if (selectedEquipment) {
      const equipment = equipmentList.find(item => item.equipmentMasterId === parseInt(selectedEquipment));
      setEquipmentDetails(equipment || {});
    }
  }, [selectedEquipment, equipmentList]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAdd = async () => {
    const postData = {
      periodType: periodType,
      maintenanceDate: maintenanceDate,
      scheduledMaintenanceDate: scheduledMaintenanceDate,
      nextScheduleDate: nextScheduleDate,
      remarks: remarks,
      sparePart: sparePart,
      equipmentMasterDTO: {
        equipmentMasterId: selectedEquipment
      },
      maintenanceTypeMasterDTO: {
        typeMasterId: selectedMaintenanceType
      }
    };
  
    try {
      const response = await fetch(`${API_BASE_URL}/pm-calibration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
  
      const result = await response.json();
      console.log('Success:', result);
  
      // After successful post, close the form
      closePopup(); // Close the modal after successful data posting
    } catch (error) {
      console.error('Error posting data:', error);
      // Handle error response if needed (e.g., show an error message)
    }
  };
  

  return (
    
    <div className="PmCalibrationFromPopUp-container">
      <div className="PmCalibrationFromPopUp-left-panel">
     

        {/* Equipment Name Dropdown */}
        <div className="PmCalibrationFromPopUp-form-group">
          <label htmlFor="equipmentName">Equipment Name</label>
          <select
            id="equipmentName"
            value={selectedEquipment}
            onChange={(e) => setSelectedEquipment(e.target.value)}
          >
            <option value="">Select Equipment</option>
            {equipmentList.map((equipment) => (
              <option key={equipment.equipmentMasterId} value={equipment.equipmentMasterId}>
                {equipment.equipmentName}
              </option>
            ))}
          </select>
        </div>

        {/* Asset No., Old Asset No., Serial No., Model No., Category, Location */}
        <div className="PmCalibrationFromPopUp-form-group">
          <label htmlFor="assetNo">Asset No.</label>
          <input
            type="text"
            id="assetNo"
            value={equipmentDetails.assetNo || ''}
            readOnly
          />
        </div>
        <div className="PmCalibrationFromPopUp-form-group">
          <label htmlFor="oldAssetNo">Old Asset No.</label>
          <input
            type="text"
            id="oldAssetNo"
            value={equipmentDetails.oldAssetNo || ''}
            readOnly
          />
        </div>
        <div className="PmCalibrationFromPopUp-form-group">
          <label htmlFor="serialNo">Serial No.</label>
          <input
            type="text"
            id="serialNo"
            value={equipmentDetails.serialNo || ''}
            readOnly
          />
        </div>
        <div className="PmCalibrationFromPopUp-form-group">
          <label htmlFor="modelNo">Model No.</label>
          <input
            type="text"
            id="modelNo"
            value={equipmentDetails.modelNo || ''}
            readOnly
          />
        </div>
        <div className="PmCalibrationFromPopUp-form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            value={equipmentDetails.assetCateMasterDTO?.underCategory || ''}
            readOnly
          />
        </div>
        <div className="PmCalibrationFromPopUp-form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={equipmentDetails.locationPath || ''}
            readOnly
          />
        </div>

        {/* Maintenance Type Dropdown */}
        <div className="PmCalibrationFromPopUp-form-group">
          <label htmlFor="maintenanceType">Maintenance Type</label>
          <select
            id="maintenanceType"
            value={selectedMaintenanceType}
            onChange={(e) => setSelectedMaintenanceType(e.target.value)}
          >
            <option value="">Select Maintenance Type</option>
            {maintenanceTypes.map((maintenance) => (
              <option key={maintenance.typeMasterId} value={maintenance.typeMasterId}>
                {maintenance.typeName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="PmCalibrationFromPopUp-right-panel">
        <div className="PmCalibrationFromPopUp-form-group">
          <label htmlFor="periodType">Period Type</label>
          <input
            type="text"
            id="periodType"
            value={periodType}
            onChange={(e) => setPeriodType(e.target.value)}
          />
        </div>
        <div className="PmCalibrationFromPopUp-form-group">
          <label htmlFor="maintenanceDate">Maintenance Date</label>
          <input
            type="date"
            id="maintenanceDate"
            value={maintenanceDate}
            onChange={(e) => setMaintenanceDate(e.target.value)}
          />
        </div>
        <div className="PmCalibrationFromPopUp-form-group">
          <label htmlFor="scheduledMaintenanceDate">Scheduled Maintenance Date</label>
          <input
            type="date"
            id="scheduledMaintenanceDate"
            value={scheduledMaintenanceDate}
            onChange={(e) => setScheduledMaintenanceDate(e.target.value)}
          />
        </div>
        <div className="PmCalibrationFromPopUp-form-group">
          <label htmlFor="nextScheduleDate">Next Schedule Date</label>
          <input
            type="date"
            id="nextScheduleDate"
            value={nextScheduleDate}
            onChange={(e) => setNextScheduleDate(e.target.value)}
          />
        </div>
        <div className="PmCalibrationFromPopUp-form-group">
          <label htmlFor="remarks">Remarks</label>
          <textarea
            id="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          ></textarea>
        </div>
        <div className="PmCalibrationFromPopUp-form-group">
          <label htmlFor="sparePart">Spare Part</label>
          <input
            type="text"
            id="sparePart"
            value={sparePart}
            onChange={(e) => setSparePart(e.target.value)}
          />
        </div>

        {/* Add and Close buttons */}
        <div className="PmCalibrationFromPopUp-actions">
          <button className="PmCalibrationFromPopUp-add-button" onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default PmCalibrationFromPopUp;
