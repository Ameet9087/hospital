// src/Routes.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import EmployeeTable from './Employee/EmployeeTable';
// import EmployeeRoleTable from './Employee/EmployeeRoleTable';
// import EmployeeTypeTable from './Employee/EmployeeTypeTable';
import Employeecomponent from './EmployeeTable';
import EmployeeRoleComponent from './EmployeeRoleTable';
import EmployeeTypeComponent from './EmployeeTypeTable';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/manage-employee" element={<Employeecomponent />} />
      <Route path="/manage-employee-role" element={<EmployeeRoleComponent/>} />
      <Route path="/manage-employee-type" element={<EmployeeTypeComponent />} />
    </Routes>
  );
};

export default AppRoutes;
