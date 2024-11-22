// src/Routes.jsx

import React from 'react';
import { Routes, Route,useLocation,NavLink } from 'react-router-dom';
import EmployeeTable from './EmployeeTable';
import EmployeeRoleComponent from './EmployeeRoleTable';
import EmployeeTypeComponent from './EmployeeTypeTable';
import ManageDepartment from './ManageDepartment';
import ManageSubstore from './ManageSubstore';
import ManageWardSubstoreMap from './ManageWardSubstoreMap';
import ManageWard from './ADT/ManageWard';
import ManageBedFeatureScheme from './ADT/ManageBedFeatureScheme';
import ManageBed from './ADT/ManageBed';
import ManageImagingType from './Radiology/ManageImagingType';
import ManageImagingItem from './Radiology/ManageImagingItem';
import ManageRadiologyTempltate from './Radiology/ManageRadiologyTempltate';
import DefaultSignatories from './Radiology/DefaultSignatories';

import EmployeeHeader from './EmployeeHeader';


const SettingRouting = () => {
  return (
    <>
    <EmployeeHeader/>

    <Routes>
    <Route path="/employee/manage-employee" element={<EmployeeTable />} />
    <Route path="/employee/manage-employee-role" element={<EmployeeRoleComponent />} />
    <Route path="/employee/manage-employee-type" element={<EmployeeTypeComponent />} />
    <Route path="/departments/manage-department" element={<ManageDepartment />} />
    <Route path="/departments/manage-substore" element={ <ManageSubstore/>}/>
    <Route path="manage-ward-substore" element={ <ManageWardSubstoreMap/>}/>
    <Route path="/adt/manage-ward" element={<ManageWard />} />
    <Route path="/adt/manage-bed-feature" element={<ManageBedFeatureScheme/>}/>
    <Route path="/adt/manage-bed" element = { <ManageBed/>}/>
    <Route path="/radiology/manage-imaging-type" element={<ManageImagingType/>}/>
    <Route path="/radiology/manage-imaging-item" element={<ManageImagingItem/>}/>
    <Route path="manage-radiology-template" element={<ManageRadiologyTempltate/>}/>
    <Route path="default-signatories" element={<DefaultSignatories/>}/>
    </Routes>
    </>
  );
};

export default SettingRouting;

