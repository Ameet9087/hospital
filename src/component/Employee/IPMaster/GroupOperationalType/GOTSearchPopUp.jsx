import React, { useState } from 'react';
import './gOTSearchPopUp.css';

const GOTSearchPopUp = ({ closePopup }) => {
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
    //  className="gOTSearchPopUp-main-container"
     >
              {/* <button className="groupOperationType-close-btn" onClick={closePopup}>X</button> Close button */}

      {/* Search Section */}
      <div className="gOTSearchPopUp-search-section">
        <div className="gOTSearchPopUp-search-wrapper">
          <div className="gOTSearchPopUp-search-box">
            <label>Search Here</label>
            <input 
              type="text" 
              placeholder="Type Here To Search" 
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="gOTSearchPopUp-search-with">
            <label>Search With</label>
            <select defaultValue="OPERATIONTYPEPM">
              <option value="OPERATIONTYPEPM">OPERATIONTYPEPM</option>
            </select>
          </div>
          <button className="gOTSearchPopUp-search-btn">
            <span className="gOTSearchPopUp-search-icon">⌕</span>
          </button>
        </div>
      </div>

      {/* Operation Type Header */}
      <div className="gOTSearchPopUp-operation-header">
        <span>OPERATIONTYPEPM</span>
      </div>

      {/* Departments List */}
      <div className="gOTSearchPopUp-departments-container">
        {departments.map((department, index) => (
          <div
            key={index}
            className={`gOTSearchPopUp-department-row ${selectedDepartment === department ? 'selected' : ''}`}
            onClick={() => handleDepartmentClick(department)}
          >
            <span>{department}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="gOTSearchPopUp-departments-footer">
        <div className="gOTSearchPopUp-departments-footer-content">
          <div className="gOTSearchPopUp-departments-pagination-info">
            Page <span className='gOTSearchPopUp-departments-pagination-info-span1'>1</span> of <span>1</span>
          </div>
          <div className="gOTSearchPopUp-view-info">
            View <span>1-10</span> of <span>10</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GOTSearchPopUp;