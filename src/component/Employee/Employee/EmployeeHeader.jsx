import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './EmployeeTable.css';

const EmployeeHeader = ({ onNavClick }) => {
  const [showEmployeeOptions, setShowEmployeeOptions] = useState(false);

  const handleEmployeeClick = () => {
    setShowEmployeeOptions(!showEmployeeOptions);
  };

  return (
    <>
      <header className="employee-header">
        <nav>
          <ul className="employee-header-form">
            <li>Departments</li>
            <li>Radiology</li>
            <li>ADT</li>
            <li>Security</li>
            <li>Billing</li>
            <li onClick={handleEmployeeClick}>Employee</li>
            <li>Geolocation</li>
            <li>Clinical</li>
            <li>Manage Tax</li>
            <li>Dynamic Templates</li>
            <li>External Referrals</li>
            <li>Core CFG Parameters</li>
            <li>More...</li>
          </ul>
        </nav>
      </header>
      {showEmployeeOptions && (
        <div className="employee-sub-nav">
          <ul>
            <li><Link to="/manage-employee" onClick={() => onNavClick('ManageEmployee')}>Manage Employee</Link></li>
            <li><Link to="/manage-employee-role" onClick={() => onNavClick('ManageEmployeeRole')}>Manage Employee Role</Link></li>
            <li><Link to="/manage-employee-type" onClick={() => onNavClick('ManageEmployeeType')}>Manage Employee Type</Link></li>
          </ul>
        </div>
      )}
    </>
  );
};

export default EmployeeHeader;
