import React, { useState, useEffect, useRef } from "react";
import "./AutopsyreportForm.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../CustomModel/CustomModal";
import * as XLSX from "xlsx";
import AutopsyReportFormPopUp from "../Autopsy Report Form/AutopsyReportFormPopUp";
import axios from 'axios';
import { API_BASE_URL } from "../../api/api";

const AutopsyReportForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [autopsyReports, setAutopsyReports] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchAutopsyReports = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/autopsy-report-form`);
        setAutopsyReports(response.data); // Assuming the API returns the array of data
      } catch (error) {
        console.error("Error fetching autopsy reports:", error);
      }
    };

    fetchAutopsyReports();
  }, []);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const filteredAutopsyReports = autopsyReports.filter((report) => {
    return (
      (report.autopsyRequestForm?.firstName && report.autopsyRequestForm.firstName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (report.autopsyRequestForm?.lastName && report.autopsyRequestForm.lastName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (report.autopsyRequestForm?.causeOfDeath && report.autopsyRequestForm.causeOfDeath.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (report.autopsyRequestForm?.dateOfDeath && report.autopsyRequestForm.dateOfDeath.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (report.autopsyRequestForm?.authorizedBy && report.autopsyRequestForm.authorizedBy.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const handleExport = () => {
    const exportData = autopsyReports.map((report) => ({
      "Autopsy Request ID": report.autopsyRequestForm?.autopsyreqId || "",
      "First Name": report.autopsyRequestForm?.firstName || "",
      "Last Name": report.autopsyRequestForm?.lastName || "",
      "Date of Birth": report.autopsyRequestForm?.dateOfBirth || "",
      "Gender": report.autopsyRequestForm?.gender || "",
      "Address": report.autopsyRequestForm?.address || "",
      "Contact Number": report.autopsyRequestForm?.contactNum || "",
      "Date of Death": report.autopsyRequestForm?.dateOfDeath || "",
      "Cause of Death": report.autopsyRequestForm?.causeOfDeath || "",
      "Authorized By": report.autopsyRequestForm?.authorizedBy || "",
      "Authorization Date": report.autopsyRequestForm?.authorizationDate || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Autopsy Report Details");
    XLSX.writeFile(workbook, "Autopsy_Report_Details.xlsx");
  };

  return (
    <div className="AtopSyReportPopUp-container">
      <div className="AtopSyReportPopUp-addBtn">
        <button className="AtopSyReportPopUp-add-button" onClick={openPopup}>
          + Add New Autopsy Report
        </button>
      </div>

      <div className="AtopSyReportPopUp-search-N-result">
        <div className="AtopSyReportPopUp-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="AtopSyReportPopUp-results-info">
          <span>
            Showing {filteredAutopsyReports.length} / {autopsyReports.length} results
          </span>
          <button className="AtopSyReportPopUp-print-button" onClick={handleExport}>
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="AtopSyReportPopUp-print-button"
            onClick={() => window.print()}
          >
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div className="AtopSyReportPopUp-table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "SN",
                "Autopsy Request ID",
                "First Name",
                "Last Name",
                "Date of Birth",
                "Gender",
                "Address",
                "Contact Number",
                "Date of Death",
                "Cause of Death",
                "Authorized By",
                "Authorization Date",
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="AtopSyReportPopUp-resizable-th"
                >
                  <div className="AtopSyReportPopUp-header-content">
                    <span>{header}</span>
                    <div
                      className="AtopSyReportPopUp-resizer"
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredAutopsyReports.map((report, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{report.autopsyRequestForm?.autopsyreqId || ""}</td>
                <td>{report.autopsyRequestForm?.firstName || ""}</td>
                <td>{report.autopsyRequestForm?.lastName || ""}</td>
                <td>{report.autopsyRequestForm?.dateOfBirth || ""}</td>
                <td>{report.autopsyRequestForm?.gender || ""}</td>
                <td>{report.autopsyRequestForm?.address || ""}</td>
                <td>{report.autopsyRequestForm?.contactNum || ""}</td>
                <td>{report.autopsyRequestForm?.dateOfDeath || ""}</td>
                <td>{report.autopsyRequestForm?.causeOfDeath || ""}</td>
                <td>{report.autopsyRequestForm?.authorizedBy || ""}</td>
                <td>{report.autopsyRequestForm?.authorizationDate || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <AutopsyReportFormPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default AutopsyReportForm;
