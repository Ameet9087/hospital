import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import "./LaundryStaffMapping.css";
import { FaSearch, FaArrowCircleRight } from "react-icons/fa";
import PopupTable from "../../Admission/PopupTable";
import { API_BASE_URL } from "../../api/api";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../FloatingInputs";

const LaundryStaffMapping = () => {
  const [selectedDetail, setSelectedDetail] = useState("staffmapping");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [activePopup, setActivePopup] = useState("");
  const [linenTypes, setLinenTypes] = useState([]);
  const [addEmployees, setAddEmployees] = useState([]);
  const ipnoHeading = ["employeeTypeId", "employeeType"];
  const [formData, setFormData] = useState([]);
  const [packageTableRows, setPackageTableRows] = useState([
    { sn: 1, type: "", nameofstaff: "", mapwithpayroll: "" },
  ]);
  const [employeeTypes, setEmployeeTypes] = useState([]);
  const [staffDetails, setStaffDetails] = useState({
    nameStaff: "",
    payroll: "",
    employeeType: {
      employeeTypeId: "",
    },
  });
  useEffect(() => {
    const fetchEmployeeTypes = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/employeeTypes/getAll`
          // "http://192.168.1.42:8080/api/employeeTypes/getAll"
        );
        const data = await response.json();
        setEmployeeTypes(data);
        setLinenTypes(data);
      } catch (error) {
        console.error("Error fetching employee types:", error);
      }
    };
    fetchEmployeeTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStaffDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSelect = (data) => {
    console.log("Selected Data:", data); // Debugging
    if (!data) return;

    if (activePopup === "employeeType") {
      setAddEmployees(data);
      setFormData((prev) => ({
        ...prev,
        employeeType: data.employeeType,
      }));
    }

    setActivePopup(null); // Close the popup after selection
  };

  const getPopupData = () => {
    if (activePopup === "employeeType") {
      return { columns: ipnoHeading, data: linenTypes };
    }
    return { columns: [], data: [] };
  };
  const { columns, data } = getPopupData();
  const handleRowChange = (e, index, field) => {
    const updatedRows = [...packageTableRows];
    updatedRows[index][field] = e.target.value;
    setPackageTableRows(updatedRows);
  };
  const handleAddRow = () => {
    setPackageTableRows((prev) => [
      ...prev,
      { sn: prev.length + 1, type: "", nameofstaff: "", mapwithpayroll: "" },
    ]);
  };
  const handleDeleteRow = (index) => {
    setPackageTableRows((prev) => prev.filter((_, i) => i !== index));
  };
  const handleDetailClick = (detail) => {
    console.log("Clicked Detail:", detail); // Debugging
    setSelectedDetail(detail);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (packageTableRows.length === 0) {
        toast.error("No staff details to submit.");
        return;
      }

      // Send each row individually
      for (const row of packageTableRows) {
        const staffData = {
          nameStaff: row.payroll,
          payroll: row.nameStaff,
          employeeTypeDTO: {
            employeeTypeId: addEmployees?.employeeTypeId || null,
          },
        };

        console.log("Submitting Data:", JSON.stringify(staffData, null, 2)); // Debugging

        const response = await axios.post(
          `${API_BASE_URL}/laundry-staff`,
          staffData,
          {
            headers: { "Content-Type": "application/json" }, // Ensure JSON format
          }
        );

        console.log("Response:", response.data);
      }

      toast.success("Staff details saved successfully!");
    } catch (error) {
      console.error("Error saving staff details:", error.response || error);
      toast.error("Error saving staff details");
    }
  };
  const handleReset = () => {
      
    setAddEmployees([]);
    setFormData([]);
    setPackageTableRows([{ sn: 1, type: "", nameofstaff: "", mapwithpayroll: "" }]);
    setEmployeeTypes([]);
   
  };
  

  return (
    <div className="StaffMap-container">
      <div className="StaffMap-content">
        {/* <div className="StaffMap-header">
          <span>Laundry Staff and Department Map</span>
        </div> */}
        <div className="StaffMap-Table-button">
          <button
            onClick={() => {
              console.log("Button Clicked: Staff Mapping");
              handleDetailClick("staffmapping");
            }}
            className={`detail-button ${
              selectedDetail === "staffmapping" ? "active" : ""
            }`}
          >
            Staff Mapping
          </button>
        </div>
        <div className="StaffMap-table">
          {selectedDetail === "staffmapping" && (
            <table ref={tableRef} className="StaffMap-table-content">
              <thead>
                <tr>
                  {[
                    "Actions",
                    "SN",
                    "Type",
                    "Name of Staff",
                    "Map with Payroll",
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
                {packageTableRows.map((row, index) => (
                  <tr key={index}>
                    <td>
                      <div className="StaffMap-table-actions">
                        <button
                          className="StaffMap-add-btn"
                          aria-label="Add row"
                          onClick={handleAddRow}
                        >
                          Add
                        </button>
                        <button
                          className="StaffMap-del-btn"
                          aria-label="Delete row"
                          onClick={() => handleDeleteRow(index)}
                          disabled={packageTableRows.length <= 1}
                        >
                          Del
                        </button>
                      </div>
                    </td>
                    <td>{row.sn}</td>
                    <td>
                      
                      
                      
                      <FloatingInput
                      label={"Type"}
                      type="search"
                      onIconClick={() => setActivePopup("employeeType")}
                       value={formData.employeeType}
                      />
                    </td>
                    <td>
                      <FloatingInput
                      label={"Name of Staff"}
                      type="text"
                      value={row.nameStaff}
                      onChange={(e) => handleRowChange(e, index, "nameStaff")}
                      />
                    </td>
                    <td >
                      
                      <FloatingInput
                      label={"Type"}
                      type="text"
                      value={row.payroll}
                      onChange={(e) => handleRowChange(e, index, "payroll")}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedDetail === "mapdepartment" && (
            <div className="placeholder">
              <span>No content available for Map Department.</span>
            </div>
          )}
        </div>
      </div>
      <div className="StaffMap-navbar">
        <aside className="StaffMap-navbar-btns">
          <button onClick={handleSubmit}>Save</button>
        </aside>
        <button onClick={handleReset}>Reseat</button>
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
};

export default LaundryStaffMapping;
