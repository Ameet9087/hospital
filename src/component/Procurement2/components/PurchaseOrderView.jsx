import React from "react";
import "./PurchaseOrderView.css";

const PurchaseOrderView = ({item}) => {
    console.log(item);
    
  return (
    <div className="purchaseOrderViewContainer">
      <div className="purchaseOrderViewHeader">
        <p>Procurement Unit</p>
      </div>

      <h3 className="purchaseOrderViewTitle">PURCHASE ORDER</h3>

      <div className="purchaseOrderViewDetails">
        <div>
          <p>PO No. : <span>{item?.id}</span></p>
          <p>Vendor's Name : <span>{item?.vendor?.vendorName}</span></p>
          <p>Pin Code : <span>{item?.vendor?.kraPin}</span></p>
          <p>Address : <span>{item?.vendor?.contactAddress}</span></p>
          <p>Contact /Mobile Number : <span>{item?.vendor?.contactNumber}</span></p>
          <p>Invoicing Address : <span>{item?.invoicingAddress}</span></p>
          <p>Delivery Address : <span>{item?.deliveryAddress}</span></p>
        </div>
        <div>
          <p>PO Date : <span>{item?.poDate}</span></p>
          <p>Payment Mode : <span>{item?.paymentMode}</span></p>
          <p>Currency : <span>{item?.vendor?.currencyCode}</span></p>
          <p>Reference No: <span>{item?.referenceNo}</span></p>
          <p>Contact Person Name and Office Email : <span>{item?.contactEmail}</span></p>
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
            <th>Delivery Days</th>
            <th>Item Status</th>
          </tr>
        </thead>
        <tbody>
          
          {item.items.map((index,data)=>(
            <tr>
                <td>1</td>
            <td>{data.items?.item?.invCompany?.itemCode}</td>
            <td>{data.items?.item?.itemName}</td>
         <td></td>
            <td></td>
            <td>1</td>
            <td>pc</td>
            <td>20</td>
            <td>12</td>
            <td>22.4</td>
            <td>6</td>
            <td>Active</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="purchaseOrderViewTotals">
        <p>Sub Total: <span>20.00</span></p>
        <p>VAT Amount: <span>2.40</span></p>
        <p>Total Amount (INR): <span>22.40</span></p>
      </div>

      <div className="purchaseOrderViewValueInWords">
        <p>Total Value In Words: (INR) Twenty Two Point Four Only</p>
      </div>

      {/* <div className="purchaseOrderViewTerms">
        <h4>Terms & Conditions:</h4>
        <div className="purchaseOrderViewSignature">
          <p>Prepared By</p>
          <p>Mr. admin admin</p>
          <p>Checked By</p>
        </div>
      </div> */}

      <div className="purchaseOrderViewNote">
        <p>Note: This is a computer-generated Purchase Order. Signature not required.</p>
      </div>
    </div>
  );
};

export default PurchaseOrderView;
