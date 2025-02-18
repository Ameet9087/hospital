import React, { useState, useRef, useEffect } from "react";
import "./ComplaintEntrySystem.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import * as XLSX from "xlsx";
import ComplaintEntrysystemPopUp from "./ComplaintEntrysystemPopUp";
import { API_BASE_URL } from "../../../api/api";
import { FloatingInput } from "../../../../FloatingInputs";

const ComplaintEntrysystem = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [complaints, setComplaints] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data from the equipment-complaints API
  useEffect(() => {
    fetch(`${API_BASE_URL}/equipment-complaints`)
      .then((res) => res.json())
      .then((data) => setComplaints(data))
      .catch((err) => {
        console.error("Error fetching complaints data:", err);
      });
  }, [showPopup]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Filter complaints based on search query
  const filteredComplaints = complaints.filter((complaint) => {
    return (
      complaint.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.complaintType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.complaintSubject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.priority.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.equipmentMaster.equipmentName
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      complaint.equipmentMaster.serialNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.equipmentMaster.assetNo.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleExport = () => {
    const exportData = complaints.map((complaint) => ({
      "Complaint Type": complaint.complaintType,
      "Complaint Subject": complaint.complaintSubject,
      "Priority": complaint.priority,
      "Equipment Name": complaint.equipmentMaster.equipmentName,
      "Serial No": complaint.equipmentMaster.serialNo,
      "Model No": complaint.equipmentMaster.modelNo,
      "Asset No": complaint.equipmentMaster.assetNo,
      "Software Version": complaint.equipmentMaster.softwareVersion,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Complaint Details");
    XLSX.writeFile(workbook, "Complaint_Details.xlsx");
  };

  return (
    <div className="AmcTracker-container">
      <div className="AmcTracker-addBtn">
        <button className="AmcTracker-add-button" onClick={openPopup}>
          + Add New Complaint Entry System
        </button>
      </div>

      <div className="AmcTracker-search-N-result">
        <div className="AmcTracker-search-bar">
          <FloatingInput
          label={"Search"}
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="AmcTracker-results-info">
          <span>
            Showing {filteredComplaints.length} / {complaints.length} results
          </span>
          <button className="AmcTracker-print-button" onClick={handleExport}>
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="AmcTracker-print-button"
            onClick={() => window.print()}
          >
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div className="AmcTracker-table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Complaint Reference No",
                "Complaint To Department",
                "Complaint Type",
                "Equipment Name",
                "Serial No",
                "Model No",
                "Asset No",
                "Equipment No",
                "Software Version No",
                "Complaint Subject",
                "Priority",
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
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredComplaints.map((complaint, index) => (
              <tr key={complaint.complaintId}>
                <td>{complaint.complaintId}</td>
                <td>{complaint.equipmentMaster.department?.departmentName}</td>
                <td>{complaint.complaintType}</td>
                <td>{complaint.equipmentMaster.equipmentName}</td>
                <td>{complaint.equipmentMaster.serialNo}</td>
                <td>{complaint.equipmentMaster.modelNo}</td>
                <td>{complaint.equipmentMaster.assetNo}</td>
                <td>{complaint.equipmentMaster.assetNo}</td>
                <td>{complaint.equipmentMaster.softwareVersion}</td>
                <td>{complaint.complaintSubject}</td>
                <td>{complaint.priority}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <ComplaintEntrysystemPopUp onClose={closePopup} />
        </CustomModal>
      )}
    </div>
  );
};

export default ComplaintEntrysystem;
