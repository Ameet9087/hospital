import React, { useState, useRef, useEffect } from "react";
import "./LinenRequirement.css";
import { FaSearch, FaArrowCircleRight } from "react-icons/fa"; // Importing icons
import axios from "axios";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";
import PopupTable from "../../Admission/PopupTable";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../FloatingInputs";

function LinenRequirement() {
  const [activePopup, setActivePopup] = useState("");
  const [formData, setFormData] = useState("");
  const [rows, setRows] = useState([
    {
      linens: "",
      quantity: "",
      inUse: "",
      readyForUse: "",
      beingProcessed: "",
      inTransit: "",
    },
  ]);
  const [columnWidths, setColumnWidths] = useState({});
  const [linenSearchResults, setLinenSearchResults] = useState([]);
  const [addLinnenTypes, setAddLinnenTypes] = useState([]);
  const [addDepartments, setAddDepartments] = useState([]);
  const [linenTypes, setLinenTypes] = useState([]);
  const ipnoHeading = ["linenTypeId", "linenType"];
  const departmentHeading = ["departmentId", "departmentName"];
  const [departments, setDepartments] = useState([]); // New state for departments
  const tableRef = useRef(null);
  // const [formData, setFormData] = useState([]);
  useEffect(() => {
    const fetchLinens = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/linenTypes`);
        setLinenTypes(response.data);
      } catch (error) {
        console.error("Error fetching linens:", error);
      }
    };
    fetchLinens();
  }, []);
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/departments/getAllDepartments`
        );
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchDepartments();
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
    const handleClear = () => {
      setFormData({
        linenType: "",
        laundryService: "",
        description: "",
        departmentName: "",
      });
      
      setRows([
        {
          linens: "",
          quantity: "",
          inUse: "",
          readyForUse: "",
          beingProcessed: "",
          inTransit: "",
        },
      ]);
    };
    
  const handleAddRow = () => {
    setRows([
      ...rows,
      {
        linens: "",
        quantity: "",
        inUse: "",
        readyForUse: "",
        beingProcessed: "",
        inTransit: "",
        linenType:"",
        
      },
    ]);
  };
  const handleDeleteRow = (index) => {
    if (index === 0) return;
    setRows(rows.filter((_, i) => i !== index));
  };
  const handleSelect = (data) => {
    console.log("Selected Data:", data); // Debugging
    if (!data) return;

    if (activePopup === "linenType") {
      setAddLinnenTypes(data);
      setFormData((prev) => ({
        ...prev,
        linenType: data.linenType,
      }));
    } else if (activePopup === "department") {
      setAddDepartments(data);
      setFormData((prev) => ({
        ...prev,
        departmentName: data.departmentName,
      }));
    }

    setActivePopup(null); // Close the popup after selection
  };

  const getPopupData = () => {
    if (activePopup === "linenType") {
      return { columns: ipnoHeading, data: linenTypes };
    } else if (activePopup === "department") {
      return { columns: departmentHeading, data: departments };
    }
    return { columns: [], data: [] };
  };
  const { columns, data } = getPopupData();
  const handleSubmit = async () => {
    try {
      const requestData = {
        type: formData.linenType,
        departmentDTO: {
          departmentId: addDepartments?.departmentId,
        },
        linenDetailsDTO: {
          // linenDetailId: addLinnenTypes?.linenDetailId,

          quantity: rows[0]?.quantity || null,
          inUse: rows[0]?.inUse || null,
          readyForUse: rows[0]?.readyForUse || null,
          beingProcessed: rows[0]?.beingProcessed || null,
          inTransit: rows[0]?.inTransit || null,
        },
      };
      console.log("Request Payload:", requestData);
      const response = await axios.post(
        `${API_BASE_URL}/linen-requirements`,
        requestData
      );
      console.log("Response Data:", response.data);
      toast.success("Data submitted successfully.");
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error("Error submitting data.");
    }
  };
  return (
    <div className="RefLinenRequirement-container">
      {/* <div className="LinenRLinenType-header">
        <span className="LinenRLinenType-headingName">Linen Requirement</span>
      </div> */}
      <div className="RefLinenRequirement-section">
        <div className="RefLinenRequirement-grid">
          <div className="RefLinenRequirement-search-field">
            <FloatingInput
              label="Type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="LinenMaster-search-field">
            <FloatingInput
              label="Select Department"
              type="search"
              value={formData.departmentName}
              name="laundryServices"
              onChange={handleInputChange}
              onIconClick={() => setActivePopup("department")}
              required
            />
            
          </div>

          <FloatingInput
            label="Description"
            type="tel"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
      </div>
      {/* Table Section */}
      <div className="RefLinenRequirement-container-table">
        <table ref={tableRef} border={1}>
          <thead>
            <tr>
              {[
                "Action",
                "SN",
                "Linens",
                "Quantity (Per Day Per Patient)",
                "In Use (Number)",
                "Ready For Use (Number)",
                "Being Processed (Number)",
                "In Transit (Number)",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(
                        tableRef,
                        setColumnWidths
                      )(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <button
                    className="LinenRLinenType-Add-button"
                    onClick={handleAddRow}
                  >
                    Add
                  </button>
                  <button
                    className="LinenRLinenType-Del-button "
                    onClick={() => handleDeleteRow(index)}
                    disabled={index === 0}
                  >
                    Delete
                  </button>
                </td>
                <td>{index + 1}</td>
                <td>
                  
                  <FloatingInput 
                  label={"Linens"}
                  type="search"
                  value={formData.linenType}
                  onIconClick={() => setActivePopup("linenType")}
                  />
                </td>
                <td>
                  
                  <FloatingInput 
                  label={"Quantity"}
                  type="number"
                  name="quantity"
                  value={row.quantity}
                  onChange={(e) => {
                    const value = e.target.value;

                    // Prevent negative values
                    if (value >= 1 || value === "") {
                      const newRows = [...rows];
                      newRows[index].quantity = value;
                      setRows(newRows);
                    }
                  }}
                  />
                </td>
                <td>
                  <FloatingInput 
                  label={"Inuse"}
                  type="number"
                    name="inUse"
                    value={row.inUse}
                    onChange={(e) => {
                      const value = e.target.value;
  
                      // Prevent negative values
                      if (value >= 1 || value === "") {
                        const newRows = [...rows];
                        newRows[index].inUse = value;
                        setRows(newRows);
                      }
                    }}
                  />
                </td>
                <td>
                  
                   <FloatingInput 
                  label={"Inuse"}
                  type="number"
                  name="readyForUse"
                  value={row.readyForUse}
                    onChange={(e) => {
                      const value = e.target.value;
  
                      // Prevent negative values
                      if (value >= 1 || value === "") {
                        const newRows = [...rows];
                        newRows[index].readyForUse = value;
                        setRows(newRows);
                      }
                    }}
                  />
                </td>
                <td>
                 
                    <FloatingInput 
                  label={"Inuse"}
                  type="number"
                  name="beingProcessed"
                    value={row.beingProcessed}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value >= 1 || value === "") {
                        const newRows = [...rows];
                        newRows[index].beingProcessed = value;
                        setRows(newRows);
                      }
                    }}
                  />
                </td>
                <td>
                  
                    <FloatingInput 
                  label={"Inuse"}
                  type="number"
                  name="inTransit"
                    value={row.inTransit}
                    onChange={(e) => {
                      const value = e.target.value;
  
                      // Prevent negative values
                      if (value >= 1 || value === "") {
                        const newRows = [...rows];
                        newRows[index].inTransit = value;
                        setRows(newRows);
                      }
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="LinenRLinenType-action-buttons">
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleClear}>Reseat</button>
      </div>
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
}
export default LinenRequirement;
