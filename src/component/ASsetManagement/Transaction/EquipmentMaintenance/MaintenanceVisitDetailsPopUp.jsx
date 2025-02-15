import React, { useRef, useEffect, useState } from "react";
import "./MaintenanceVisitDetailsPopUp.css";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Using react-icons
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../../api/api";
import { FloatingInput,FloatingSelect,FloatingTextarea } from "../../../../FloatingInputs";
import { toast } from "react-toastify";


const MaintenanceVisitDetailsPopUp = ({ onClose }) => {

  const [partsDetails, setPartsDetails] = useState([
    { id: 1, sn: "", partsName: "", actionTaken: "" }
  ]);

  const [formData, setFormData] = useState({
    visitingDate: "",
    visitingTime: "",
    repairDetails: "",
    nextSchedule: "",

    breakdownDetails: {
      breakdownId: "",
    },

    maintenanceTypeMasterDTO: {
      typeMasterId: "",
    },
    parts: [],
  })

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      parts: partsDetails.map((row) => ({
        partName: row.partsName,
        action: row.actionTaken,
      })),
    }));
  }, [partsDetails]);

  const handleAddRow = () => {
    setPartsDetails([
      ...partsDetails,
      {
        id: partsDetails.length + 1,
        sn: "",
        partsName: "",
        actionTaken: ""
      }
    ]);
  };

  const handleDeleteRow = (id) => {
    if (partsDetails.length > 1) {  // Only allow deletion if more than one row exists
      setPartsDetails(partsDetails.filter(row => row.id !== id));
    }
  };


  const [breakdownDetails, setBreakdownDetails] = useState([]);
  const [selectedBreakdownDtetails, setSelectedBreakdownDtetails] = useState("");

  const [maintainaceTypeMasters, setMaintainaceTypeMasters] = useState([]);
  const [selectedMaintainanceTypeMaster, setSelectedMaintainanceTypeMaster] = useState("");

  const [columnWidths, setColumnWidths] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState("");
  const tableRef = useRef(null);

  const [equipmentData, setEquipmentData] = useState({
    equipmentName: "",
    equipmentMasterId: "",
    assetNo: "",
    location: "",
    category: "",
    depreciation: "",
    serialNo: "",
    modelNo: "",
    responsiblePerson: "",
    companyBrand: "",


    supplierName: "",
    supplierAddress: "",
    contactPerson: "",
    contactNumber: "",
    supplierEmail: "",


  });

  useEffect(() => {
    fetch(`${API_BASE_URL}/breakdowns`)
      .then((response) => response.json())
      .then((data) => {
        setBreakdownDetails(data); // Assuming data is an array of complaint objects

      })
      .catch((error) => console.error("Error fetching Breakdown Details:", error));
  }, []);


  useEffect(() => {
    fetch(`${API_BASE_URL}/maintenance-type`)
      .then((response) => response.json())
      .then((data) => {
        setMaintainaceTypeMasters(data); // Assuming data is an array of complaint objects

      })
      .catch((error) => console.error("Error fetching Maintainance Types:", error));
  }, []);

  const handleMaintainanceChange = (event) => {
    const selectedMaintainaceId = event.target.value;
    setSelectedMaintainanceTypeMaster(selectedMaintainaceId);

    setFormData((prev) => ({
      ...prev,
      maintenanceTypeMasterDTO: { typeMasterId: selectedMaintainaceId },
    }));
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handlePartsChange = (id, field, value) => {
    setPartsDetails((prevParts) =>
      prevParts.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };
  

  const handleBreakDownChange = (event) => {
    const selectedBreakdownId = event.target.value;
    setSelectedBreakdownDtetails(selectedBreakdownId);
    setFormData((prev) => ({
      ...prev,
      breakdownDetails: { breakdownId: selectedBreakdownId },
    }));

    fetch(`${API_BASE_URL}/breakdowns/${selectedBreakdownId}`)
      .then((response) => response.json())
      .then((data) =>
        setEquipmentData({
          equipmentNo: data.complaintDTO?.equipmentMaster?.equipmentNo || "",
          equipmentName: data.complaintDTO?.equipmentMaster?.equipmentName || "",
          serialNo: data.complaintDTO?.equipmentMaster?.serialNo || "",
          equipmentMasterId: data.complaintDTO?.equipmentMaster?.equipmentMasterId || "",
          assetNo: data.complaintDTO?.equipmentMaster?.assetNo || "",
          location: data.complaintDTO?.equipmentMaster?.assetLocationMaster?.subLocation || "",
          category: data.complaintDTO?.equipmentMaster?.assetCateMasterDTO?.assetCategory || "",
          depreciation: data.complaintDTO?.equipmentMaster?.assetCateMasterDTO?.depreciation || "",
          modelNo: data.complaintDTO?.equipmentMaster?.modelNo || "",
          responsiblePerson: data.complaintDTO?.equipmentMaster?.employee?.firstName || "",
          companyBrand: data.complaintDTO?.equipmentMaster?.companyBrand || "",
          supplierName: data.complaintDTO?.equipmentMaster?.vendor?.vendorName || "",
          contactNumber: data.complaintDTO?.equipmentMaster?.vendor?.contactNumber || "",
          supplierAddress: data.vendor?.contactAddress || "",
          contactPerson: data.vendor?.contactPerson || "",
          supplierEmail: data.vendor?.email || "",
        })
      )
      .catch((error) => console.error("Error fetching equipment details:", error));
  };



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setUploadMessage(""); // Clear any previous upload messages
    }
  };

  const handleSave = async () => {

    
    try {
      const response = await fetch(`${API_BASE_URL}/maintenance-visits`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        toast.success("Maintenance Visit Details saved successfully!");
      } else {
        const errorData = await response.json();
        toast.error("Error saving data:", errorData);
        toast.error("Failed to save maintenance visit details. Please try again.");
      }
    } catch (error) {
      toast.error("Error:", error);
    }
  };
  

  // Handle file upload
  const handleUpload = () => {
    if (!selectedFile) {
      setUploadMessage("Please select a file before uploading.");
      return;
    }

    // Simulate upload (replace with actual upload logic)
    setTimeout(() => {
      setUploadMessage(`File "${selectedFile.name}" uploaded successfully!`);
      setSelectedFile(null); // Clear selected file after upload
    }, 1000); // Simulate upload delay
  };

  const renderTable = () => {

  };
  // ===================================================================

  return (
    <div
      className="MaintenanceVisitDetailsPopUp-container"
    >
      <div className="MaintenanceVisitDetailsPopUp-header">
        <h4>Equipment Maintenance Visit Details</h4>
        {/* <button className="MaintenanceVisitDetailsPopUp-close-btn" onClick={onClose}>
          X
        </button> */}
      </div>
      <div className="MaintenanceVisitDetailsPopUp-form">
        <div className="MaintenanceVisitDetailsPopUp-form-row">
          <div className="MaintenanceVisitDetailsPopUp-form-group-1row">
            <div className="MaintenanceVisitDetailsPopUp-form-group">
            <FloatingSelect
  label={"Breakdown Details"}
  value={selectedBreakdownDtetails}
  onChange={handleBreakDownChange}
  options={[
    { value: "", label: "Select BreakDown Number", disabled: true },
    ...breakdownDetails.map((breakdown) => ({
      value: breakdown.breakdownId,
      label: breakdown.breakdownDetails
    }))
  ]}
/>
            
              </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput
              label={"Equipment Name"}
              id="equipment-name" type="text" value={equipmentData.equipmentName}/>
              
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput
              label={"Equipment Code"}
              id="equipment-code" type="text" value={equipmentData.equipmentMasterId}
              />
             
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput
              label={"Asset No"}id="asset-no" type="text" value={equipmentData.assetNo}/>
              
            </div>
          </div>
          <h4>Equipment Details</h4>
          <div className="MaintenanceVisitDetailsPopUp-form-group-1row">
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput
              label={"Manual Code"}type="text" />
           
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput
              label={"Location"}
              id="location" type="text" value={equipmentData.location} />
             
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput
              label={"Category"}
              id="category" type="text" value={equipmentData.category}
              />
             
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput
              label={"Depreciation"}
              id="depreciation" type="text" value={equipmentData.depreciation}/>
              
            </div>
          </div>
          <div className="MaintenanceVisitDetailsPopUp-form-group-1row">
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput
              label={"Serial No"}
              id="serial-no" type="text" value={equipmentData.serialNo}/>
              
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput
              label={"Model No"}
              id="model-no" type="text" value={equipmentData.modelNo}/>
              
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput
              label={"Responsibility Person"}
              id="responsibility-person" type="text" value={equipmentData.responsiblePerson} 
              />
             
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput
              label={"AMC Type"}
              id="awc-type" type="text" placeholder="Enter AWC Type" />
              
            </div>
          </div>
          <div className="MaintenanceVisitDetailsPopUp-form-group-1row">
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput
              label={"AMC Date"}
              id="amc-date" type="date"
              />
             
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput
              label={"Company Brand"}
              id="company-brand" type="text" value={equipmentData.companyBrand} />
             
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput
              label={"Maintenance Type"}
              id="maintenance-type" type="text"
              />
             
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput
              label={"Breakdown Number"}
              id="breakdown-number" type="text" value={selectedBreakdownDtetails}
              />
              
            </div>

          </div>

          <h4>Supplier Details</h4>

          <div className="MaintenanceVisitDetailsPopUp-form-group-1row">
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput label={"Supplier Name"}
              id="execution-name" type="text" value={equipmentData.supplierName}></FloatingInput>
            </div>

            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput
              label={"Phone Number"}
              id="phone-number" type="tel" value={equipmentData.contactNumber}/>
             
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput
              label={"Visiting Date"}
              id="visitingDate"
              type="date"
              name="visitingDate"
              value={formData.visitingDate}
              onChange={handleFormChange}/>
             
            </div>

            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput
              label={"Next Schedule"}
              id="nextSchedule"
              type="date"
              name="nextSchedule"
              value={formData.nextSchedule}
              onChange={handleFormChange}
              />
                     
              </div>

          </div>

          <div className="MaintenanceVisitDetailsPopUp-form-group-1row">
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput
              label={"Visiting Time"}
              id="visitingTime"
                type="time"
                name="visitingTime"
                value={formData.visitingTime}
                onChange={handleFormChange}/>
            
                      </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingInput
              label={"Arrival Date"}
               id="arrival-date" type="date"/>
             
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
            <FloatingSelect
  label={"Maintenance Type"}
  value={selectedMaintainanceTypeMaster}
  onChange={handleMaintainanceChange}
  options={[
    { value: "", label: "Select Maintenance Type", disabled: true },
    ...maintainaceTypeMasters.map((maintainaceTypeMaster) => ({
      value: maintainaceTypeMaster.typeMasterId,
      label: maintainaceTypeMaster.typeName
    }))
  ]}
/>
               
              </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <FloatingTextarea
              label={"Repair Details"}
              id="repairDetails"
                name="repairDetails"
                value={formData.repairDetails}
                onChange={handleFormChange}/>
              <label htmlFor="repair-details">:</label>
                      </div>
          </div>
          <div className="MaintenanceVisitDetailsPopUp-form-group-1row">

            <div className="MaintenanceVisitDetailsPopUp-form-group">
            </div>

            <div className="MaintenanceVisitDetailsPopUp-form-group">
            </div>

            <div className="MaintenanceVisitDetailsPopUp-form-group">
            </div>
          </div>



        </div>
      </div>

      <div className="visit-details-section">
        <h4>Parts Details</h4>
        <div className="visit-details-table-container">
          <table className="visit-details-table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Parts Name</th>
                <th>Action Taken</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {partsDetails.map((row, index) => (
                <tr key={row.id}>
                  <td>
                    <td>
                      {index + 1}  {/* Display automatic serial number */}
                    </td>
                  </td>
                  <td>
                    <FloatingInput
                     type="text"
                      value={row.partsName}
                      onChange={(e) => handlePartsChange(row.id, 'partsName', e.target.value)}
                    
                    />
                    
                  </td>
                  <td>
                    <FloatingInput
                      type="text"
                      value={row.actionTaken}
                      onChange={(e) => handlePartsChange(row.id, 'actionTaken', e.target.value)}
                      
                    />
                    
                  </td>
                  <td>
                    <button
                      className="visit-details-add-row-btn"
                      onClick={handleAddRow}
                    >
                      Add
                    </button>
                    <button
                      className="visit-details-delete-btn"
                      onClick={() => handleDeleteRow(row.id)}
                    >
                      Del
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>


      <div className="MaintenanceVisitDetailsPopUp-form-actions">
        <button
          className="MaintenanceVisitDetailsPopUp-add-btn"
          onClick={handleSave}
        >
          Add
        </button>
        <button className="MaintenanceVisitDetailsPopUp-close-btn" onClick={onClose}>Close</button>
      </div>

    </div>
  );
};

export default MaintenanceVisitDetailsPopUp;
