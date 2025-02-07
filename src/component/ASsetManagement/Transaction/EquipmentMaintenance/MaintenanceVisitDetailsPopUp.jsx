import React, { useRef, useEffect, useState } from "react";
import "./MaintenanceVisitDetailsPopUp.css";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Using react-icons
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../../api/api";


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
        alert("Maintenance Visit Details saved successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error saving data:", errorData);
        alert("Failed to save maintenance visit details. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
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
              <label htmlFor="visit-number">Breakdown Details:</label>
              <select
                value={selectedBreakdownDtetails}
                onChange={handleBreakDownChange}
              >
                <option value="" disabled>
                  Select BreakDown Number
                </option>
                {breakdownDetails.map((breakdown) => (
                  <option key={breakdown.breakdownId} value={breakdown.breakdownId}>
                    {breakdown.breakdownDetails}
                  </option>
                ))}
              </select>
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="equipment-name">Equipment Name:</label>
              <input id="equipment-name" type="text" value={equipmentData.equipmentName} placeholder="Enter Equipment Name" />
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="equipment-code">Equipment Code:</label>
              <input id="equipment-code" type="text" value={equipmentData.equipmentMasterId} placeholder="Enter Equipment Code" />
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="asset-no">Asset No:</label>
              <input id="asset-no" type="text" value={equipmentData.assetNo} placeholder="Enter Asset No" />
            </div>
          </div>
          <h4>Equipment Details</h4>
          <div className="MaintenanceVisitDetailsPopUp-form-group-1row">
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="manual-code">Manual Code:</label>
              <input id="manual-code" type="text" placeholder="Enter Manual Code" />
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="location">Location:</label>
              <input id="location" type="text" value={equipmentData.location} placeholder="Enter Location" />
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="category">Category:</label>
              <input id="category" type="text" value={equipmentData.category} placeholder="Enter Category" />
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="depreciation">Depreciation:</label>
              <input id="depreciation" type="text" value={equipmentData.depreciation} placeholder="Enter Depreciation" />
            </div>
          </div>
          <div className="MaintenanceVisitDetailsPopUp-form-group-1row">
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="serial-no">Serial No.:</label>
              <input id="serial-no" type="text" value={equipmentData.serialNo} placeholder="Enter Serial No" />
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="model-no">Model No.:</label>
              <input id="model-no" type="text" value={equipmentData.modelNo} placeholder="Enter Model No" />
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="responsibility-person">Responsibility Person:</label>
              <input id="responsibility-person" type="text" value={equipmentData.responsiblePerson} placeholder="Enter Responsibility Person" />
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="awc-type">AMC Type:</label>
              <input id="awc-type" type="text" placeholder="Enter AWC Type" />
            </div>
          </div>
          <div className="MaintenanceVisitDetailsPopUp-form-group-1row">
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="amc-date">AMC Date:</label>
              <input id="amc-date" type="date" />
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="company-brand">Company Brand:</label>
              <input id="company-brand" type="text" value={equipmentData.companyBrand} placeholder="Enter Company Brand" />
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="maintenance-type">Maintenance Type:</label>
              <input id="maintenance-type" type="text" placeholder="Enter Maintenance Type" />
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="breakdown-number">Breakdown Number:</label>
              <input id="breakdown-number" type="text" value={selectedBreakdownDtetails} placeholder="Enter Breakdown Number" />
            </div>

          </div>

          <h4>Supplier Details</h4>

          <div className="MaintenanceVisitDetailsPopUp-form-group-1row">
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="execution-name">Supplier Name:</label>
              <input id="execution-name" type="text" value={equipmentData.supplierName} placeholder="Enter Execution Name" />
            </div>

            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="phone-number">Phone Number:</label>
              <input id="phone-number" type="tel" value={equipmentData.contactNumber} placeholder="Enter Phone Number" />
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="visiting-date">Visiting Date:</label>
              <input
                id="visitingDate"
                type="date"
                name="visitingDate"
                value={formData.visitingDate}
                onChange={handleFormChange}
              />
            </div>

            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="next-schedule">Next Schedule:</label>
              <input
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
              <label htmlFor="visiting-time">Visiting Time:</label>
              <input
                id="visitingTime"
                type="time"
                name="visitingTime"
                value={formData.visitingTime}
                onChange={handleFormChange}
              />          </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="arrival-date">Arrival Date:</label>
              <input id="arrival-date" type="date" />
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="arrival-time">Maintainance Type:</label>
              <select
                value={selectedMaintainanceTypeMaster}
                onChange={handleMaintainanceChange}
              >
                <option value="" disabled>
                  Select Maintainance Type
                </option>
                {maintainaceTypeMasters.map((maintainaceTypeMaster) => (
                  <option key={maintainaceTypeMaster.typeMasterId} value={maintainaceTypeMaster.typeMasterId}>
                    {maintainaceTypeMaster.typeName}
                  </option>
                ))}
              </select>
            </div>
            <div className="MaintenanceVisitDetailsPopUp-form-group">
              <label htmlFor="repair-details">Repair Details:</label>
              <textarea
                id="repairDetails"
                name="repairDetails"
                value={formData.repairDetails}
                onChange={handleFormChange}
              />          </div>
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
                    <input
                      type="text"
                      value={row.partsName}
                      onChange={(e) => handlePartsChange(row.id, 'partsName', e.target.value)}
                      placeholder="Enter Parts Name"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.actionTaken}
                      onChange={(e) => handlePartsChange(row.id, 'actionTaken', e.target.value)}
                      placeholder="Enter Action Taken"
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
