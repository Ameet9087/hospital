import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import './CSSDItemMaster.css';
import { API_BASE_URL } from '../../api/api';
import FloatingInput from '../../../FloatingInputs/FloatingInput';
import FloatingSelect from '../../../FloatingInputs/FloatingSelect';
import { toast } from 'react-toastify';

const CSSDItemMaster = () => {
  const [status, setStatus] = useState("Active");
  const [itemName, setItemName] = useState("");
  const [type, setType] = useState("Auto Clave");
  const [department, setDepartment] = useState("CSSD");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if an itemName was passed in state
    if (location.state?.itemName) {
      setItemName(location.state.itemName);
    }
  }, [location.state]);

  const handleSave = async () => {
    const machineData = {
      machineName: itemName,
      type: type,
      department: department,
      description: description,
      status: status,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/machines`,
        machineData
      );
      console.log("Machine saved successfully:", response.data);
      toast.success("Machine saved successfully!");
    } catch (error) {
      console.error("Error saving machine:", error);
      toast.error("Failed to save machine. Please try again.");
    }
  };

  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="CSSDItemMaster-container">
      <div className="CSSDItemMaster-header">
        <div className="CSSDItemMaster-heading">
          <FontAwesomeIcon
            icon={faArrowLeftLong}
            className="back-icon"
            onClick={handleClose}
          />
          <h2>CSSD Machine Master</h2>
        </div>
      </div>
      <div className="CSSDItemMaster-content">
        <div className="CSSDItemMaster-formContainer">
          <div className="CSSDItemMaster-formGroup">
            <FloatingInput
            label={"Machine Name"}
            type="text"
              placeholder="Enter machine name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              restrictions={{char:true}}
              required/>
            
          </div>
          <div className="CSSDItemMaster-formGroup">
            <FloatingSelect
            label={"Type"}
            value={type} onChange={(e) => setType(e.target.value)}
            options={[{value:"Auto Clave",label:"Auto Clave"},
              {value:"Imaging",label:"Imaging"},
              {value:"Diagnostic",label:"Diagnostic"},
              {value:"ETO",label:"ETO"},
            ]}
            />
           
          </div>
          <div className="CSSDItemMaster-formGroup">
            <FloatingSelect
            label={"DEPT"}
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            options={[{value:"CSSD",label:"CSSD"},
              {value:"Radiology",label:"Radiology"},
              {value:"Pathology",label:"Pathology"}
            ]}/>
           
          </div>
          <div className="CSSDItemMaster-formGroup">
            <FloatingInput
            label={"Description"}
            type="text"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}/>
           
          </div>
          <div className="CSSDItemMaster-formGroup">
            <label>Status:</label>
            <div className="CSSDItemMaster-statusOptions">
              <input
                type="radio"
                value="Active"
                checked={status === "Active"}
                onChange={() => setStatus("Active")}
              />
              Active
              <input
                type="radio"
                value="Inactive"
                checked={status === "Inactive"}
                onChange={() => setStatus("Inactive")}
              />
              Inactive
            </div>
          </div>
          <button onClick={handleSave} className='CSSDItemMaster-edit-btn'>Save</button>
        </div>
        {/* <div className="CSSDItemMaster-buttonContainer">
          <button onClick={handleSave}>Save</button>
          <button>Delete</button>
          <button>Clear</button>
          <button onClick={handleClose}>Close</button>
          <button>Search</button>
          <button>Tracking</button>
          <button>Print</button>
          <button>Version Comparison</button>
          <button>SDC</button>
          <button>Testing</button>
          <button>Info</button>
        </div> */}
      </div>
    </div>
  );
};

export default CSSDItemMaster;
