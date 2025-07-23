import React, { useRef, useState, useEffect } from "react";
import "./EquipmentTransformHandoverFormPopUp.css";
import { API_BASE_URL } from "../../../api/api";
import { FloatingInput,FloatingSelect,FloatingTextarea } from "../../../../FloatingInputs";
import { toast } from "react-toastify";
const EquipmentTransformHandoverFormPopUp = ({ onClose }) => {
  const [columnWidths, setColumnWidths] = useState([150, 150, 150, 150, 150]);
  const tableRef = useRef(null);
  const [formData, setFormData] = useState({
    transferNo: "",  // Auto-generated transfer number will be assigned here
    equipmentName: "",
    assetNo: "",
    serialNo: "",
    location: "",
    department: "",
    equipmentno: "",
    transferDate: "",
    transferTime: "",
    handedBy: "",
    locationReceived: "",
    remarks: "",
    file: null,
    parts: [
      { partName: "Compressor", modelNo: "MODEL001", serialNo: "A21", standBy: "YES" },
      { partName: "Condenser Coil", modelNo: "MODEL002", serialNo: "A22", standBy: "YES" }
    ]
  });

  const [employeeType, setEmployeeType] = useState(""); // To store the selected employee type
  const [employees, setEmployees] = useState([]); // To store fetched employee list

  const handleEmployeeTypeChange = async (e) => {
    const type = e.target.value;
    setEmployeeType(type);

    if (type === "Employee") {
      try {
        const response = await fetch(`${API_BASE_URL}/employees/get-all-employee`);
        if (response.ok) {
          const data = await response.json();
          setEmployees(data);
        } else {
          console.error("Error fetching employees:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    } else {
      setEmployees([]); // Clear the employee list when "Non-Employee" is selected
    }
  };




  const handleHandedByChange = (e) => {
    setFormData({
      ...formData,
      handedBy: e.target.value,
    });
  };

  const [equipmentNames, setEquipmentNames] = useState([]);
  const [locations, setLocations] = useState([]);

// First useEffect for generating transfer number
useEffect(() => {
  setFormData(prevState => ({
    ...prevState,
    transferNo: `TH${Date.now()}`
  }));
}, []);

// Second useEffect for fetching locations
useEffect(() => {
  const fetchLocations = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/asset-location`);
      if (response.ok) {
        const data = await response.json();
        setLocations(data);
      } else {
        console.error("Error fetching locations:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };
  fetchLocations();
}, []);

// Third useEffect for fetching equipment names
useEffect(() => {
  const fetchEquipmentNames = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/equipment-masters`);
      if (response.ok) {
        const data = await response.json();
        setEquipmentNames(data);
      } else {
        console.error("Error fetching equipment names:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching equipment names:", error);
    }
  };
  fetchEquipmentNames();
}, []);
  const handleEquipmentNameChange = async (e) => {
    const equipmentName = e.target.value;
    const selectedEquipment = equipmentNames.find(
      (equip) => equip.equipmentName === equipmentName
    );
    if (selectedEquipment) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/equipment-masters/${selectedEquipment.equipmentMasterId}`
        );
        if (response.ok) {
          const data = await response.json();
          setFormData((prevData) => ({
            ...prevData,
            equipmentName: equipmentName,
            assetNo: data.assetNo || "",
            serialNo: data.serialNo || "",
            location: data.assetLocationMaster?.subLocation || "",
            department: data.department?.departmentName || "",
            equipmentno: data.equipmentNo || "",
          }));
        } else {
          console.error("Error fetching equipment details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching equipment details:", error);
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        equipmentName: equipmentName,
        assetNo: "",
        serialNo: "",
        location: "",
        department: "",
        equipmentno: "",
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSave = async () => {
    if (!formData.transferNo || !formData.equipmentName || !formData.locationReceived) {
      alert("Please fill in all required fields.");
      return;
    }

    const equipmentMasterId = equipmentNames.find(
      (equip) => equip.equipmentName === formData.equipmentName
    )?.equipmentMasterId;

    if (!equipmentMasterId) {
      alert("Equipment name is not valid.");
      return;
    }

    const payload = {
      dateOfTransfer: formData.transferDate,
      timeOfTransfer: formData.transferTime,
      employeeType: formData.employeetype,
      manualHanded: true,
      remarks: formData.remarks,
      equipmentMasterDTO: {
        equipmentMasterId,
      },
      assetLocationMasterDTO: {
        locId: formData.locationReceived,
      },
      handedByDTO: {
        employeeId: formData.handedBy,
      },
      partsDTO: formData.parts.map((part) => ({
        partName: part.partName,
        modelNo: part.modelNo,
        serialNo: part.serialNo,
        standBy: part.standBy,
      })),
    };

    console.log("Payload to be sent:", payload);

    try {
      const response = await fetch(`${API_BASE_URL}/equipment-transfer-handover`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Data submitted successfully!");
        onClose(); // Close the popup after successful submission
      } else {
        toast.error("Error:", response.statusText);
        toast.error("Failed to submit data!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while submitting data.");
    }
  };

  const closePopup = () => {
    console.log("Close button clicked");
    onClose(); // Close the modal
  };

  const handlePartChange = (index, e) => {
    const { name, value } = e.target;
    const updatedParts = [...formData.parts];
    updatedParts[index][name] = value;
    setFormData({
      ...formData,
      parts: updatedParts
    });
  };

  // Delete part from table
  const handleDeletePart = (index) => {
    const updatedParts = formData.parts.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      parts: updatedParts
    });
  };

  return (
    <div className="EquipmentTransformHandoverFormPopUp-container">
      <div className="EquipmentTransformHandoverFormPopUp-form">
        <h4>Equipment Transform Handover Form</h4>

        <div className="EquipmentTransformHandoverFormPopUp-panels">
          {/* Left Panel */}
          <div className="EquipmentTransformHandoverFormPopUp-panel left-panel">
            <div className="EquipmentTransformHandoverFormPopUp-form-group">
              <FloatingInput
              label={"Transfer/Handover No"}
              type="text"
                name="transferNo"
                value={formData.transferNo}
                onChange={handleChange}
                readOnly/>
             
            </div>

            <div className="EquipmentTransformHandoverFormPopUp-form-group">
            <FloatingSelect
  label={"Equipment Name"}
  name="equipmentName"
  value={formData.equipmentName}
  onChange={handleEquipmentNameChange}
  options={[
    { value: "", label: "Select Equipment" }, // Default option
    ...equipmentNames.map((equipment) => ({
      value: equipment.equipmentName,
      label: equipment.equipmentName,
    })),
  ]}
/>

            </div>

            <div className="EquipmentTransformHandoverFormPopUp-form-group">
              <FloatingInput
              label={"Asset No"}
              type="text"
              name="assetNo"
              value={formData.assetNo}
              onChange={handleChange}/>
              
            </div>

            <div className="EquipmentTransformHandoverFormPopUp-form-group">
              <FloatingInput
              label={"Serial No"}
              type="text"
                name="serialNo"
                value={formData.serialNo}
                onChange={handleChange}/>
             
            </div>

            <div className="EquipmentTransformHandoverFormPopUp-form-group">
              <FloatingInput
              label={"Location"}
              type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}/>
              
            </div>
          </div>

          
          <div className="EquipmentTransformHandoverFormPopUp-panel right-panel">
            <div className="EquipmentTransformHandoverFormPopUp-form-group">
              <FloatingInput
              label={"Transfer Date"}
              type="date"
                name="transferDate"
                value={formData.transferDate}
                onChange={handleChange}/>
              
            </div>

            <div className="EquipmentTransformHandoverFormPopUp-form-group">
              <FloatingInput
              label={"Transfer Time"}
              type="time"
                name="transferTime"
                value={formData.transferTime}
                onChange={handleChange}/>
              
            </div>

            <div className="EquipmentTransformHandoverFormPopUp-form-group">
              <FloatingSelect
              label={"Employee Type"}
              name="employeeType"
                value={employeeType}
                onChange={handleEmployeeTypeChange}
                options={[{value:"Employee",label:"Employee"},
                  {value:"Non-Employee",label:"Non-Employee"}
                ]}/>
            </div>

            <div className="EquipmentTransformHandoverFormPopUp-form-group">
            <div className="EquipmentTransformHandoverFormPopUp-form-group">
  <FloatingSelect
    label={"Handed By"}
    name="handedBy"
    value={formData.handedBy}
    onChange={handleHandedByChange}
    options={
      employeeType === "Employee"
        ? [
            { value: "", label: "Select Employee" },
            ...employees.map((emp) => ({
              value: emp.employeeId,
              label: emp.firstName,
            })),
          ]
        : []
    }
  />
  
  {employeeType !== "Employee" && (
    <FloatingInput
      type="text"
      name="handedBy"
      value={formData.handedBy}
      onChange={handleHandedByChange}
      className="EquipmentTransformHandoverFormPopUp-form-input"
      placeholder="Enter manually"
    />
  )}
</div>

            </div>

            <div className="EquipmentTransformHandoverFormPopUp-form-group">
            <FloatingSelect
  label={"Location Received"}
  name="locationReceived"
  value={formData.locationReceived}
  onChange={handleChange}
  options={[
    { value: "", label: "Select Location" }, // Default option
    ...locations.map((location) => ({
      value: location.locId,
      label: location.subLocation,
    })),
  ]}
/>

            </div>

            <div className="EquipmentTransformHandoverFormPopUp-form-group">
              <FloatingTextarea
              label={"Remarks"}
              name="remarks"
              value={formData.remarks}
              onChange={handleChange}/>
             
            </div>
          </div>
        </div>

        <div className="table-container">
          <table ref={tableRef}>
            <thead>
              <tr>
                {["Part No", "Stand By", "Model No", "Serial No", "Action"].map((header, index) => (
                  <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                    <div className="header-content">
                      <span>{header}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formData.parts.map((part, index) => (
                <tr key={index}>
                  <td>
                    <FloatingInput
                    label={"Part Name"}
                    type="text"
                    name="partName"
                    value={part.partName}
                    onChange={(e) => handlePartChange(index, e)}/>
                    
                  </td>
                  <td>
                    <FloatingSelect
                    label={"Stand By"}
                    name="standBy"
                    value={part.standBy}
                    onChange={(e) => handlePartChange(index, e)}
                    options={[{value:"Yes",label:"Yes"},{value:"No",label:"No"}]}/>
                    
                  </td>
                  <td>
                    <FloatingInput
                    label={"Model No"}
                    type="text"
                    name="modelNo"
                    value={part.modelNo}
                    onChange={(e) => handlePartChange(index, e)}/>
                    
                  </td>
                  <td>
                    <FloatingInput
                    label={"Serial No"}
                    type="text"
                      name="serialNo"
                      value={part.serialNo}
                      onChange={(e) => handlePartChange(index, e)}
                    />
                   
                  </td>
                  <td>
                    <button className="EquipmentTransformHandoverFormPopUp-button" type="button" onClick={() => handleDeletePart(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="button-group">
          <button className="EquipmentTransformHandoverFormPopUp-button" onClick={handleSave}>Save</button>
          <button className="EquipmentTransformHandoverFormPopUp-button" onClick={closePopup}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default EquipmentTransformHandoverFormPopUp;
