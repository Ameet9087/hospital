import React, { useState } from 'react';
import './oTSearchPopUp.css';

const OTSearchPopUp = ({ closePopup }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchText, setSearchText] = useState('');
  
  const departments = [
    'CARDIOLOGY',
    'CARDIOLOGY DEPT',
    'CVTS DEPT',
    'ENT',
    'GENERAL SURGERY',
    'GYNAECOLOGY',
    'OBGYN',
    'ORTHOPEDIC SURGERY',
    'SPINE SURGERY',
    'UROLOGY'
  ];

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
  };

  return (
    <div
    //  className="oTSearchPopUp-main-container"
     >
              {/* <button className="groupOperationType-close-btn" onClick={closePopup}>X</button> Close button */}

      {/* Search Section */}
      <div className="oTSearchPopUp-search-section">
        <div className="oTSearchPopUp-search-wrapper">
          <div className="oTSearchPopUp-search-box">
            <label>Search Here</label>
            <input 
              type="text" 
              placeholder="Type Here To Search" 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="oTSearchPopUp-search-with">
            <label>Search With</label>
            <select defaultValue="OPERATIONTYPEPM">
              <option value="OPERATIONTYPEPM">OPERATIONTYPEPM</option>
            </select>
          </div>
          <button className="oTSearchPopUp-search-btn">
            <span className="oTSearchPopUp-search-icon">⌕</span>
          </button>
        </div>
      </div>

      {/* Operation Type Header */}
      <div className="oTSearchPopUp-operation-header">
        <span>OPERATIONTYPEPM</span>
      </div>

      {/* Departments List */}
      <div className="oTSearchPopUp-departments-container">
        {departments.map((department, index) => (
          <div
            key={index}
            className={`oTSearchPopUp-department-row ${selectedDepartment === department ? 'selected' : ''}`}
            onClick={() => handleDepartmentClick(department)}
          >
            <span>{department}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="oTSearchPopUp-departments-footer">
        <div className="oTSearchPopUp-departments-footer-content">
          <div className="oTSearchPopUp-departments-pagination-info">
            Page <span className='oTSearchPopUp-departments-pagination-info-span1'>1</span> of <span>1</span>
          </div>
          <div className="oTSearchPopUp-view-info">
            View <span>1-10</span> of <span>10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTSearchPopUp;