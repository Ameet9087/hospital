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

  // Filter subcategories based on the search term
  const filteredSubCategories = subCategories.filter((subCategory) =>
    subCategory.subCategoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );



  // Function to export table to Excel
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
          <button className="SubCategoryList-print-button" onClick={handlePrint}>Print</button>
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
                  <td>{subCategory.isActive ? 'Yes' : 'No'}</td>
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
