import React, { useState, useEffect } from "react";
import "./ComplaintEntrySystemPopUp.css";

// =================================================================================================
import { API_BASE_URL } from "../../../api/api";
import PopupTable from '../../../Admission/PopupTable';

const ComplaintEntrySystemPopUp = () => {
  const [activePopup, setActivePopup] = useState("")
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // Fetch department data from API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/departments/getAllDepartments`);
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        const data = await response.json();
        setDepartments(data);

      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);

  const getPopupData = () => {
    if (activePopup === "department") {
      return {
        columns: ["departmentId", "departmentName"], data: departments
      };
    }

    else {
      return { columns: [], data: [] };
    }
  };

  const { columns, data } = getPopupData();

  const handleSelect = async (data) => {
    if (activePopup === "department") {
      setSelectedDepartment(data);
    }

    setActivePopup(null); // Close the popup after selection
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // ===================================================================================================
  const [equipments, setEquipments] = useState([]);
  const [selectedEquipment, setSelectedEquipment] = useState("");
  const [formData, setFormData] = useState({
    type: "",
    complaintType: "Internal Department",
    complaintSubject: "",
    priority: "Ordinary"
  });

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/equipment-masters`);
        if (!response.ok) {
          throw new Error("Failed to fetch equipments");
        }
        const data = await response.json();
        setEquipments(data);
      } catch (error) {
        console.error("Error fetching equipments:", error);
      }
    };
    fetchEquipments();
  }, []);


  const handleSubmit = async () => {


    // Prepare payload
    const payload = {
      type: formData.type,
      complaintType: formData.complaintType,
      complaintSubject: formData.complaintSubject,
      priority: formData.priority,
      equipmentMaster: {
        equipmentMasterId: selectedEquipment.equipmentMasterId
      },
      departmentDTO: {
        departmentId: selectedDepartment.departmentId
      }
    };

    try {
      const response = await fetch(`${API_BASE_URL}/equipment-complaints`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error("Failed to submit complaint");

      alert("Complaint submitted successfully!");

      // Reset form
      setFormData({
        type: "Equipment",
        complaintType: "Internal Department",
        complaintSubject: "",
        priority: "Ordinary"
      });
      setSelectedDepartment("");
      setSelectedEquipment("");

    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint. Please try again.");
    }
  };

  // ==================================================================



  return (
    <div className="outer-container-details">
      <div className="complaint-entry-system-form">
        <div className="complaint-panel-header">Complaint Details</div>
        <div className="complaintSpace">
          <div className="complaint-entry-system-row">
            <label>Type :</label>
            <div className="complaint-entry-system-radio-group">
              <input type="radio" name="type" id="equipment" />
              <label htmlFor="equipment">Equipment</label>
            </div>
          </div>
          <div className="complaint-entry-system-row">
            <label>
              Complaint To Department<span className="requiredtext">*</span> :
            </label>
            <div className="complaint-entry-system-search-wrapper">


              {/* ================================================================================================== */}
              <input
                type="text"
                value={selectedDepartment?.departmentName || ''}
                className="complaint-entry-system-search-input"
              />
              <button className="complaint-entry-system-search-icon" onClick={() => setActivePopup("department")}>
                🔍
              </button>

              {activePopup && (
                <PopupTable
                  columns={columns}
                  data={data}
                  onSelect={handleSelect}
                  onClose={() => setActivePopup(false)}
                />
              )}

              {/* ======================================================================================= */}
            </div>
          </div>
          <div className="complaint-entry-system-row">
            <label>Complaint Type:</label>
            <select
              className="complaint-entry-system-select"
              name="complaintType"
              value={formData.complaintType}
              onChange={handleInputChange}
            >
              <option value="Internal Department">Internal Department</option>
              <option value="For Patient">For Patient</option>
            </select>
          </div>

          {/* ========================================================================================= */}
          <div className="complaint-entry-system-row">
            <label>
              Equipment Name<span className="requiredtext">*</span> :
            </label>
            <div className="complaint-entry-system-search-wrapper">
              <input
                type="text"
                value={selectedEquipment?.equipmentName || ''}
                className="complaint-entry-system-search-input"
                readOnly
              />
              <button
                className="complaint-entry-system-search-icon"
                onClick={() => setActivePopup("equipment")}
              >
                🔍
              </button>

              {activePopup === "equipment" && (
                <PopupTable
                  columns={["equipmentMasterId", "equipmentName"]}
                  data={equipments}
                  onSelect={(data) => {
                    setSelectedEquipment(data);
                    setActivePopup(null); // Close popup after selection
                  }}
                  onClose={() => setActivePopup(null)} // Close popup on cancel
                />
              )}
            </div>
          </div>



          {/* ================================================================================================ */}


          {/* Populated Fields */}
          <div className="complaint-entry-system-row">
            <label>Serial No:</label>
            <input
              type="text"
              value={selectedEquipment?.serialNo || ""}
              className="complaint-entry-system-input"
              readOnly
            />
          </div>
          <div className="complaint-entry-system-row">
            <label>Model No:</label>
            <input
              type="text"
              value={selectedEquipment?.modelNo || ""}
              className="complaint-entry-system-input"
              readOnly
            />
          </div>
          <div className="complaint-entry-system-row">
            <label>Asset No:</label>
            <input
              type="text"
              value={selectedEquipment?.assetNo || ""}
              className="complaint-entry-system-input"
              readOnly
            />
          </div>
          <div className="complaint-entry-system-row">
            <label>Equipment No:</label>
            <input
              type="text"
              value={selectedEquipment?.equipmentNo || ""}
              className="complaint-entry-system-input"
              readOnly
            />
          </div>
          <div className="complaint-entry-system-row">
            <label>Software Version No:</label>
            <input
              type="text"
              value={selectedEquipment?.softwareVersion || ""}
              className="complaint-entry-system-input"
              readOnly
            />
          </div>

          <div className="complaint-entry-system-row">
            <label>Complaint Subject<span className="requiredtext">*</span> :</label>
            <div className="complaint-entry-system-search-wrapper">
              <input
                type="text"
                className="complaint-entry-system-search-input"
                name="complaintSubject"
                value={formData.complaintSubject}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="complaint-entry-system-row">
            <label>Priority :</label>
            <select
              className="complaint-entry-system-select"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
            >
              <option value="Ordinary">Ordinary</option>
              <option value="Urgent">Urgent</option>
              <option value="Immediate">Immediate</option>
            </select>
          </div>
        </div>
        <div className="complaint-panel-header">Attachment</div>
        <div className="complaintSpace">
          <div className="complaint-entry-system-row">
            <label>File Name :</label>
            <input type="file" className="complaint-entry-system-file" />
            <button className="complaint-entry-system-upload-btn">Upload</button>
          </div>
        </div>


        <div className="ComplaintEntrySystemPopUp-action-buttons">
          <button className="btn-blue" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default ComplaintEntrySystemPopUp;
