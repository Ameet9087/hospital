import React, { useState, useEffect,useRef } from "react";
import "./Terms.css";
import CustomModal from "../../../CustomModel/CustomModal";
import AddTermsAndConditions from "./AddTerms";
import { API_BASE_URL } from "../../api/api";
import * as XLSX from 'xlsx';
import { startResizing } from "../../TableHeadingResizing/resizableColumns";
const Terms = () => {
  const [terms, setTerms] = useState([]);
  const [isAddingTerm, setIsAddingTerm] = useState(false);
  const [isUpdatingTerm, setIsUpdatingTerm] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState(null); // To hold the term being edited



  const [columnWidths,setColumnWidths] = useState({});
  const tableRef=useRef(null);


  // Fetch terms from API on component mount
  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/terms/getAll`);
        const data = await response.json();
        setTerms(data);
      } catch (error) {
        console.error("Error fetching terms:", error);
      }
    };

    fetchTerms();
  }, []);

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
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Downloads the Excel file
  };

  // Function to trigger print
  const handlePrint = () => {
    window.print(); // Triggers the browser's print window
  };


  return (
    <div className="ateg-sub-category-container">
      <div className="ateg-content">
        <button className="ateg-add-button" onClick={handleAddButtonClick}>
          Add Terms And Conditions
        </button>

        <div className="ateg-search-bar">
          <input type="text" placeholder="Search" />
           <div className="ateg-results-info">
          Showing {terms.length} results
          <button className="ateg-print-button"onClick={handleExport}>Export</button>
          <button className="ateg-print-button"onClick={handlePrint}>Print</button>
        </div>
        </div>

       

        <table  ref={tableRef}>
          <thead>
            <tr>
              {[
                "Short Name",
  "Text",
  "Is Active",
  "Action"
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
            {terms.map((term, index) => (
              <tr key={index}>
                <td>{term.shortName}</td>
                <td>{term.text}</td>
                <td>{term.isActive ? "True" : "False"}</td>
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
        <AddTermsAndConditions/>
      </CustomModal>

      {/* Popup for Updating Term */}
      <CustomModal isOpen={isUpdatingTerm} onClose={handleCloseUpdateTerm}>
      <AddTermsAndConditions terms={selectedTerm}/>
      </CustomModal>
    </div>
  );
};

export default Terms;
