import React from 'react';
import './RequisitionDetails.css';

const RequisitionDetails = ({product}) => {
    console.log(product);
    
  return (
    <div className="requisition-details">
      <header className="requisition-details__header">
        <div className="requisition-details__store-info">
          <p>{product?.storeName} Unit</p>
        </div>
        <div className="requisition-details__qr-date">
          <div className="requisition-details__date">
            <p>Requisition Date: {product.requestedDate}</p>
          </div>
        </div>
      </header>

      <section className="requisition-details__info">
        <p><strong>Requisition No:</strong> {product?.pharmacyRequisitionId}</p>
        <p><strong>Requisition Store:</strong> {product?.storeName}</p>
      </section>

      <section className="requisition-details__table-section">
        <table className="requisition-details__table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Quantity</th>
              <th>Dispatched Qty.</th>
              <th>Pending Qty.</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>{product.itemName+"/"+product.genericName}</strong>
              </td>
              <td>{product.availableQtyInStore}</td>
              <td>{product.dispatchQty}</td>
              <td>{product.requiredQuantity}</td>
              <td>{product.status}</td>
              <td>{product.remark}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <footer className="requisition-details__footer">
        <div className="requisition-details__requested-by">
          <p><strong>Requested By:</strong> {product.requestedBy}</p>
          <p><strong>Received By:</strong> </p>
        </div>
        <div className="requisition-details__actions">
          <button className="requisition-details__print-button">Print</button>
        </div>
      </footer>
    </div>
  );
};

export default RequisitionDetails;
