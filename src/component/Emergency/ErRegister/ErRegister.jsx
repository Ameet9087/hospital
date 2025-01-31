import React, { useState, useEffect, useRef } from "react";
// import { Modal } from 'react-bootstrap';
import axios from "axios";
import "./ErRegister.css";
import ErInitialAssessmentForm from "../ErInitialAssessmentForm/ErInitialAssessmentForm";
import { startResizing } from "../../TableHeadingResizing/resizableColumns";
// import { API_BASE_URL } from '../api/api';
import * as XLSX from "xlsx";
import CustomModal from "../../CustomModel/CustomModal";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/api";

const ErRegister = () => {
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);
  const [goodReceipts, setGoodReceipts] = useState([]);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columnWidths, setColumnWidths] = useState({});
  const [searchText, setSearchText] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const tableRef = useRef(null);
  const handleOpenModal = () => navigate("/emergency/erinitialassessment");
  const handleCloseModal = () => setShowEditModal(false);
  const [erData, setErData] = useState([]);

  const fetchErData = async () => {
    try {
      // http://192.168.1.65:8080/api/pharmacy-good-receipt
      // const response = await axios.get(`${API_BASE_URL}/pharmacy-good-receipt`);
      const response = await axios.get(
        `${API_BASE_URL}/emergency/er-initial-assessment`
      );
      setErData(response.data);
      // setFilteredReceipts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching good receipts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchErData();
  }, []);

  const handleAddPatient = (receipt) => {
    navigate("/patient/registerpatient", { state: { receipt } });
  };

  const handleERClinicalEntries = (receipt) => {
    navigate("/emergency/bedinformation", { state: { receipt } });
  };

  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "PurchaseOrderReport");
    XLSX.writeFile(wb, "PurchaseOrderReport.xlsx");
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    let filtered = goodReceipts;

    if (searchText) {
      filtered = filtered.filter((receipt) =>
        Object.values(receipt)
          .join(" ")
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }

    if (dateRange.from || dateRange.to) {
      filtered = filtered.filter((receipt) => {
        const receiptDate = new Date(receipt.goodsReceiptDate);
        const fromDate = dateRange.from ? new Date(dateRange.from) : null;
        const toDate = dateRange.to ? new Date(dateRange.to) : null;

        if (fromDate && receiptDate < fromDate) return false;
        if (toDate && receiptDate > toDate) return false;
        return true;
      });
    }

    setFilteredReceipts(filtered);
  }, [searchText, dateRange, goodReceipts]);

  return (
    <div className="ErRegister-container">
      <div className="ErRegister-header">
        <button
          className="ErRegister-add-ErRegister-button"
          onClick={handleOpenModal}
        >
          + Add New
        </button>

        {/* <div className="ErRegister-status-filters">
          <label>Patient Type:</label>
          <label>
            <input type="radio" name="status" /> All
          </label>
          <label>
            <input type="radio" name="status" /> IPD
          </label>
          <label>
            <input type="radio" name="status" /> OPD
          </label>
          <label>Status:</label>
          <label>
            <input type="radio" name="status" /> Both
          </label>
          <label>
            <input type="radio" name="status" /> Active
          </label>
          <label>
            <input type="radio" name="status" /> Cancelled
          </label>
        </div> */}
      </div>

      <div className="ErRegister">
        <div className="ErRegister-date-range">
          <label htmlFor="from-date">From:</label>
          <input
            type="date"
            id="from-date"
            value={dateRange.from}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, from: e.target.value }))
            }
          />
          <label htmlFor="to-date">To:</label>
          <input
            type="date"
            id="to-date"
            value={dateRange.to}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, to: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="ErRegister-search-container">
        <input
          type="text"
          className="ErRegister-search-box"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <div className="ErRegister-search-container">
          <div className="ErRegister-search-right">
            <span className="purchase-results-count-span">
              Showing {filteredReceipts.length} / {goodReceipts.length} results
            </span>
            <button className="ErRegister-print-button" onClick={handleExport}>
              <i className="fa-solid fa-file-excel"></i> Export
            </button>
            <button className="ErRegister-print-button" onClick={handlePrint}>
              <i className="fa-solid fa-print"></i> Print
            </button>
          </div>
        </div>
      </div>

      <table ref={tableRef}>
        <thead>
          <tr>
            {[
              "Er No",
              "Patient Type",
              "Patient Name",
              "DOB",
              "Contact Number",
              "Gender",
              "Relative Name",
              "Date ",
              "Actions",
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
          {loading ? (
            <tr>
              <td colSpan="10" className="ErRegister-no-rows">
                Loading...
              </td>
            </tr>
          ) : erData.length > 0 ? (
            erData.map((receipt) => (
              <tr key={receipt.goodReceiptId} className="parent-row">
                <td>{receipt.erNumber}</td>
                <td>{receipt.patientType || "N/A"}</td>
                <td>
                  {receipt.firstName || ""} {receipt.middleName || ""}{" "}
                  {receipt.lastName || ""}
                </td>
                <td>{receipt.dob || "N/A"}</td>
                <td>{receipt.contactNumber || "N/A"}</td>
                <td>{receipt.sex || "N/A"}</td>
                <td>{receipt.relativeName || "N/A"}</td>
                <td>{receipt.date || "N/A"}</td>
                <td>
                  {receipt.patientType === "new" && (
                    <button
                      className="ErRegister-print-button"
                      onClick={() => handleAddPatient(receipt)}
                      disabled={receipt.patientType === "old"}
                    >
                      Generate MR NO
                    </button>
                  )}
                  <button
                    className="ErRegister-print-button"
                    onClick={() => handleERClinicalEntries(receipt)}
                    disabled={receipt.patientType === "new"}
                  >
                    Add
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="ErRegister-no-rows">
                No Rows To Show
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <CustomModal isOpen={showEditModal} onClose={handleCloseModal}>
        <ErInitialAssessmentForm />
      </CustomModal>
    </div>
  );
};

export default ErRegister;
