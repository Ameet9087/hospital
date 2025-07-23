import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./fixedAssetsReport.css";
import FixedAssetsMovement from "./FixedAssetsMovement/FixedAssetsMovement";

const FixedAssetReport = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State to manage the visibility of the navigation
  const [navVisible, setNavVisible] = useState(false);

  // Update navigation visibility based on the current path
  useEffect(() => {
    // Show the navigation only if the pathname matches exactly and should be shown
    if (location.pathname === "/fixedassets/Reports") {
      setNavVisible(true);
    } else {
      setNavVisible(false);
    }
  }, [location.pathname]);

  // Function to handle navigation and hide the nav
  const handleNavClick = (path) => {
    setNavVisible(false); // Hide nav when a link is clicked
    navigate(path); // Navigate to the new path
  };

  return (
    <div className="fixed-asset-report">
      {navVisible && (
        <nav className="fixed-asset-report-nav">
          <ul>
            <li>
              <NavLink
                to="FixedAssetsMovement"
                className={({ isActive }) =>
                  `fixed-assets-btn ${isActive ? "active" : ""}`
                }
                onClick={() => handleNavClick("FixedAssetsMovement")}
              >
                <div className="fixed-assets-icon">
                  <i className="fas fa-chart-bar"></i>
                </div>
                <div className="fixed-assets-text">
                  <h3>Fixed Assets Movement</h3>
                  <p>Report</p>
                </div>
              </NavLink>
            </li>
            {/* Add other links if needed */}
          </ul>
        </nav>
      )}

      <div className="fixed-asset-report-content">
        <Routes>
          <Route path="FixedAssetsMovement" element={<FixedAssetsMovement />} />
        </Routes>
      </div>
    </div>
  );
};

export default FixedAssetReport;
