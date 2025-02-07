import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./AutopsyexecutionForm.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../CustomModel/CustomModal";
import * as XLSX from "xlsx";
import AutopsyExecutionFormPopUp from "./AutopsyExecutionFormPopUp";
import { API_BASE_URL } from "../../api/api";

const AutopsyExecutionForm = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [autopsyData, setAutopsyData] = useState([]);
  const [data, setData] = useState("")

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/autopsy-execution-forms`);
        setAutopsyData(response.data || []);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const filteredAutopsyData = autopsyData.filter((tracker) => {
    const searchTermLower = searchQuery.toLowerCase();
    return (
      tracker?.autopsyExecutionFormId?.toString().includes(searchTermLower) ||
      tracker?.sampleID?.toString().includes(searchTermLower) ||
      tracker?.sampleStatus?.toLowerCase().includes(searchTermLower) ||
      tracker?.toxicologyTest?.toLowerCase().includes(searchTermLower) ||
      tracker?.microbiologyTest?.toLowerCase().includes(searchTermLower) ||
      tracker?.histopathologyTest?.toLowerCase().includes(searchTermLower)
    );
  });

  const handleExport = () => {
    const exportData = autopsyData.map((tracker) => ({
      "Autopsy Execution Form ID": tracker.autopsyExecutionFormId || "",
      "External Examination Findings": tracker.externalExaminationFindings || "",
      "Internal Examination Findings": tracker.internalExaminationFindings || "",
      "Samples Collected": tracker.samplesCollected || "",
      "Specify": tracker.specify || "",
      "Sample ID": tracker.sampleID || "",
      "Sample Status": tracker.sampleStatus || "",
      "Toxicology Test": tracker.toxicologyTest || "",
      "Microbiology Test": tracker.microbiologyTest || "",
      "Histopathology Test": tracker.histopathologyTest || "",
      "Other Test": tracker.otherTest || "",
      "Additional Notes": tracker.additionalNotes || ""
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Autopsy Execution Details");
    XLSX.writeFile(workbook, "Autopsy_Execution_Details.xlsx");
  };
  const 
  printList = () => {
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
    <div className="AtopsyPopUp-container">
      <div className="AtopsyPopUp-addBtn">
        <button className="AtopsyPopUp-add-button" onClick={openPopup}>
          + Add New Autopsy Execution
        </button>
      </div>

      <div className="AtopsyPopUp-search-N-result">
        <div className="AtopsyPopUp-search-bar">
          {/* <i className="fa-solid fa-magnifying-glass"></i> */}
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="AtopsyPopUp-results-info">
        <span className="PurchaseOrder-results">
              Showing {filteredAutopsyData.length} results
            </span>
          <button className="AtopsyPopUp-print-button" onClick={handleExport}>
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="AtopsyPopUp-print-button"
            onClick={printList}
          >
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div className="AtopsyPopUp-table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "SN",
                "Autopsy Execution Form ID",
                "Sample ID",
                "Sample Status",
                "Toxicology Test",
                "Microbiology Test",
                "Histopathology Test",
                "Other Test",
                "Samples Collected",
                "Additional Notes"
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
            {filteredAutopsyData.map((tracker, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{tracker.autopsyExecutionFormId || ""}</td>
                <td>{tracker.sampleID || ""}</td>
                <td>{tracker.sampleStatus || ""}</td>
                <td>{tracker.toxicologyTest || ""}</td>
                <td>{tracker.microbiologyTest || ""}</td>
                <td>{tracker.histopathologyTest || ""}</td>
                <td>{tracker.otherTest || ""}</td>
                <td>{tracker.samplesCollected || ""}</td>
                <td>{tracker.additionalNotes || ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <AutopsyExecutionFormPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default AutopsyExecutionForm;