/* Ajhar Tamboli sSPReportsInternalConsumption.jsx 19-09-24 */


import React, { useState, useEffect, useRef } from 'react';
import * as XLSX from 'xlsx'; // Import the xlsx library
import "../SSPharmacy/sSPReportsInternalConsumption.css";
import { useReactToPrint } from 'react-to-print';
import { API_BASE_URL } from '../../../api/api';

function SSPReportsInternalConsumption() {
  const printRef = useRef();
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const [showViewRequisition, setShowViewRequisition] = useState(false);
  const [internalConsumptionData, setInternalConsumptionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInternalConsumptionData();
  }, []);

  const fetchInternalConsumptionData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/internal-consumption/getAll`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setInternalConsumptionData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching internal consumption data:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Internal Consumption Report',
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
    `,
  });

  const handleExportToExcel = () => {
    const tableData = [
      ['Consumed Date', 'Department Name', 'Item Name', 'Consumed By', 'Quantity'],
      ...internalConsumptionData.map(item => [
        item.consumedDate,
        item.storeName || 'N/A', // Use 'N/A' if storeName is null
        item.itemName,
        item.consumedBy,
        item.quantity,
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, 'Internal_Consumption_Report.xlsx');
  };

  return (
    <div className="sSPReportsInternalConsumption-active-imaging-request">
      <header className='sSPReportsInternalConsumption-header'>
        <div className="sSPReportsInternalConsumption-status-filters">
          <h4><i className="fa-solid fa-star-of-life"></i> Internal Consumption Report</h4>
        </div>
      </header>
      <div className="sSPReportsInternalConsumption-controls">
      <div className="sSPReportsInternalConsumption-date-range">
      <label>
        From:
        <input type="date" defaultValue="2024-08-09" />
      </label>
      <label>
        To:
        <input type="date" defaultValue="2024-08-16" />
      </label>
      <button className="sSPReportsInternalConsumption-star-button">☆</button>
    <button className="sSPReportsInternalConsumption-more-btn">-</button>
      <button className="sSPReportsInternalConsumption-ok-button">OK</button>
    </div>

        <div className="sSPReportsInternalConsumption-filter">
          <button className='sSPReportsInternalConsumption-print-btn'>Show Report</button>
        </div>
      </div>
      <div className="sSPReportsInternalConsumption-search-N-results">
        <div className="sSPReportsInternalConsumption-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
        <div className="sSPReportsInternalConsumption-results-info">
          {loading ? 'Loading...' : `Showing ${internalConsumptionData.length} results`}
          <button className='sSPReportsInternalConsumption-print-btn' onClick={handleExportToExcel}>
            <i className="fa-regular fa-file-excel"></i> Export
          </button>
          <button className='sSPReportsInternalConsumption-print-btn' onClick={handlePrint}><i class="fa-solid fa-print"></i> Print</button>
        </div>
      </div>
      <div style={{ display: 'none' }}>
        <div ref={printRef}>
          <h2>Internal Consumption Report</h2>
          <p>Printed On: {new Date().toLocaleString()}</p>
          <table>
            <thead>
              <tr>
                <th>Consumed Date</th>
                <th>Department Name</th>
                <th>Item Name</th>
                <th>Consumed By</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {internalConsumptionData.map((item, index) => (
                <tr key={index}>
                  <td>{item.consumedDate}</td>
                  <td>{item.storeName || 'N/A'}</td>
                  <td>{item.itemName}</td>
                  <td>{item.consumedBy}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="sSPReportsInternalConsumption-table-N-paginat">
        <table>
          <thead>
            <tr>
              <th>Consumed Date</th>
              <th>Department Name</th>
              <th>Item Name</th>
              <th>Consumed By</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {internalConsumptionData.map((item, index) => (
              <tr key={index}>
                <td>{item.consumedDate}</td>
                <td>{item.storeName || 'N/A'}</td>
                <td>{item.itemName}</td>
                <td>{item.consumedBy}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="sSPReportsInternalConsumption-pagination">
          <span>0 to {internalConsumptionData.length} of {internalConsumptionData.length}</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 1 of 1</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      </div>
    </div>
  );
}

export default SSPReportsInternalConsumption;
