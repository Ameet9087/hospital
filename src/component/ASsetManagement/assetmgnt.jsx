import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import "./assetmgntNavBar.css";
import Transactionnav from "./Transaction/transactionnav"; // Import Transactionnav or other components
import Masternav from "./Master/masternav";


const AssetmgntNavBar = () => {
  return (
    <div className="assetmgnt-header-module">
      <nav className="assetmgnt-navbar">
        <ul>
          <li>
            <NavLink to="/assettransaction/*" className={({ isActive }) => isActive ? "assetmgnt-header-button active" : "assetmgnt-header-button"
            }
            >
              Transaction
            </NavLink>
          </li>
          <li>
            <NavLink
              to="fixedassets/assestmaster"
              className={({ isActive }) =>
                isActive ? "assetmgnt-header-button active" : "assetmgnt-header-button"
              }
            >
              Master
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/assetReports"
              className={({ isActive }) =>
                isActive ? "assetmgnt-header-button active" : "assetmgnt-header-button"
              }
            >
              Reports
            </NavLink>
          </li> */}


        </ul>
      </nav>
      <div>
        <Routes>
          <Route path="assettransaction/*" element={<Transactionnav />}>

          </Route>

          <Route path="/assetmaster/*" element={<Masternav />} />
          {/* <Route path="/assetReports" element={<div>Reports Component</div>} /> */}

        </Routes>
      </div>
    </div>
  );
};

export default AssetmgntNavBar;
