import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import './PurchaseRequest.css';

const Table = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [data, setData] = useState([]); 
  const navigate = useNavigate(); 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const printTable = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print</title>');
    printWindow.document.write('<style>'); 
    printWindow.document.write(`
      body { font-family: Arial, sans-serif; }
      .tabb-table { width: 100%; border-collapse: collapse; }
      .tabb-th, .tabb-td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      .tabb-th { background-color: #f2f2f2; }
      .tabb-po-created { color: red; text-align: center; }
    `);
    printWindow.document.write('</style></head><body>');
    printWindow.document.write(document.querySelector('.tabb-table').outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/purchase-requests/fetchAllPurchase');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="tabb-table-container">
      <div className="tabb-date-range">
        <span>From: <input type="date" defaultValue="2024-08-18" /></span>
        <span>To: <input type="date" defaultValue="2024-08-25" /></span>
        <button className="tabb-star-button">☆</button>
        <button className="tabb-minus-button" onClick={toggleDropdown}>-</button>
        <button className="tabb-ok-button">OK</button>
      </div>
      {isDropdownOpen && (
        <div className="tabb-dropdown">
          <ul>
            <li>Last One Week</li>
            <li>Last One Month</li>
            <li>Last Three Months</li>
          </ul>
        </div>
      )}
      <div className="tabb-search-bar">
        <input type="text" placeholder="Search" />
        <span className="tabb-search-icon">🔍</span>
      </div>
      <div className="tabb-results-info">
        <span>Showing {data.length} results</span>
        <button className="tabb-print-button" onClick={printTable}>Print</button>
      </div>
      <table className="tabb-table">
        <thead>
          <tr>
            <th>P.No.</th>
            <th>Request Date</th>
            <th>Vendor</th>
            <th>Status</th>
            <th>Verification Status</th>
            <th>RequestedBy</th>
            <th>PO Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.p}>
              <td>{row.id}</td>
              <td>{row.requestDate}</td>
              <td>{row.vendor}</td>
              <td>{row.status}</td>
              <td>pending</td>
              <td>{row.requestedBy}</td>
              <td className="tabb-po-created">No</td>
              <td>
                <button className="tabb-view-button" onClick={() => navigate('/purchase-request-view')}>View</button>
                <button className="tabb-add-po-button">Add Purchase Order</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="tabb-pagination">
        <span>1 to {data.length} of {data.length}</span>
        <button>First</button>
        <button>Previous</button>
        <span>Page 1 of 1</span>
        <button>Next</button>
        <button>Last</button>
      </div> */}
    </div>
  );
};

export default Table;
