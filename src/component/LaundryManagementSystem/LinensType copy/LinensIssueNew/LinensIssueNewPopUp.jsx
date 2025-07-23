import React, { useState, useEffect, useRef } from "react";
import "./LinensIssueNewPopUp.css";
import axios from "axios";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import { CiSearch } from "react-icons/ci";
import PopupTable from "../../../Admission/PopupTable";
import { API_BASE_URL } from '../../../api/api'
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";



const LinensIssueNewPopUp = ({ onClose }) => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [issues, setIssues] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [linenDetails, setLinenDetails] = useState([]);
  const [details, setDetails] = useState([]);
  const linenDetailsHeading = ["linenTypeId", "linenType"];
  const [formData, setFormData] = useState([]);

  const [issueDetails, setIssueDetails] = useState({
    issueNumber: "",
    issueDate: "",
    issueTime: "",
    issueType: "",
    nursingStation: "",
    currentOccupancy: "",
  });

  const [rows, setRows] = useState([
    {
      id: 1,
      linensName: "",
      inStock: "",
      prevBalance: "",
      issuedQty: "",
      lnm: "",
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIssueDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        linensName: "",
        stock: "",
        prevBalance: "",
        issuedQty: "",
        lnm: "",
      },
    ]);
  };

  const deleteRow = (id) => {
    if (rows.length > 1) {
      setRows((prev) => prev.filter((row) => row.id !== id));
    } else {
      alert("At least one row must remain.");
    }
  };

  const handleUpdateRow = (index, field, value) => {
    setRows((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  const handleClear = () => {
    setIssueDetails({
      issueNumber: "",
      issueDate: "",
      issueTime: "",
      issueType: "",
      nursingStation: "",
      currentOccupancy: "",
    });
    setRows([
      
    ]);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    ).toString().padStart(2, "0")}/${date.getFullYear()}`;
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minutes}${ampm}`;
  };

  

  const fetchItemDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/linenMaster`);
      const details = response.data.map((item) => ({
        linenTypeId: item.linenTypeDTO.linenTypeId,
        linenType: item.linenTypeDTO.linenType,
        stock: item.linenTypeDTO.stock,
      }));
      setLinenDetails(details);
    } catch (error) {
      console.error("Error fetching linen details:", error);
      alert("Failed to fetch linen details. Please try again later.");
    }
  };

  const handleReseat = () => {
    setIssueDetails({
      issueNumber: "",
      issueDate: "",
      issueTime: "",
      nursingStation: "",
      currentOccupancy: "",
      issueType: "",
    });
  
    setFormData({
      linenType: "",
      stock: "",
    });
  
    setRows([
      {
        id: 1,
        linensName: "",
        prevBalance: "",
        issuedQty: "",
        lnm: "",
      },
    ]);
  };
  


  const handlePopupClose = () => {
    setActivePopup(null);
  };

  

  const handleSave = async () => {
    // Check if required fields are filled
    if (
      !issueDetails.issueNumber.trim() ||
      !issueDetails.issueDate ||
      !issueDetails.issueTime ||
      !issueDetails.issueType ||
      !issueDetails.nursingStation.trim() ||
      !issueDetails.currentOccupancy
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
  
    try {
      const linenDetailsListDTOs = rows.map((row) => ({
        linenDetailsListId: details?.linenDetailsListId,
        issueQuantity: parseInt(row.issuedQty) || 0,
      }));
  
      const payload = {
        issueDate: formatDate(issueDetails.issueDate),
        issueTime: formatTime(issueDetails.issueTime),
        issueType: issueDetails.issueType,
        nursingType: issueDetails.nursingStation,
        currentOccupancy: parseInt(issueDetails.currentOccupancy) || 0,
        status: "Pending",
        linenDetailsListDTOs: linenDetailsListDTOs,
      };
  
      console.log("Sending payload:", payload);
  
      const response = await axios.post(`${API_BASE_URL}/linens-issues`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200 || response.status === 201) {
        toast.success("Linens issue saved successfully!");
        handleClear();
      }
    } catch (error) {
      toast.error("Error saving linens issue:");
      let errorMessage = "Failed to save linens issue. ";
      if (error.response?.data) {
        errorMessage += error.response.data;
      } else if (error.message) {
        errorMessage += error.message;
      }
      alert(errorMessage);
    }
  };
  

  const fetchIssues = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/linens-issues`
      );
      setIssues(response.data);
    } catch (error) {
      console.error("Error fetching issues:", error);
      alert("Failed to fetch issues. Please try again later.");
    }
  };

  useEffect(() => {
    fetchIssues();
    fetchItemDetails();
  }, []);

  const handleSelect = (data) => {
    if (!data) return;
    setDetails(data);
    if (activePopup === "itemDetails") {
      setFormData((prev) => ({
        linenType: data.linenType,
        // stock: data.stock,
      }));
    }
    setActivePopup(null);
  };
  const getPopupData = () => {
    if (activePopup === "itemDetails") {
      return { columns: linenDetailsHeading, data: linenDetails };
    }
    return { columns: [], data: [] };
  };
  const { columns, data } = getPopupData();

  return (
    <div className="LinensIssueNewPopUp-container">
      <div className="LinensIssueNewPopUp-header">
        <h4>Linens Issue</h4>
      </div>

      <div className="LinensIssueNewPopUp-form">
        <div className="LinensIssueNewPopUp-section">
          <div className="LinensIssueNewPopUp-grid">
            <FloatingInput
              type="number"
              label="Issue Number"
              name="issueNumber"
              value={issueDetails.issueNumber}
              onChange={handleInputChange}
              min="0"
              required
            />
            <FloatingInput
              label="Issue Date"
              type="date"
              name="issueDate"
              value={issueDetails.issueDate}
              onChange={handleInputChange}
              required
            />
            <FloatingInput
              label="Issue Time"
              type="time"
              name="issueTime"
              value={issueDetails.issueTime}
              onChange={handleInputChange}
              required
            />
            <div className="LinenMaster-search-field">
              <FloatingInput label="Nursing Station"
                type="text"
                name="nursingStation"
                value={issueDetails.nursingStation}
                onChange={handleInputChange}
                required
              />
              
            </div>

            <FloatingInput
              label="Current Occupancy"
              type="number"
              name="currentOccupancy"
              value={issueDetails.currentOccupancy}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="LinensIssueNewPopUp-form-group">
            <label className="LinensIssueNewPopUp-form-group-radio-label">Linens Issue Type:</label>
            <div className="LinensIssueNewPopUp-form-group-radio">
              <input
                type="radio"
                name="issueType"
                value="Nursing Station"
                checked={issueDetails.issueType === "Nursing Station"}
                onChange={handleInputChange}
              />
              <span>Nursing Station</span>
              <input
                type="radio"
                name="issueType"
                value="Department"
                checked={issueDetails.issueType === "Department"}
                onChange={handleInputChange}
              />
              <span>Department</span>
              <input
                type="radio"
                name="issueType"
                value="Staff"
                checked={issueDetails.issueType === "Staff"}
                onChange={handleInputChange}
              />
              <span>Staff</span>
            </div>
          </div>
        </div>
      </div>
      <div className="table-container">
        <h4>Linens Details</h4>
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "SN",
                "Linens Name",
                "In Stock",
                "Previous Balance",
                "Issued Quantity",
                "LNM",
                "Actions",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] || "auto" }}
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
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>
                  <div>
                    <input
                      type="text"
                      value={formData.linenType}
                      onChange={(e) =>
                        handleUpdateRow(index, "linensName", e.target.value)
                      }

                      required
                    /><CiSearch className="table-container-search" onClick={() => {
                      setActivePopup("itemDetails");
                    }}
                    />
                  </div>

                </td>
                <td>
                  <input
                    type="number"
                    value={formData.stock}
                    min="0"
                    onChange={(e) =>
                      handleUpdateRow(index, "stock", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.prevBalance}
                    min="0"
                    onChange={(e) =>
                      handleUpdateRow(index, "prevBalance", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.issuedQty}
                    min="0"
                    onChange={(e) =>
                      handleUpdateRow(index, "issuedQty", e.target.value)
                    }
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.lnm}
                    min="0"
                    onChange={(e) => handleUpdateRow(index, "lnm", e.target.value)}
                  />
                </td>
                <td>
                  <button
                    className="LinensIssueNewPopUp-add-btn"
                    onClick={addRow}
                  >
                    Add
                  </button>
                  <button
                    className="LinensIssueNewPopUp-close-btn"
                    onClick={() => deleteRow(row.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="LinensIssueNewPopUp-form-actions">
        <button className="LinensIssueNewPopUp-add-btn" onClick={handleSave}>
          Save
        </button>
        <button className="LinensIssueNewPopUp-add-btn" onClick={handleReseat}>
          Reseat
        </button>
      </div>
      {activePopup && (
        <PopupTable
          columns={columns}
          data={data}
          onSelect={handleSelect}
          onClose={handlePopupClose}
        />
      )}
    </div>
  );
};

export default LinensIssueNewPopUp;