import React, { useState, useEffect, useRef } from "react";
import "./Terms.css";
import CustomModal from "../../../CustomModel/CustomModal";
import AddTermsAndConditions from "./AddTerms";
import { API_BASE_URL } from "../../api/api";
import * as XLSX from 'xlsx';
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";

const Terms = () => {
  const [terms, setTerms] = useState([]);
  const [filteredTerms, setFilteredTerms] = useState([]); // To store filtered terms based on search query
  const [isAddingTerm, setIsAddingTerm] = useState(false);
  const [isUpdatingTerm, setIsUpdatingTerm] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null); // To hold the term being edited


  const [columnWidths, setColumnWidths] = useState({});
  const [searchQuery, setSearchQuery] = useState(""); // To track the search query
  const tableRef = useRef(null);

  // Fetch terms from API on component mount
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/terms/getAll`);
        const data = await response.json();
        setTerms(data);
        setFilteredTerms(data); // Set the initial filtered terms
      } catch (error) {
        console.error("Error fetching terms:", error);
      }
    };

    fetchTerms();
  }, []);

  // Filter terms based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = terms.filter((term) =>
        term.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        term.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (term.isActive ? "true" : "false").includes(searchQuery.toLowerCase())
      );
      setFilteredTerms(filtered);
    } else {
      setFilteredTerms(terms); // If no search query, show all terms
    }
  }, [searchQuery, terms]);

  const handleAddButtonClick = () => {
    setIsAddingTerm(true);
  };

  const handleEditButtonClick = (term) => {
    setSelectedTerm(term); // Set the selected term for editing
    setIsUpdatingTerm(true);
  };

  const handleCloseAddTerm = () => {
    setIsAddingTerm(false);
  };

  const handleCloseUpdateTerm = () => {
    setIsUpdatingTerm(false);
    setSelectedTerm(null); // Reset the selected term
  };


  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "PurchaseOrderReport"); // Appends worksheet to workbook
    XLSX.writeFile(wb, "PurchaseOrderReport.xlsx"); // Downloads the Excel file
  };

  // Function to trigger print
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
    <div className="ateg-sub-category-container">
      <div className="ateg-content">
        <button className="ateg-add-button" onClick={handleAddButtonClick}>
          Add Terms And Conditions
        </button>

        <div className="ateg-search-bar">

          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
          />
          <div className="ateg-results-info">
            Showing {filteredTerms.length} results
            <button className="ateg-print-button" onClick={handleExport}>
              Export
            </button>
            <button className="ateg-print-button" onClick={printList}>
              Print
            </button>
          </div>
        </div>

        <table ref={tableRef}>
          <thead>
            <tr>
              {["Short Name", "Text", "Is Active", "Action"].map(
                (header, index) => (
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
                )
              )}
            </tr>
          </thead>

          <tbody>
            {filteredTerms.map((term, index) => (
              <tr key={index}>
                <td>{term.shortName}</td>
                <td>{term.text}</td>
                <td>{term.isActive}</td>
                <td>
                  <button
                    className="ateg-edit-button"
                    onClick={() => handleEditButtonClick(term)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup for Adding Term */}
      <CustomModal isOpen={isAddingTerm} onClose={handleCloseAddTerm}>
        <AddTermsAndConditions />
      </CustomModal>

      {/* Popup for Updating Term */}
      <CustomModal isOpen={isUpdatingTerm} onClose={handleCloseUpdateTerm}>
        <AddTermsAndConditions terms={selectedTerm} />
      </CustomModal>
    </div>
  );
};

export default Terms;
