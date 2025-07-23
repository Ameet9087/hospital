/* Dhanashree_Inventory_27/09_Starts */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; // Import Axios
import './Inventory.css'; 
import { FaEye } from 'react-icons/fa'; // Import Font Awesome icon

function Inventory() {
  const navigate = useNavigate();
  const [inventoryData, setInventoryData] = useState([]); // State to store inventory data

  // Fetch inventory data when the component mounts
  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get('http://localhost:8085/api/super/inventories');
        console.log(response.data); // Replace with your API endpoint
        setInventoryData(response.data); // Set the fetched data to state
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };

    fetchInventoryData();
  }, []); // Empty dependency array means it runs once when the component mounts

  const handleRedirect = (item) => {
    navigate('/send-inventory-query', {
      state: {
        userId: item.userId,
        departmentName: item.departmentName,
        username: item.username,
        userMsg: item.userMsg,
        uploadedDocuments: item.uploadedDocuments,
        uploadedInvoice: item.uploadedInvoice,
        status: item.status,
      }
    }); // Pass all fields to the next page
  };

  return (
    <div>
      <h2>Inventory Page</h2>
      <table className="SuperUserInventory-table" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Inventory Id</th>
            <th>Department Name</th>
            <th>User Name</th>
            <th>User Message</th>
            <th>User Query</th>
            <th>Uploaded Documents</th>
            <th>Uploaded Invoice (If Required)</th>
            <th>Action</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((item) => (
            <tr key={item.userId}>
              <td>{item.userId}</td>
              <td>{item.incid}</td>
              <td>{item.departmentName}</td>
              <td>{item.username}</td>
              <td>{item.userMsg}</td>
              <td>{item.userQuery}</td>
              <td>{item.uploadedDocuments || 'N/A'}</td>
              <td>{item.uploadedInvoice || 'N/A'}</td>
              <td>
                <button
                  onClick={() => handleRedirect(item)}
                  className="SuperUserInventory-action-btn"
                >
                  <FaEye /> 
                </button>
              </td>
              <td className="SuperUserInventory-status-btn-group">
                <button className={`SuperUserInventory-status-btn ${item.status.toLowerCase()}`}>
                  {item.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;

/* Dhanashree_Inventory_27/09_Ends */
