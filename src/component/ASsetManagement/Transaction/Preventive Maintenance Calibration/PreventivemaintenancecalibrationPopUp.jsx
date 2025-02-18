import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import './PreventiveMaintenanceCalibrationPopUp.css';
import { FaSearch } from 'react-icons/fa';
import { API_BASE_URL } from '../../../api/api';
import PopupTable from '../../../Admission/PopupTable';
import { FloatingInput,FloatingSelect,FloatingTextarea } from '../../../../FloatingInputs';
import { toast } from 'react-toastify';
const PreventiveMaintenanceCalibrationPopUp = () => {
  const [activeTab, setActiveTab] = useState('proposal');
  const [selectedEquipment, setSelectedEquipment] = useState({
    assetNo: "",
    oldAssetNo: "",
    location: "",
    equipmentNo: "",
    serialNo: "",
    responsibleDepartment: "",
    costOfPurchase: "",
    underCategory: "",
    modelno: "",
    responsibleperson: "",
  });
  const [selectedmaintains, setSelectedMaintains] = useState({
    typeName: "",
  })
  const [maintains, setMaintains] = useState([])
  const [equipmentList, setEquipmentList] = useState([]);
  const [activePopup, setActivePopup] = useState("")
  const equipmntheading = ["equipmentMasterId", "typeOfEquipment", "equipmentName"];
  const MaintainsTypeHeading = ["typeMasterId", "typeName", "code"]
  const [fileName, setFileName] = useState('');
  const [formData, setFormData] = useState({
    maintenanceNo: '',
    maintenanceDate: '',
    preventiveMaintenanceDate: '',
    startDate: '',
    endDate: '',
    periodType: '',
    frequencyno: '',
    toDoDate: '',
    status: '',

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChooseFileClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };
  const fetchequipmentdetail = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/equipment-masters`);
      if (!response.ok) {
        throw new Error("Failed to fetch request details");
      }
      const data = await response.json();
      setEquipmentList(data); // Update the state with the fetched data
    } catch (error) {
      console.error("Error fetching request details:", error);
    }
  };
  const fetchMaintainse = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/maintenance-type`)
      if (!response.ok) {
        throw new Error("Failed to fetch request details");
      }
      const data = await response.json();
      setMaintains(data)
    } catch (error) {
      console.error("Error fetching request details:", error);
    }
  }
  useEffect(() => {
    fetchequipmentdetail();
    fetchMaintainse();
  }, []);

  const getPopupData = () => {
    if (activePopup === "euipment") {
      return { columns: equipmntheading, data: equipmentList };
    } else if (activePopup === "maintainstype") {
      return { columns: MaintainsTypeHeading, data: maintains };
    } else {
      return { columns: [], data: [] };
    }
  };
  const { columns, data } = getPopupData();
  const handleSelect = (selectedData) => {
    if (activePopup === "euipment") {
      setSelectedEquipment({
        equipmentMasterId: selectedData.equipmentMasterId,
        assetNo: selectedData.assetNo || "",
        oldAssetNo: selectedData.oldAssetNo || "",
        location: selectedData?.assetLocationMaster?.subLocation || "",
        equipmentNo: selectedData.equipmentNo || "",
        name: selectedData.equipmentName || "",
        serialNo: selectedData.serialNo || "",
        responsibleDepartment: selectedData.responsibleDepartment.departmentName || "",
        modelno: selectedData.modelNo || "",
        responsibleperson: selectedData?.employee.firstName || "",
        underCategory: selectedData?.assetCateMasterDTO?.underCategory || "",
      });
    } else if (activePopup === "maintainstype") {
      setSelectedMaintains({
        typeMasterId: selectedData.typeMasterId,
        typeName: selectedData.typeName,
      })
    }
    setActivePopup(null); // Close the popup
  };



  const handleSubmit = async () => {
    const payload = {

      preventiveMaintenanceDate: formData.preventiveMaintenanceDate,
      startDate: formData.startDate,
      endDate: formData.endDate,
      periodType: formData.periodType,
      frequencyno: formData.frequencyNo,
      toDoDate: formData.toDoDate,
      status: formData.status,
      equipmentMasterDTO:
      {
        equipmentMasterId: selectedEquipment?.equipmentMasterId

      },
      maintenanceTypeMasterDTO: {
        typeMasterId: selectedmaintains.typeMasterId
      }
    };

    try {
      const response = await fetch(`${API_BASE_URL}/preventive-maintenance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Data saved successfully!');
      } else {
        toast.error('Failed to save data.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('An error occurred while saving the data.');
    }
  };

  return (
    <div className="PreventiveMaintenanceCalibrationPopUp-container">
      <div className="PreventiveMaintenanceCalibrationPopUp-header">
        Preventive Maintenance Calibration
      </div>
      <div className="PreventiveMaintenanceCalibrationPopUp-form-container">
        <div className="PreventiveMaintenanceCalibrationPopUp-form-section">
          <div className="PreventiveMaintenanceCalibrationPopUp-form-group">
            <FloatingInput
            label={"Preventive Maintenance No"} type="text"/>
            
          </div>
          <div className="PreventiveMaintenanceCalibrationPopUp-form-group">
            <FloatingInput
            label={"Preventive Maintenance Date"}
            type="date"  onChange={handleInputChange}/>
            
          </div>
          <div className="PreventiveMaintenanceCalibrationPopUp-section-header">Equipment Info</div>
          <div className="PreventiveMaintenanceCalibrationPopUp-form-group">
            <FloatingInput
            label={"Equipment Name *"}
            type="search" value={selectedEquipment.name} 
            onIconClick={() => setActivePopup("euipment")}/>
           
          </div>
          <div className="PreventiveMaintenanceCalibrationPopUp-form-group">
            <FloatingInput
            label={"Equipment No"}
            type="text"
            value={selectedEquipment.equipmentNo}/>
            
          </div>
          <div className="PreventiveMaintenanceCalibrationPopUp-form-group">
            <FloatingInput
            label={"Asset No"}
            type="text"
            value={selectedEquipment.assetNo}/>
           
          </div>
          <div className="PreventiveMaintenanceCalibrationPopUp-form-group">
            <FloatingInput
            label={"Serial No"}
            type="text"
            value={selectedEquipment.serialNo}/>
            
          </div>
        </div>
        <div className="PreventiveMaintenanceCalibrationPopUp-form-section">
          <div className="PreventiveMaintenanceCalibrationPopUp-form-group">
            <FloatingInput
            label={"Model No"}
            type="text"
            value={selectedEquipment.modelno} />
           
          </div>
          <div className="PreventiveMaintenanceCalibrationPopUp-form-group">
            <FloatingInput
            label={"Category"}
            type="text"
            value={selectedEquipment.underCategory}/>
          
          </div>
          <div className="PreventiveMaintenanceCalibrationPopUp-form-group">
            <FloatingInput
            label={"Location"}
            type="text"
            value={selectedEquipment.location}/>
           
          </div>
          <div className="PreventiveMaintenanceCalibrationPopUp-form-group">
            <FloatingInput
            label={"Responsible Person"}
            type="text"
            value={selectedEquipment.responsibleperson}/>
           
          </div>
          <div className="PreventiveMaintenanceCalibrationPopUp-form-group">
            <FloatingInput
            label={"Responsible Department"}
            type="text"
            value={selectedEquipment.responsibleDepartment}/>
            
          </div>
          <div className="PreventiveMaintenanceCalibrationPopUp-section-header">Scheduling Details</div>
          <div className="PreventiveMaintenanceCalibrationPopUp-form-group">
            <FloatingInput
            label={"Maintenance Types *"}
            type="search"
            value={selectedmaintains.typeName}
            onChange={handleInputChange}
            onIconClick={() => setActivePopup("maintainstype")} />
           
          </div>
        </div>
        <div className="PreventiveMaintenanceCalibrationPopUp-form-section">
          <div className="PreventiveMaintenanceCalibrationPopUp-form-group">
            <FloatingInput
            label={"Start Date"}
            type="date"/>
          
          </div>


          <div className="PreventiveMaintenanceCalibrationPopUp-form-group">
            <FloatingInput
            label={"End Date"}
            type="date"/>
            
          </div>


          <div className="PreventiveMaintenanceCalibrationPopUp-form-group">
            <FloatingSelect
            label={"Period Type"}
            value={formData.periodType} onChange={handleInputChange}
            options={[{value:"Daily",label:"Daily"},
              {value:"Weekly",label:"Weekly"},
              {value:"FortNight",label:"FortNight"},
              {value:"Monthly",label:"Monthly"},
              {value:"Bimonthly",label:"Bimonthly"},
              {value:"Quaterly",label:"Quaterly"},
              {value:"Half Yearly",label:"Half Yearly"},
              {value:"Yearly",label:"Yearly"},
              {value:"Fix Date",label:"Fix Date"}
            ]}/>
            

          </div>
          <div className="PreventiveMaintenanceCalibrationPopUp-form-group">
            <FloatingInput
            label={"Frequency No"}
            type="text"
            name='frequencyno'
            value={formData.frequencyno}
            onChange={handleInputChange}/>
           
          </div>
          <div className="PreventiveMaintenanceCalibrationPopUp-form-group">
            
            <FloatingInput
            label={"To Do Date"}
            type="date" onChange={handleInputChange}/>
            
          </div>


          <div className="PreventiveMaintenanceCalibrationPopUp-section-header">Documents</div>
          <div className="PreventiveMaintenanceCalibrationPopUp-file-upload">
            <input
              type="text"
              className="PreventiveMaintenanceCalibrationPopUp-input-field"
              placeholder="File Name"
              value={fileName}
              readOnly
            />
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            <button
              className="PreventiveMaintenanceCalibrationPopUp-btn-secondary"
              onClick={handleChooseFileClick}
            >
              Choose File
            </button>
            <button className="PreventiveMaintenanceCalibrationPopUp-btn-secondary">Upload</button>
          </div>
          <div className="PreventiveMaintenanceCalibrationPopUp-status">
            <label className="PreventiveMaintenanceCalibrationPopUp-label">Status</label>
            <div className="PreventiveMaintenanceCalibrationPopUp-radio-buttons">
              <input
                type="radio"
                id="active"
                name="status"
                value={formData.status}
              />
              <label htmlFor="active">Active</label>
              <input
                type="radio"
                id="inactive"
                name="status"
                value={formData.status}
              />
              <label htmlFor="inactive">Inactive</label>
            </div>
          </div>

        </div>

      </div>
      <button onClick={handleSubmit} className="PreventiveMaintenanceCalibrationPopUp-submit-button">
        Save
      </button>

      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={() => setActivePopup(false)}
        />
      )}
    </div>
  );
};

export default PreventiveMaintenanceCalibrationPopUp;