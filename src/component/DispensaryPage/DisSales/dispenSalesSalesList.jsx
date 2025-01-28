import React, { useState, useEffect } from 'react';
import SalesInvoice from './SalesInvoice'; // Import SalesInvoice component
import "../DisSales/dispenSalesSalesList.css";
import { API_BASE_URL } from '../../api/api';

function DispenSalesSalesList() {
  const [salesList, setSalesList] = useState([]); // State to store fetched sales data
  const [selectedInvoice, setSelectedInvoice] = useState(null); // State to store selected invoice data
  const [showInvoice, setShowInvoice] = useState(false); // State to show/hide the invoice

  // Fetch sales data from the API
  useEffect(() => {
    fetch(`${API_BASE_URL}/patient-invoices`)
      .then((response) => response.json())
      .then((data) => setSalesList(data))
      .catch((error) => console.error("Error fetching sales data:", error));
  }, []);

  const handleShowInvoice = (invoice) => {
    setSelectedInvoice(invoice); // Set the selected invoice
    setShowInvoice(true); // Show the SalesInvoice component
  };

  const handleCloseInvoice = () => {
    setShowInvoice(false); // Close the SalesInvoice component
    setSelectedInvoice(null); // Clear the selected invoice
  };

  const handlePrintInvoice = () => {
    console.log("Print functionality triggered for:", selectedInvoice);
    // Add your print logic here
  };

  return (
    <div className="dispenSalesSalesList-active-imaging-request">
      <header className="dispenSalesSalesList-header"></header>
      <div className="dispenSalesSalesList-controls">
        <div className="dispenSalesSalesList-date-range">
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
      <div className="dispenSalesSalesList-table-N-paginat">
        <table>
          <thead>
            <tr>
              <th>Invoice No</th>
              <th>Patient Name</th>
              <th>Sub Total</th>
              <th>Dis Amt</th>
              <th>Total Amt</th>
              <th>Date</th>
              <th>Patient Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {salesList.map((sale) => (
              <tr key={sale.invoiceId}>
                <td>{sale.invoiceId}</td>
                <td>{sale.inPatient?.patient?.firstName || sale.outPatient?.patient?.firstName}</td>
                <td>{sale.total_amt}</td>
                <td>{sale.discountAmount || "0.00"}</td>
                <td>{sale.total_amt}</td>
                <td>{sale.transactionDate}</td>
                <td>{sale.inPatient?.patientType}</td>
                <td>
                  <button
                    className="action-button"
                    onClick={() => handleShowInvoice(sale)}
                  >
                    View Invoice
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showInvoice && selectedInvoice && (
        <SalesInvoice
          showInvoice={showInvoice}
          handleClose={handleCloseInvoice}
          invoiceData={selectedInvoice}
          handlePrint={handlePrintInvoice}
        />
      )}
    </div>
  );
}

export default DispenSalesSalesList;
