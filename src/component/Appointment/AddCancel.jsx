import React, { useState } from 'react';
import './AddCancel.css';
import { API_BASE_URL } from '../api/api';
import { toast } from 'react-toastify';
import { FloatingTextarea } from '../../FloatingInputs';

const AddCancel = ({ formData, onClose, handleUpdate,updatedAppointments }) => {
  console.log(formData);
  
  console.log(updatedAppointments);
  
  const [localFormData, setLocalFormData] = useState({
    reason: formData.reason || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCancelClick = async () => {
    try {
      const updatedFormData = {
        reason:localFormData.reason,
        status: "Cancelled", // Set the status for cancellation
      };
  
      const response = await fetch(
        `${API_BASE_URL}/appointments/${updatedAppointments.outPatientId}/cancellation`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFormData),
        }
      );
  
      // Log response for debugging
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);
  
      const result = await response.text(); 
      console.log("Response body:", result);
  
      if (response.ok) {
        toast.success(result);
        onClose();
      } else {
        console.error("Error response:", result); // Log server error response
        toast.error(result || "Failed to update the appointment.");
      }
    } catch (error) {
      toast.error("Network or runtime error:", error);
    }
  };
  
  

  return (
    <div className="add-cancel">
      <label htmlFor="reason">Reason</label>

      <FloatingTextarea
      label={"Reason"}
      name="reason"
      rows="5"
      cols="150"
      value={localFormData.reason} // Controlled input
      onChange={handleInputChange}
      />
      {/* <textarea
        id="reason"
        name="reason"
        rows="5"
        cols="150"
        value={localFormData.reason} // Controlled input
        onChange={handleInputChange} // Update state on input change
      /> */}
      <button className='add-cancel-btn' onClick={handleCancelClick}>Save</button>
    </div>
  );
};

export default AddCancel;
