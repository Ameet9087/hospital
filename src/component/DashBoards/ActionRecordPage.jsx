import React, { useState, useEffect } from "react";
import "./patientDashboard_Action_Order.css"; // Import the MedicationOrder component
import MedicationOrder from "./MedicationOrder ";
import { API_BASE_URL } from "../api/api";
import LabOrder from "./LabOrder";
import RadioOrder from "./RadioOrder";
import axios from "axios";
import Prescription from "./Prescription";

const ActionRecordPage = ({
  patient,
  patientId,
  outPatientId,
  setActiveSection,
  employeeId,
}) => {
  const [selectedOrderType, setSelectedOrderType] = useState("");
  const [orderData, setOrderData] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");
  const [showMedicationOrder, setShowMedicationOrder] = useState(false);
  const [labOrder, showLabOrder] = useState(false);
  const [imagingOrder, setImagingOrder] = useState(false);
  const [showPrintMedication, setShowPrintMedication] = useState(false);

  const apiEndpoints = {
    lab: `${API_BASE_URL}/labTestSetting/getAll`,
    imaging: `${API_BASE_URL}/imaging-items/getAll`,
    medication: `${API_BASE_URL}/add-items`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const apiUrl = apiEndpoints[selectedOrderType];

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
            console.log(data);

            setOrderData(data);
          } else {
            console.error("Error fetching data:", response.status);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    fetchOrders();
  }, [selectedOrderType, showMedicationOrder]);

  const handleOrderTypeChange = (e) => {
    setSelectedOrderType(e.target.value);
  };

  console.log(orderData);
  const handleOrderSelect = (e) => {
    const orderId = e.target.value;
    setSelectedOrderId(orderId);
    console.log(orderId);
    if (orderId) {
      const selectedOrder = orderData.find(
        (order) =>
          order.addItemId == orderId ||
          order.imagingItemId == orderId ||
          order.labTestId == orderId
      );

      if (selectedOrder) {
        setSelectedOrders((prevOrders) => [...prevOrders, selectedOrder]);
        setSelectedOrderId("");
      }
    }
  };

  const removeOrder = (index) => {
    const updatedOrders = selectedOrders.filter((_, i) => i !== index);
    setSelectedOrders(updatedOrders);
  };

  const handleProceed = () => {
    showLabOrder(true);
    if (selectedOrders.length > 0) {
      if (selectedOrderType === "medication") {
        setShowMedicationOrder(true);
        setImagingOrder(false);
        showLabOrder(false);
      }
      if (selectedOrderType === "imaging") {
        setImagingOrder(true);
        setShowMedicationOrder(false);
        showLabOrder(false);
      }
      if (selectedOrderType === "lab") {
        showLabOrder(true);
        setShowMedicationOrder(false);
        setImagingOrder(false);
      }
    } else {
      alert("Please select an order to proceed.");
    }
  };
  const handleClose = () => {
    setShowPrintMedication(false);
  };
  const handlePrintMedication = () => {
    setShowPrintMedication(true);
  };

  if (showMedicationOrder) {
    return (
      <MedicationOrder
        selectedOrders={selectedOrders}
        setActiveSection={setActiveSection}
        inPatientId={patientId}
        outPatientId={outPatientId}
      />
    ); // Pass selected orders to MedicationOrder
  }
  if (labOrder) {
    return (
      <LabOrder
        selectedOrders={selectedOrders}
        setActiveSection={setActiveSection}
        inPatientId={patientId}
        outPatientId={outPatientId}
      />
    );
  }
  if (imagingOrder) {
    return (
      <RadioOrder
        selectedOrders={selectedOrders}
        setActiveSection={setActiveSection}
        inPatientId={patientId}
        outPatientId={outPatientId}
        employeeId={employeeId}
      />
    );
  }

  return (
    <div className="action_record_container">
      {!showPrintMedication ? (
        <>
          <div className="action_record_orders">
            <div className="action-records-selected-container">
              <div className="selected_orders">
                <div className="selected-order-header">
                  <h2 className="action-records-h2">Selected Orders</h2>
                  <div className="selected-order-header-right">
                    <span
                      className="remove_order_button"
                      onClick={() => setSelectedOrders([])}
                    >
                      Cancel
                    </span>
                    <span
                      className="proceed_order_button"
                      onClick={handleProceed}
                    >
                      Proceed
                    </span>
                  </div>
                </div>
                <div>
                  <ul>
                    {selectedOrders.length === 0 && <p>No orders selected.</p>}
                    {selectedOrders.map((order, index) => (
                      <li key={index} className="selected_order_item">
                        <span className="selected_order_item-span">
                          {order.itemName ||
                            order.imagingItemName ||
                            order.labTestName}
                        </span>{" "}
                        {/* Display selected order name */}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Active Orders Section */}
              {/* <div className="action_record_active_orders">
            <h2 className='action-records-h2'>🔍 Active Orders</h2>
            <table className="action_record_table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                </tr>
                <tr>
                </tr>
              </tbody>
            </table>
          </div> */}
            </div>

            {/* New Orders Section */}
            <div className="action_record_new_orders">
              <h2 className="action-records-h2">➕ New Orders</h2>
              <div className="action_record_new_order_controls">
                <div className="action-dropdown-container">
                  <label htmlFor="orderType" className="action_record_label">
                    Order Type:
                    <select
                      id="orderType"
                      className="action_record_dropdown"
                      value={selectedOrderType}
                      onChange={handleOrderTypeChange}
                    >
                      <option value="">------</option>
                      <option value="lab">Lab</option>
                      <option value="imaging">Imaging</option>
                      <option value="medication">Medication</option>
                      <option value="others">Others</option>
                    </select>
                  </label>
                </div>

                {selectedOrderType && (
                  <div className="action-dropdown-container">
                    <label htmlFor="orderItem" className="action_record_label">
                      Order Item:
                      <select
                        id="orderItem"
                        className="action_record_dropdown"
                        value={selectedOrderId}
                        onChange={handleOrderSelect}
                      >
                        <option value="">Select an order item</option>
                        {orderData.map((order) => (
                          <option
                            key={
                              order.id || order.imagingItemId || order.labTestId
                            }
                            value={
                              order.addItemId ||
                              order.imagingItemId ||
                              order.labTestId
                            }
                          >
                            {order.itemName ||
                              order.imagingItemName ||
                              order.labTestName}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            className="action_record_print_button"
            onClick={() => handlePrintMedication()}
          >
            Print Medication
          </button>
        </>
      ) : (
        <>
          <Prescription patient={patient} handleClose={handleClose} />
        </>
      )}
    </div>
  );
};

export default ActionRecordPage;
