/* Mohini_Stock_WholePage_14/sep/2024 */
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Ensure Link is imported correctly

import "./Purchase.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Stock = () => {
  const navigate = useNavigate();

  return (
    <div className="purchase-report-container">
      <div className="report-grid">
        <div className="reports-cont">
        <Link to="/pharmacy/report/stock/dispensary-story-stock" className="report-details-link">
          <div className="report-icon-container">
            <i className="fa-solid fa-circle-dot"></i>
          </div>
          <div className="report-details-container">
            <h4>Dispensary/Story Stock</h4>
            <p>Report</p>
          </div>
          </Link>
        </div>
        <div className="reports-cont">
        <Link to="/pharmacy/report/stock/expiry-report" className="report-details-link">

          <div className="report-icon-container">
            <i className="fa-solid fa-circle-dot"></i>
          </div>
          <div className="report-details-container">
            <h4>Expiry Report</h4>
            <p>Report</p>
          </div>
          </Link>
        </div>
      
        <div className="reports-cont">
        <Link to="/pharmacy/report/stock/narcotics-stock-report" className="report-details-link">
          <div className="report-icon-container">
            <i className="fa-solid fa-circle-dot"></i>
          </div>
          <div className="report-details-container">
            <h4>Narcotics Stock</h4>
            <p>Report</p>
          </div>
          </Link>
        </div>
       
        <div className="reports-cont">
        <Link to="/pharmacy/report/stock/stock-summary-report" className="report-details-link">

          <div className="report-icon-container">
            <i className="fa-solid fa-circle-dot"></i>
          </div>
          <div className="report-details-container">
            <h4>Stock Summary Report</h4>
            <p>Report</p>
          </div>
          </Link>
        </div>
      </div>
      <div className="report-grid">
        <div className="reports-cont">
        <Link to="/pharmacy/report/stock/return-from-customer-report" className="report-details-link">

          <div className="report-icon-container">
            <i className="fa-solid fa-circle-dot"></i>
          </div>
          <div className="report-details-container">
            <h4>Return From Customer Report</h4>
            <p>Report</p>
          </div>
          </Link>

        </div>
        <div className="reports-cont">
        <Link to="/pharmacy/report/stock/supplier-wise-stock-report" className="report-details-link">

          <div className="report-icon-container">
            <i className="fa-solid fa-circle-dot"></i>
          </div>
          <div className="report-details-container">
            <h4>Supplier wise Stock Report </h4>
            <p>Report</p>
          </div>
          </Link>
        </div>
        <div className="reports-cont">
        <Link to="/pharmacy/report/stock/opening-stock-valuation" className="report-details-link">

          <div className="report-icon-container">
            <i className="fa-solid fa-circle-dot"></i>
          </div>
          <div className="report-details-container">
            <h4>Opening Stock Valuation</h4>
            <p>Report</p>
          </div>
          </Link>
        </div>
        <div className="reports-cont">
        <Link to="/pharmacy/report/stock/stock-transfers" className="report-details-link">

          <div className="report-icon-container">
            <i className="fa-solid fa-circle-dot"></i>
          </div>
          <div className="report-details-container">
            <h4>Stock Transfers</h4>
            <p>Report</p>
          </div>
          </Link>
        </div>
      </div>
      <div className="report-grid">
        <div className="reports-cont">
        <Link to="/pharmacy/report/stock/item-wise-ward-supply" className="report-details-link">

          <div className="report-icon-container">
            <i className="fa-solid fa-circle-dot"></i>
          </div>
          <div className="report-details-container">
            <h4>Item Wise WardSupply</h4>
            <p>Report</p>
          </div>
          </Link>
        </div>
        <div className="reports-cont">
        <Link to="/pharmacy/report/stock/stock-transfer-summary" className="report-details-link">

          <div className="report-icon-container">
            <i className="fa-solid fa-circle-dot"></i>
          </div>
          <div className="report-details-container">
            <h4>Stock Transfer Summary</h4>
            <p>Report</p>
          </div>
          </Link>
        </div>
       
       
      </div>

      {/* <div className="reports-cont reports-cont-summary">
        <div className="report-icon-container">
          <i className="fa-solid fa-circle-dot"></i>
        </div>
        <div className="report-details-container">
          <h4>Purchase Summary</h4>
          <p>Report</p>
        </div>
      </div> */}
    </div>
  );
};

export default Stock;
/* Mohini_Stock_WholePage_14/sep/2024 */
