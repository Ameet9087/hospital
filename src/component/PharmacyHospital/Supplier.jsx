/* Mohini_Supplier_WholePage_14/sep/2024 */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Purchase.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Supplier = () => {
  const navigate = useNavigate();

  return (
    <div className="purchase-report-container">
      <div className="report-grid">
        <div className="reports-cont">
        <Link to="/pharmacy/report/supplier/supplier-information" className="report-details-link">
            <div className="report-icon-container">
              <i className="fa-solid fa-circle-dot"></i>
            </div>
            <div className="report-details-container">
              <h4>Supplier Information</h4>
              <p>Report</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Supplier;
/* Mohini_Supplier_WholePage_14/sep/2024 */
