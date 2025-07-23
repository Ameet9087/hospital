import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DepartmentForm from './DepartmentForm';
import './AddMessagePopup.css';

const AddMessagePopup = ({ onSelectDepartment }) => {
  const [form, setForm] = useState({
    messageId: '',
    message: '',
    department: ''
  });

  const [departments, setDepartments] = useState([]);  // State for department list
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    // Fetch department list from API
    axios.get('http://localhost:8085/api/department')
      .then(response => {
        setDepartments(response.data);  // Populate department list from API response
      })
      .catch(error => {
        console.error('Error fetching departments:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setForm({ ...form, department: e.target.value });
    onSelectDepartment(e.target.value, form.messageId, form.message);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const messageData = {
      messageId: form.messageId,
      message: form.message,
      departmentId:  form.department ,  // Send department as an object with ID
      createdAt: new Date(),  // You can set this in the backend too
      status: 'Completed',  // Example status, you can modify it as needed
      broadcastDate: new Date() // Assuming broadcastDate is current date
    };

    // Send the data to the backend using POST method
    console.log(messageData)
    axios.post('http://localhost:8085/api/broadcast', messageData)
      .then(response => {
        console.log("Message sent successfully:", response.data);
        // Optionally clear the form or provide feedback
        setForm({ messageId: '', message: '', department: '' });
        setSelectedDepartment('');
        alert("Message sent successfully");
      })
      .catch(error => {
        console.error("Error sending message:", error);
      });
  };

  return (
    <div className="addpopup-add-message-container">
      <h2>Add a New Message</h2>

      <form onSubmit={handleSubmit}>
        <label>Message ID:</label>
        <input
          type="text"
          name="messageId"
          className="addpopup-message-input"
          placeholder="Message ID"
          value={form.messageId}
          onChange={handleChange}
        />
        <textarea
          name="message"
          className="addpopup-message-textarea"
          placeholder="Enter your message"
          value={form.message}
          onChange={handleChange}
        />
        <div className="addpopup-department-select">
          <label>Select Department:</label>
          <select 
            className="addpopup-department-dropdown"
            value={selectedDepartment} 
            onChange={handleDepartmentChange}
          >
            <option value="">Select Department</option>
            {departments.map(department => (
              <option key={department.departId} value={department.departId}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        {/* {selectedDepartment && <DepartmentForm department={selectedDepartment} />} */}

        <button type="submit" className="addpopup-send-message-button">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default AddMessagePopup;
