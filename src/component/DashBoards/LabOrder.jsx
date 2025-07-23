import React, { useState } from "react";
import "./LabOrder.css";
import { API_BASE_URL } from "../api/api";

const LabOrder = ({
  selectedOrders,
  setActiveSection,
  inPatientId,
  outPatientId,
}) => {
  const [ordersData, setOrdersData] = useState(
    selectedOrders.map((order) => ({
      labTestName: order.labTestName || "",
      urgency: order.urgency || "Normal",
      note: order.note || "",
    }))
  );

  // Handle updating the form values
  const handleInputChange = (index, field, value) => {
    const updatedOrders = [...ordersData];
    updatedOrders[index][field] = value;
    setOrdersData(updatedOrders);
  };

  const handleSign = async () => {
    const payload = {
      labTestName: ordersData[0].labTestName, // Assuming you're sending only the first order's lab test name
      urgency: ordersData[0].urgency,
      note: ordersData[0].note,
      status: "Pending",
      requisitionDate: new Date().toISOString().slice(0, 10), // Current date in 'YYYY-MM-DD' format
      runNumber: "RN12345", // Example run number
      labTestIds: selectedOrders.map((order) => order.labTestId), // Assuming each order contains labTestId
    };

    const formData =
    inPatientId> 0
        ? { ...payload, inPatientDTO: { inPatientId } }
        : { ...payload, outPatientDTO: { outPatientId } };
    console.log(formData);

    try {
      console.log(formData);

      const response = await fetch(`${API_BASE_URL}/lab-requests/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Lab order created successfully:");
        setActiveSection();
      } else {
        // Handle error response
        console.error("Error creating lab order:", response.statusText);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleCancel = () => {
    setOrdersData(
      selectedOrders.map((order) => ({
        labTestName: order.labTestName || "",
        urgency: "Normal",
        note: "",
      }))
    );
    console.log("Cancelled");
  };

  return (
    <div className="lab-order-container">
      <h2>Lab Order</h2>
      <table className="lab-order-table">
        <thead>
          <tr>
            <th>Lab Test Name</th>
            <th>Urgency</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {ordersData.map((order, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={order.labTestName}
                  onChange={(e) =>
                    handleInputChange(index, "labTestName", e.target.value)
                  }
                  placeholder="Enter Lab Test Name"
                  className="table-input"
                />
              </td>
              <td>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      value="Normal"
                      checked={order.urgency === "Normal"}
                      onChange={(e) =>
                        handleInputChange(index, "urgency", e.target.value)
                      }
                    />
                    Normal
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Urgent"
                      checked={order.urgency === "Urgent"}
                      onChange={(e) =>
                        handleInputChange(index, "urgency", e.target.value)
                      }
                    />
                    Urgent
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="STAT"
                      checked={order.urgency === "STAT"}
                      onChange={(e) =>
                        handleInputChange(index, "urgency", e.target.value)
                      }
                    />
                    STAT
                  </label>
                </div>
              </td>
              <td>
                <textarea
                  value={order.note}
                  onChange={(e) =>
                    handleInputChange(index, "note", e.target.value)
                  }
                  className="table-textarea"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="lab-action-container">
        <button
          className="lab-action-container-btn lab-action-container-btn-sign"
          onClick={handleSign}
        >
          Sign
        </button>
        <button
          className="lab-action-container-btn lab-action-container-btn-cancel"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LabOrder;
