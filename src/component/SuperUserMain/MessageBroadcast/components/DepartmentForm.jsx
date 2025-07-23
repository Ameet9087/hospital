// Dhanashree_DepartmentForm_26/09_Starts

import React, { useState } from 'react';
import './DepartmentForm.css';

const DepartmentForm = ({ department }) => {
  const [selectedStaff, setSelectedStaff] = useState([]);

  const staffByDepartment = {
    Radiology: [
      'Doctor 1', 'Nurse 1', 'Technician 1', 'Staff 4', 'Staff 5', 'Staff 6',
      'Staff 7', 'Staff 8', 'Staff 9', 'Staff 10', 'Staff 11', 'Staff 12',
      'Staff 13', 'Staff 14', 'Staff 15', 'Staff 16', 'Staff 17', 'Staff 18',
      'Staff 19', 'Staff 20'
    ],
    Cardiology: [
      'Doctor 2', 'Nurse 2', 'Technician 2', 'Staff A', 'Staff B', 'Staff C',
      'Staff D', 'Staff E', 'Staff F', 'Staff G', 'Staff H', 'Staff I',
      'Staff J', 'Staff K', 'Staff L', 'Staff M', 'Staff N', 'Staff O',
      'Staff P', 'Staff Q'
    ]
  };

  const staffList = staffByDepartment[department] || [];

  const handleStaffChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedStaff([...selectedStaff, value]);
    } else {
      setSelectedStaff(selectedStaff.filter((staff) => staff !== value));
    }
  };

  const handleSelectAll = () => {
    // Check if all staff are selected
    if (selectedStaff.length === staffList.length) {
      // Deselect all
      setSelectedStaff([]);
    } else {
      // Select all
      setSelectedStaff(staffList);
    }
  };

  return (
    <div className="DepartmentForm-department-form">
      <h3>Select Staff from {department}</h3>
      <button className="DepartmentForm-select-all-button" onClick={handleSelectAll}>
        {selectedStaff.length === staffList.length ? 'Deselect All' : 'Select All'}
      </button>
      {staffList.map((staff, index) => (
        <label className='DepartmentForm' key={index}>
          <input
            type="checkbox"
            value={staff}
            checked={selectedStaff.includes(staff)}
            onChange={handleStaffChange}
          />
          {staff}
        </label>
      ))}
    </div>
  );
};

export default DepartmentForm;

// Dhanashree_DepartmentForm_26/09_Ends
