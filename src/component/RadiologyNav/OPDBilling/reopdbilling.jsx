import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import "./reopdbilling.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import Modal from "react-bootstrap/Modal";

function RDopdbilling() {
  const [billingData, setBillingData] = useState([
    {
      patientId: "201",
      patientName: "Alice Johnson",
      ageSex: "45/F",
      doctorName: "Dr. Roberts",
      radiologyProcedure: "MRI Scan",
      serviceDate: "2024-09-10",
      totalAmount: 400,
      paymentStatus: "Paid",
      paymentMode: "Insurance",
      billingDate: "2024-09-10",
    },
    {
      patientId: "202",
      patientName: "Michael Brown",
      ageSex: "37/M",
      doctorName: "Dr. Evans",
      radiologyProcedure: "X-ray",
      serviceDate: "2024-09-11",
      totalAmount: 70, // Converted to number
      paymentStatus: "Pending",
      paymentMode: "Cash",
      billingDate: "2024-09-11",
    },
  ]);

  const [filteredData, setFilteredData] = useState(billingData);
  const [searchTerm, setSearchTerm] = useState("");
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [selectedPaymentMode, setSelectedPaymentMode] = useState("Cash");
  const [discount, setDiscount] = useState(0);
  const [totalBillAfterDiscount, setTotalBillAfterDiscount] = useState(0);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = billingData.filter(
      (item) =>
        item.patientName.toLowerCase().includes(term) ||
        item.radiologyProcedure.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  const printTable = () => {
    const printContents = document.getElementById("table-to-print").outerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = `<html><head><title>Print</title></head><body>${printContents}</body></html>`;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
  };

  const handlePayment = (patient) => {
    setCurrentPatient(patient);
    setSelectedPaymentMode(patient.paymentMode);
    setDiscount(0); // Reset discount when opening modal
    setTotalBillAfterDiscount(patient.totalAmount); // Set initial total
    setShowModal(true);
  };

  const handleDiscountChange = (e) => {
    const discountValue = parseFloat(e.target.value);
    setDiscount(discountValue);
    const reducedTotal = currentPatient.totalAmount - discountValue;
    setTotalBillAfterDiscount(reducedTotal >= 0 ? reducedTotal : 0);
  };
  const confirmPayment = () => {
    const updatedData = billingData.map((item) => {
      if (item.patientId === currentPatient.patientId) {
        return {
          ...item,
          paymentStatus: "Paid", // Set the payment status to "Paid"
          paymentMode: selectedPaymentMode, // Update with the selected payment mode
          totalAmount: totalBillAfterDiscount, // Update the total after discount
        };
      }
      return item;
    });

    // Update billing data with the new state
    setBillingData(updatedData);
    setFilteredData(updatedData); // Also update the filtered data if search is active
    setShowModal(false); // Close the modal after payment is done
  };


  const exportToExcel = () => {
    const table = document.getElementById("table-to-print");
    const ws = XLSX.utils.table_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Radiology Billing");
    XLSX.writeFile(wb, "Radiology_Billing_Report.xlsx");
  };

  return (
    <div className="rd-billing-container">
            <div className="rd-billing-controls">
        <div className="rd-billing-date-range">
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
      <header className="rd-billing-header">
        <div className="rd-billing-controls">
          <div className="rd-billing-search">
            <input
              type="text"
              placeholder="Search by Patient Name or Procedure"
              value={searchTerm}
              onChange={handleSearch}
              className="rd-search-input"
            />
          </div>
          <div className="rd-billing-buttons">
            <button onClick={exportToExcel} className="rd-btn export-btn">
              <i className="fa fa-file-excel"></i> Export
            </button>
            <button onClick={printTable} className="rd-btn print-btn">
              <i className="fa fa-print"></i> Print All
            </button>
          </div>
        </div>
      </header>

      <div className="rd-table-wrapper" id="table-to-print">
        <table ref={tableRef} className="billing-table">
          <thead className="rd-billing-table-header">
            <tr>
              {[
                "Patient ID",
                "Patient Name",
                "Age/Sex",
                "Doctor Name",
                "Radiology Service/Procedure",
                "Service Date",
                "Total Amount",
                "Payment Status",
                "Billing Date",
                "Actions",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="rd-resizable-th"
                >
                  <div className="rd-header-content">
                    <span>{header}</span>
                    <div
                      className="rd-resizer"
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="rd-billing-table-body">
            {filteredData.map((item, index) => (
              <tr key={index} className="rd-billing-row">
                <td className="rd-billing-cell">{item.patientId}</td>
                <td className="rd-billing-cell">{item.patientName}</td>
                <td className="rd-billing-cell">{item.ageSex}</td>
                <td className="rd-billing-cell">{item.doctorName}</td>
                <td className="rd-billing-cell">{item.radiologyProcedure}</td>
                <td className="rd-billing-cell">{item.serviceDate}</td>
                <td className="rd-billing-cell">{item.totalAmount}</td>
                <td className="rd-billing-cell">{item.paymentStatus}</td>
                <td className="rd-billing-cell">{item.billingDate}</td>
                <td className="rd-billing-cell">
                  {item.paymentStatus === "Paid" ? (
                    <button onClick={printTable} className="rd-btn print-btn">
                      Print
                    </button>
                  ) : (
                    <button
                      onClick={() => handlePayment(item)}
                      className="rd-btn print-btn"
                    >
                      Make Payment
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Payment */}
      {currentPatient && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>

          <Modal.Header closeButton>
            <Modal.Title>
              Make Payment for {currentPatient.patientName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="rd-billing-modal-body">
             <div className="rd-ptninfo">
             <p><b>Patient Name:</b>{currentPatient.patientName}</p>
              <p><b>Doctor Name:</b>{currentPatient.doctorName}</p>
              <p><b>Department:</b>{currentPatient.radiologyProcedure}</p>
              <p><b>Total Bill:</b> {currentPatient.totalAmount}</p>
             </div>
              <div className="rd-billing-modal-select">
                <label htmlFor="paymentMode">Select Payment Mode:</label>
                <select
                  id="paymentMode"
                  value={selectedPaymentMode}
                  onChange={(e) => setSelectedPaymentMode(e.target.value)}
                  className="rd-billing-modal-dropdown"
                >
                  <option value="Cash">Cash</option>
                  <option value="Credit">Credit</option>
                  <option value="Online">Online</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="rd-billing-modal-select">
                <label htmlFor="discount">Enter Discount (if any):</label>
                <input
                  type="number"
                  id="discount"
                  value={discount}
                  onChange={handleDiscountChange}
                  className="rd-billing-modal-input"
                />
                 <p><b>Total Amount to be Paid:</b> {totalBillAfterDiscount}</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button className="rd-billing-modal-btn" onClick={confirmPayment}>
              Make Payment
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default RDopdbilling;
