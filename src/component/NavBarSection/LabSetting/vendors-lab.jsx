import React, { useState } from 'react';
import "../LabSetting/vendors-lab.css"
import LSLabTestAddNLTest from './lSLabTestAddNLTest';
import LabVenderAddNewLV from './labVenderAddNewLV';
const labTests = [
  { vendorCode:'INTERNAL',vendorName: "Lab Internal", address: "", contactNo: "normal",  isExternal: "false", isActive:'true', isDefault:'true' },

  // Add more rows as needed


];

const VendorsLab = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddNewLabTestClick = () => {
    setShowPopup(true); // Show the popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup
  };

  return (
    <div className="vendors-lab-container">
    <div className="vendors-lab-firstRow">
    <div className="vendors-lab-addBtn">
      <button className="vendors-lab-add-button" onClick={handleAddNewLabTestClick}>+ Add New External Vendor</button>
      </div>
        
      </div>
      <div className='vendors-lab-search-N-result'>
      <div className="vendors-lab-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            placeholder="Search..." 
            
          />
        </div>
        <div className="vendors-lab-results-info">
          <span>Showing 0 / 0 results</span>
          <button className="vendors-lab-print-button"><i class="fa-solid fa-print"></i> Print</button>
        </div>
        </div>
      <table >
        <thead>
          <tr>
            <th>Vendor Code</th>
            <th>Vendor Name</th>
            <th>Address </th>
            <th>Contact No</th>
            <th>Is External ?</th>
            <th>Is Active ?</th>
            <th>Is Default ?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {labTests.map((test, index) => (
            <tr key={index}>
              <td>{test.vendorCode}</td>
              <td>{test.vendorName}</td>
              <td>{test.address}</td>
              <td>{test.contactNo}</td>
              <td>{test.isExternal}</td>
              <td>{test.isActive}</td>
              <td>{test.isDefault}</td>
              <td>
                <button className="vendors-lab-edit-button"onClick={handleAddNewLabTestClick}>Edit</button>
                <button className="vendors-lab-deactivate-button">Deactivate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <div className="vendors-lab-pagination">
          <span>0 to 0 of 0</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      {/* Modal Popup */}
      {showPopup && (
        <div className="vendors-lab-modal">
          <div className="vendors-lab-modal-content">
            <LabVenderAddNewLV onClose={handleClosePopup} />
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorsLab;
