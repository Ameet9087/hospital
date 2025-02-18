// export default GRQualityInspection;

import React from 'react';
import  './RequisitionPage.css';

function GRQualityInspection() {
  return (
    <div className="requisitionPageContainer">
      <div className="requisitionTabMenu">
        {/* <button className={`${styles.requisitionTabButton} ${styles.requisitionTabButtonActive}`}>Requisition</button>
        <button className={styles.requisitionTabButton}>Purchase Request</button>
        <button className={styles.requisitionTabButton}>Purchase Order</button>
        <button className={styles.requisitionTabButton}>GR Quality Inspection</button> */}
      </div>

      <div className="requisitionFilterSection">
       
        <div className="requisitionDatePickerContainer">
          <label>From:</label>
          <input type="date" className="requisitionDateInput"/>
          <label>To:</label>
          <input type="date" className="requisitionDateInput" />
          {/* <button className="requisitionOkButton">OK</button> */}
        </div>
        <label className="requisitionCheckboxLabel">
          <input type="checkbox" />
          Check and Verify GR Quality Inspection
        </label>
      </div>

      <div className="requisitionStatusSection">
        <div className="requisitionRadioButtons">
          <label>
            <input type="radio" name="verificationStatus" /> Pending
          </label>
          <label>
            <input type="radio" name="verificationStatus" /> Approved
          </label>
          <label>
            <input type="radio" name="verificationStatus" /> Rejected
          </label>
          <label>
            <input type="radio" name="verificationStatus" /> All
          </label>
        </div>
        {/* <div className="requisitionDropdownContainer">
          <label>Requisition Status:</label>
          <select className="requisitionDropdown">
            <option value="all">--ALL--</option>
         </select>
        </div> */}
      </div>

      <div className="requisitionTableContainer">
        <table className="requisitionDataTable">
          <thead>
            <tr>
              <th>GR No</th>
              <th>GR Date</th>
              <th>PO No</th>
              <th>Vendor</th>
              <th>Bill</th>
              <th>Pay</th>
              <th>Verification Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="6" className="requisitionNoRows">No Rows To Show</td>
            </tr>
          </tbody>
        </table>
        {/* <div className={styles.requisitionPagination}>
          <button className={styles.requisitionPaginationButton}>First</button>
          <button className={styles.requisitionPaginationButton}>Previous</button>
          <span>Page 0 of 0</span>
          <button className={styles.requisitionPaginationButton}>Next</button>
          <button className={styles.requisitionPaginationButton}>Last</button>
        </div> */}
      </div>
    </div>
  );
}

export default GRQualityInspection;
