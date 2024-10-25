import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import LabourList from '../LaborRoomManagement/LabourList/labourlist'; 
import LabourStaffManagement from '../LaborRoomManagement/LabourStaffmgnt/stafmgnnt';
import FetalMonitoringManagement from '../LaborRoomManagement/fetalmonitoring/fetalmonitoring';
import LabourEmergencyHandling from '../LaborRoomManagement/Emergencyhandlling/emergencyhandlling';
import './Labourmgnt.css'; 

function Labourmgnt() {
    return (
        <div>
            <header>
                <nav>
                    <ul className="labour-mgnt-navbar">
                        <li>
                            <NavLink to="/Labourmgnt/LabourList" className="labour-nav-link" activeClassName="active">Labour List</NavLink>
                        </li>
                        <li>
                            <NavLink to="/Labourmgnt/LabourStaffManagement" className="labour-nav-link" activeClassName="active">Labour Staff Management</NavLink>
                        </li>
                        <li>
                            <NavLink to="/Labourmgnt/FatalMonitoring" className="labour-nav-link" activeClassName="active">Fatal Monitoring</NavLink>
                        </li>
                        <li>
                            <NavLink to="/Labourmgnt/EmergencyHandling" className="labour-nav-link" activeClassName="active">Emergency Handling</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>

            <div>
                <Routes>
                    <Route path="/LabourList" element={<LabourList />} />
                    <Route path="/LabourStaffManagement" element={<LabourStaffManagement />} />
                    <Route path="/FatalMonitoring" element={<FetalMonitoringManagement />} />
                    <Route path="/EmergencyHandling" element={<LabourEmergencyHandling />} />
                </Routes>
            </div>
        </div>
    );
}

export default Labourmgnt;
