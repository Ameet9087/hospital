/* Ajhar Tamboli sSIPatientConsumNewPCbtn.jsx 19-09-24 */

import React, { useState, useEffect } from "react";
import "../SSInventory/sSIPatientConsumNewPCbtn.css";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../api/api";

const SSIPatientConsumNewPCbtn = ({ onBack }) => {
  const { store } = useParams();

  const [consumptionDate, setConsumptionDate] = useState("");
  const [patient, setPatient] = useState("");
  const [remark, setRemark] = useState("");
  const [items, setItems] = useState([]); // All items from API
  const [rows, setRows] = useState([
    {
      itemId: "",
      itemName: "",
      unit: "",
      availableQty: "",
      code: "",
      consumedQty: 1,
    },
  ]); // Table rows with consumption items

  const [units, setUnits] = useState("YourUnitValue"); // Replace with actual unit logic
  const [consumptionTypeName, setConsumptionTypeName] = useState("YourTypeName"); // Replace with actual type logic

  // Fetch Items on component load
  useEffect(() => {
   const fetchItems = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/items/getAllItem`);
    if (response.ok) {
      const data = await response.json();
      const fetchedItems = Array.isArray(data) ? data : data.items || [];
      setItems(fetchedItems); // Ensure items is always an array
    } else {
      console.error("Failed to fetch items.");
    }
  } catch (error) {

    console.error("Error fetching items:", error);
  }
};


    fetchItems();
  }, []);

  // Handle table row item selection
  const handleItemChange = (index, selectedItemName) => {
    const selectedItem = items.find((item) => item.itemName === selectedItemName);

    const updatedRows = rows.map((row, i) =>
      i === index
        ? {
            ...row,
            itemId: selectedItem?.id || "",
            itemName: selectedItemName,
            unit: selectedItem?.unitOfMeasurement?.unitOfMeasurementName || "",
            availableQty: selectedItem?.availableQty || 0,
            code: selectedItem?.itemCode || "",
          }
        : row
    );

    setRows(updatedRows);
  };

  const handleSave = async () => {
    try {
      // Prepare the payload for the backend
      const consumptionData = rows.map((row) => ({
        hospitalNo: "h112",
        consumptionDate: consumptionDate,
        itemName: row.itemName,
        availableQty: row.availableQty,
        patientName: patient,
        consumedQty: row.consumedQty,
        unit: row.unit,
        itemCode: row.code,
        consumptionTypeName,
        enteredBy: "mr.admin",
        remark,
        substoreName: store,
      }));

      // Save each consumption entry
      for (const data of consumptionData) {
        await fetch(`${API_BASE_URL}/inventory-consumption/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      alert("Saved successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save!");
    }
  };

  const handleDiscard = () => {
    alert("Discarded!");
  };

  const addNewRow = () => {
    setRows([
      ...rows,
      { itemId: "", itemName: "", unit: "", availableQty: "", code: "", consumedQty: 1 },
    ]);
  };

  const deleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  return (
    <div >
      <h2 className="sSIPatientConsumNewPCbtn-title">
        <i className="fa-solid fa-star-of-life"></i> Consumption Entry
      </h2>

      <div className="sSIPatientConsumNewPCbtn-form-section">
        <label>Consumption Date*:</label>
        <input
          type="date"
          value={consumptionDate}
          onChange={(e) => setConsumptionDate(e.target.value)}
        />
        
      </div>

      <div className="sSIPatientConsumNewPCbtn-form-section">
        <label>Select Patient *</label>
        <input
          type="text"
          placeholder="Search By HospitalNo, Patient Name"
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
        />
      </div>

      {/* Table Section */}
      <div className="sSIPatientConsumNewPCbtn-table-section">
        <table className="sSIPatientConsumConsumEntry-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Code</th>
              <th>Unit</th>
              <th>Available Qty.</th>
              <th>Consumed Qty.</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <select
                    className="sSSIInvenReqCreateReq-table-select"
                    value={row.itemName}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                  >
                    <option value="">Select Item</option>
                    {items.map((item) => (
                      <option key={item.id} value={item.itemName}>
                        {item.itemName}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input type="text" value={row.code} readOnly />
                </td>
                <td>
                  <input type="text" value={row.unit} readOnly />
                </td>
                <td>
                  <input type="text" value={row.availableQty} readOnly />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.consumedQty}
                    onChange={(e) =>
                      setRows(
                        rows.map((r, i) =>
                          i === index ? { ...r, consumedQty: e.target.value } : r
                        )
                      )
                    }
                  />
                </td>
                <td>
                  <button onClick={() => deleteRow(index)}>❌</button>
                  {index === rows.length - 1 && (
                    <button onClick={addNewRow}>➕</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Remark Section */}
      <div className="sSIPatientConsumNewPCbtn-remark-section">
        <div className="sSIPatientConsumNewPCbtn-remark">
          <label>Remark:</label>
          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />
        </div>
        <div className="sSIPatientConsumNewPCbtn-button-section">
          <button
            className="sSIPatientConsumNewPCbtn-save-btn"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="sSIPatientConsumNewPCbtn-discard-btn"
            onClick={handleDiscard}
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SSIPatientConsumNewPCbtn;
