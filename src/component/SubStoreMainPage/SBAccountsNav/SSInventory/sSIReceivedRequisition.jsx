import React, { useState } from "react";
import "./sSIReceivedRequisition.css";
import { API_BASE_URL } from "../../../api/api";
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";

const SSIReceivedRequisition = ({selectedItem,onClose}) => {
  const [remarks, setRemarks] = useState(""); // For remarks

  const handleReceive = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/inventory-requisitions/${selectedItem.id}/status?status=Received`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ remarks }), // Pass remarks or additional data if needed
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Requisition status updated successfully!");
        onClose();
        console.log("Response Data:", data);
      } else {
        console.error("Failed to update status", response.statusText);
        toast.error("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred while updating status.");
    }
  };

  return (
    <div className="sSIReceivedRequisition-container">
      <div className="sSIReceivedRequisition-header">
        <div>
          Requisition No: <span>{selectedItem.id}</span>
        </div>
        <div>
          Requisition Date: <span>{selectedItem.requisitionDate}</span>
        </div>
        <div>
          Requisition Status: <span>{selectedItem.status}</span>
        </div>
      </div>
      <table className="sSIReceivedRequisition-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Requested Qty</th>
            <th>Dispatched Qty</th>
            <th>Pending Qty</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Towel</td>
            <td>20</td>
            <td>20</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
      <div className="sSIReceivedRequisition-remarks">
        <label>Remarks :</label>
        <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)}></textarea>
      </div>
      <button className="sSIReceivedRequisition-button" onClick={handleReceive}>
        Receive
      </button>
    </div>
  );
};

export default SSIReceivedRequisition;
