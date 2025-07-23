import React, { useState, useEffect } from "react";
import "../SSInventory/sSIPatientConsumNewPCbtn.css";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../api/api";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";

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
        const response = await fetch(
          `${API_BASE_URL}/inpatients/getAllPatients`
        );
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
    const selectedItem = items.find(
      (item) => item.id === parseInt(selectedItemId, 10)
    );

    const updatedRows = rows.map((row, i) =>
      i === index
        ? {
            ...row,
            inventoryRequisitionItemId: selectedItem?.id || "",
            itemName: selectedItem?.itemName || "",
            unit:
              selectedItem?.item.unitOfMeasurement.unitOfMeasurementName || "",
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
        toast.success("Consumption saved successfully!");
      } else {
        toast.error("Failed to save consumption.");
      }
    } catch (error) {
      console.error("Error saving consumption:", error);
      toast.error("An error occurred while saving.");
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
        <FloatingInput
          label="Consumption Date*"
          type="date"
          value={consumptionDate}
          onChange={(e) => setConsumptionDate(e.target.value)}
        />
        <FloatingSelect
          label="Select Patient *"
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          options={[
            { value: "", label: "Select Patient" },
            ...patients.map((p) => ({
              value: p.inPatientId,
              label: `${p?.patient?.uhid}/(${p?.patient?.firstName} ${p?.patient?.middleName} ${p?.patient?.lastName})`,
            })),
          ]}
        />
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
                  <FloatingSelect
                    label="Select Item"
                    value={row.inventoryRequisitionItemId}
                    onChange={(e) => handleItemChange(index, e.target.value)}
                    options={[
                      { value: "", label: "Select Item" },
                      ...items.map((item) => ({
                        value: item.id,
                        label: item.item.itemName,
                      })),
                    ]}
                  />
                </td>

                <td>
                  <FloatingInput
                    label="Unit"
                    type="text"
                    value={row.unit}
                    readOnly
                  />
                </td>

                <td>
                  <FloatingInput
                    label="Available Quantity"
                    type="text"
                    value={row.availableQty}
                    readOnly
                  />
                </td>

                <td>
                  <FloatingInput
                    label="Consumed Quantity"
                    type="number"
                    value={row.consumedQty}
                    min="0"
                    onChange={(e) =>
                      setRows(
                        rows.map((r, i) =>
                          i === index
                            ? { ...r, consumedQty: e.target.value }
                            : r
                        )
                      )
                    }
                  />
                </td>

                <td className="sSIPatientConsumConsumEntry-table-buttons">
                  <button className="sSIPatientConsumConsumEntry-table-buttons-add" onClick={() => deleteRow(index)}>Del</button>
                  {index === rows.length - 1 && (
                    <button className="sSIPatientConsumConsumEntry-table-buttons-del" onClick={addNewRow}>Add</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sSIPatientConsumNewPCbtn-remark-section">
        <FloatingTextarea
          label={"Remark"}
          type="textarea"
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
