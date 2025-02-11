import React, { useState, useEffect, useRef } from 'react';
import './PaymentComponent.css';
import { API_BASE_URL } from "../api/api";
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
function PaymentComponent({ patient }) {
  const [paymentReturn, setPaymentReturn] = useState(false);
  const [paidAmount, setPaidAmount] = useState("");
  const [inWords, setInWords] = useState("");
  const [remarks, setRemarks] = useState("");
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [columnWidths,setColumnWidths] = useState({});
  const tableRef=useRef(null);

  useEffect(() => {
    // Fetch payment history data from the API
    const fetchPaymentHistory = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/payments/fetch-all-data`);
        if (response.ok) {
          const data = await response.json();
          setPaymentHistory(data);
        } else {
          console.error("Failed to fetch payment history");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPaymentHistory();
  }, []);

  if (!patient) return null; // Ensure there's a patient object before rendering

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEntry = {
      type: paymentReturn ? 'MaternityAllowanceReturn' : 'MaternityAllowance',
      date: new Date().toISOString().split('T')[0], // Current date in YYYY-MM-DD format
      amount: paidAmount,
      user: 'Mr. admin admin', // This should be dynamic based on the logged-in user
      remarks
    };

    // Prepare the payload to send to the API
    const payload = {
      patientName: "Philip Juma",
      ageSex: "34Y / Male",
      hospitalNo: "2406003702",
      dischargeDate: "2024-08-12",
      paymentReturn,
      paidAmount,
      inWords,
      remarks
    };

    try {
      // Make an API call to add the payment
      const response = await fetch(`${API_BASE_URL}/payments/addPayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      // Check if the response is okay
      if (response.ok) {
        const result = await response.json();
        setPaymentHistory([newEntry, ...paymentHistory]);

        // Clear the form fields
        setPaidAmount("");
        setInWords("");
        setRemarks("");
      } else {
        console.error("Failed to add payment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="maternity-patient-list">
      <h2 className="maternity-title">Patient List</h2>
      <div>
        <div className="patient-mat">
          <h3 className="maternity-titles">Maternity Allowance Payment</h3>
        </div>
        <div className="mternity-patient-info">
          <span><strong>Patient: Philip Juma</strong></span>
          <span><strong>Age/Sex: 34Y / Male</strong></span>
          <span><strong>Hospital No: 2406003702</strong></span>
          <span><strong>Discharge On: 2024-08-12</strong></span>
        </div>
      </div>
      <div className="maternity-payment-form">
        <form onSubmit={handleSubmit}>
          <div className="maternity-payment-details">
            <label className="maternity-form-label">
              Payment Return?:
              <input 
                type="checkbox" 
                checked={paymentReturn}
                onChange={(e) => setPaymentReturn(e.target.checked)}
                className="maternity-form-input"
              />
            </label>
            <div className="maternity-form-row">
              <label className="maternity-form-label">
                {paymentReturn ? 'Return Amount:' : 'Paid Amount:'}
                <select 
                  className="maternity-form-select"
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                >
                  <option value="">--Select Amount--</option>
                  <option value="1000">1000</option>
                  <option value="2000">2000</option>
                  {/* Add other options here */}
                </select>
              </label>
            </div>
            <div className="maternity-form-row">
              <label className="maternity-form-label">
                In Words:
                <input 
                  type="text" 
                  value={inWords}
                  onChange={(e) => setInWords(e.target.value)}
                  placeholder="In Words" 
                />
              </label>
            </div>
            <div className="maternity-form-row">
              <label className="maternity-form-label">
                Remarks:
                <textarea 
                  className="maternity-form-textarea" 
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Remarks"
                ></textarea>
              </label>
            </div>
            <div className="maternity-form-actions">
              <button type="submit" className="maternity-button-proceed">Proceed</button>
              <button type="button" className="maternity-button-discard">Discard</button>
            </div>
          </div>
        </form>
      </div>
      <div className="maternity-payment-history">
        <h3 className="maternity-titles">Payment History</h3>
        <div className="mat-search-bar">
          <input type="text" placeholder="Search" className="maternity-form-input"/>
          <span className="pay-span">Showing {paymentHistory.length} / {paymentHistory.length} results</span>
        </div>
        <table  ref={tableRef}>
          <thead>
            <tr>
              {[
                "Type",
                "Date",
                "Amount",
                "User",
                "Remarks"
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(
                        tableRef,
                        setColumnWidths
                      )(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((entry, index) => (
              <tr key={index}>
                <td className="maternity-table-cell">{entry.type}</td>
                <td className="maternity-table-cell">{entry.date}</td>
                <td className="maternity-table-cell">{entry.amount}</td>
                <td className="maternity-table-cell">{entry.user}</td>
                <td className="maternity-table-cell">{entry.remarks}</td>
              </tr>
            ))}
          </tbody>
          {/* <div className="mat-pagination">
            <div className="mat-pagination-buttons">
              <button className="pagination-button">First</button>
              <button className="pagination-button">Previous</button>
              <span className="pagination-page-info">Page 1 of 1</span>
              <button className="pagination-button">Next</button>
              <button className="pagination-button">Last</button>
            </div>
          </div> */}
        </table>
      </div>
    </div>
  );
}

export default PaymentComponent;
