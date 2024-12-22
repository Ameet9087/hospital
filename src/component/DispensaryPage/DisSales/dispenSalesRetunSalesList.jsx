import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';  // Import axios
import { useReactToPrint } from 'react-to-print';
import SalesInvoice from './SalesInvoice'; // Import SalesInvoice component
import "../DisSales/dispenSalesRetunSalesList.css";
import { API_BASE_URL } from '../../api/api';

function DispenSalesRetunSalesList() {
  const [returnLists, setReturnLists] = useState([]); // State to store return list data
  const [showCreateRequisition, setShowCreateRequisition] = useState(false);
  const [selectedInvoiceData, setSelectedInvoiceData] = useState(null); // Store selected invoice data
  const [showInvoice, setShowInvoice] = useState(false); // Flag to show invoice
  const printRef = useRef();

  useEffect(() => {
    // Fetch data from the backend API using axios
    axios.get(`${API_BASE_URL}/hospital/return-lists/fetch-all-returnList`)
      .then(response => {
        setReturnLists(response.data); // Set return lists data
      })
      .catch(error => console.error('Error fetching return list data:', error));
  }, []);

  const handleCreateRequisitionClick = () => {
    setShowCreateRequisition(true);
  };

  const closePopups = () => {
    setShowCreateRequisition(false);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Requisition_Report',
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
    `,
  });

  // Fetch invoice data based on returnListId using axios
  const handleViewInvoiceClick = (id) => {
    console.log(id)
    // Fetch the invoice data for the selected returnListId
    axios.get(`${API_BASE_URL}/hospital/return-lists/fetch-specific-data/${id}`)
      .then(response => {
        setSelectedInvoiceData(response.data); // Set selected invoice data
        setShowInvoice(true);  // Show the SalesInvoice component
        console.log("-------->", selectedInvoiceData); // Log for debugging
      })
      .catch(error => console.error('Error fetching invoice data:', error));
  };

  return (
    <div className="dispenSalesRetunSalesList-active-imaging-request">
      {/* Header and Controls */}
      <header className='dispenSalesRetunSalesList-header'>
        {/* Your header and controls code */}
      </header>
      <div className="dispenSalesRetunSalesList-controls">
        <div className="dispenSalesRetunSalesList-date-range">
          <label>
            From:
            <input type="date" defaultValue="2024-08-09" />
          </label>
          <label>
            To:
            <input type="date" defaultValue="2024-08-16" />
          </label>
        </div>
      </div>

      {/* Search and Results Info */}
      <div className="dispenSalesRetunSalesList-search-N-results">
        <div className="dispenSalesRetunSalesList-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
        <div className="dispenSalesRetunSalesList-results-info">
          Showing {returnLists.length} / {returnLists.length} results
          <button className="dispenSalesRetunSalesList-print-button" onClick={""}>
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="dispenSalesRetunSalesList-print-button" onClick={handlePrint}>
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      {/* Table and Pagination */}
      <div className="dispenSalesRetunSalesList-table-N-paginat">
        <table>
          <thead>
            <tr>
              <th>Hospital Number</th>
              <th>Ref.Invoice No</th>
              <th>Patient Name</th>
              <th>Sub Total</th>
              <th>Dis Amt </th>
              <th>Total Amt</th>
              <th>Return Date</th>
              <th>Credit Note No.</th>
              <th>Patient Type</th>
              <th>View Invoice</th>
            </tr>
          </thead>
          <tbody>
            {returnLists.map((item) => (
              <tr key={item.returnListId}>
                <td>{item.returnListId}</td>
                <td>{item.refInvoiceNumber}</td>
                <td>{item.patientName}</td>
                <td>{item.subTotal}</td>
                <td>{item.discountAmount}</td>
                <td>{item.totalAmount}</td>
                <td>{item.returnDate}</td>
                <td>{item.creditNoteNumber}</td>
                <td>{item.patientType}</td>
                <td>
                  <button onClick={() => handleViewInvoiceClick(item.returnListId)}>View Invoice</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice Modal */}
      <SalesInvoice
        showInvoice={showInvoice}
        handleClose={() => setShowInvoice(false)}
        invoiceData={selectedInvoiceData}
        handlePrint={handlePrint}
        invoiceType="Return Invoice"
      />
    </div>
  );
}

export default DispenSalesRetunSalesList;
