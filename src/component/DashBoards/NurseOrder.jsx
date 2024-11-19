import React, { useState, useEffect } from 'react';
import './NurseOrder.css';
import axios from 'axios';

const NurseOrder = () => {
  // Form state
  const [orderName, setOrderName] = useState('');
  const [nurseTime, setNurseTime] = useState('');
  const [nursingFrequency, setNursingFrequency] = useState('');
  const [orderGivenTime, setOrderGivenTime] = useState('');
  const [remarks, setRemarks] = useState('');

  // State for fetching existing orders
  const [nursingOrders, setNursingOrders] = useState([]);

  const patientId = 1;  // Assuming patient ID 1 for now

  // Handle form cancel
  const handleCancel = () => {
    setOrderName('');
    setNurseTime('');
    setNursingFrequency('');
    setOrderGivenTime('');
    setRemarks('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = {
      nOrderName: orderName,
      nurseTime,
      nursingFrequency,
      orderGivenTime,
      remarks,
      patient:{
        patientId:1
      }
    };

    try {
      // Send POST request to backend
      await axios.post('http://192.168.0.110:9000/nursing-orders', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Form submitted:', formData);
      alert('Nursing order submitted successfully!');
      
      // Optionally, reset the form after submission
      handleCancel();

      // Fetch the updated list of nursing orders
      fetchNursingOrders();
    } catch (error) {
      console.error('Error submitting nursing order:', error);
      alert('Failed to submit nursing order.');
    }
  };

  // Fetch nursing orders for a specific patient
  const fetchNursingOrders = async () => {
    try {
      const response = await axios.get(`http://192.168.0.110:9000/nursing-orders/patient/1`);
      setNursingOrders(response.data); // Store fetched data in state
    } catch (error) {
      console.error('Error fetching nursing orders:', error);
    }
  };

  // Fetch nursing orders on component mount
  useEffect(() => {
    fetchNursingOrders();
  }, [patientId]); // Re-fetch if patientId changes

  return (
    <div className="Nurse-Order-container">
      <h3>Nurse Order Form</h3>

      {/* Display existing nursing orders for the patient */}
      <div className="Nurse-Order-existing-orders">
        <h4>Existing Nursing Orders:</h4>
        {nursingOrders.length > 0 ? (
          <ul>
            {nursingOrders.map((order) => (
              <li key={order.sn}>
                <strong>Order Name:</strong> {order.nOrderName}, 
                <strong>Time:</strong> {order.nurseTime}, 
                <strong>Frequency:</strong> {order.nursingFrequency}, 
                <strong>Order Given Time:</strong> {order.orderGivenTime}, 
                <strong>Remarks:</strong> {order.remarks}
              </li>
            ))}
          </ul>
        ) : (
          <p>No nursing orders found for this patient.</p>
        )}
      </div>

      {/* Nursing order form */}
      <form onSubmit={handleSubmit}>
        <div className="Nurse-Order-group-content">
          <div className="Nurse-Order-group-left">
            <div className="Nurse-Order-group">
              <label htmlFor="orderName">Order Name</label>
              <input
                type="text"
                id="orderName"
                value={orderName}
                onChange={(e) => setOrderName(e.target.value)}
                required
              />
            </div>

            <div className="Nurse-Order-group">
              <label htmlFor="nurseTime">Nurse Time</label>
              <input
                type="time"
                id="nurseTime"
                value={nurseTime}
                onChange={(e) => setNurseTime(e.target.value)}
                required
              />
            </div>

            <div className="Nurse-Order-group">
              <label htmlFor="nursingFrequency">Nursing Frequency</label>
              <select
                id="nursingFrequency"
                value={nursingFrequency}
                onChange={(e) => setNursingFrequency(e.target.value)}
                required
              >
                <option value="">Select Frequency</option>
                <option value="daily">Daily</option>
                <option value="twice-daily">Twice Daily</option>
                <option value="once-weekly">Once Weekly</option>
              </select>
            </div>
          </div>

          <div className="Nurse-Order-group-right">
            <div className="Nurse-Order-group">
              <label htmlFor="orderGivenTime">Order Given Time</label>
              <input
                type="datetime-local"
                id="orderGivenTime"
                value={orderGivenTime}
                onChange={(e) => setOrderGivenTime(e.target.value)}
                required
              />
            </div>

            <div className="Nurse-Order-group">
              <label htmlFor="remarks">Remarks</label>
              <textarea
                id="remarks"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="Nurse-Order-group-buttons">
          <button type="button" onClick={handleCancel} className="NurseOrder-cancel-btn">
            Cancel
          </button>
          <button type="submit" className="NurseOrder-submit-btn">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NurseOrder;
