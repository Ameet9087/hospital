import React, { useState, useEffect, useRef } from "react";
import Modal from "react-modal";
import axios from "axios";
import AddUnitOfMeasurement from "../components/AddUnitOfMeasurement"; // Ensure these imports are correct
import UpdateUnitOfMeasurement from "../components/UpdateUnitOfMeasurement";
import { useReactToPrint } from "react-to-print";
import "./UnitOfMeasurement.css";
import CustomModal from "../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../api/api";
import { startResizing } from "../../TableHeadingResizing/resizableColumns";
import * as XLSX from 'xlsx';

Modal.setAppElement("#root");

const UnitOfMeasurementComponent = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [unitOfMeasurements, setUnitOfMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);


  const [columnWidths,setColumnWidths] = useState({});
  const tableRef=useRef(null);

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
  const handlePrint = () => {
    window.print(); // Triggers the browser's print window
  };



  return (
    <div className="unit-of-measurement-container">
      <div className="uom-header">
        <button className="uom-add-button" onClick={openAddModal}>
          Add Unit of Measurement
        </button>
      </div>
      <div className="uom-filter">
        <div className="uom-search-bar">
          <input type="text" placeholder="Search" />
        </div>
        <div className="uom-results-info">
          Showing {unitOfMeasurements.length} / {unitOfMeasurements.length}{" "}
          results
          <button className="uom-print-button"onClick={handleExport}>Export</button>
          <button className="uom-print-button" onClick={handlePrint}>
            Print
          </button>
        </div>
        </div>

      <div ref={tableRef} className="table-container">
      <table  ref={tableRef}>
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
            {unitOfMeasurements.map((unit, index) => (
              <tr key={index}>
                <td>{unit.name}</td>
                <td>{unit.description}</td>
                <td>{unit.isActive }</td>
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
        <AddUnitOfMeasurement onClose={closeAddModal}/>
        
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
