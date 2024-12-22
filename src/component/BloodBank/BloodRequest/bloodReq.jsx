import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx'; // Import the xlsx library
import "../BloodRequest/bloodReq.css";
import { useReactToPrint } from 'react-to-print';
import CustomModal from '../../CustomModel/CustomModal';
import BloodBankRequestForm from './BloodBankRequestForm';
import { API_BASE_URL } from '../../api/api';
import BloodBankIssueForm from './BloodBankIssueForm';

function BloodReq() {
  const printRef = useRef();
  const [showCreateRequest, setShowCreateRequest] = useState(false);
  const [showIssueRequest, setShowIssueRequest] = useState(false);
  const [stockData, setStockData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // Filtered data for the table
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [dateRange, setDateRange] = useState({
    from: "2024-08-09",
    to: "2024-08-16",
  }); // Date range state

  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStockData();
  }, []);

  // Fetch Data from API
  const fetchStockData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/bloodrequest`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Map the response data to match the table structure
      const mappedData = data.map((item) => ({
        requestId: item.requestId,
        firstName: item.patientDTO.firstName,
        requiredUnits: item.requiredUnits,
        requestedDate: item.requestDate,
        requiredDate: item.requiredDate,
        status: item.status,
        contactInformation: item.contactInformation,
        bloodGroup: item.bloodGroup,
      }));

      setStockData(mappedData);
      setFilteredData(mappedData); // Initialize filtered data
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stock data:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  // Filter Data Based on Search and Date Range
  useEffect(() => {
    const filtered = stockData.filter((item) => {
      const matchesSearch =
    (item.firstName && item.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.requestId && item.requestId.toString().includes(searchQuery));

  const withinDateRange =
    new Date(item.requestedDate) >= new Date(dateRange.from) &&
    new Date(item.requestedDate) <= new Date(dateRange.to);

  return matchesSearch && withinDateRange;
    });

    setFilteredData(filtered);
  }, [searchQuery, dateRange, stockData]);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Blood Request :',
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
    `,
  });

  const handleExportToExcel = () => {
    const tableData = [
      ['Req.ID', ' Patient Name', 'Required Units', 'Request Date', 'Required Date', 'Status', 'Hospital Name', 'Contact Information', 'Doctor Name', 'Blood Group'],
      ...filteredData.map(item => [
        item.requestId,
        item.firstName,
        item.requiredUnits,
        item.requestedDate,
        item.requiredDate,
        item.status,
        item.contactInformation,
        item.bloodGroup,
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, 'Requisition_Dispatch_Report.xlsx');
  };

  return (
    <div className="bloodReq-active-imaging-request">
      <header className='bloodReq-header'>
        <div className="bloodReq-status-filters">
          <h4><i className="fa-solid fa-star-of-life"></i>Blood Request :</h4>
        </div>
      </header>
      <div className="bloodReq-controls">
        <div className="bloodReq-date-range">
          <label>
            From:
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, from: e.target.value }))
              }
            />
          </label>
          <label>
            To:
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) =>
                setDateRange((prev) => ({ ...prev, to: e.target.value }))
              }
            />
          </label>
        </div>
        <div className="bloodReq-filter">
          <button className='bloodReq-print-btn'>Show Report</button>
        </div>
      </div>
      <div className="bloodReq-search-N-results">
        <div>
          <button className='bloodReq-print-btn' onClick={() => setShowCreateRequest(true)}> + Send Blood Request</button>
        </div>
        <div className="bloodReq-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="bloodReq-results-info">
          Showing {filteredData.length} results
          <button className='bloodReq-print-btn' onClick={handleExportToExcel}>
            <i className="fa-regular fa-file-excel"></i> Export
          </button>
          <button className='bloodReq-print-btn' onClick={handlePrint}><i className="fa-solid fa-print"></i> Print</button>
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <div ref={printRef}>
          <h2>Blood Request :</h2>
          <p>Printed On: {new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Req.ID</th>
                <th> Patient Name</th>
                <th>Required Units</th>
                <th>Request Date</th>
                <th>Required Date</th>
                <th>Status</th>
                <th>Contact Information</th>
                <th>Blood Group</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{item.requestId}</td>
                  <td>{item.firstName}</td>
                  <td>{item.requiredUnits}</td>
                  <td>{item.requestedDate}</td>
                  <td>{item.requiredDate}</td>
                  <td>{item.status}</td>
                  <td>{item.contactInformation}</td>
                  <td>{item.bloodGroup}</td>
                  <td>
                    <button
                      className="bloodbankrequest-submit-btn"
                      onClick={() => {
                        setSelectedRequestId(item.requestId);
                        setShowIssueRequest(true);
                      }}
                    >
                      Issue
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showCreateRequest && (
        <CustomModal
          onClose={() => setShowCreateRequest(false)}
          isOpen={showCreateRequest}
        >
          <BloodBankRequestForm />
        </CustomModal>
      )}

      {showIssueRequest && (
        <CustomModal
          onClose={() => setShowIssueRequest(false)}
          isOpen={showIssueRequest}
        >
          <BloodBankIssueForm requestId={selectedRequestId} />
        </CustomModal>
      )}
      <div className="bloodReq-table-N-paginat">
        <table>
          <thead>
            <tr>
              <th>Req.ID</th>
              <th> Patient Name</th>
              <th>Required Units</th>
              <th>Request Date</th>
              <th>Required Date</th>
              <th>Status</th>
              <th>Contact Information</th>
              <th>Blood Group</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.requestId}</td>
                <td>{item.firstName}</td>
                <td>{item.requiredUnits}</td>
                <td>{item.requestedDate}</td>
                <td>{item.requiredDate}</td>
                <td>{item.status}</td>
                <td>{item.contactInformation}</td>
                <td>{item.bloodGroup}</td>
                <td>
                  <button
                    className="bloodbankrequest-submit-btn"
                    onClick={() => {
                      setSelectedRequestId(item.requestId);
                      setShowIssueRequest(true);
                    }}
                  >
                    Issue
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BloodReq;
