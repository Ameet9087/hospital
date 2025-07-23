// Prachi Parab vendorSupplymgmt 27-7-2024 backend+frontend merging 

import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import './ReportGenerationForm.css';

const ReportGenerationFormCom = () => {
  const [formData, setFormData] = useState({
    reportType: '',
    vendorId: '',
    startDate: '',
    endDate: '',
    statusFilter: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.reportType) {
      // Call the function to generate PDF
      generatePDF(formData);
    } else {
      alert('Please select a report type.');
    }
  };

  const generatePDF = (data) => {
    const doc = new jsPDF();

    // Adding content to the PDF
    doc.text('Report Generation', 10, 10);
    doc.text(`Report Type: ${data.reportType}`, 10, 20);
    if (data.vendorId) {
      doc.text(`Vendor ID: ${data.vendorId}`, 10, 30);
    }
    if (data.startDate) {
      doc.text(`Start Date: ${data.startDate}`, 10, 40);
    }
    if (data.endDate) {
      doc.text(`End Date: ${data.endDate}`, 10, 50);
    }
    if (data.statusFilter) {
      doc.text(`Status Filter: ${data.statusFilter}`, 10, 60);
    }

    // Save the PDF
    doc.save('report.pdf');
  };

  return (
    <div className="report-generation-form-com">
      <h2 className="report-generation-form-header">Report Generation Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Report Type */}
        <div className='report-generation-form-first-half'>
          <div className="report-generation-form-group">
            <label htmlFor="reportType">Report Type:</label>
            <select
              id="reportType"
              name="reportType"
              value={formData.reportType}
              onChange={handleInputChange}
              className="report-generation-form-input"
              required
            >
              <option value="">Select Report Type</option>
              <option value="purchaseOrders">Purchase Orders</option>
              <option value="deliveries">Deliveries</option>
              <option value="invoices">Invoices</option>
            </select>
          </div>

          {/* Vendor ID (Optional) */}
          <div className="report-generation-form-group">
            <label htmlFor="vendorId">Vendor ID (Optional):</label>
            <input
              type="text"
              id="vendorId"
              name="vendorId"
              value={formData.vendorId}
              onChange={handleInputChange}
              className="report-generation-form-input"
            />
          </div>
        </div>

        {/* Date Range */}
        <div className='report-generation-form-second-half'>
          <div className="report-generation-form-group">
            <label htmlFor="startDate">Start Date (Optional):</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="report-generation-form-input"
            />
          </div>

          <div className="report-generation-form-group">
            <label htmlFor="endDate">End Date (Optional):</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="report-generation-form-input"
            />
          </div>

          <div className="report-generation-form-group">
            <label htmlFor="statusFilter">Status Filter (Optional):</label>
            <select
              id="statusFilter"
              name="statusFilter"
              value={formData.statusFilter}
              onChange={handleInputChange}
              className="report-generation-form-input"
            >
              <option value="">Select Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="inProgress">In Progress</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className='report-generation-form-third-half'>
          <div className="report-generation-form-button">
            <button type="submit" className="report-generation-form-submit-btn">
              Generate Report
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReportGenerationFormCom;
