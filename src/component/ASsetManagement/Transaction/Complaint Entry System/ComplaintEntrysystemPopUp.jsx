import React, { useState, useEffect } from "react";
import "./ComplaintEntrySystemPopUp.css";

// =================================================================================================
import { API_BASE_URL } from "../../../api/api";
import PopupTable from '../../../Admission/PopupTable';
import { toast } from "react-toastify";
import { FloatingInput, FloatingSelect } from "../../../../FloatingInputs";

const ComplaintEntrySystemPopUp = ({onClose}) => {
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

      toast.success("Complaint submitted successfully!");

      // Reset form
      setFormData({
        type: "Equipment",
        complaintType: "Internal Department",
        complaintSubject: "",
        priority: "Ordinary"
      });
      setSelectedDepartment("");
      setSelectedEquipment("");
      onClose();

    } catch (error) {
      console.error("Error submitting complaint:", error);
      toast.error("Failed to submit complaint. Please try again.");
    }
  };

  // ==================================================================



  return (
    <div className="outer-container-details">
      <div className="complaint-entry-system-form">
        <div className="complaint-panel-header">Complaint Details</div>
        <div className="complaintSpace">
          <div className="complaint-entry-system-row-select">
            <label>Type :</label>
            <div className="complaint-entry-system-radio-group">
              <input type="radio" name="type" id="equipment" />
              <label htmlFor="equipment">Equipment</label>
            </div>
          </div>
          <div className="complaint-entry-system-row">
            <FloatingInput
            label={"Complaint To Department"}
            onIconClick={() => setActivePopup("department")}
            type="search"
            value={selectedDepartment?.departmentName || ''}
            />
          </div>
          <div className="complaint-entry-system-row">
            <FloatingSelect
            label={"Complaint Type"}
            
             name="complaintType"
             value={formData.complaintType}
             onChange={handleInputChange}
             options={[{value:"",label:""},
              {value:"Internal Department",label:"Internal Department"},
              {value:"For Patient",label:"For Patient"}
             ]}
            />
          </div>

          {/* ========================================================================================= */}
          <div className="complaint-entry-system-row">
            <FloatingInput
            label={"Equipment Name"}
            type="search"
            value={selectedEquipment?.equipmentName || ''}
            
            onIconClick={() => setActivePopup("equipment")}
            readOnly
            />
          </div>



          {/* ================================================================================================ */}


          {/* Populated Fields */}
          <div className="complaint-entry-system-row">
            <FloatingInput
            label={"Serial No"}
            type="text"
            value={selectedEquipment?.serialNo || ""}
           
            readOnly
            />
          </div>
          <div className="complaint-entry-system-row">
            <FloatingInput
            label={"Model No"}
            type="text"
            value={selectedEquipment?.modelNo || ""}
            
            readOnly
            />
          </div>
          <div className="complaint-entry-system-row">
            <FloatingInput
            label={"Asset No"}
            type="text"
            value={selectedEquipment?.assetNo || ""}
           
            readOnly
            />
          </div>
          <div className="complaint-entry-system-row">
            <FloatingInput
            label={"Equipment No"}
            type="text"
            value={selectedEquipment?.equipmentNo || ""}
            
            readOnly
            />
          </div>
          <div className="complaint-entry-system-row">
            <FloatingInput
            label={"Software Version No"}
             type="text"
             value={selectedEquipment?.softwareVersion || ""}
            
             readOnly
            />
          </div>

          <div className="complaint-entry-system-row">
            <FloatingInput
            label={"Complaint Subject"}
             type="text"
             
             name="complaintSubject"
             value={formData.complaintSubject}
             onChange={handleInputChange}
            />
          </div>

          <div className="complaint-entry-system-row">
            <FloatingSelect
             name="priority"
             value={formData.priority}
             onChange={handleInputChange}
             options={[{value:"",label:""},
              {value:"Ordinary",label:"Ordinary"},
              {value:"Urgent",label:"Urgent"},
              {value:"Immediate",label:"Immediate"}
             ]}
            
            />
          </div>
        </div>
        <div className="complaint-panel-header">Attachment</div>
        <div className="complaintSpace">
          <div className="complaint-entry-system-row">
            <FloatingInput
            label={"File Name"}
            type="file"
            />
            <button className="complaint-entry-system-upload-btn">Upload</button>
          </div>
        </div>


        <div className="ComplaintEntrySystemPopUp-action-buttons">
          <button className="btn-blue" onClick={handleSubmit}>Save</button>
        </div>
      </div>
      {activePopup && (
                <PopupTable
                  columns={columns}
                  data={data}
                  onSelect={handleSelect}
                  onClose={() => setActivePopup(false)}
                />
              )}

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
  );
};

export default ComplaintEntrySystemPopUp;
