import React, { useState } from 'react';
import './VerifyModal.css';
import { API_BASE_URL } from '../api/api';

function VerifyModalPharmacy({ isOpen, onClose, requisitionDetails }) {
    console.log(requisitionDetails);
    
  const [verifyRemark, setVerifyRemark] = useState('');
  
  if (!isOpen) return null;

  // Function to handle approval
  const handleApprove = async () => {
    const updateData = requisitionDetails?.subPharmRequisitionItems?.map(item => ({
      subPharmRequisitionItemId: item.subPharmRequisitionItemId,
      dispatchQuantity: 0,
    }))
    
    try {
      const response = await fetch(`${API_BASE_URL}/subpharm-requisitions/${requisitionDetails. pharRequisitionId}/update?status=Approved`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Update successful:', result);
        onClose();
      } else {
        console.error('Error updating requisition:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="verifyModalOverlay">
      <div className="verifyModalContainer">
        <div className="verifyModalHeader">
          <h2>Check and Verify Requisition</h2>
          <button onClick={onClose} className="verifyCloseButton">×</button>
        </div>
        <div className="verifyModalContent">
          <div className="verifyRequisitionDetails">
            <p><strong>Requisition No:</strong> {requisitionDetails.pharRequisitionId}</p>
            <p><strong>Store Name:</strong> {requisitionDetails.subStore.subStoreName}</p>
            <p><strong>Requisition Date:</strong> {requisitionDetails.requestedDate}</p>
          </div>
          <table className="verifyDataTable">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Qty</th>
                <th>Unit</th>
                <th>Remarks</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {
               requisitionDetails.subPharmRequisitionItems.map((requisitionDetail, index) => (
                  <tr key={index}>
                  <td>{requisitionDetail?.items?.itemMaster?.itemName}</td>
                  <td>{requisitionDetail.requiredQuantity}</td>
                  <td>{requisitionDetail.items?.itemMaster?.unitsOfMeasurement?.name || 'N/A'}</td>
                  <td>{requisitionDetail.remark || 'N/A'}</td>
                  <td>{requisitionDetails.status}</td>
                </tr>
                ))
              }
                
            </tbody>
          </table>
          <div className="verifyRemarksSection">
            <label>Requisition Remark:</label>
            <textarea 
              className="verifyRemarksInput"
              value={verifyRemark}
              onChange={(e) => setVerifyRemark(e.target.value)}
            />
          </div>
        </div>
        <div className="verifyModalFooter">
          <button onClick={handleApprove} className="verifyApproveButton">Approve</button>
          <button onClick={onClose} className="verifyRejectButton">Reject All</button>
        </div>
      </div>
    </div>
  );
}

export default VerifyModalPharmacy;
