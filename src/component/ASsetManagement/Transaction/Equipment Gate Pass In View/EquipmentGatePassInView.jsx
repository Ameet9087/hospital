import React, { useState, useRef, useEffect } from "react";
import "./EquipmentGatePassinview.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../CustomModel/CustomModal";
import * as XLSX from "xlsx";
import { API_BASE_URL } from "../../../OT/OTNurseNotes/api/api";
import EquipmentGatePassInViewPopUp from "./EquipmentGatePassInViewPopUp";

const EquipmentGatePassInView = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [breakDownDetails, setBreakDownDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/breakdowns`)
      .then((res) => res.json())
      .then((data) => setBreakDownDetails(data))
      .catch((err) => {
        console.log(err);
      });
  }, [showPopup]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const filteredBreakDownDetails = breakDownDetails.filter((breakdown) => {
    return (
      breakdown.breakdownDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.breakdownTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.breakdownDetails.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.partsReplaced.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.dateOfInvoice.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.complaintStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.workCompletionDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.workCompletionTime.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.remark.toLowerCase().includes(searchQuery.toLowerCase()) ||
      breakdown.repairableParts.some((part) =>
        part.partName.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      breakdown.guaranteedParts.some((part) =>
        part.partName.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      breakdown.replaceItems.some((item) =>
        item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  const handleExport = () => {
    const exportData = breakDownDetails.map((breakdown) => ({
      "Breakdown Date": breakdown.breakdownDate,
      "Breakdown Time": breakdown.breakdownTime,
      "Details": breakdown.breakdownDetails,
      "Parts Replaced": breakdown.partsReplaced,
      "Company Name": breakdown.companyName,
      "Invoice No": breakdown.invoiceNo,
      "Date of Invoice": breakdown.dateOfInvoice,
      "Complaint Status": breakdown.complaintStatus,
      "Work Completion Date": breakdown.workCompletionDate,
      "Work Completion Time": breakdown.workCompletionTime,
      "Remark": breakdown.remark,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Breakdown Details");
    XLSX.writeFile(workbook, "Breakdown_Details.xlsx");
  };

  return (
    <div className="EquipmentGatePassInView-container">
      <div className="EquipmentGatePassInView-addBtn">
        <button className="EquipmentGatePassInView-add-button" onClick={openPopup}>
          + Add New Equipment GatePass IN View
        </button>
      </div>

      <div className="EquipmentGatePassInView-search-N-result">
        <div className="EquipmentGatePassInView-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="EquipmentGatePassInView-results-info">
          <span>
            Showing {filteredBreakDownDetails.length} / {breakDownDetails.length} results
          </span>
          <button
            className="EquipmentGatePassInView-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="EquipmentGatePassInView-print-button"
            onClick={() => window.print()}
          >
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div className="EquipmentGatePassInView-table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "SN",
                "Item Code",
                "Item Name",
                "Out Qty",
                "Pending Qty",
                "Rec Qty",
                "Remarks",
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
            {filteredBreakDownDetails.map((breakdown, index) => (
              <tr key={index}>
                <td>{breakdown.breakdownDate}</td>
                <td>{breakdown.breakdownTime}</td>
                <td>{breakdown.breakdownDetails}</td>
                <td>{breakdown.partsReplaced}</td>
                <td>{breakdown.companyName}</td>
                <td>{breakdown.invoiceNo}</td>
                <td>{breakdown.dateOfInvoice}</td>
                <td>{breakdown.complaintStatus}</td>
                <td>{breakdown.workCompletionDate}</td>
                <td>{breakdown.workCompletionTime}</td>
                <td>{breakdown.remark}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <EquipmentGatePassInViewPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default EquipmentGatePassInView;
