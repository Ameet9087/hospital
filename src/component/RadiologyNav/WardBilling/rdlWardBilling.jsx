
import React, { useState } from 'react';
import "../WardBilling/rdlWardBilling.css";
import WardBillingViewDetails from './wardBillingViewDetalis';

function RDLWardBilling() {
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);

  const handleViewDetailsClick = () => {
    setShowDetailsPopup(true);
  };

  const closeDetailsPopup = () => {
    setShowDetailsPopup(false);
  };

  const printTable = () => {
    const printContents = document.getElementById('table-to-print').outerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = `<html><head><title>Print</title></head><body>${printContents}</body></html>`;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();  // Reload the page to reset the state
  };

  return (
    <div className="rDLWardBilling-active-imaging-request">
      <div className="rDLWardBilling-search-N-results">
        <div className="rDLWardBilling-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search" />
        </div>
        <div className="rDLWardBilling-results-info">
          Showing 2 / 2 results
          <button className="rDLWardBilling-ex-pri-buttons" onClick={printTable}>Print</button>
        </div>
      </div>
      <div className="rDLWardBilling-table-N-paginat" id="table-to-print">
        <table>
          <thead>
            <tr>
              <th>Hospital Number</th>
              <th>Patient Name</th>
              <th>Age/Sex</th>
              <th>Contact</th>
              <th>Admitted Date</th>
              <th>Admitted Doctor</th>
              <th>Inpatient No</th>
              <th>Ward/Bed</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2408003817</td>
              <td>Sachin Ramesh</td>
              <td>50Y / M</td>
              <td>9087654321</td>
              <td>2024-08-16</td>
              <td>Dr. Pooja Mishra</td>
              <td>H2400023</td>
              <td>H2400023</td>
              <td>
                <button
                  className="rDLWardBilling-action-button-add-report"
                  onClick={handleViewDetailsClick}
                >
                 <i class="fa-regular fa-eye"></i> View Details
                </button>
              </td>
            </tr>
            <tr>
            <td>2408003819</td>
              <td> Ramesh Patil</td>
              <td>50Y / M</td>
              <td>9087654321</td>
              <td>2024-08-16</td>
              <td>Dr. Pooja Mishra</td>
              <td>H2400023</td>
              <td>H2400023</td>
              <td>
                <button
                  className="rDLWardBilling-action-button-add-report"
                  onClick={handleViewDetailsClick}
                >
                  <i class="fa-regular fa-eye"></i> View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="rDLWardBilling-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div>
      </div>

      {showDetailsPopup && (
        <div className="rDLWardBilling-popup-overlay">
          <div className="rDLWardBilling-popup-content">
            <button className="rDLWardBilling-close-popup" onClick={closeDetailsPopup}>×</button>
            <WardBillingViewDetails />
          </div>
        </div>
      )}
    </div>
  );
}

export default RDLWardBilling;
