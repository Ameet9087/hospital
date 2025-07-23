import React, { useEffect, useRef, useState } from "react";
import VerifyModal from "./VerifyModal";
import "./RequisitionPage.css";
import { API_BASE_URL } from "../api/api";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
function RequisitionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requisitions, setRequisitions] = useState([]);
  const [selectedRequisition, setSelectedRequisition] = useState(null);
  const [filterStatus, setFilterStatus] = useState("pending");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    // Fetch the requisition data
    fetch(`${API_BASE_URL}/inventory-requisitions`)
      .then((response) => response.json())
      .then(async (data) => {
        // For each requisition, fetch the corresponding substore name
        const updatedRequisitions = await Promise.all(
          data.map(async (requisition) => {
            try {
              const substoreResponse = await fetch(
                `${API_BASE_URL}/substores/${requisition.subStoreId}`
              );
              const substoreData = await substoreResponse.json();
              
              // Add the substore name to the requisition
              return {
                ...requisition,
                substoreName: substoreData.subStoreName, // Assuming 'subStoreName' is the correct field
              };
            } catch (error) {
              console.error("Error fetching substore data:", error);
              return requisition; // Return the requisition without the substore name if there's an error
            }
          })
        );

        // Update the state with the updated requisitions
        setRequisitions(updatedRequisitions);
      })
      .catch((error) => console.error("Error fetching requisition data:", error));
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

  const handleExport = () => {
    console.log("Exporting data...");
  };

  const handlePrint = () => {
    console.log("Printing data...");
  };

  const filteredRequisitions = requisitions.filter((requisition) => {
    if (filterStatus === "all") return true;
    return requisition.status.toLowerCase() === filterStatus;
  });

  return (
    <div className="requisitionPageContainer">
      <div className="requisitionFilterSection">
        {/* <label className="requisitionCheckboxLabel">
          <input type="checkbox" />
          Check and Verify Requisition
        </label> */}
        <div className="requisitionDatePickerContainer">
          <label>From:</label>
          <input type="date" className="requisitionDateInput" />
          <label>To:</label>
          <input type="date" className="requisitionDateInput" />
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
              checked={filterStatus === "pending"}
            />
            Pending
          </label>
          <label>
            <input
              type="radio"
              name="verificationStatus"
              value="approved"
              onChange={handleFilterChange}
              checked={filterStatus === "approved"}
            />
            Approved
          </label>
          <label>
            <input
              type="radio"
              name="verificationStatus"
              value="rejected"
              onChange={handleFilterChange}
              checked={filterStatus === "rejected"}
            />
            Rejected
          </label>
          <label>
            <input
              type="radio"
              name="verificationStatus"
              value="all"
              onChange={handleFilterChange}
              checked={filterStatus === "all"}
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

      <div className="verify-purchase-actions-span">
        <span>
          Showing {filteredRequisitions.length} / {requisitions.length} results
        </span>
        <button className="verify-purchase-export-button" onClick={handleExport}>Export</button>
        <button className="print-button" onClick={handlePrint}>Print</button>
      </div>

      <div className="table-container">
        <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {["Req.No", "Store Name", "Requested On", "Req. Status", "Verification Status", "Action"].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable-th"
                >
                  <div className="header-content">
                    <span>{header}</span>
                    <div
                      className="resizer"
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredRequisitions.map((requisition) => (
              <tr key={requisition.id}>
                <td>{requisition.id}</td>
                <td>{requisition.substoreName}</td>
                <td>{requisition.requisitionDate}</td>
                <td>{requisition.status}</td>
                <td>
                  {requisition.status.toLowerCase() === "pending"
                    ? "0 verified out of 1"
                    : "1 verified out of 1"}
                </td>
                <td>
                  <button className="requisition-verify-btn" onClick={() => handleVerifyClick(requisition)}>
                    Verify
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <VerifyModal
          isOpen={isModalOpen}
          onClose={closeModal}
          requisitionDetails={selectedRequisition}
        />
      )}
    </div>
  );
}

export default RequisitionPage;
