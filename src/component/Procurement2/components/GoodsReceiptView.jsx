import React, { useRef } from 'react';
import './GoodsReceiptView.css'; // Import your custom CSS file
import QRCode from 'react-qr-code';

function GoodsReceiptView({selectedItem}) {
     const printRef = useRef(null);
    console.log(selectedItem);
    const handlePrint = () => {
        const printContents = printRef.current.innerHTML; // Get the content to print
        const newWindow = window.open("", "_blank");
        newWindow.document.write(`
          <html>
            <head>
              <title>Goods Receipt</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 20px;
                  padding: 0;
                }
                .goods-receipt-view {
                  width: 100%;
                  font-family: Arial, sans-serif;
                  background-color: #e3f7fc;
                  padding: 10px;
                }
                .receipt-view-header,
                .receipt-view-footer {
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                }
                .receipt-view-header .logo h2 {
                  font-size: 24px;
                }
                .receipt-view-header .hospital-info {
                  text-align: center;
                }
                .qr-code {
                  text-align: right;
                }
                .receipt-view-details {
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  margin-top: 20px;
                }
                .left-section,
                .right-section {
                  display: flex;
                  justify-content: space-between;
                  flex-wrap: wrap;
                }
                .goods-view-details {
                  margin-top: 20px;
                }
                .goods-table {
                  width: 100%;
                  border-collapse: collapse;
                }
                .goods-table th,
                .goods-table td {
                  border: 1px solid #ccc;
                  text-align: center;
                  padding: 8px;
                }
                .summary-view-details {
                  display: flex;
                  justify-content: space-around;
                }
                .summary-view-section {
                  margin-top: 20px;
                  text-align: right;
                }
                .receipt-view-footer {
                  margin-top: 20px;
                  text-align: center;
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
    <div ref={printRef} className="goods-receipt-view">
      <header className="receipt-view-header">
        <div className="logo">
          <h2>HIMS</h2>
        </div>
        <div className="hospital-info">
          <p>Inventory Unit</p>
        </div>
        <div className="qr-code">
          <QRCode value="https://example.com" size={100} />
        </div>
      </header>

      <section className="receipt-view-details">
        <div className="left-section">
          <p><strong>Goods Receipt No:</strong>{selectedItem?.id}</p>
          <p><strong>Vendor Name:</strong>{selectedItem?.vendor?.vendorName}</p>
          </div>
          <div className="left-section">
          <p><strong>Pin Code:</strong> {selectedItem?.vendor?.kraPin}</p>
          <p><strong>Vendor Contact:</strong>{selectedItem?.vendor?.contactNumber}</p>
          <p><strong>Vendor Address:</strong> {selectedItem?.vendor?.contactAddress}</p>
        </div>
        <div className="right-section">
          <p><strong>Vendor Bill Date:</strong> {selectedItem.vendorBillDate}</p>
          <p><strong>Goods Arrival Date:</strong> {selectedItem.goodsReceiptDate}</p>
          </div>
          <div className="right-section">
          <p><strong>Bill No:</strong>{selectedItem?.billNo}</p>
          <p><strong>Credit Period:</strong> {selectedItem?.creditPeriod} Days</p>
        </div>
      </section>

      <section className="goods-view-details">
        <h3>Goods Receipt Details</h3>
        <table className="goods-table">
          <thead>
            <tr>
              <th>S.N</th>
              <th>Code</th>
              <th>Name</th>
              <th>Category</th>
              <th>Unit</th>
              <th>Received Qty.</th>
              <th>Free Qty.</th>
              <th>Rate</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {selectedItem?.items?.map((data,index)=>(
                <tr key={index} >
                <td>{index+1}</td>
                <td>{data?.item?.itemCode}</td>
                <td>{data?.item?.itemName}</td>
                <td>{data?.item?.subCategory?.subCategoryName}</td>
                <td>{data?.item?.unitOfMeasurement?.name}</td>
                <td>{data?.quantity}</td>
                <td>{data?.freeQuantity}</td>
                <td>{data?.rate}</td>
                <td>{data?.totalAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="summary-view-section">
        <div className="summary-view-details">
          <p><strong>Sub Total:</strong> {selectedItem?.subTotal}</p>
          <p><strong>Discount:</strong> {selectedItem?.discount || 0}</p>
          <p><strong>CC Charge:</strong> {selectedItem?.ccCharge || 0}</p>
          <p><strong>VAT:</strong> {selectedItem?.vat}</p>
          <p><strong>Other Charges:</strong>{selectedItem?.otherCharges}</p>
          <p><strong>Grand Total:</strong> {selectedItem?.totalAmount}</p>
        </div>
      </section>
      <footer className="receipt-view-footer">
        <p>Note: This is a computer-generated Goods Receipt. No signature required.</p>
      </footer>
    </div>
    <div className='goods-receipt-btn-container'>
    <button className='goods-receipt-btn-print'  onClick={handlePrint} >
        print
    </button>
    </div>
        </>
  );
}

export default GoodsReceiptView;
