import React, { useEffect, useRef, useState } from "react";
import VerifyModal from "./VerifyModal";
import "./RequisitionPage.css";
import { API_BASE_URL } from "../api/api";
import { startResizing } from "../TableHeadingResizing/resizableColumns";
import CustomModal from "../../CustomModel/CustomModal";

function RequisitionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requisitions, setRequisitions] = useState([]);
  const [selectedRequisition, setSelectedRequisition] = useState(null);
  const [filterStatus, setFilterStatus] = useState("pending");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

   useEffect(() => {
    fetch(`${API_BASE_URL}/inventory-requisitions`)
      .then(response => response.json())
      .then(data => {
        setRequisitions(data);
        // setFilteredRequisitions(data);
        console.log(requisitions);
        
      })
      .catch(error => console.error('Error fetching data:', error));
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

  const filteredRequisitions = requisitions.filter((requisition) => {
    if (filterStatus === "all") return true;
    return requisition.status.toLowerCase() === filterStatus;
  });

  return (
    <div className="requisitionPageContainer">
      <div className="requisitionFilterSection">
        <label className="requisitionCheckboxLabel">
          <input type="checkbox" />
          Check and Verify Requisition
        </label>
        <div className="requisitionDatePickerContainer">
          <label>From:</label>
          <input type="date" className="requisitionDateInput" />
          <label>To:</label>
          <input type="date" className="requisitionDateInput" />
          <button className="requisitionOkButton">OK</button>
        </div>
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
        <div className="requisitionDropdownContainer">
          <label>Requisition Status:</label>
          <select className="requisitionDropdown">
            <option value="all">--ALL--</option>
            {/* Add more options as needed */}
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Req.No",
                "StoreName",
                "Requested On",
                "Req. Status",
                "Verification Status",
                "Action",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(
                        tableRef,
                        setColumnWidths
                      )(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRequisitions.map((requisition) => (
              <tr key={requisition.issueNo}>
                <td>{requisition.issueNo}</td>
                <td>{requisition.subStoreId}</td>
                <td>{requisition.requisitionDate}</td>
                <td>{requisition.status}</td>
                <td>
                  {requisition.status === "Pending"
                    ? "0 verified out of 1"
                    : "1 verified out of 1"}
                </td>
                <td>
                  <button className="verify-btn" onClick={() => handleVerifyClick(requisition)}>
                    Verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


<CustomModal></CustomModal>
        <VerifyModal
          isOpen={isModalOpen}
          onClose={closeModal}
          requisitionDetails={selectedRequisition}
        />
    </div>
  );
}

export default RequisitionPage;
