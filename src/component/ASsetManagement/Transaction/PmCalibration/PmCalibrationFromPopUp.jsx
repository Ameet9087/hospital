import React, { useState, useEffect } from 'react';
import './PmCalibrationFromPopUp.css';
import { API_BASE_URL } from '../../../api/api';
import { FloatingInput,FloatingSelect,FloatingTextarea } from '../../../../FloatingInputs';
import { toast } from 'react-toastify';
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
      toast.error('Success:', result);
  
      // After successful post, close the form
      closePopup(); // Close the modal after successful data posting
    } catch (error) {
      toast.error('Error posting data:', error);
      // Handle error response if needed (e.g., show an error message)
    }
  };
  

  return (
    
    <div className="PmCalibrationFromPopUp-container">
      <div className="PmCalibrationFromPopUp-left-panel">
        <div className="PmCalibrationFromPopUp-form-group">
        <FloatingSelect
  label={"Equipment Name"}
  id="equipmentName"
  value={selectedEquipment}
  onChange={(e) => setSelectedEquipment(e.target.value)}
  options={[
    { value: "", label: "Select Equipment" }, // Default option
    ...equipmentList.map((equipment) => ({
      value: equipment.equipmentMasterId,
      label: equipment.equipmentName,
    })),
  ]}
/>  
        </div>

        {/* Asset No., Old Asset No., Serial No., Model No., Category, Location */}
        <div className="PmCalibrationFromPopUp-form-group">
          <FloatingInput
          label={"Asset No"}
          type="text"
            id="assetNo"
            value={equipmentDetails.assetNo || ''}
            readOnly/>
          
        </div>
        <div className="PmCalibrationFromPopUp-form-group">
          <FloatingInput
          label={"Old Asset No"}
          type="text"
            id="oldAssetNo"
            value={equipmentDetails.oldAssetNo || ''}
            readOnly/>
          
        </div>
        <div className="PmCalibrationFromPopUp-form-group">
          <FloatingInput
          label={"Serial No"}
          type="text"
            id="serialNo"
            value={equipmentDetails.serialNo || ''}
            readOnly/>
         
        </div>
        <div className="PmCalibrationFromPopUp-form-group">
          <FloatingInput
          label={"Model No"}
          type="text"
            id="modelNo"
            value={equipmentDetails.modelNo || ''}
            readOnly/>
          
        </div>
        <div className="PmCalibrationFromPopUp-form-group">
          <FloatingInput
          label={"Category"}
          type="text"
            id="category"
            value={equipmentDetails.assetCateMasterDTO?.underCategory || ''}
            readOnly/>
        </div>
        <div className="PmCalibrationFromPopUp-form-group">
          <FloatingInput
          label={"Location"}
          type="text"
            id="location"
            value={equipmentDetails.locationPath || ''}
            readOnly/>
          
        </div>

        {/* Maintenance Type Dropdown */}
        <div className="PmCalibrationFromPopUp-form-group">
        <FloatingSelect
  label={"Maintenance Type"}
  id="maintenanceType"
  value={selectedMaintenanceType}
  onChange={(e) => setSelectedMaintenanceType(e.target.value)}
  options={[
    { value: "", label: "Select Maintenance Type" }, // Default option
    ...maintenanceTypes.map((maintenance) => ({
      value: maintenance.typeMasterId,
      label: maintenance.typeName,
    })),
  ]}
/>
        </div>
      </div>

      <div className="PmCalibrationFromPopUp-right-panel">
        <div className="PmCalibrationFromPopUp-form-group">
          <FloatingInput
          label={"Period Type"}
          type="text"
            id="periodType"
            value={periodType}
            onChange={(e) => setPeriodType(e.target.value)}/>
        </div>
        <div className="PmCalibrationFromPopUp-form-group">
          <FloatingInput
          label={"Maintenance Date"}
          type="date"
            id="maintenanceDate"
            value={maintenanceDate}
            onChange={(e) => setMaintenanceDate(e.target.value)}/>
          
        </div>
        <div className="PmCalibrationFromPopUp-form-group">
          <FloatingInput
          label={"Scheduled Maintenance Date"}
                type="date"
            id="scheduledMaintenanceDate"
            value={scheduledMaintenanceDate}
            onChange={(e) => setScheduledMaintenanceDate(e.target.value)}/>
          
        </div>
        <div className="PmCalibrationFromPopUp-form-group">
          <FloatingInput
          label={"Next Schedule Date"}
          type="date"
            id="nextScheduleDate"
            value={nextScheduleDate}
            onChange={(e) => setNextScheduleDate(e.target.value)}/>
         
        </div>
        <div className="PmCalibrationFromPopUp-form-group">
          <FloatingTextarea
          label={"Remarks"}
          id="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}/>
          
        </div>
        <div className="PmCalibrationFromPopUp-form-group">
          <FloatingInput
          label={"Spare Part"}
          type="text"
            id="sparePart"
            value={sparePart}
            onChange={(e) => setSparePart(e.target.value)}/>
          
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
