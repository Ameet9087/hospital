import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import Department from '../src/controll/Department';
// import Inventory from '../src/controll/Inventory';
// import QueryPage from '../src/controll/QueryPage'; // Import QueryPage
// import QueryPageInventory from './controll/QueryPageInventory';
// import '../src/controll/AppContainer.css';
import "./controlAllDeptRoute.css"

function ControlAllDeptRoute() {
  return (
    // <Router>
      <div className="ControlDepartmentsCD-navbar-container">
        {/* Heading */}
        <h1 className="ControlDepartmentsCD-navbar-heading">Control Department</h1>

        {/* Navbar */}
        <nav className="ControlDepartmentsCD-navbar">
          <ul>
            <li>
              <Link to="/superuser/controlalldepartment/department">Department</Link>
            </li>
            <li>
              <Link to="/superuser/controlalldepartment/inventory">Inventory</Link>
            </li>
            
            {/* <li>
                <Link to="/send-query">Send Query</Link> 
            </li> */}

          </ul>
        </nav>

        {/* Routes */}
        {/* <Routes>
          <Route path="/department" element={<Department />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/send-query" element={<QueryPage />} /> 
          <Route path="/send-inventory-query" element={<QueryPageInventory></QueryPageInventory>} /> 
        </Routes> */}
      </div>
    // </Router>
  );
}

export default ControlAllDeptRoute;
