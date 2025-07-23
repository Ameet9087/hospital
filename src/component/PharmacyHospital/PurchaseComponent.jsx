/* Mohini_PurchaseComponent_WholePage_14/sep/2024 */
import React from "react";
import { Link } from "react-router-dom";
import "./Purchase.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const PurchaseComponent = () => {
  return (
    <div className="purchase-report-container">
      <div className="report-grid">
        <div className="reports-cont">
          <Link to="/pharmacy/report/purchase/purchase-order-report" className="report-purchase-report-details-link">
            <div className="report-icon-container">
              <i className="fa-solid fa-circle-dot"></i>
            </div>
            <div className="report-details-container">
              <h4>Purchase Order</h4>
              <p>Report</p>
            </div>
          </Link>
        </div>
        <div className="reports-cont">
          <Link to="/pharmacy/report/purchase/return-to-supplier" className="report-purchase-report-details-link">
            <div className="report-icon-container">
              <i className="fa-solid fa-circle-dot"></i>
            </div>
            <div className="report-details-container">
              <h4>Return to Supplier</h4>
              <p>Report</p>
            </div>
          </Link>
        </div>
        <div className="reports-cont">
          <Link to="/pharmacy/report/purchase/item-wise-purchase-report-com" className="report-purchase-report-details-link">
            <div className="report-icon-container">
              <i className="fa-solid fa-circle-dot"></i>
            </div>
            <div className="report-details-container">
              <h4>Item Wise Purchase Report</h4>
              <p>Report</p>
            </div>
          </Link>
        </div>
        <div className="reports-cont">
          <Link to="/pharmacy/report/purchase/supplier-wise-purchase-report" className="report-purchase-report-details-link">
            <div className="report-icon-container">
              <i className="fa-solid fa-circle-dot"></i>
            </div>
            <div className="report-details-container">
              <h4>Supplier Wise Purchase Report</h4>
              <p>Report</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="reports-cont reports-cont-summary">
        <Link to="/pharmacy/report/purchase/purchase-summary-report" className="report-purchase-report-details-link">
          <div className="report-icon-container">
            <i className="fa-solid fa-circle-dot"></i>
          </div>
          <div className="report-details-container">
            <h4>Purchase Summary</h4>
            <p>Report</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PurchaseComponent;
/* Mohini_PurchaseComponent_WholePage_14/sep/2024 */
