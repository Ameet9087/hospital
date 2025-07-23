import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./AddEmployeeRole.css";
import { API_BASE_URL } from "../api/api";
import CustomModal from "../../CustomModel/CustomModal";
import { FloatingInput } from "../../FloatingInputs";
import { toast } from "react-toastify";

const AddEmployeeType = ({ show, handleClose, typeData }) => {
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);

  // Pre-fill the form when editing an employee type
  useEffect(() => {
    if (typeData && typeData.employeeType) {
      setRole(typeData.employeeType);
      setDescription(typeData.description || "");
      setIsActive(typeData.isActive !== undefined ? typeData.isActive : true);
    } else {
      // Reset the form for adding new employee type
      setRole("");
      setDescription("");
      setIsActive(true);
    }
  }, [typeData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object to send
    const employeeType = {
      employeeType: role,
      description,
      isActive,
    };

    try {
      const url =
        typeData && typeData.employeeTypeId
          ? `${API_BASE_URL}/employeeTypes/${typeData.employeeTypeId}` // Update URL
          : `${API_BASE_URL}/employeeTypes/create`; // Create URL

      const method = typeData && typeData.employeeTypeId ? "PUT" : "POST"; // Determine the method

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeType),
      });

      if (response.ok) {
        toast.success(
          typeData && typeData.employeeTypeId
            ? "Employee type updated successfully!"
            : "Employee type added successfully!"
        );
        handleClose(); // Close the modal after success
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to process the request.");
      }
    } catch (error) {
      toast.error("An error occurred while processing the request.");
    }
  };

  return (
    <CustomModal isOpen={show} onClose={handleClose}>
      <div className="emp-modal-dialog">
        <div className="emp-modal-header">
          <div className="emp-modal-title">
            {typeData && typeData.employeeTypeId
              ? "Edit Employee Type"
              : "Add Employee Type"}
          </div>
        </div>
        <div>
          <Form className="emp-modal-body" onSubmit={handleSubmit}>
            <Form.Group controlId="role">
              <FloatingInput
                label={"Employee Type"}
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="description">
              <FloatingInput
                label={"Description"}
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="isActive" className="emp-form-group">
              <Form.Label className="emp-form-label">Is Active :</Form.Label>
              <Form.Check
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="emp-form-check-input"
              />
            </Form.Group>
            <Button type="submit" className="add-employee-btn">
              {typeData && typeData.employeeTypeId ? "Update" : "Add"}
            </Button>
          </Form>
        </div>
      </div>
    </CustomModal>
  );
};

export default AddEmployeeType;
