import React, { useState, useEffect } from "react";
import "./NurseOrder.css";
import axios from "axios";
import { API_BASE_URL } from "../api/api";
import { toast } from "react-toastify";
import { FloatingInput, FloatingTextarea } from "../../FloatingInputs";

const NurseOrder = ({ inPatientId, outPatientId }) => {
  // Form state
  const [orderName, setOrderName] = useState("");
  const [nurseTime, setNurseTime] = useState("");
  const [nursingFrequency, setNursingFrequency] = useState("");
  const [orderGivenTime, setOrderGivenTime] = useState("");
  const [remarks, setRemarks] = useState("");

  // State for fetching existing orders
  const [nursingOrders, setNursingOrders] = useState([]);

  // Handle form cancel
  const handleCancel = () => {
    setOrderName("");
    setNurseTime("");
    setNursingFrequency("");
    setOrderGivenTime("");
    setRemarks("");
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = {
      nOrderName: orderName,
      nurseTime, // Sending raw value
      nursingFrequency,
      orderGivenTime, // Sending raw value
      remarks,
      ...(inPatientId
        ? { inPatient: { inPatientId } }
        : { outPatient: { outPatientId } }),
    };

    try {
      // Send POST request to backend
      await axios.post(`${API_BASE_URL}/nursing-orders`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Form submitted:", formData);
      toast.success("Nursing order submitted successfully!");

      // Reset the form after submission
      handleCancel();

      // Fetch the updated list of nursing orders
      fetchNursingOrders();
    } catch (error) {
      console.error("Error submitting nursing order:", error);
      toast.error("Failed to submit nursing order.");
    }
  };

  // Fetch nursing orders for a specific patient
  const fetchNursingOrders = async () => {
    try {
      let endpoint = "";

      if (inPatientId) {
        endpoint = `${API_BASE_URL}/nursing-orders/in-patient/${inPatientId}`;
      } else if (outPatientId) {
        endpoint = `${API_BASE_URL}/nursing-orders/out-patient/${outPatientId}`;
      } else {
        console.error("No valid patient ID provided for nursing orders.");
        return;
      }

      const response = await axios.get(endpoint);
      setNursingOrders(response.data); // Store fetched data in state
    } catch (error) {
      console.error("Error fetching nursing orders:", error);
    }
  };

  // Fetch nursing orders on component mount
  useEffect(() => {
    fetchNursingOrders();
  }, [inPatientId]); // Re-fetch if inPatientId changes

  return (
    <div className="Nurse-Order-container">
      <h3>Nurse Order Form</h3>

      {/* Nursing order form */}
      <form onSubmit={handleSubmit}>
        <div className="Nurse-Order-group-content">
          <div className="Nurse-Order-group-left">
            <div className="Nurse-Order-group">
              <FloatingInput
              label={"Order Name"}
               type="text"
               id="orderName"
               value={orderName}
               onChange={(e) => setOrderName(e.target.value)}
               required
              
              />
            </div>

            <div className="Nurse-Order-group">
              <FloatingInput
              label={"Nurse Time"}
              type="time"
              id="nurseTime"
              value={nurseTime}
              onChange={(e) => setNurseTime(e.target.value)}
              required
              
              />
            </div>

            <div className="Nurse-Order-group">
              <FloatingInput
              label={"Nursing Frequency"}
              id="nursingFrequency"
              value={nursingFrequency}
              onChange={(e) => setNursingFrequency(e.target.value)}
              options={[{value:"",label:""},
                {value:"daily",label:"Daily"},
                {value:"twice-daily",label:"Twice Daily"},
                {value:"once-weekly",label:"Once Weekly"}
              ]}
              required
              
              />
            </div>
          </div>

          <div className="Nurse-Order-group-right">
            <div className="Nurse-Order-group">
              <FloatingInput
              label={"Order Given Time"}
                type="time"
                id="orderGivenTime"
                value={orderGivenTime}
                onChange={(e) => setOrderGivenTime(e.target.value)}
                required
              
              />
            </div>

            <div className="Nurse-Order-group">
              <FloatingTextarea
              label={"Remarks"}
               id="remarks"
               value={remarks}
               onChange={(e) => setRemarks(e.target.value)}
               required
              
              />
            </div>
          </div>
        </div>

        <div className="Nurse-Order-group-buttons">
          <button
            type="button"
            onClick={handleCancel}
            className="NurseOrder-cancel-btn"
          >
            Cancel
          </button>
          <button type="submit" className="NurseOrder-submit-btn">
            Submit
          </button>
        </div>
      </form>

      <div className="ReferralConsultation-existing-referrals">
        <h4>Existing Nursing Orders:</h4>
        {nursingOrders.length > 0 ? (
          <table className="ReferralConsultation-table">
            <thead>
              <tr>
                <th>SN</th>
                <th>Order Name</th>
                <th>Time</th>
                <th>Frequency</th>
                <th>Order Given Time</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {nursingOrders.map((order, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{order.nOrderName || "N/A"}</td>
                  <td>{order.nurseTime}</td>
                  <td>{order.nursingFrequency}</td>
                  <td>{order.orderGivenTime}</td>
                  <td>{order.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No existing referrals found.</p>
        )}
      </div>
    </div>
  );
};

export default NurseOrder;
