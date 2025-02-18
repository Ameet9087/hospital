import React, { useState, useEffect, useRef } from "react";
import "./pressingAndFolding.css";
import { FaSearch } from "react-icons/fa"; // Importing the search icon from React Icons
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import axios from "axios"; // Importing axios for making API requests
import PopupTable from "../../../Admission/PopupTable";
import { FloatingInput } from "../../../../FloatingInputs";
import { toast } from "react-toastify";

function PressingAndFolding() {
  const [packageTableRows, setPackageTableRows] = useState([
    { sn: 1, linenMaster: "", linenDesc: "", stock: "", quantity: "", inUse: "" },
  ]);
  const [columnWidths, setColumnWidths] = useState({});
  const [linenTypes, setLinenTypes] = useState([]);
  const ipnoHeading = ["employeeTypeId", "employeeType"];
  const [activePopup, setActivePopup] = useState("");

  const tableRef = useRef(null);
  const [FormData, setFormData] = useState({
    foldingNumber: "",
    foldingDate: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...FormData,
      [name]: value,
    });
  };
  // Add a new row
  const handleAddRow = () => {
    setPackageTableRows([
      ...packageTableRows,
      { sn: packageTableRows.length + 1, linenMaster: "", stock: "", quantity: "", inUse: "", linenDesc: "" },
    ]);
  };

  // Delete a row (prevent deletion of the first row)
  const handleDeleteRow = (index) => {
    if (index === 0) return; // Prevent deleting the first row
    setPackageTableRows(packageTableRows.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      // Constructing the data to send in the required format
      const dataToSave = {
        foldingNumber: "",
        foldingDate: FormData.foldingDate,
        linenDetailsDTO: packageTableRows.map((row) => ({
          quantity: row.quantity,
          inUse: row.inUse,
          readyForUse: row.stock,
          linenDesc: row.linenDesc,
        })),
      };

      console.log("Data to be saved:", dataToSave);

      const response = await axios.post(
        "http://192.168.1.42:8080/api/linens-foldings",
        dataToSave
      );

      toast.success("Data saved successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error ("Error saving data");
    }
  };

  return (
    <div className="PressingLinenRequirement-container">
      <h2 className="PressingLinenRequirementH2">Linens Pressing And Folding</h2>
      <div className="PressingAndFolding-section">
        <div className="PressingAndFolding-grid">
          <FloatingInput label={"Folding Number"} type="text" />
          <FloatingInput
            label={"Folding Date"}
            type="date"
            name="foldingDate"
            value={FormData.foldingDate}
            onChange={handleInputChange}
          />
          <a className="reparingAndSewing-form-group-load" href="#">
            Load Linen
          </a>
        </div>
      </div>
      <div className="PressingLinesRequirementlabeldiv">
        <label className="PressingLabel3">
          Linen Details
          <label className="PressingLabel44">(Control + Enter For New Row)</label>
          <FaSearch className="PressingLinenRequirement-search-icon" />
        </label>
      </div>
      <table ref={tableRef} className="StaffMap-table-content">
        <thead>
          <tr>
            {["Action", "SN", "Linen Desc", "In Stock", "Quantity", "In Use"].map((header, index) => (
              <th
                key={index}
                style={{ width: columnWidths[index] || "auto" }}
                className="resizable-th"
              >
                <div className="header-content">
                  <span>{header}</span>
                  <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(index)}></div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {packageTableRows.map((row, index) => (
            <tr key={index}>
              <td>
                <button
                  className="PressingLinenRequirement-action-button"
                  onClick={handleAddRow}
                >
                  Add
                </button>
                <button
                  className="PressingLinenRequirement-action-button PressingDelete"
                  onClick={() => handleDeleteRow(index)}
                  disabled={index === 0}
                >
                  Delete
                </button>
              </td>
              <td>{index + 1}</td>

              <td>
                <input
                  type="text"
                  value={row.linenDesc}
                  onChange={(e) => {
                    const newRows = [...packageTableRows];
                    newRows[index].linenDesc = e.target.value;
                    setPackageTableRows(newRows);
                  }}
                />
              </td>

              <td>
                <input
                  type="number"
                  value={row.stock}
                  onChange={(e) => {
                    const newRows = [...packageTableRows];
                    newRows[index].stock = e.target.value;
                    setPackageTableRows(newRows);
                  }}
                />
              </td>

              <td>
                <input
                  type="number"
                  value={row.quantity}
                  onChange={(e) => {
                    const newRows = [...packageTableRows];
                    newRows[index].quantity = e.target.value;
                    setPackageTableRows(newRows);
                  }}
                />
              </td>

              <td>
                <input
                  type="number"
                  value={row.inUse}
                  onChange={(e) => {
                    const newRows = [...packageTableRows];
                    newRows[index].inUse = e.target.value;
                    setPackageTableRows(newRows);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pressingfoldingsave">
        <button className="pressingfoldingsavebtn" onClick={handleSave}>
          Save
        </button>
      </div>
      {activePopup && (
        <PopupTable columns={ipnoHeading} data={linenTypes} onSelect={handleSelect} onClose={() => setActivePopup(false)} />
      )}
    </div>
  );
}

export default PressingAndFolding;
