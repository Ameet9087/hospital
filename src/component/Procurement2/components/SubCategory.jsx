import React, { useEffect, useState, useRef } from 'react';
import './SubCategory.css';
import AddItemSubCategory from '../components/AddItemSubCategory';
import UpdateSubCategory from '../components/UpdateSubCategory';
import CustomModal from '../../../CustomModel/CustomModal';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import { API_BASE_URL } from '../../api/api';
import * as XLSX from 'xlsx';

const SubCategoryList = () => {
  const [isAddingSubCategory, setIsAddingSubCategory] = useState(false);
  const [isUpdatingSubCategory, setIsUpdatingSubCategory] = useState(false);
  const [subCategories, setSubCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const [selectedItem, setSelectedItem] = useState({});


  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/subcategories/fetchAll`)
      .then((response) => response.json())
      .then((data) => setSubCategories(data))
      .catch((error) => console.error('Error fetching subcategories:', error));
  }, []);

  const handleAddButtonClick = () => {
    setIsAddingSubCategory(true);
  };

  const handleEditButtonClick = (item) => {
    setSelectedItem(item);
    setIsUpdatingSubCategory(true);
  };

  const handleCloseAddSubCategory = () => {
    setIsAddingSubCategory(false);
  };

  const handleCloseUpdateSubCategory = () => {
    setIsUpdatingSubCategory(false);
  };


  const filteredSubCategories = subCategories.filter((subCategory) =>
    subCategory?.subCategoryName?.toLowerCase().includes(searchTerm.toLowerCase())
  );




  // Function to export table to Excel
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Downloads the Excel file
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
    <div className="SubCategoryList-container">
      <div className="SubCategoryList-content">
        <button className="SubCategoryList-add-button" onClick={handleAddButtonClick}>
          Add Sub Category
        </button>


        <div className="SubCategoryList-search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="SubCategoryList-results-info">
          Showing {filteredSubCategories.length} results

          <button className="SubCategoryList-print-button" onClick={handleExport}>Export</button>
          <button className="SubCategoryList-print-button" onClick={printList}>Print</button>
        </div>

        <div className="table-container">
          <table ref={tableRef}>
            <thead>
              <tr>
                {[
                  "Sub Category Name",
                  "Code",
                  "Category",
                  "Description",
                  "Ledger Name",
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
              {filteredSubCategories.map((subCategory) => (
                <tr key={subCategory.id}>
                  <td>{subCategory.subCategoryName}</td>
                  <td>{subCategory.subCategoryCode}</td>
                  <td>{subCategory.category}</td>
                  <td>{subCategory.description}</td>
                  <td>{subCategory.accountingLedger}</td>
                  <td>{subCategory?.active ? "True" : "False"}</td>
                  <td>
                    <button
                      className="SubCategoryList-edit-button"
                      onClick={() => handleEditButtonClick(subCategory)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup for AddItemSubCategory */}
      <CustomModal isOpen={isAddingSubCategory} onClose={handleCloseAddSubCategory}>
        <AddItemSubCategory />
      </CustomModal>

      {/* Popup for UpdateSubCategory */}
      <CustomModal isOpen={isUpdatingSubCategory} onClose={handleCloseUpdateSubCategory}>
        <UpdateSubCategory subCategory={selectedItem} onClose={handleCloseUpdateSubCategory} />
      </CustomModal>
    </div>
  );
};

export default SubCategoryList;
