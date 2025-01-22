import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import "./MedicationOrder.css";
import { API_BASE_URL } from "../api/api";
import { startResizing } from "../TableHeadingResizing/resizableColumns";

const MedicationOrder = ({
  inPatientId,
  outPatientId,
  setActiveSection,
}) => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [medicationList, setMedicationList] = useState([
    {
      type: "",
      medicationName: "",
      dose: "",
      route: "mouth",
      frequency: 0,
      lastTaken: "",
      comments: "",
      status: "pending",
      medicationDate: new Date().toISOString().slice(0, 10),
      ...(inPatientId
        ? { patientDTO: { inPatientId } }
        : { outPatientDTO: { outPatientId } }),
      selectedOrderId: "",  // Add this field to each medication object
      selectedOrder: null,  // Add this field to each medication object
    },
  ]); // Initially one row is displayed
  const [orderGenericData, setOrderGenericData] = useState([]);
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const apiUrl = `${API_BASE_URL}/add-items`;

      if (apiUrl) {
        try {
          const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            const data = await response.json();
            setOrderData(data);
            setOrderGenericData(data);
          } else {
            console.error("Error fetching data:", response.status);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    fetchOrders();
  }, []);

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMedications = medicationList.map((medication, i) =>
      i === index ? { ...medication, [name]: value } : medication
    );
    setMedicationList(updatedMedications);
  };

  const handleAddRow = () => {
    const newMedication = {
      type: "",
      medicationName: "",
      dose: "",
      route: "mouth",
      frequency: 0,
      lastTaken: "",
      comments: "",
      status: "pending",
      medicationDate: new Date().toISOString().slice(0, 10),
      ...(inPatientId
        ? { patientDTO: { inPatientId } }
        : { outPatientDTO: { outPatientId } }),
      selectedOrderId: "",  // Add this field to new row
      selectedOrder: null,  // Add this field to new row
    };
    setMedicationList([...medicationList, newMedication]);
  };

  const handleRemoveRow = (index) => {
    const updatedMedications = medicationList.filter((_, i) => i !== index);
    setMedicationList(updatedMedications);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/medications/save-medication-details`,
        medicationList
      );
      setActiveSection("dashboard");
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error submitting medication list:", error);
    }
  };

  const handleOrderSelect = (index, e) => {
    const orderId = e.target.value;
    const updatedMedications = [...medicationList];
    updatedMedications[index].selectedOrderId = orderId;

    if (orderId) {
      const selected = orderData.find((order) => order.addItemId == orderId);
      if (selected) {
        updatedMedications[index].selectedOrder = selected;  // Set selected order for this row
        updatedMedications[index].genericName = selected.genericNameDTO?.genericName || "";  // Set generic name for this row
      }
    }

    setMedicationList(updatedMedications);
  };

  return (
    <div className="MedicationOrder-form">
      <h3>Medication Order</h3>
      <table className="patientList-table" ref={tableRef}>
        <thead>
          <tr>
            {[
              "",
              "Order Item",
              "Generic",
              "Brand Name",
              "Dose",
              "Route",
              "Frequency",
              "Duration (days)",
              "Remarks",
              "Actions",
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
          {medicationList.map((medication, index) => (
            <tr key={index}>
              <td>
                <button
                  className="MedicationOrder-deleteBtn"
                  onClick={() => handleRemoveRow(index)}
                >
                  X
                </button>
              </td>
              <td>
                <div className="action-dropdown-container">
                  <label htmlFor="orderItem" className="action_record_label">
                    <select
                      id="orderItem"
                      className="action_record_dropdown"
                      value={medication.selectedOrderId}
                      onChange={(e) => handleOrderSelect(index, e)}
                    >
                      <option value="">Select an order item</option>
                      {orderData.map((order) => (
                        <option
                          key={order.id || order.addItemId}
                          value={order.addItemId}
                        >
                          {order.itemName}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </td>
              <td>
                <input
                  type="text"
                  name="type"
                  value={medication.genericName || ""}
                  placeholder="Generic Name"
                  className="MedicationOrder-input"
                  readOnly
                />
              </td>
              <td>
                <input
                  type="text"
                  name="medicationName"
                  value={medication.selectedOrder?.itemName || ""}
                  placeholder="Brand Name"
                  className="MedicationOrder-input"
                  readOnly
                />
              </td>
              <td>
                <input
                  type="number"
                  name="dose"
                  value={medication.dose || ""}
                  placeholder="Dose"
                  className="MedicationOrder-input"
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <select
                  name="route"
                  value={medication.route}
                  onChange={(e) => handleInputChange(index, e)}
                  className="MedicationOrder-select"
                >
                  <option value="mouth">Mouth</option>
                  <option value="iv">IV</option>
                  <option value="injection">Injection</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  name="frequency"
                  value={medication.frequency || ""}
                  placeholder="Frequency"
                  className="MedicationOrder-input"
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="date"
                  name="lastTaken"
                  value={medication.lastTaken || ""}
                  placeholder="Duration"
                  className="MedicationOrder-input"
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="comments"
                  value={medication.comments || ""}
                  placeholder="Remarks"
                  className="MedicationOrder-input"
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <button
                  className="MedicationOrder-submitBtn"
                  onClick={handleAddRow}
                >
                  +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="MedicationOrder-submitBtn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default MedicationOrder;
