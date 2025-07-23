import React, { useState, useEffect } from "react";
import "./RadioOrder.css";
import { API_BASE_URL } from "../api/api";

const RadioOrder = ({
  selectedOrders,
  setActiveSection,
  inPatientId,
  outPatientId,
  employeeId,
}) => {
  const [orders, setOrders] = useState([]);
  console.log(inPatientId + "dsghvbjxznm");

  // Use useEffect to initialize the orders state with selectedOrders data
  useEffect(() => {
    if (selectedOrders.length > 0) {
      // Initialize the form fields with the values from the selected orders
      const initializedOrders = selectedOrders.map((order) => ({
        imagingItemName: order.imagingItemName || "",
        urgency: order.urgency || "Normal",
        note: order.requisitionRemark || "",
        imagingTypeId: order.imagingType.imagingTypeId,
        imagingItemId: order.imagingItemId,
      }));
      setOrders(initializedOrders);
    }
  }, [selectedOrders]);

  const handleSign = async () => {
    const requisitionData = orders.map((order) => ({
      ...(outPatientId
        ? {
            outPatientDTO: {
              outPatientId: outPatientId,
            },
          }
        : {
            inPatientDTO: {
              inPatientId: inPatientId,
            },
          }),
      imagingTypeDTO: {
        imagingTypeId: order.imagingTypeId,
      },
      imagingItemDTO: {
        imagingItemId: order.imagingItemId,
      },
      requisitionRemark: order.note,
      prescriberDTO: {
        employeeId: 12,
      },
      urgency: order.urgency,
      requestedDate: new Date().toISOString().split("T")[0],
      requestedTime: new Date().toISOString().split("T")[1].split(".")[0],
      hasInsurance: "No",
      wardName: "Male Ward",
      isActive: "Yes",
      type: order.imagingItemName,
      status: "Pending",
      signatureList: "",
    }));

    try {
      console.log(requisitionData);
      const response = await fetch(
        `${API_BASE_URL}/imaging-requisitions/createMultiple`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requisitionData),
        }
      );

      if (response.ok) {
        console.log("Submission successful:");
        handleCancel(); // Reset form
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCancel = () => {
    setActiveSection(true);
    setOrders([]);
  };

  // Function to handle changes to each field for each order
  const handleOrderChange = (index, field, value) => {
    const updatedOrders = [...orders];
    updatedOrders[index][field] = value;
    setOrders(updatedOrders);
  };

  return (
    <div className="RadioOrder-container">
      <h2>Image Order</h2>
      <table className="RadioOrder-table">
        <thead>
          <tr>
            <th>Imaging Name</th>
            <th>Urgency</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={order.imagingItemName}
                  onChange={(e) =>
                    handleOrderChange(index, "imagingItemName", e.target.value)
                  }
                  className="RadioOrder-input"
                />
              </td>
              <td>
                <div className="RadioOrder-radio-group">
                  <label>
                    <input
                      type="radio"
                      value="Normal"
                      checked={order.urgency === "Normal"}
                      onChange={(e) =>
                        handleOrderChange(index, "urgency", e.target.value)
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
                        handleOrderChange(index, "urgency", e.target.value)
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
                        handleOrderChange(index, "urgency", e.target.value)
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
                    handleOrderChange(index, "note", e.target.value)
                  }
                  className="table-textarea"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="RadioOrder-action-container">
        <button
          className="RadioOrder-action-container-btn-sign"
          onClick={handleSign}
        >
          Sign
        </button>
        <button
          className="RadioOrder-action-container-btn-cancel"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default RadioOrder;
