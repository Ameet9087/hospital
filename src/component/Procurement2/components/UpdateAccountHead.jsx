import React, { useState } from "react";
import axios from "axios"; // Import axios for API requests
import "./UpdateAccountHead.css"; // Ensure the CSS file has the updated class names
import { API_BASE_URL } from "../../api/api";
import { FloatingInput } from "../../../FloatingInputs";
import { toast } from "react-toastify";
const UpdateAccountHead = ({ accountHead, onClose, onUpdate }) => {
  const [name, setName] = useState(accountHead.accountHeadName || "");
  const [description, setDescription] = useState(accountHead.description || "");
  const [active, setIsActive] = useState(accountHead.active || false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create an object with the updated account head data
      const updatedAccountHead = {
        accountHeadName: name,
        description,
        active,
      };

      // Axios call to update the account head
      const response = await axios.put(
        `${API_BASE_URL}/account-heads/${accountHead.id}`,
        updatedAccountHead
      );

      if (response.status === 200) {
        toast.success("Account head updated successfully!");
        onUpdate(response.data); // Call the onUpdate prop to update state in the parent component
        onClose(); // Close the modal after successful update
      } else {
        alert("Failed to update account head. Please try again.");
      }
    } catch (error) {
      console.error("Error updating account head:", error);
      toast.error("An error occurred while updating the account head.");
    }
  };

  return (
    <div className="AddAccountHead-model">
      <h2 className="UpdateAcHead-title">Update Account Head</h2>
      <form onSubmit={handleSubmit} className='AddAccountHead-form'>
        <div className="AddAccountHead-formgroup">
          <FloatingInput
          label={"Account Head Name"}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Enter Account Head Name"
          />
         
        </div>

        <div className="AddAccountHead-formgroup">
          <FloatingInput
          label={"Description"}
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Description"
          />
      
        </div>

        <div className="AddAccountHead-formgroup">
          <label>Is Active</label>
          <input
            type="checkbox"
            checked={active}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </div>

        <button type="submit" className="MeasssBtnAdd">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateAccountHead;
