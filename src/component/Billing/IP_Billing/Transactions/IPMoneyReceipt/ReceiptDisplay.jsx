import React, { useState, useEffect } from "react";
import "./IPMoneyReceipt.css";

const Ipmoneyreceipt = () => {
  const [receiptData, setReceiptData] = useState(null); // To store fetched receipt data
  const [loading, setLoading] = useState(true); // To track loading state

  // Fetch receipt data from the API
  useEffect(() => {
    fetch("http://192.168.0.103:4069/api/IPD-bills/bills")
      .then((response) => response.json())
      .then((data) => {
        setReceiptData(data); // Store the fetched data
        setLoading(false); // Stop loading once data is fetched
        console.log(response.data+"Hello")
      })
      .catch((error) => {
        console.error("Error fetching receipt data:", error);
        setLoading(false); // Stop loading even in case of an error
      });
  }, []);

  // Render a loading state if data is still being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the receipt data in tabular format
  return (
    <div className="ipmoneyreceiptbilll-container">
      <h2 className="ipmoneyreceiptbilll-header">IP Money Receipt</h2>
      
      {receiptData && receiptData.length > 0 ? (
        <table className="receipt-table">
          <thead>
            <tr>
              <th>Receipt No</th>
              <th>Receipt Date</th>
              <th>Created By</th>
              <th>Amount</th>
              <th>Mode of Payment</th>
              <th>Status</th>
              <th>IP Admission ID</th>
              <th>Total Amount</th>
              {/* <th>Net Amount</th> */}
            </tr>
          </thead>
          <tbody>
            {receiptData.map((receipt) => (
              <tr key={receipt.receiptNo}>
                <td>{receipt.receiptNo}</td>
                <td>{receipt.receiptDate}</td>
                <td>{receipt.createdBy}</td>
                <td>{receipt.amount}</td>
                <td>{receipt.modeOfAmount}</td>
                <td>{receipt.status}</td>

                {/* IP Admission and Financial Details */}
                {receipt.ipadmissionDTO ? (
                  <>
                    <td>{receipt.ipadmissionDTO.ipAdmmissionId}</td>
                    <td>{receipt.ipadmissionDTO.financialDetails?.totalAmount}</td>
                    {/* <td>{receipt.ipadmissionDTO.financialDetails?.netAmount}</td> */}
                  </>
                ) : (
                  <td colSpan="3">No IP Admission Data</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No receipt data available.</p>
      )}
    </div>
  );
};

export default Ipmoneyreceipt;
