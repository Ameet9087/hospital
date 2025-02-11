import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import axios from "axios";
import AddUnitOfMeasurement from "../components/AddUnitOfMeasurement"; // Ensure these imports are correct
import UpdateUnitOfMeasurement from "../components/UpdateUnitOfMeasurement";
import { useReactToPrint } from "react-to-print";
import "./UnitOfMeasurement.css";
import CustomModal from "../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../api/api";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import * as XLSX from 'xlsx';

Modal.setAppElement("#root");

const UnitOfMeasurementComponent = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unitOfMeasurements, setUnitOfMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/unitofmeasurement/fetchAll`
        );
        setUnitOfMeasurements(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);
  const openEditModal = (unit) => {
    setSelectedUnit(unit);
    setShowEditModal(true);
  };
  const closeEditModal = () => setShowEditModal(false);



  if (loading) {
    return <div>Loading...</div>;
  }

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

  const filteredUnits = unitOfMeasurements.filter((unit) =>
    unit?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="unit-of-measurement-container">
      <div className="uom-header">
        <button className="uom-add-button" onClick={openAddModal}>
          Add Unit of Measurement
        </button>
      </div>
      <div className="uom-filter">
        <div className="uom-search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="uom-results-info">
          Showing {unitOfMeasurements.length} / {unitOfMeasurements.length}{" "}
          results

          <button className="uom-print-button" onClick={handleExport}>Export</button>
          <button className="uom-print-button" onClick={printList}>
            Print
          </button>
        </div>
      </div>

      <div ref={tableRef} className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Unit of Measurement Name",
                "Description",
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
            {filteredUnits.map((unit, index) => (
              <tr key={index}>
                <td>{unit.name}</td>
                <td>{unit.description}</td>
                <td>{unit.isActive}</td>
                <td>
                  <button
                    className="uom-edit-button"
                    onClick={() => openEditModal(unit)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding Unit of Measurement */}
      <CustomModal
        isOpen={showAddModal}
        onClose={closeAddModal}
        contentLabel="Add Unit of Measurement Modal"

      >
        <AddUnitOfMeasurement onClose={closeAddModal} />

      </CustomModal>

      <CustomModal
        isOpen={showEditModal}
        onClose={closeEditModal}
        contentLabel="Edit Unit of Measurement Modal"

      >
        {selectedUnit && (
          <UpdateUnitOfMeasurement
            unit={selectedUnit}
            closeModal={closeEditModal}
          />
        )}

      </CustomModal>
    </div>
  );
};

export default UnitOfMeasurementComponent;
