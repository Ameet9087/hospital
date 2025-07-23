import React, { useEffect, useRef, useState } from "react";
import "./PurchaseOrderView.css";
import { toWords } from "number-to-words";

const PurchaseOrderView = ({ item }) => {
  const [total,setTotal] = useState();
  const [totalInWords, setTotalInWords] = useState("");
  const printRef = useRef(null);
  useEffect(() => {
    if (item?.items && item.items.length > 0) {
      const calculatedTotal = item.items.reduce((sum, data) => {
        return sum + (data?.totalAmount || 0);
      }, 0);

      setTotal(calculatedTotal);
      setTotalInWords(toWords(calculatedTotal)); // Convert total to words
    }
  }, [item]);
  const handlePrint = () => {
    const printContents = printRef.current.innerHTML; // Get the content to print
    const newWindow = window.open("");
    newWindow.document.write(`
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              padding: 0;
            }
            .purchaseOrderViewContainer {
              margin: 20px auto;
              width: 95%;
              border: 1px solid black;
              padding: 20px;
            }
            .purchaseOrderViewHeader {
              text-align: center;
              font-size: 16px;
              font-weight: bold;
            }
            .purchaseOrderViewTitle {
              text-align: center;
              font-size: 24px;
              font-weight: bold;
              margin: 10px 0;
            }
            .purchaseOrderViewDetails {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
              font-size: 14px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              font-size: 14px;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: center;
            }
            th {
              background-color: #f2f2f2;
            }
            .purchaseOrderViewTotals {
              margin-top: 20px;
              font-size: 16px;
              font-weight: bold;
            }
            .purchaseOrderViewValueInWords {
              font-size: 14px;
              margin-top: 10px;
            }
            .purchaseOrderViewNote {
              margin-top: 20px;
              font-size: 12px;
              text-align: center;
              font-style: italic;
            }
            @media print {
              .purchaseOrderViewTerms {
                display: none;
              }
            }
          </style>
        </head>
        <body>
          ${printContents}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <>
    <div className="purchaseOrderViewContainer" ref={printRef}>
      <div className="purchaseOrderViewHeader">
        <p>Procurement Unit</p>
      </div>

      <h3 className="purchaseOrderViewTitle">PURCHASE ORDER</h3>

      <div className="purchaseOrderViewDetails">
        <div>
          <p>
            PO No. : <span>{item?.id}</span>
          </p>
          <p>
            Vendor's Name : <span>{item?.vendor?.vendorName}</span>
          </p>
          <p>
            Pin Code : <span>{item?.vendor?.kraPin}</span>
          </p>
          <p>
            Address : <span>{item?.vendor?.contactAddress}</span>
          </p>
          <p>
            Contact /Mobile Number : <span>{item?.vendor?.contactNumber}</span>
          </p>
          <p>
            Invoicing Address : <span>{item?.invoicingAddress}</span>
          </p>
          <p>
            Delivery Address : <span>{item?.deliveryAddress}</span>
          </p>
        </div>
        <div>
          <p>
            PO Date : <span>{item?.poDate}</span>
          </p>
          <p>
            Payment Mode : <span>{item?.paymentMode}</span>
          </p>
          <p>
            Currency : <span>{item?.vendor?.currencyCode}</span>
          </p>
          <p>
            Reference No: <span>{item?.referenceNo}</span>
          </p>
          <p>
            Contact Person Name and Office Email :{" "}
            <span>{item?.contactEmail}</span>
          </p>
        </div>
      </div>

      <table className="purchaseOrderViewTable">
        <thead>
          <tr>
            <th>SN</th>
            <th>Code</th>
            <th>Item Name</th>
            <th>MSS No</th>
            <th>HSN Code</th>
            <th>Order Quantity</th>
            <th>UOM</th>
            <th>Standard Rate</th>
            <th>Vat %</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {item.items && item.items.length > 0 ? (
            item.items.map((data, index) => (
              <tr key={index}>
                <td>{index +1}</td>
                <td>{data?.item?.itemCode || "N/A"}</td>
                <td>{data?.item?.itemName || "N/A"}</td>
                <td>{data?.mssNo || "N/A"}</td>
                <td>{data?.hsnCode || "N/A"}</td>
                <td>{data?.quantity || 0}</td>
                <td>{data?.item?.unitOfMeasurement?.name || "N/A"}</td>
                <td>{data?.item?.standardRate || 0}</td>
                <td>{data?.vatPercentage || 0}</td>
                <td>{data?.totalAmount || 0}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">No items available</td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="purchaseOrderViewTotals">
        <p>
          Total Amount (INR): <span>{total}</span>
        </p>
      </div>

      <div className="purchaseOrderViewValueInWords">
        <p>Total Value In Words: {totalInWords}</p>
      </div>

      <div className="purchaseOrderViewNote">
        <p>
          Note: This is a computer-generated Purchase Order. Signature not
          required.
        </p>
      </div>
    </div>
    <div className="purchaseOrderView-btn">
    <button className="purchaseOrderView-print" onClick={handlePrint}>Print</button>
    </div>
  </>
  );
};

export default PurchaseOrderView;
