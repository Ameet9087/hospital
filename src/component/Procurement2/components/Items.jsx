import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // For API call
import "./Items.css";
import AddItem from "../components/AddItem";
import UpdateItem from "../components/UpdateItem";
import CustomModal from "../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../api/api";
import * as XLSX from 'xlsx';
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";

const ItemList = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]); // State to store fetched items
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [terms, setTerms] = useState("");


  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Fetch items from API on component mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/items/getAllItem`);

        setItems(response.data); // Set fetched data to state
        setTerms(response.data);
        console.log(response.data);

      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Failed to load items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleModalOpen = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };


  // Function to export table to Excel
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
    <div className="ItemList-item-list-container">
      <div className="ItemList-header">
        <button className="ItemList-add-button" onClick={openAddModal}>
          Add Item
        </button>
        <div className="ItemList-sub-div">
          <div className="ItemList-search-bar">
            <input type="text" placeholder="Search" />
          </div>
          <div className="ItemList-results-info">
          <span>Showing {items.length} / {items.length} results</span>


            <button className="ItemList-export-button" onClick={handleExport}>
              Export
            </button>
            <button
              className="ItemList-Emergencyprint-button"
              onClick={printList}
            >
              Print
            </button>
          </div>
        </div>
      </div>
      <table ref={tableRef}>
        <thead>
          <tr>
            {[
              "Item Type",
              "Subcategory Name",
              "Item Name",
              "Item Code",
              "Unit",
              "Description",
              "Min Stock",
              "Standard Rate",
              "Is VAT Applicable",
              "Is Active",
              "Inventory Type",
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
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.subCategory?.category || "N/A"}</td>
              <td>{item.subCategory?.subCategoryName || "N/A"}</td>
              <td>{item.itemName}</td>
              <td>{item.itemCode}</td>
              <td>{item.unitOfMeasurement?.unitOfMeasurementName || "N/A"}</td>
              <td>{item.description || "N/A"}</td>
              <td>{item.minStockQuantity}</td>
              <td>{item.standardRate}</td>
              <td>{item.isVatApplicable ? "true" : "false"}</td>
              <td>{item.isActive ? "true" : "false"}</td>
              <td>{item.inventory}</td>
              <td>
                <button
                  className="ItemList-Emergencyedit-button"
                  onClick={() => handleModalOpen(item)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Item Modal */}
      <CustomModal isOpen={isAddModalOpen} onClose={closeAddModal}>
        <AddItem isOpen={isAddModalOpen} onClose={closeAddModal} />
      </CustomModal>

      {/* Edit Item Modal */}
      <CustomModal isOpen={isModalOpen} onClose={handleModalClose}>
        <AddItem
          terms={selectedItem}
          isOpen={isModalOpen}
          onClose={handleModalClose}
        />
      </CustomModal>
    </div>
  );
};

export default ItemList;
