import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { useReactToPrint } from "react-to-print";
import AddPackagingType from "./AddPackagingType";
import UpdatePackagingType from "../components/UpdatePackagingType";
import "./PackagingType.css";
import CustomModal from "../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../api/api";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import * as XLSX from "xlsx";

Modal.setAppElement("#root");

const PackagingType = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPackagingType, setSelectedPackagingType] = useState(null);
  const [packagingTypes, setPackagingTypes] = useState([]);

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchPackagingTypes = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/packageType/getAllPackageType`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setPackagingTypes(data);
        console.log("Fetched Packaging Types:", data);
      } catch (error) {
        console.error("Error fetching packaging types:", error.message);
      }
    };

    fetchPackagingTypes();
  }, [showAddModal, showEditModal]);

  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  const openEditModal = (packagingType) => {
    setSelectedPackagingType(packagingType);
    setShowEditModal(true);
  };

  const closeEditModal = () => setShowEditModal(false);

  const handleAddPackagingType = (newPackagingType) => {
    setPackagingTypes([...packagingTypes, newPackagingType]);
    closeAddModal();
  };

  const handleUpdatePackagingType = (updatedPackagingType) => {
    setPackagingTypes((prevTypes) =>
      prevTypes.map((type) =>
        type.id === updatedPackagingType.id
          ? { ...type, ...updatedPackagingType } // Ensure changes are reflected
          : type
      )
    );
    closeEditModal();
  };


  // Function to export table to Excel
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, "PurchaseOrderReport"); // Appends worksheet to workbook
    XLSX.writeFile(wb, "PurchaseOrderReport.xlsx"); // Downloads the Excel file
  };

  // Function to trigger print
  const handlePrint = () => {
    window.print(); // Triggers the browser's print window
  };

  return (
    <div className="PackagingType-container">
      <div className="PackagingType-header">
        <div className="PackagingType-header-actions">
          <button className="PackagingType-add-button" onClick={openAddModal}>
            Add Packaging Type
          </button>
        </div>
      </div>
      <div className="PackagingType-results-info">
        <div className="PackagingType-search-bar">
          <input type="text" placeholder="Search" />
        </div>
        <div>
          <span>
            Showing {packagingTypes.length} / {packagingTypes.length} results
          </span>
          <button className="PackagingType-print-button" onClick={handleExport}>
            Export
          </button>
          <button
            className="PackagingType-print-button"
            onClick={handlePrint}
            aria-label="Print"
          >
            Print
          </button>
        </div>
      </div>

      <div ref={tableRef} className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Packaging Type Name",
                "Description",
                "Is Active",
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
            {packagingTypes.map((type) => (
              <tr key={type.id}>
                <td>{type.packagingTypeName}</td>
                <td>{type.description}</td>
                <td>{type.isActive}</td>
                <td>
                  <button
                    className="PackagingType-edit-button"
                    onClick={() => openEditModal(type)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CustomModal
        isOpen={showAddModal}
        onClose={closeAddModal}
        contentLabel="Add Packaging Type Modal"
      >
        <AddPackagingType
          onAdd={handleAddPackagingType}
          onClose={closeAddModal}
        />
      </CustomModal>

      <CustomModal
        isOpen={showEditModal}
        onClose={closeEditModal}
        contentLabel="Edit Packaging Type Modal"
      >
        <UpdatePackagingType
          packagingType={selectedPackagingType}
          onUpdate={handleUpdatePackagingType}
          onClose={closeEditModal}
        />
      </CustomModal>
    </div>
  );
};

export default PackagingType;
