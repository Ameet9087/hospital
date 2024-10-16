import React from 'react';
import './InternalConsumptionDetails.css';

const InternalConsumptionDetails = ({product,onClose}) => {
    console.log(product);
    
  return (
    <div className="internal-consumption-details">
      <header className="internal-consumption-details__header">
        <div className="internal-consumption-details__hospital-info">
          <h1 className='internal-consumption-details__hospital-info-h1'>HIMS Hospital</h1>
          <p className='internal-consumption-details__hospital-info-p'>Substore Unit</p>
          <p className='internal-consumption-details__hospital-info-p'>Date: {product.consumedDate}</p>
        </div>
      </header>

      <section className="internal-consumption-details__body">
        <div className="internal-consumption-details__info">
          <p><strong>ConsumptionId:</strong> {product.internalConsumptionId}</p>
          <p><strong>Department Name:</strong> {product.storeName}</p>
        </div>

        <table className="internal-consumption-details__table">
          <thead>
            <tr>
              <th>S.N</th>
              <th>Item Name</th>
              <th>Generic Name</th>
              <th>Unit</th>
              <th>Sale Price</th>
              <th>Quantity</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{product?.pharmacyRequisition?.itemName}</td>
              <td>{product?.pharmacyRequisition.genericName}</td>
              <td>{product?.pharmacyRequisition?.unit}</td>
              <td>{product?.pharmacyRequisition?.salePrice}</td>
              <td>{product?.quantity}</td>
              <td>{product?.totalAmount}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <footer className="internal-consumption-details__footer">
        <div>
        <p><strong>Remarks:</strong> {product.remark}</p>
        <p><strong>User:</strong> {product.consumedBy}</p>
        </div>
        <div className='internal-consumption-details__footer-subdiv'>
        <p><strong>Total Amount:</strong> {product.totalAmount}</p>
        <button className="internal-consumption-details__print-button">Print</button>
        </div>
      </footer>
    </div>
  );
};

export default InternalConsumptionDetails;
