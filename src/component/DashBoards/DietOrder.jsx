import React, { useState, useEffect } from 'react';
import './DietOrder.css';

const DietOrder = ({ onBack }) => {
  const [formData, setFormData] = useState({
    dietGroup: '',
    dietOrder: '',
    dietFrequency: '',
    dietType: '',
    dietTime: '',
    dietGivenTime: '',
    dietRemarks: ''
  });

  const [dietOrders, setDietOrders] = useState([]);

  // Fetch Diet Orders for Patient when component mounts
  useEffect(() => {
    const fetchDietOrders = async () => {
      try {
        const response = await fetch('http://192.168.0.110:9000/dietorders/patient/1');
        if (!response.ok) {
          throw new Error('Failed to fetch diet orders');
        }

        const data = await response.json();
        setDietOrders(data); // Set the fetched diet orders in state
        console.log('Fetched diet orders:', data);
      } catch (error) {
        console.error('Error fetching diet orders:', error);
      }
    };

    fetchDietOrders(); // Call the function to fetch data when component mounts
  }, []); // Empty dependency array means this runs once on mount

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Reset form data
  const handleCancel = () => {
    setFormData({
      dietGroup: '',
      dietOrder: '',
      dietFrequency: '',
      dietType: '',
      dietTime: '',
      dietGivenTime: '',
      dietRemarks: ''
    });
  };

  // Handle form submission (POST request)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://192.168.0.110:9000/dietorders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          patient: { patientId: 1 }, // Assuming patientId is required in the body
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit diet order');
      }

      const responseData = await response.json();
      console.log('Successfully submitted:', responseData);

      // Reset form after submission
      handleCancel();

      // Optionally, fetch the updated list of diet orders
      fetchDietOrders(); // Re-fetch diet orders after submission
    } catch (error) {
      console.error('Error submitting diet order:', error);
    }
  };

  return (
    <div className="Diet-order-container">
      <h3>Diet Order</h3>
      <form onSubmit={handleSubmit}>
        <div className="Diet-order-content">
          <div className="Diet-order-content-left">
            <div className="Diet-order-group">
              <label>Diet Group:</label>
              <input
                type="text"
                name="dietGroup"
                placeholder="Diet Group"
                value={formData.dietGroup}
                onChange={handleInputChange}
              />
            </div>
            <div className="Diet-order-group">
              <label>Diet Order:</label>
              <input
                type="text"
                name="dietOrder"
                placeholder="Diet Order"
                value={formData.dietOrder}
                onChange={handleInputChange}
              />
            </div>
            <div className="Diet-order-group">
              <label>Diet Frequency:</label>
              <select
                name="dietFrequency"
                value={formData.dietFrequency}
                onChange={handleInputChange}
              >
                <option value="">Select Frequency</option>
                <option value="daily">Daily</option>
                <option value="twice-daily">Twice Daily</option>
                <option value="once-weekly">Once Weekly</option>
              </select>
            </div>
            <div className="Diet-order-group">
              <label>Diet Type:</label>
              <select
                name="dietType"
                value={formData.dietType}
                onChange={handleInputChange}
              >
                <option value="">Select Diet Type</option>
                <option value="regular">Regular</option>
                <option value="low-sodium">Low Sodium</option>
                <option value="high-protein">High Protein</option>
              </select>
            </div>
          </div>

          <div className="Diet-order-content-right">
            <div className="Diet-order-group">
              <label>Diet Time:</label>
              <input
                type="time"
                name="dietTime"
                value={formData.dietTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="Diet-order-group">
              <label>Diet Given Time:</label>
              <input
                type="datetime-local"
                name="dietGivenTime"
                value={formData.dietGivenTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="Diet-order-group">
              <label>Diet Remarks:</label>
              <textarea
                name="dietRemarks"
                placeholder="Add remarks about the Diet"
                value={formData.dietRemarks}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="Diet-order-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="Diet-order-actions-cancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="Diet-order-actions-submit"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Display the fetched diet orders */}
      <div className="Diet-orders-list">
        <h4>Existing Diet Orders</h4>
        {dietOrders.length === 0 ? (
          <p>No diet orders found.</p>
        ) : (
          <ul>
            {dietOrders.map((order) => (
              <li key={order.sn}>
                {order.dietGroup} - {order.dietOrder} ({order.dietFrequency})
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DietOrder;
