import React, { useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "./PurchaseReport.css";
import PurchaseOrderReport from "./PurchaseReportOrder";
// import PurchaseReport from "./PurchaseItem";
import PurchaseSummaryReport from "./SummaryPurchase";
import ReturnToSupplierReport from "./ReturnToSupplier";
// import Purchase from "./PurchaseReport";

const PurchaseReport = () => {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const navigate = useNavigate();

  const handleReportClick = (path) => {
    setIsReportOpen(true);
    navigate(path);
  };

  return (
    <div className="Purchase-report-container">
      {!isReportOpen && (
        <div className="Purchase-report-boxes">
          <div
            className="Purchase-report-box"
            onClick={() => handleReportClick("purchase-order")}
          >
            <i className="Purchase-report-icon fas fa-chart-line"></i>
            <div className="Purchase-report-content">
              <h3>Purchase Order</h3>
              <p>Report</p>
            </div>
          </div>
          <div
            className="Purchase-report-box"
            onClick={() => handleReportClick("cancelled-po")}
          >
            <i className="Purchase-report-icon fas fa-folder"></i>
            <div className="Purchase-report-content">
              <h3>Cancelled PO and GR</h3>
              <p>Report</p>
            </div>
          </div>
          <div
            className="Purchase-report-box"
            onClick={() => handleReportClick("purchase-items")}
          >
            <i className="Purchase-report-icon fas fa-shopping-cart"></i>
            <div className="Purchase-report-content">
              <h3>Purchase Items</h3>
              <p>Report</p>
            </div>
          </div>
          <div
            className="Purchase-report-box"
            onClick={() => handleReportClick("purchase-summary")}
          >
            <i className="Purchase-report-icon fas fa-file-alt"></i>
            <div className="Purchase-report-content">
              <h3>Purchase Summary</h3>
              <p>Report</p>
            </div>
          </div>
          <div
            className="Purchase-report-box"
            onClick={() => handleReportClick("return-to-supplier")}
          >
            <i className="Purchase-report-icon fas fa-undo-alt"></i>
            <div className="Purchase-report-content">
              <h3>Return To Supplier</h3>
              <p>Report</p>
            </div>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/purchase-order" element={<PurchaseOrderReport />} />
        <Route path="/cancelled-po" element={<></>} />
        <Route path="/purchase-items" element={<PurchaseReport />} />
        <Route path="/purchase-summary" element={<PurchaseSummaryReport />} />
        <Route
          path="/return-to-supplier"
          element={<ReturnToSupplierReport />}
        />
      </Routes>
    </div>
  );
};

export default PurchaseReport;
