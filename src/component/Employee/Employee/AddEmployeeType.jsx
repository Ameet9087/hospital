import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './AddEmployeeRole.css';

const AddEmployeeType = ({ show, handleClose }) => {
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log({ role, description, isActive });
    handleClose(); // Close the modal after submission
  };

  return (
    <Modal show={show} onHide={handleClose} dialogClassName="add-employee-role">
      <div className="emp-modal-dialog">
        <div className="emp-modal-header">
          <div className="emp-modal-title">Add EmployeeRole</div>
          <Button onClick={handleClose} className="add-employee-role-btn">X</Button>
        </div>
        <div className="emp-modal-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="role">
              <Form.Label className="emp-form-label">Role <span className="emp-text-danger">*</span> :</Form.Label>
              <Form.Control
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="Role"
                required
                className="emp-form-control"
              />
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label className="emp-form-labels">Description :</Form.Label>
              <Form.Control
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                className="emp-form-control"
              />
            </Form.Group>
            <Form.Group controlId="isActive" className='emp-form-group'>
              <Form.Label className="emp-form-label">Is Active :</Form.Label>
              <Form.Check
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="emp-form-check-input"
              />
            </Form.Group>
            <Button type="submit" className="add-employee-btn">
              Add
            </Button>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default AddEmployeeType;
