import React from 'react';
import '../WardBilling/wardBillingViewDetalis.css';

function WardBillingViewDetails() {
  return (
    <div className="wardBillingViewDetalis-ward-billing">
      <h5>Radiology Ward Billing</h5>
      <div className="wardBillingViewDetalis-patient-info">
        <div>
          <span>Name : </span>
          <span className="wardBillingViewDetalis-highlight">ANGEL VARGAS MONTERO</span>
        </div>
        <div>Hospital No : 2407003799</div>
        <div>Age/Sex : 32 Y/Female</div>
        <div>Ward/Bed : ICU/006-02</div>
        <div>Admitted On : 2024-07-30 11:06 AM</div>
        <div>Doctor : Dr. VICTOR OCHIENG OKECH</div>
      </div>

      <h6>Already Requested Items:</h6>
      <table className="wardBillingViewDetalis-requested-items">
        <thead>
          <tr>
            <th>Date (BS)<span className="wardBillingViewDetalis-sort-icon">↕</span></th>
            <th>Type</th>
            <th>Imaging Name</th>
            <th>Qty.</th>
            <th>Status</th>
            <th>User</th>
            <th>Cancel Remarks</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>X-RAY</td>
            <td>USG Chest</td>
            <td>1</td>
            <td>active</td>
            <td>Mr. admin admin</td>
            <td><input type="text" /></td>
            <td><button className="wardBillingViewDetalis-cancel-btn">Cancel</button></td>
          </tr>
        </tbody>
      </table>

      <h6>Request new items:</h6>
      <table className="wardBillingViewDetalis-new-items">
        <thead>
          <tr>
            <th></th>
            <th>Department</th>
            <th>Prescriber</th>
            <th>Performer</th>
            <th>ItemName</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><button className="wardBillingViewDetalis-remove-btn">×</button></td>
            <td><input type="text" placeholder="Enter Department" /></td>
            <td><input type="text" placeholder="Enter Name" /></td>
            <td>
              <input type="text" placeholder="Enter Name" />
              <button className="wardBillingViewDetalis-add-btn"><i class="fa-solid fa-plus"></i></button>
            </td>
            <td><input type="text" placeholder="Enter Item Name" /></td>
            <td><input type="number" defaultValue="1" /></td>
            <td><input type="number" defaultValue="0" /></td>
          </tr>
        </tbody>
      </table>
      <div className="wardBillingViewDetalis-request-btn-div"></div>
      <button className="wardBillingViewDetalis-request-btn">Request</button>
    </div>
  );
}

export default WardBillingViewDetails;