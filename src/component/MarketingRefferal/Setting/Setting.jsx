import React from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import RefringOrg from './reffering_organization/RefringOrg';
import ReferringParty from './refferint_party/Reffering_part';
import './mkt_settin.css'; // Import the CSS file

const Settings = () => {
  return (
    <div className="mkt_setting-container">
      <header className="mkt_setting-header">
        <nav className="mkt_setting-nav">
          <ul className="mkt_setting-nav-list">
            <li className="mkt_setting-nav-item">
              <NavLink
                to="RefringOrg"
                className={({ isActive }) =>
                  isActive ? 'mkt_setting-nav-link active' : 'mkt_setting-nav-link'
                }
              >
                Referring Organization
              </NavLink>
            </li>
            <li className="mkt_setting-nav-item">
              <NavLink
                to="ReferringParty"
                className={({ isActive }) =>
                  isActive ? 'mkt_setting-nav-link active' : 'mkt_setting-nav-link'
                }
              >
                Referring Party
              </NavLink>
            </li>
            {/* Other settings links */}
          </ul>
        </nav>
      </header>

      <div className="mkt_setting-content">
        <Routes>
          <Route path="RefringOrg" element={<RefringOrg />} />
          <Route path="ReferringParty" element={<ReferringParty />} />
          {/* Add other routes for different settings here */}
        </Routes>
      </div>
    </div>
  );
};

export default Settings;
