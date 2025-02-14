import React, { useEffect, useState } from "react";
import VerifyModal from "./VerifyModal";
import "./RequisitionPage.css";
import VerifyModalPharmacy from "./VerifyModalPharmacy";
import { API_BASE_URL } from "../api/api";
import CustomModal from "../../CustomModel/CustomModal";
function RequisitionPagePharmacy() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requisitions, setRequisitions] = useState([]);
  const [selectedRequisition, setSelectedRequisition] = useState(null); 
  const [filterStatus, setFilterStatus] = useState("pending");

  useEffect(() => {
    fetch(`${API_BASE_URL}/subpharm-requisitions`)
      .then((response) => response.json())
      .then((data) => setRequisitions(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleVerifyClick = (requisition) => {
    setSelectedRequisition(requisition); 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequisition(null); 
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  console.log(requisitions);
  

  const filteredRequisitions = requisitions.filter((requisition) => {
    if (filterStatus === "all") return true;
    return requisition.status.toLowerCase() === filterStatus;
  });

  return (
    <div className="requisitionPageContainer">
  
      <div className="requisitionFilterSection">
       
        <div className="requisitionDatePickerContainer">
          <label>From:</label>
          <input type="date" className="requisitionDateInput" />
          <label>To:</label>
          <input type="date" className="requisitionDateInput" />
          {/* <button className="requisitionOkButton">OK</button> */}
        </div>
        {/* <label className="requisitionCheckboxLabel">
          <input type="checkbox" />
          Check and Verify Requisition
        </label> */}
      </div>

      <div className="requisitionStatusSection">
        <div className="requisitionRadioButtons">
          <label>
            <input
              type="radio"
              name="verificationStatus"
              value="pending"
              onChange={handleFilterChange}
              defaultChecked={filterStatus === "pending"} 
            />
            Pending
          </label>
          <label>
            <input
              type="radio"
              name="verificationStatus"
              value="approved"
              onChange={handleFilterChange}
            />
            Approved
          </label>
          <label>
            <input
              type="radio"
              name="verificationStatus"
              value="rejected"
              onChange={handleFilterChange}
            />
            Rejected
          </label>
          <label>
            <input
              type="radio"
              name="verificationStatus"
              value="all"
              onChange={handleFilterChange}
            />
            All
          </label>
        </div>
        {/* <div className="requisitionDropdownContainer">
          <label>Requisition Status:</label>
          <select className="requisitionDropdown">
            <option value="all">--ALL--</option>
          </select>
        </div> */}
      </div>

      <div className="table-container">
        <table className="requisitionDataTable">
          <thead>
            <tr>
              <th>Req.No</th>
              <th>StoreName</th>
              <th>Requested On</th>
              <th>Req. Status</th>
              <th>Verification Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequisitions.map((requisition) => (
              <tr key={requisition.pharRequisitionId}>
                <td>{requisition.pharRequisitionId}</td>
                <td>{requisition?.subStore?.subStoreName}</td>
                <td>{requisition.requestedDate}</td>
                <td>{requisition.status}</td>
                <td>
                  {requisition.status === "Pending"
                    ? "0 verified out of 1"
                    : "1 verified out of 1"}
                </td>
                <td>
                  <button className="requisitionPaginationButton" onClick={() => handleVerifyClick(requisition)}>
                    Verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
  <CustomModal isOpen={isModalOpen} onClose={closeModal}>
    <VerifyModalPharmacy
      isOpen={isModalOpen}
      onClose={closeModal}
      requisitionDetails={selectedRequisition}
    />
  </CustomModal>


    </div>
  );
}

export default RequisitionPagePharmacy;
