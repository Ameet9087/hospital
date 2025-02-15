import React, { useEffect, useState } from "react";
import "../SSInventory/sSIPatientConsumConsumEntry.css";
import { useLocation, useParams } from "react-router-dom";
import { API_BASE_URL } from "../../../api/api";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";

const SSIPatientConsumConsumEntry = ({ onClose }) => {
  const { store } = useParams();
  const [consumptionDate, setConsumptionDate] = useState("");
  const [patient, setPatient] = useState("");
  const [itemName, setItemName] = useState("");
  const [availableQty, setAvailableQty] = useState(0);
  const [consumedQty, setConsumedQty] = useState(1);
  const [remark, setRemark] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [storeName, setStoreName] = useState("");
  const [requisitions, setRequisitions] = useState([]);
  const [filteredRequisitions, setFilteredRequisitions] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc"); // Added sort direction state

  const [rows, setRows] = useState([
    {
      invItemId: "",
      itemName: "",
      unit: "",
      availableQty: "",
      code: "",
      consumedQty: "",
    },
  ]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/inventory-requisitions/received?subStoreId=${store}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Items:", data);
        setItems(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [store]);

  
  const handleItemChange = (index, event) => {
    const selectedItemId = event.target.value;

    if (selectedItemId) {
      const selectedItem = items.find(
        (item) => item?.item?.invItemId?.toString() === selectedItemId
      );

      if (selectedItem) {
        const updatedRows = rows.map((row, i) =>
          i === index
            ? {
                ...row,
                invItemId: selectedItem.item.invItemId, // Set the correct ID here
                itemName: selectedItem.item.itemName,
                unit: selectedItem.item.unitOfMeasurement.name,
                availableQty: selectedItem.dispatchQuantity,
                code: selectedItem.item.itemCode,
              }
            : row
        );
        setRows(updatedRows);
      }
    }
  };

  const handleSave = async () => {
    try {
      // Prepare the payload in the desired format
      const consumptionData = {
        consumedDate: consumptionDate,
        consumptionTypeName: "Emergency Use", // Update as per requirement
        remarks: remark,
        storeName: storeName || store,
        items: rows.map((row) => ({
          id: row.invItemId,
          requisitionItemId: row.invItemId, // Assuming requisitionItemId is the same as invItemId, update if needed
          consumedQty: row.consumedQty,
        })),
      };

      console.log("Payload to be sent:", consumptionData);

      // Send the payload to the backend
      const response = await fetch(
        `${API_BASE_URL}/inventory-consumption/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(consumptionData),
        }
      );

      if (!response.ok) {
        const responseText = await response.text();
        console.error("Error response:", responseText);
        throw new Error(responseText);
      }

      toast.success("Saved successfully!");
      onClose();
    } catch (error) {
      console.error("Error saving data:", error.message);
      toast.error("Failed to save!");
    }
  };

  const handleDiscard = () => {
    alert("Discarded!");
  };

  const addNewRow = () => {
    setRows([
      ...rows,
      {
        invItemId: "",
        itemName: "",
        unit: "",
        availableQty: "",
        code: "",
        consumedQty: "",
      },
    ]);
  };

  const deleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  return (
    <div className="sSIPatientConsumConsumEntry-entry">
      <h2 className="sSIPatientConsumConsumEntry-title">
        <i className="fa-solid fa-star-of-life"></i> Consumption Entry
      </h2>
      <div className="sSIPatientConsumConsumEntry-section">
        <div className="sSIPatientConsumConsumEntry-form-section">
          <FloatingInput
            label={"Consumption Date"}
            type="date"
            value={consumptionDate}
            onChange={(e) => setConsumptionDate(e.target.value)}
          />
        </div>
        <div className="sSIPatientConsumConsumEntry-form-section">
          <FloatingInput
            label={"Consumption Type"}
            type="text"
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
          />
        </div>
      </div>

      <div className="sSIPatientConsumConsumEntry-table-section">
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
                  <FloatingSelect
                    label={"Item"}
                    value={row.invItemId}
                    onChange={(e) => handleItemChange(index, e)}
                    options={[
                      { value: "", label: "--Select Item--" },
                      ...items.map((item) => ({
                        value: item?.item?.invItemId,
                        label: item?.item?.itemName,
                      })),
                    ]}
                  />
                </td>
                <td>
                  <FloatingInput
                    label={"Code"}
                    type="text"
                    value={row.code || ""}
                    readOnly
                  />
                </td>
                <td>
                  <FloatingInput
                    label={"Unit"}
                    type="text"
                    value={row.unit || ""}
                    readOnly
                  />
                </td>
                <td>
                  <FloatingInput
                    label={"Available Quantity"}
                    type="text"
                    value={row.availableQty || 0}
                    readOnly
                  />
                </td>
                <td>
                  <FloatingInput
                    label={"Consumed Quantity"}
                    type="number"
                    value={row.consumedQty}
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
      if (newValue < 0) return; // Prevent negative values
                      const updatedRows = rows.map((r, i) =>
                        i === index ? { ...r, consumedQty: e.target.value } : r
                      );
                      setRows(updatedRows);
                    }}

                    min="0"
                  />
                </td>

                <td>

                <button className="add-btn" onClick={addNewRow}>
                    Add
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteRow(index)}
                  >
                    Del
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="sSIPatientConsumConsumEntry-remark-section">
        <div className="sSIPatientConsumConsumEntry-remark">
         
          <FloatingTextarea
            label={"Remark"}
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            // className="sSIPatientConsumConsumEntry-textarea"
            />
        </div>
        <div className="sSIPatientConsumConsumEntry-button-section">
          <button
            className="sSIPatientConsumConsumEntry-save-btn"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="sSIPatientConsumConsumEntry-discard-btn"
            onClick={handleDiscard}
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  );
};

export default SSIPatientConsumConsumEntry;
