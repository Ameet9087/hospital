import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import "./Fixedassests.css";
import AssetsManagement from "./AssetsManagement/AssetsManagement";
import AssetsMaintainance from "./AssetsMaintainence/AssetsMaintainence";
import DepreciationAndDiscarding from "./DepreciationAndDiscarding/DepreciationAndDiscarding";
import FixedAssetReport from "./FixedAssetsReport/FixedAssetsReport";

function FixedAssets() {
  return (
    <div className="fixedAssets-component">
      <header className="fixedAssets-component-header">
        <nav className="fixedAssets-component-header-nav">
          <ul>
            <li>
              <NavLink
                to="/fixedassets/assetsmanagement"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Assets Management
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/fixedassets/assetsmaintenance"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Assets Maintainance
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/fixedassets/depreciationanddiscarding"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Depreciation And Discarding
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/fixedassets/reports"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Reports
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <div className="fixedAssets-component-content">
        <Routes>
          <Route path="/assetsmanagement" element={<AssetsManagement />} />
          <Route path="/assetsmaintenance" element={<AssetsMaintainance />} />
          <Route
            path="/depreciationanddiscarding"
            element={<DepreciationAndDiscarding />}
          />
          <Route path="/reports/*" element={<FixedAssetReport />} />
        </Routes>
      </div>
    </div>
  );
}

export default FixedAssets;
