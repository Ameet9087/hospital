import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './UserCollectionReport.css';
import { API_BASE_URL } from '../api/api';

const CreditSettlementReport = () => {
  const [showReport, setShowReport] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [searchText, setSearchText] = useState('');
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(new Array(12).fill("auto"));
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null); // Store selected patient data

  const openCreditPopup = (patient) => {
    setSelectedPatient(patient);
    setIsOpen(true);
  };

  const closeCreditPopup = () => {
    setIsOpen(false);
    setSelectedPatient(null);
  };

  useEffect(() => {
    if (showReport) {
      fetchReportData();
    }
  }, [showReport]);

  const fetchReportData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/ipbillings/credit-settlement`);
      setReportData(response.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowReport = () => {
    setShowReport(true);
  };

  const filteredData = reportData.filter(item => {
    const itemDate = new Date(item.billingDate);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    const matchesDate = (!from || itemDate >= from) && (!to || itemDate <= to);
    const matchesSearch = searchText === '' || Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchText.toLowerCase())
    );
    return matchesDate && matchesSearch;
  });

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Credit Settlement Report</h3>
        <div className="user-collection-report-filters">
          <div className="user-collection-report-date-filter">
            <label>From:</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            <label>To:</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>
          <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>
        </div>
        <input
          type="text"
          placeholder="Search by Name, Mobile, etc."
          className="user-collection-report-search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {showReport && !loading && (
        <table ref={tableRef} className="patientList-table">
          <thead>
            <tr>
              {["Patient Name", "Age / Sex", "Contact No", "Collection From Receivable", "Return Cash Discount", "Actions"
              ].map((header, index) => (
                <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                  <div className="header-content">
                    <span>{header}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.firstName} {item.lastName}</td>
                  <td>{item.age} / {item.sex}</td>
                  <td>{item.mobileNumber}</td>
                  <td>{item.paidAmount}</td>
                  <td>{item.creditAmount}</td>
                  <td>
                    <button className="user-collection-report-show-btn" onClick={() => openCreditPopup(item)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {isOpen && selectedPatient && (
        <div className="credit-popup-overlay">
          <div className="credit-popup-container">
            <button className="close-btn" onClick={closeCreditPopup}>❌</button>
            <h2 className="popup-title">Credit Settlement Details</h2>

            {/* Log selectedPatient */}
            {console.log(selectedPatient)}

            <div className="patient-info">
              <p><strong>Patient Name:</strong> {selectedPatient.firstName} {selectedPatient.lastName}</p>
              <p><strong>Hospital No:</strong> {selectedPatient.hospitalNo || 111}</p>
              <p><strong>Age/Sex:</strong> {selectedPatient.age} / {selectedPatient.sex}</p>
            </div>
            <h2 className="popup-title">Collections From Receivable</h2>

            <table className="credit-table">
              <thead>
                <tr>

                  <th>Settlement Receipt No</th>
                  <th>Settlement Date</th>
                  <th>Sales Amount</th>
                  <th>Sales Return Amount</th>
                  <th>Receivable</th>
                </tr>
              </thead>
              <tbody>
                {/* Since selectedPatient is not an array, no need for map */}
                <tr>

                  <td>{selectedPatient.billingId}</td>
                  <td>{selectedPatient.billingDate}</td>
                  <td>{selectedPatient.totalAmount}</td>
                  <td>{selectedPatient.refundAmount}</td>
                  <td>{selectedPatient.totalAmount - selectedPatient.refundAmount}</td>
                </tr>
              </tbody>
            </table>

            <div className="summary-box">
              <p><strong>Collection From Receivable:</strong> {selectedPatient.totalAmount - selectedPatient.refundAmount}</p>
              {/* <p><strong>Cash Discount Given:</strong> {selectedPatient.cashDiscount || 0}</p> */}
              {/* <p><strong>Net Receivable:</strong> {selectedPatient.creditAmount || 0}</p> */}
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default CreditSettlementReport;
