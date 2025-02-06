import React, { useState } from "react";
import "./OnlineAddCancel.css";
// import { API_BASE_URL } from '../api/api';
import { API_BASE_URL } from "../../api/api";
import { toast } from "react-toastify";

const OnlineAddCancel = ({
  formData,
  onClose,
  handleUpdate,
  updatedAppointments,
}) => {
  
  const [localFormData, setLocalFormData] = useState({
    ...formData,
    reason: formData.reason || "", // Initialize reason from formData
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
        ...localFormData,
        status: "Cancelled", 
      };
      const response = await fetch(
        `${API_BASE_URL}/appointments/${updatedAppointments.outPatientId}/cancellation`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedFormData),
        }
      );
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      const result = await response.text();
      console.log("Response body:", result);

      if (response.ok) {
        toast.success(result);
        onClose();
      } else {
        console.error("Error response:", result);
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
      <button onClick={handleCancelClick}>Save</button>
    </div>
  );
};

export default OnlineAddCancel;
