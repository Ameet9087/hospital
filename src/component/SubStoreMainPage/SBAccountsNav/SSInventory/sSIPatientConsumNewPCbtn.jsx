import React, { useState, useEffect } from "react";
import "../SSInventory/sSIPatientConsumNewPCbtn.css";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../api/api";

const SSIPatientConsumNewPCbtn = ({ onBack }) => {
  const { store } = useParams();

  const [consumptionDate, setConsumptionDate] = useState("");
  const [patient, setPatient] = useState("");
  const [remark, setRemark] = useState("");
  const [patients, setPatients] = useState([]);
  const [items, setItems] = useState([]);
  const [rows, setRows] = useState([
    {
      inventoryRequisitionItemId: "",
      itemName: "",
      unit: "",
      availableQty: "",
      consumedQty: 1,
    },
  ]);

  // Fetch Patients
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/inpatients/getAllPatients`);
        if (response.ok) {
          const data = await response.json();
          setPatients(data);
        } else {
          console.error("Failed to fetch patients.");
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };
    fetchPatients();
  }, []);

  // Fetch Items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/inventory-requisitions/received?subStoreId=1`
        );
        if (response.ok) {
          const data = await response.json();
          setItems(data);
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
  const handleItemChange = (index, selectedItemId) => {
    const selectedItem = items.find((item) => item.id === parseInt(selectedItemId, 10));

    const updatedRows = rows.map((row, i) =>
      i === index
        ? {
            ...row,
            inventoryRequisitionItemId: selectedItem?.id || "",
            itemName: selectedItem?.itemName || "",
            unit: selectedItem?.item.unitOfMeasurement.unitOfMeasurementName || "",
            availableQty: selectedItem?.dispatchQuantity || "",
          }
        : row
    );

    setRows(updatedRows);
  };

  const handleSave = async () => {
    try {
      const payload = {
        patientId: parseInt(patient, 10),
        consumptionDate,
        enteredBy: "Dr. John Doe", // Replace with dynamic user
        remark,
        substoreId: parseInt(store, 10),
        items: rows.map((row) => ({
          inventoryRequisitionItemId: row.inventoryRequisitionItemId,
          consumedQty: row.consumedQty,
        })),
      };

      const response = await fetch(`${API_BASE_URL}/patient-consumption/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Consumption saved successfully!");
      } else {
        alert("Failed to save consumption.");
      }
    } catch (error) {
      console.error("Error saving consumption:", error);
      alert("An error occurred while saving.");
    }
  };

  const addNewRow = () => {
    setRows([
      ...rows,
      {
        inventoryRequisitionItemId: "",
        itemName: "",
        unit: "",
        availableQty: "",
        consumedQty: 1,
      },
    ]);
  };

  const deleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  return (
    <div>
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
        <select
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
        >
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.inPatientId} value={p.inPatientId}>
              {p?.patient?.uhid}/({p?.patient?.firstName} {p?.patient?.middleName} {p?.patient?.lastName})
            </option>
          ))}
        </select>
      </div>

      <div className="sSIPatientConsumNewPCbtn-table-section">
        <table className="sSIPatientConsumConsumEntry-table">
          <thead>
            <tr>
              <th>Item Name</th>
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
                    value={row.inventoryRequisitionItemId}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                  >
                    <option value="">Select Item</option>
                    {items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.item.itemName}
                      </option>
                    ))}
                  </select>
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

      <div className="sSIPatientConsumNewPCbtn-remark-section">
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
          onClick={() => alert("Discarded!")}
        >
          Discard
        </button>
      </div>
    </div>
  );
};

export default SSIPatientConsumNewPCbtn;
