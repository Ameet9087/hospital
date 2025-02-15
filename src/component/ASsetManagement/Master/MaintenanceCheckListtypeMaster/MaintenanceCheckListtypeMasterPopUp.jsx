import React, { useState, useRef } from "react";
import "./MaintenanceCheckListtypeMasterPopUp.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../../api/api";
import { toast } from "react-toastify";
import { FloatingInput } from "../../../../FloatingInputs";
const MaintenanceCheckListtypeMasterPopUp = ({ onSave,onClose }) => {
  const [formData, setFormData] = useState({
    typeofChecklist: "",
    remarks: "",
    status: "Active",
  });
  const [checkListRows, setCheckListRows] = useState([{ sn: 1, description: "" }]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClear = () => {
    setFormData({
      typeofChecklist: "",
      remarks: "",
      status: "Active",
    });
    setCheckListRows([{ sn: 1, description: "" }]);
  };

  const handleSave = () => {
    const newChecklist = {
      typeofChecklist: formData.typeofChecklist,
      remarks: formData.remarks,
      status: formData.status,
      checkLists: checkListRows.map(row => ({ description: row.description })), // Extract descriptions only
    };

    const apiUrl = `${API_BASE_URL}/maintenance-checklists`;

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newChecklist),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save data");
        }
        return response.json();
      })
      .then((data) => {
        toast.success("Data saved successfully:", data);
        onSave(newChecklist);
        handleClear();
        onClose();
      })
      .catch((error) => {
        toast.error("Error saving data:", error);
        // Handle error
      });
  };

  const handleAddRow = () => {
    const newRow = { sn: checkListRows.length + 1, description: "" };
    setCheckListRows([...checkListRows, newRow]);
  };

  const handleDeleteRow = () => {
    if (checkListRows.length > 1) {
      setCheckListRows(checkListRows.slice(0, -1));
    }
  };

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const handleRowChange = (index, e) => {
    const { value } = e.target;
    const updatedRows = [...checkListRows];
    updatedRows[index].description = value;
    setCheckListRows(updatedRows);
  };

  return (
    <div className="maintenanceChecklistPopUp-container">
      <div className="maintenanceChecklistPopUp-header">
        <h4>Maintenance Checklist Type Master</h4>
      </div>
      <div className="maintenanceChecklistPopUp-form">
        <div className="maintenanceChecklistPopUp-form-row">
          <div className="maintenanceChecklistPopUp-form-group-1row">
            <div className="maintenanceChecklistPopUp-form-group">
              <FloatingInput
              label={"Type Of Checklist"}
              type="text"
              id="typeofChecklist"
              name="typeofChecklist"
              placeholder="Enter Type Name"
              value={formData.typeofChecklist}
              onChange={handleChange}
              required
              
              />

            </div>
            <div className="maintenanceChecklistPopUp-form-group">
              <FloatingInput
              label={"Remarks"}
               type="text"
               id="remarks"
               name="remarks"
               placeholder="Enter Remarks"
               value={formData.remarks}
               onChange={handleChange}
               required
              />
            </div>
          </div>

          <div className="maintenanceChecklistPopUp-form-group-1row">
            <div className="maintenanceChecklistPopUp-form-group">
              <label>Status:</label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Active"
                  checked={formData.status === "Active"}
                  onChange={handleChange}
                />
                Active
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="Inactive"
                  checked={formData.status === "Inactive"}
                  onChange={handleChange}
                />
                Inactive
              </label>
            </div>
          </div>

          <table className="tablelistmaster" ref={tableRef}>
            <thead>
              <tr>
                {["Actions", "SN", "Check List Description"].map((header, index) => (
                  <th
                    key={index}
                    style={{ width: columnWidths[index] }}
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
              {checkListRows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <button
                      className="ButtonListsbutton add-button"
                      onClick={handleAddRow}
                    >
                      Add
                    </button>
                    <button
                      className="ButtonListsbutton delete-button"
                      onClick={handleDeleteRow}
                      disabled={checkListRows.length <= 1}
                    >
                      Delete
                    </button>
                  </td>

                  <td>{row.sn}</td>
                  <td>
                    <FloatingInput
                    label={"Description"}
                     type="text"
                     placeholder="Enter description"
                     value={row.description}
                     onChange={(e) => handleRowChange(index, e)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="maintenanceChecklistPopUp-form-actions">
        <button
          className="maintenanceChecklistPopUp-add-btn"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default MaintenanceCheckListtypeMasterPopUp;
