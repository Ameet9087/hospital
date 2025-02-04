import React, { useEffect } from "react";
import JsBarcode from "jsbarcode";
import "./PurchaseView.css";

const PurchaseView = ({item}) => {
  console.log("aaaa",item);
  
  useEffect(() => {
    // Generate barcode
    JsBarcode("#barcode", "PRF-26", {
      format: "CODE128",
      displayValue: false,
      height: 40,
      width: 1.5,
    });
  }, []);



  const handlePrint = () => {
    const printableContent = document.getElementById("purchaseRequest-container").innerHTML;
    const newWindow = window.open("", "_blank");
    newWindow.document.open();
    newWindow.document.write(
      `<html>
        <head>
          <title>Print Page</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
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
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            /* Injecting styles from your PurchaseView.css */
            .PurchaseRequest-container {
              width: 100%;
              border: 1px solid #ccc;
              background-color: var(--background-color);
              padding: 10px;
            }
  
            .PurchaseRequest-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 1px solid #ccc;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }
  
            .PurchaseRequest-logo h2 {
              color: var(--button-color);
              font-size: 1.5rem;
            }
  
            .PurchaseRequest-hospital-info {
              text-align: center;
            }
  
            .PurchaseRequest-hospital-info h3 {
              margin: 0;
              font-size: 1.2rem;
            }
  
            .PurchaseRequest-barcode {
              text-align: right;
            }
  
            .PurchaseRequest-prf-details {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            }
  
            .PurchaseRequest-prf-details-div strong {
              font-size: 14px;
            }
  
            .PurchaseRequest-footer {
              text-align: center;
            }
  
            .PurchaseRequest-signatures {
              display: flex;
              justify-content: space-around;
              margin-top: 20px;
            }
  
            .PurchaseRequest-footer p {
              margin: 5px 0;
            }
          </style>
        </head>
        <body>
          ${printableContent}
        </body>
      </html>`
    );
    newWindow.document.close();
    newWindow.print();
  };
  

  return (
    <>
    <div id="purchaseRequest-container" className="PurchaseRequest-container">
    <header className="PurchaseRequest-header">
      <div className="PurchaseRequest-logo">
        <h2>HIMS</h2>
      </div>
      <div className="PurchaseRequest-hospital-info">
        <h3>HIMS Hospital</h3>
        <p>PIN CODE: 410510, Tel: 9988775644</p>
        <p>Inventory Unit</p>
      </div>
      <div className="PurchaseRequest-barcode">
        <svg id="barcode"></svg>
      </div>
    </header>

    <section className="PurchaseRequest-prf-details">
      <div className="PurchaseRequest-prf-details-div">
        <strong>PR No.:</strong> {item?.id}
      </div>
      <div className="PurchaseRequest-prf-details-div">
        <strong>PR Date:</strong> {item?.requestDate}
      </div>
    </section>

    <section>
      <div id="printable-table-container" className="PurchaseRequest-purchase-details">
        <table>
          <thead>
            <tr>
              <th>Item Category</th>
              <th>UMO</th>
              <th>Item Code</th>
              <th>Quantity Required</th>
              <th>Quantity Available In Stores</th>
              <th>Quantity Verified On</th>
              <th>Supply Required Before</th>
              <th>Po No.</th>
            </tr>
          </thead>
          <tbody>
            {item?.items?.map((data, index) => (
              <tr key={index}>
                <td>{data?.itemId?.subCategory?.subCategoryName || ""}</td>
                <td>{data?.itemId?.unitOfMeasurement?.name || ""}</td>
                <td>{data?.itemId?.invCompany?.code || ""}</td>
                <td>{data?.requiredQty || ""}</td>
                <td>{data?.itemId?.reOrderQuantity || ""}</td>
                <td>{data?.quantityVerifiedOn || ""}</td>
                <td>{data?.supplyRequiredBefore || ""}</td>
                <td>{item?.id || ""} / {item?.requestDate || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <section className="PurchaseRequest-footer">
      <div>
        <strong>Prepared by Stores-RM/PM In Charge Sign with Date</strong>
      </div>
      <div className="PurchaseRequest-signatures">
        <div>
          <p>Verified By:</p>
          <p>{item?.verifyBy}</p>
          <p>Rem: {item?.verifyOrNot}</p>
        </div>
      </div>
    </section>
  </div>
  <div className="PurchaseRequest-signatures">

   <button onClick={handlePrint} className="PurchaseRequest-signatures-print">Print</button>
  </div>
   </>
);
};


export default PurchaseView;

