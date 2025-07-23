import React, { useState, useEffect, useRef } from "react";
// import { Modal } from 'react-bootstrap';
import axios from "axios";
import "./ErRegister.css";
import ErInitialAssessmentForm from "../ErInitialAssessmentForm/ErInitialAssessmentForm";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
// import { API_BASE_URL } from '../api/api';
import * as XLSX from "xlsx";
import CustomModal from "../../../CustomModel/CustomModal";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../api/api";
import { useFilter } from "../../ShortCuts/useFilter";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');

  const fetchErData = async () => {
    try {
      // http://192.168.1.65:8080/api/pharmacy-good-receipt
      // const response = await axios.get(`${API_BASE_URL}/pharmacy-good-receipt`);
      const response = await axios.get(
        `${API_BASE_URL}/emergency/er-initial-assessment`
      );
      setErData(response.data);
      console.log('====================================');
      console.log(erData);
      console.log('====================================');
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
    navigate("/emergency/erclinicalentries", { state: { receipt } });
  };

  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "PurchaseOrderReport");
    XLSX.writeFile(wb, "PurchaseOrderReport.xlsx");
  };

  const handlePrint = () => {
    const printContent = tableRef.current;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filterByDate = (data) => {
    if (!dateFrom || !dateTo) return data; // If no dates, return all data
    return data.filter((item) => {
      const erDate = new Date(item.date );
      const startDate = new Date(dateFrom);
      const endDate = new Date(dateTo);
      return erDate >= startDate && erDate <= endDate;
    });
  };

  const erDatas = useFilter(filterByDate(erData), searchTerm);


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
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <label htmlFor="to-date">To:</label>
          <input
            type="date"
            id="to-date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>
      </div>

      <div className="ErRegister-search-container">
        <input
          type="text"
          className="ErRegister-search-box"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />


        <div className="ErRegister-search-container">
          <div className="ErRegister-search-right">
            <span className="purchase-results-count-span">
            Showing {erData.length}/{erData.length} results           
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
          ) : erDatas.length > 0 ? (
            erDatas.map((receipt) => (
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
                  <button
                    className="ErRegister-print-button"
                    onClick={() => handleAddPatient(receipt)}
                    disabled={receipt.patientType === "old"}
                  >
                    {receipt.patientType === "new"
                      ? "Generate MR NO"
                      : "Already MR No"}
                  </button>
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
