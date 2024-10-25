import React from 'react';
import SuperUserPatientManagement from './componets/PatientManagement/patientmgnt';
import EmployeeManagement from './componets/Employeemanagemgnt/Employeemgnt';
import { NavLink, Route, Routes } from 'react-router-dom';
import './superusermodulemain.css'; // Import the CSS file

function Superusermodulemain() {
  return (
    <div className="supuserumlAcc">
      <header>
        <nav>
          <ul className="supuserumlAcc-navbar">
            <li>
              <NavLink 
                to="/patientmgnt"
                className="supuserumlAcc-nav-link"
                activeClassName="active" // Note: activeClassName is used for react-router-dom v5. For v6, consider using 'isActive'
              >
                Patient Management
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/empmanagement" 
                className="supuserumlAcc-nav-link"
                activeClassName="active" // Note: activeClassName is used for react-router-dom v5. For v6, consider using 'isActive'
              >
                Employee Role Management
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <div className="supuserumlAcc-content">
        <Routes>
          {/* Route for Patient Management */}
          <Route path="/patientmgnt" element={<SuperUserPatientManagement />} />
          <Route path="/empmanagement" element={<EmployeeManagement />} />
        </Routes>
      </div>
    </div>
  );
}

export default Superusermodulemain;
