import React, { useState, useRef, useEffect } from "react";
import "./Replacementinstruments.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import * as XLSX from "xlsx";
import ReplacementInstrumentsPopUp from "./ReplacementInstrumentsPopUp";
import { API_BASE_URL } from '../../../api/api';

const ReplacementInstruments = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [replacementInstruments, setReplacementInstruments] = useState([]); // State to store replacement data
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query

  useEffect(() => {
    // Fetch data from the API
    fetch(`${API_BASE_URL}/replacement-instruments`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setReplacementInstruments(data);
      })
      .catch((err) => {
        console.error("Failed to fetch replacement instruments:", err);
      });
  }, [showPopup]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Filter replacement instruments based on the search query
  const filteredReplacementInstruments = replacementInstruments.filter((instrument) =>
    Object.values(instrument)
      .some((value) => value && value.toString().toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Handle Export to Excel
  const handleExport = () => {
    const exportData = replacementInstruments.map((instrument) => ({
      "Replacement ID": instrument.replacementId,
      "Replacement Name": instrument.replacementName,
      "Type": instrument.type,
      "Manufacturer": instrument.manufacturer,
      "Quantity": instrument.quantity,
      "Remark": instrument.remark,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Replacement Instruments");
    XLSX.writeFile(workbook, "Replacement_Instruments.xlsx");
  };

  return (
    <div className="PreventiveMaintenanceCalibration-container">
      <div className="PreventiveMaintenanceCalibration-addBtn">
        <button className="PreventiveMaintenanceCalibration-add-button" onClick={openPopup}>
          + Add New Replacement Instruments
        </button>
      </div>

      <div className="PreventiveMaintenanceCalibration-search-N-result">
        <div className="PreventiveMaintenanceCalibration-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="PreventiveMaintenanceCalibration-results-info">
          <span>
            Showing {filteredReplacementInstruments.length} / {replacementInstruments.length} results
          </span>
          <button
            className="PreventiveMaintenanceCalibration-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="PreventiveMaintenanceCalibration-print-button"
            onClick={() => window.print()}
          >
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Replacement ID",
              
                "Type",
                "Manufacturer",
                "Quantity",
                "Remark",
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
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
  {filteredReplacementInstruments.length > 0 ? (
    filteredReplacementInstruments.map((instrument, index) => (
      <tr key={index}>
        <td>{instrument.replacementId}</td>
        
        <td>{instrument.repType || "N/A"}</td>
        <td>{instrument.equipmentReplacementDTO?.equipmentDTO?.type || "N/A"}</td>
        <td>{instrument.equipmentReplacementDTO?.equipmentDTO?.equipmentName || "N/A"}</td>
        <td>{instrument.equipmentReplacementDTO?.dmsRemark || "N/A"}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6">No data available</td>
    </tr>
  )}
</tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <ReplacementInstrumentsPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default ReplacementInstruments;
