import React, { useState } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import Ot_machine from './settingsubfils/ot_machine/ot_machine';
import Ot_personnelType from './settingsubfils/ot_PersonnelType/Ot_personal_type';
import ManageOtChecklist from './settingsubfils/Manage_ot_checklist/manage_checklist';
import './setting.css';

const Setting = () => {
  const location = useLocation();
  const [activeNav, setActiveNav] = useState(null);

  const handleNavClick = (navType) => {
    setActiveNav(navType);
  };

  const isActive = (path) => location.pathname.includes(path);

  return (
    <>
      <header className="setting-header">
        <nav>
          <ul className="setting-header-nav">
            <li
              className={isActive('ot-machine') ? 'active-nav' : ''}
              onClick={() => handleNavClick('Ot_machine')}
            >
              <Link to="ot-machine" className="nav-link">Manage OT Machine</Link>
            </li>
            <li
              className={isActive('Ot_personnelType') ? 'active-nav' : ''}
              onClick={() => handleNavClick('Ot_personnelType')}
            >
              <Link to="Ot_personnelType" className="nav-link">Manage OT Personnel Type</Link>
            </li>
            <li
              className={isActive('ManageOtChecklist') ? 'active-nav' : ''}
              onClick={() => handleNavClick('ManageOtChecklist')}
            >
              <Link to="ManageOtChecklist" className="nav-link">Manage OT Checklist</Link>
            </li>
          </ul>
        </nav>
      </header>

      <div>
        <Routes>
          <Route path="ot-machine" element={<Ot_machine />} />
          <Route path="Ot_personnelType" element={<Ot_personnelType />} />
          <Route path="ManageOtChecklist" element={<ManageOtChecklist />} />
        </Routes>
      </div>
    </>
  );
};

export default Setting;
