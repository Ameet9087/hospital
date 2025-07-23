import React, { useState } from "react";
import "./VerifyModal.css";
import { API_BASE_URL } from "../api/api";
import CustomModal from "../../CustomModel/CustomModal";
import FloatingInput from "../../FloatingInputs/FloatingInput";
import FloatingTextarea from "../../FloatingInputs/FloatingTextarea";
import FloatingSelect from "../../FloatingInputs/FloatingSelect";
function VerifyModal({ isOpen, onClose, requisitionDetails }) {
  const [verifyRemark, setVerifyRemark] = useState("");
  const [verifiedBy, setVerifiedBy] = useState(""); // Dynamic value for verifier
  const [checkedBy, setCheckedBy] = useState("");  // Dynamic value for checker
  const [withdrawRemark, setWithdrawRemark] = useState(""); // Dynamic value for withdraw remark
  const [status, setStatus] = useState(""); // Dynamic value for status (Approved/Rejected)

  if (!isOpen) return null;

  // Function to handle approval
  const handleApprove = async () => {
    const updateData = {
      verifyOrNot: "Verified", // Automatically set as 'Verified'
      verifiedBy: verifiedBy || "AdminUser", // Use dynamic value from input or fallback to "AdminUser"
      status: status || "Approved", // Use dynamic value from input or fallback to "Approved"
      withdrawRemark: withdrawRemark || "No issues noted during verification", // Use dynamic value for withdraw remark
      checkedBy: checkedBy || "John Doe", // Use dynamic value for checkedBy
      remarks: verifyRemark || "Requisition successfully verified", // Use dynamic value for remarks
    };

    console.log("Payload to API:", updateData);

    try {
      const response = await fetch(
        `${API_BASE_URL}/inventory-requisitions/${requisitionDetails.id}/verify`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Update successful:", result);
        // Close the modal after a successful update
        onClose();
      } else {
        console.error("Error updating requisition:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
    <div >
      <div >
        <div >
          <h2>Check and Verify Requisition</h2>
          {/* <button onClick={onClose} className="verifyCloseButton">
            ×
          </button> */}
        </div>
        <div className="verifyModalContent">
          <div className="verifyRequisitionDetails">
            <p>
              <strong>Requisition No:</strong> {requisitionDetails.id}
            </p>
            <p>
              <strong>Store Name:</strong> {requisitionDetails.substoreName}
            </p>
            <p>
              <strong>Requisition Date:</strong>{" "}
              {requisitionDetails.requisitionDate}
            </p>
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
              {requisitionDetails.requisitionItems.map((item) => (
                <tr key={item.id}>
                  <td>{item?.item?.itemName || "N/A"}</td>
                  <td>{item.requiredQuantity || "N/A"}</td>
                  <td>
                    {item?.item?.unitOfMeasurement?.unitOfMeasurementName ||
                      "N/A"}
                  </td>
                  <td>{item.remark || "N/A"}</td>
                  <td>{requisitionDetails.status || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="verify-modal-footer-fields"> 
          
         
            <FloatingInput
            label={"Verified By"}
            type="text"
            className="verifyInput"
            value={verifiedBy}
            onChange={(e) => setVerifiedBy(e.target.value)}
            placeholder="Enter verifier's name"
            />
          
         
            <FloatingInput
            label={"Checked By"}
            type="text"
            className="verifyInput"
            value={checkedBy}
            onChange={(e) => setCheckedBy(e.target.value)}
            placeholder="Enter checker’s name"
            />
          
         
          
            <FloatingInput
            label={"Withdraw Remark"}
            type="text"
            className="verifyInput"
            value={withdrawRemark}
            onChange={(e) => setWithdrawRemark(e.target.value)}
            placeholder="Enter withdrawal remark"
            />
            
            <FloatingTextarea
            label={"Requisition Remark"}
            className="verifyRemarksInput"
            value={verifyRemark}
            onChange={(e) => setVerifyRemark(e.target.value)}
            />
      
          
 
          <FloatingSelect
        label={"Status"}
        value={status}
        onChange={(e) => setStatus(e.target.value)}
            options={[
              { value: "", label: "Select Accounting" },
              { value: "Approved", label: "Approved" },
              { value: "Rejected", label: "Rejected" },
           
           
            ]}
          />
          </div>
          
          
        
          <div className="verifyApproveButton-div">
          <button onClick={handleApprove} className="verifyApproveButton">
            Approve
          </button>
          <button onClick={onClose} className="verifyApproveButton">
            Reject All
          </button>
          </div>
        </div>
      </div>
    </div>
    </CustomModal>
  );
}

export default VerifyModal;
