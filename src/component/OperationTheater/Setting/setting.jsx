import React from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import OtMachine from './settingsubfils/OtMachine/OtMachine';
import OTMaster from './settingsubfils/OTMaster/Otmaster';
import './setting.css';
import OperationMaster from './settingsubfils/OperationMaster/OperationMaster';
import OtpKgMasters from "./settingsubfils/OtpMasters/OtpKgMaster";

const Setting = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Function to determine if a path is active
  const isActive = (path) => location.pathname.startsWith(path);

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <div className="setting-container">
      {/* Navigation Bar */}
      <header className="setting-header">
        <nav>
          <ul className="setting-nav">
            <li
              className={isActive('/oprationtheater/setting/otmachine') ? 'setting-nav-item active' : 'setting-nav-item'}
              onClick={() => handleNavClick('/oprationtheater/setting/otmachine')}
            >
              Manage OT Machine
            </li>
            <li
              className={isActive('/oprationtheater/setting/otmaster') ? 'setting-nav-item active' : 'setting-nav-item'}
              onClick={() => handleNavClick('/oprationtheater/setting/otmaster')}
            >
              OT MASTER
            </li>
            {/* <li
              className={isActive('/otpkgmaster') ? 'setting-nav-item active' : 'setting-nav-item'}
              onClick={() => handleNavClick('/otpkgmaster')}
            >
              OT Pkg Master
            </li> */}
            <li
              className={isActive('/oprationtheater/setting/operationmaster') ? 'setting-nav-item active' : 'setting-nav-item'}
              onClick={() => handleNavClick('/oprationtheater/setting/operationmaster')}
            >
              OPERATION MASTER
            </li>
          </ul>
        </nav>
      </header>

      {/* Content Area */}
      <main className="setting-content">
        <Routes>
          <Route path="otmachine" element={<OtMachine />} />
          <Route path="otmaster" element={<OTMaster />} />
          <Route path="otpkgmaster" element={<OtpKgMasters />} />
          <Route path="operationmaster" element={<OperationMaster />} />
        </Routes>
      </main>
    </div>
  );
};

export default Setting;
