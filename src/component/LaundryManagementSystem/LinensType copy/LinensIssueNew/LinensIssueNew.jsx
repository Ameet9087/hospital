
import React, { useState, useRef, useEffect } from "react";
import "./LinensIssueNew.css";
import LinensIssueNewPopUp from "./LinensIssueNewPopUp";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import { API_BASE_URL } from '../../../api/api'
import * as XLSX from 'xlsx';

const FloatingInput = ({ label, type = "text", value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
    if (props.onChange) props.onChange(e);
  };

  return (
    <div className={`LinensIssueNew-form-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <input
        type={type}
        className="LinensIssueNew-form-floating-input"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value.length > 0);
        }}
        onChange={handleChange}
        {...props}
      />
      <label className="LinensIssueNew-form-floating-label">{label}</label>
    </div>
  );
};

// FloatingSelect component remains exactly the same
const FloatingSelect = ({ label, options = [], value, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!value);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  return (
    <div className={`LinensIssueNew-form-floating-field ${(isFocused || hasValue) ? 'active' : ''}`}>
      <select
        className="LinensIssueNew-form-floating-select"
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={(e) => {
          setIsFocused(false);
          setHasValue(e.target.value !== '');
        }}
        onChange={(e) => {
          setHasValue(e.target.value !== '');
          if (props.onChange) props.onChange(e);
        }}
        {...props}
      >
        <option value="">{ }</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>{option.label}</option>
        ))}
      </select>
      <label className="LinensIssueNew-form-floating-label">{label}</label>
    </div>
  );
};
const LinensIssueNew = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [linensData, setLinensData] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredData, setFilteredData] = useState([]);
  const [packageTableRows, setPackageTableRows] = useState([
    {
      employeeType: "",
      employeeCode: "",
      employeeName: "",
      designation: "",
      remarks: "",
    },
  ]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/linens-issues`)
      .then((res) => res.json())
      .then((data) => {
        setLinensData(data);
        setFilteredData(data); // Ensure all data is shown initially
      })
      .catch((err) => {
        console.error("Error fetching linens data:", err);
      });
  }, [showPopup]);

  const openPopup = (issue = null) => {
    setSelectedIssue(issue);
    setShowPopup(true);
  };

  const closePopup = () => {
    setSelectedIssue(null);
    setShowPopup(false);
  };

  const handleSaveOrUpdate = (issueData) => {
    const method = issueData.currentOccupancy ? "PUT" : "POST";
    const url = issueData.currentOccupancy
      ? `${API_BASE_URL}/linens-issues/${issueData.id}`
      : `${API_BASE_URL}/linens-issues`;

    console.log(response)

    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(issueData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to save or update issue");
        }
        return res.json();
      })
      .then(() => {
        setShowPopup(false);
        fetch(`${API_BASE_URL}/linens-issues`)
          .then((res) => res.json())
          .then((data) => setLinensData(data));
      })
      .catch((err) => {
        console.error("Error saving or updating issue:", err);
      });
  };
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  
    if (!value) {
      setFilteredData(linensData); // Show all data if search is empty
      return;
    }
  
    const filtered = linensData.filter((issue) =>
      [
        issue.issueNumber?.toString(),
        issue.issueDate, 
        issue.issueTime,
        issue.issueType,
        issue.nursingStation,
        issue.currentOccupancy?.toString()
      ].some((val) => val && val.toLowerCase().includes(value)) 
    );
  
    setFilteredData(filtered);
  };
  const handleExport = () => {
    if (tableRef.current) {
      // Converts table to worksheet
      const ws = XLSX.utils.table_to_sheet(tableRef.current);
      const wb = XLSX.utils.book_new(); // Creates a new workbook
      XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Adds the worksheet to the workbook
      XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Downloads the Excel file
    } else {
      console.error('Table reference is missing.');
    }
  };
  const printList = () => {
    if (tableRef.current) {
      const printContents = tableRef.current.innerHTML;

      // Create an iframe element
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";

      // Append the iframe to the body
      document.body.appendChild(iframe);

      // Write the table content into the iframe's document
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
        <head>
          
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            button, .admit-actions, th:nth-child(10), td:nth-child(10) {
              display: none; /* Hide action buttons and Action column */
            }
          </style>
        </head>
        <body>
          <table>
            ${printContents}
          </table>
        </body>
        </html>
      `);
      doc.close();

      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      document.body.removeChild(iframe);
    }
  };
  

  return (
    <div className="LinensIssueNew-container">
      <div className="LinensIssueNew-addBtn">
        <button
          className="LinensIssueNew-add-button"
          onClick={() => openPopup()}
        >
          + Add New Linens Issue
        </button>
      </div>
      <div className="LinensIssueNew-search-N-result">
        <div className="LinensIssueNew-search-field">
          <FloatingInput label="Search" 
            value={searchTerm}
            onChange={handleSearchChange}/>
          {/* <button
            className="LinensIssueNew-search-icon"
            onClick={() => fetchLinenTypes("billNo")}
          >
            <svg viewBox="0 0 24 24" width="16" height="16">
              <path
                fill="currentColor"
                d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14z"
              />
            </svg>
          </button> */}
        </div>
        <div className="LinensIssueNew-results-info">
          <span>
            Showing {linensData?.length} / {linensData?.length} results
          </span>
          <button className="LinensIssueNew-print-button" onClick={handleExport}>
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="LinensIssueNew-print-button" onClick={printList}>
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Issue Number",
                "Issue Date",
                "Issue Time",
                "Linens Issue Type",
                "Nursing Station",
                "Current Occupancy",
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
            {filteredData.map((issue, index) => (
              <tr key={index}>
                <td>{issue.currentOccupancy}</td>
                <td>{issue.issueDate}</td>
                <td>{issue.issueTime}</td>
                <td>{issue.issueType}</td>
                <td>{issue.nursingType}</td>
                <td>{issue.currentOccupancy}</td>
                <td>
                  <button
                    className="LinensIssueNew-edit-button"
                    onClick={() => openPopup(issue)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <LinensIssueNewPopUp
            issue={selectedIssue}
            onSave={handleSaveOrUpdate}
          />
        </CustomModal>
      )}
    </div>
  );
};

export default LinensIssueNew;
