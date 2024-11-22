/* Mohini_Sales_WholePage_14/sep/2024 */
import React from "react";
import { Link } from "react-router-dom"; // Ensure Link is imported correctly
import "./Purchase.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Sales = () => {
  return (
    <div className="purchase-report-container">
      <div className="report-grid">
        <div className="reports-cont">
          <Link to="/pharmacy/report/sales/invoice-billing" className="report-details-link">
            <div className="report-icon-container">
              <i className="fa-solid fa-circle-dot"></i>
            </div>
            <div className="report-details-container">
              <h4>Invoice Billing</h4>
              <p>Report</p>
            </div>
          </Link>
        </div>
        <div className="reports-cont">
          <Link to="/pharmacy/report/sales/item-wise-sales" className="report-details-link">
            <div className="report-icon-container">
              <i className="fa-solid fa-circle-dot"></i>
            </div>
            <div className="report-details-container">
              <h4>Item-Wise Sales</h4>
              <p>Report</p>
            </div>
          </Link>
        </div>
        <div className="reports-cont">
          <Link to="/pharmacy/report/sales/user-collection" className="report-details-link">
            <div className="report-icon-container">
              <i className="fa-solid fa-circle-dot"></i>
            </div>
            <div className="report-details-container">
              <h4>User Collection</h4>
              <p>Report</p>
            </div>
          </Link>
        </div>
        <div className="reports-cont">
          <Link to="/pharmacy/report/sales/narcotics-sales" className="report-details-link">
            <div className="report-icon-container">
              <i className="fa-solid fa-circle-dot"></i>
            </div>
            <div className="report-details-container">
              <h4>Narcotics Daily Sales</h4>
              <p>Report</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="report-grid">
        <div className="reports-cont">
          <Link to="/pharmacy/report/sales/rank-membership-wise-sales" className="report-details-link">
            <div className="report-icon-container">
              <i className="fa-solid fa-circle-dot"></i>
            </div>
            <div className="report-details-container">
              <h4>Rank Membership-wise Sales</h4>
              <p>Report</p>
            </div>
          </Link>
        </div>
        <div className="reports-cont">
          <Link to="/pharmacy/report/sales/sales-statement" className="report-details-link">
            <div className="report-icon-container">
              <i className="fa-solid fa-circle-dot"></i>
            </div>
            <div className="report-details-container">
              <h4>Sales Statement</h4>
              <p>Report</p>
            </div>
          </Link>
        </div>
        <div className="reports-cont">
          <Link to="/pharmacy/report/sales/insurance-patients" className="report-details-link">
            <div className="report-icon-container">
              <i className="fa-solid fa-circle-dot"></i>
            </div>
            <div className="report-details-container">
              <h4>Insurance Patients (BIMA)</h4>
              <p>Report</p>
            </div>
          </Link>
        </div>
        <div className="reports-cont">
          <Link to="/pharmacy/report/sales/sales-summary" className="report-details-link">
            <div className="report-icon-container">
              <i className="fa-solid fa-circle-dot"></i>
            </div>
            <div className="report-details-container">
              <h4>Sales Summary</h4>
              <p>Report</p>
            </div>
          </Link>
        </div>
      </div>

      <div className="report-grid">
        <div className="reports-cont">
          <Link to="/pharmacy/report/sales/patient-wise-sales-details" className="report-details-link">
            <div className="report-icon-container">
              <i className="fa-solid fa-circle-dot"></i>
            </div>
            <div className="report-details-container">
              <h4>Patient-wise Sales Details</h4>
              <p>Report</p>
            </div>
          </Link>
        </div>
        <div className="reports-cont">
          <Link to="/pharmacy/report/sales/settlement-summary" className="report-details-link">
            <div className="report-icon-container">
              <i className="fa-solid fa-circle-dot"></i>
            </div>
            <div className="report-details-container">
              <h4>Settlement Summary</h4>
              <p>Report</p>
            </div>
          </Link>
        </div>
        <div className="reports-cont">
          <Link to="/pharmacy/report/sales/return-on-investment" className="report-details-link">
            <div className="report-icon-container">
              <i className="fa-solid fa-circle-dot"></i>
            </div>
            <div className="report-details-container">
              <h4>Return On Investment</h4>
              <p>Report</p>
            </div>
          </Link>
        </div>
        <div className="reports-cont">
          <Link to="/pharmacy/report/sales/pharmacy-payment-mode-wise" className="report-details-link">
            <div className="report-icon-container">
              <i className="fa-solid fa-circle-dot"></i>
            </div>
            <div className="report-details-container">
              <h4>Pharmacy Payment Mode Wise</h4>
              <p>Report</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sales;
/* Mohini_Sales_WholePage_14/sep/2024 */
