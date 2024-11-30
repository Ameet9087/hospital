import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import SupplierWiseStock from './SupplierWiseStock'; // Import SupplierWiseStock component
import SupplierInformationReport from './SupplierInformationReport'; // Import SupplierInformationReport component
import './Supplier.css'; // Import the CSS

const Supplier = () => {
  return (
    <div className="supplier-reports-boxes">
      <div className="supplier-report-box">
        <Link to="supplier-wise-stock" className="supplier-report-link">
          <i className="supplier-report-icon fas fa-chart-line"></i>
          <div className="supplier-report-content">
            <h3 className="supplier-report-title">Supplier Wise Stock</h3>
            <p className="supplier-report-subtitle">Report</p>
          </div>
        </Link>
      </div>

      <div className="supplier-report-box">
        <Link to="supplier-information-report" className="supplier-report-link">
          <i className="supplier-report-icon fas fa-folder"></i>
          <div className="supplier-report-content">
            <h3 className="supplier-report-title">Supplier Information Report</h3>
            <p className="supplier-report-subtitle">Report</p>
          </div>
        </Link>
      </div>

      {/* Define routes for rendering respective components */}
      <Routes>
        <Route path="/supplier-wise-stock" element={<SupplierWiseStock />} />
        <Route path="/supplier-information-report" element={<SupplierInformationReport />} />
      </Routes>
    </div>
  );
};

export default Supplier;
