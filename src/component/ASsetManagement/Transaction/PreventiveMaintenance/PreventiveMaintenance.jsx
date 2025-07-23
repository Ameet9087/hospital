import React, { useState, useRef, useEffect } from "react";
import "./PreventiveMaintenance.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import PreventiveMaintenanceForm from "./PreventiveMaintenanceForm";
import * as XLSX from "xlsx";
import { API_BASE_URL } from "../../../api/api";

const PreventiveMaintenance = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);
    const [maintenanceData, setMaintenanceData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        fetch(`${API_BASE_URL}/preventive-maintenance/cancellation`)
            .then((res) => res.json())
            .then((data) => {
                setMaintenanceData(data);
                setFilteredData(data);
            })
            .catch((err) => {
                console.error("Error fetching data:", err);
            });
    }, [showPopup]);

    const openPopup = () => setShowPopup(true);
    const closePopup = () => setShowPopup(false);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);

        const filtered = maintenanceData.filter((data) => {
            const equipment = data.preventiveMaintenanceCalibrationDTO.equipmentMasterDTO;
            const calibration = data.preventiveMaintenanceCalibrationDTO;
            return (
                equipment?.equipmentName.toLowerCase().includes(value) ||
                equipment?.serialNo.toLowerCase().includes(value) ||
                equipment?.assetLocationMaster?.subLocation.toLowerCase().includes(value) ||
                calibration?.periodType.toLowerCase().includes(value) ||
                equipment?.department?.departmentName.toLowerCase().includes(value) ||
                equipment?.equipmentNo.toLowerCase().includes(value) ||
                equipment?.assetCateMasterDTO?.assetCategory.toLowerCase().includes(value) ||
                equipment?.assetNo.toLowerCase().includes(value) ||
                data?.remark.toLowerCase().includes(value)
            );
        });

        setFilteredData(filtered);
    };

    const handleExportToExcel = () => {
        const exportData = filteredData.map((data) => {
            const equipment = data.preventiveMaintenanceCalibrationDTO.equipmentMasterDTO;
            const calibration = data.preventiveMaintenanceCalibrationDTO;
            return {
                "Equipment Name": equipment?.equipmentName,
                "Serial No": equipment?.serialNo,
                "Location": equipment?.assetLocationMaster?.subLocation,
                "Maintenance Type": calibration?.periodType,
                "Responsible Department": equipment?.department?.departmentName,
                "PM Date": new Date(calibration?.preventiveMaintenanceDate).toLocaleDateString(),
                "Equipment No": equipment?.equipmentNo,
                "Period Type": calibration?.periodType,
                "Category": equipment?.assetCateMasterDTO?.assetCategory,
                "Asset No": equipment?.assetNo,
                "Remarks": data?.remark,
            };
        });

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Preventive Maintenance");
        XLSX.writeFile(wb, "PreventiveMaintenance.xlsx");
    };

    const handlePrint = () => {
        const printContent = tableRef.current;
        const newWindow = window.open("", "_blank");
        newWindow.document.write(`
          <html>
            <head>
              <title>Print Table</title>
              <h4>Preventive Maintenance  Report</h4>
              <style>
                table {
                  width: 100%;
                  border-collapse: collapse;
                }
                th, td {
                  border: 1px solid black;
                  padding: 8px;
                  text-align: left;
                }
                th {
                  background-color: #f2f2f2;
                }
              </style>
            </head>
            <body>
              ${printContent.outerHTML}
            </body>
          </html>
        `);
        newWindow.document.close();
        newWindow.print();
        newWindow.close();
      };

    return (
        <div className="Preventive-Maintainance-container">
            <div className="Preventive-Maintainance-addBtn">
                <button
                    className="Preventive-Maintainance-add-button"
                    onClick={openPopup}
                >
                    + Add New Preventive Maintenance
                </button>
            </div>

            <div className="Preventive-Maintainance-search-N-result">
                <div className="Preventive-Maintainance-search-bar">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={handleSearch}
                    />
                </div>
                <div className="Preventive-Maintainance-results-info">
                    <span>
                        Showing {filteredData.length} / {maintenanceData.length} results
                    </span>
                    <button
                        className="Preventive-Maintainance-print-button"
                        onClick={handleExportToExcel}
                    >
                        <i className="fa-solid fa-file-excel"></i> Export
                    </button>
                    <button
                        className="Preventive-Maintainance-print-button"
                        onClick={handlePrint}
                    >
                        <i className="fa-solid fa-print"></i> Print
                    </button>
                </div>
            </div>
            <div className="table-container" id="table-to-print">
                <table ref={tableRef}>
                    <thead>
                        <tr>
                            {[
                                "Equipment Name",
                                "Serial No",
                                "Location",
                                "Maintenance Type",
                                "Responsible Department",
                                "PM Date",
                                "Equipment No",
                                "Period Type",
                                "Category",
                                "Asset No",
                                "Remarks",
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
                        {filteredData.map((data, index) => {
                            const equipment = data.preventiveMaintenanceCalibrationDTO.equipmentMasterDTO;
                            const calibration = data.preventiveMaintenanceCalibrationDTO;
                            return (
                                <tr key={index}>
                                    <td>{equipment?.equipmentName}</td>
                                    <td>{equipment?.serialNo}</td>
                                    <td>{equipment?.assetLocationMaster?.subLocation}</td>
                                    <td>{calibration?.periodType}</td>
                                    <td>{equipment?.department?.departmentName}</td>
                                    <td>{new Date(calibration?.preventiveMaintenanceDate).toLocaleDateString()}</td>
                                    <td>{equipment?.equipmentNo}</td>
                                    <td>{calibration?.periodType}</td>
                                    <td>{equipment?.assetCateMasterDTO?.assetCategory}</td>
                                    <td>{equipment?.assetNo}</td>
                                    <td>{data?.remark}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {showPopup && (
                <CustomModal isOpen={showPopup} onClose={closePopup}>
                    <PreventiveMaintenanceForm />
                </CustomModal>
            )}
        </div>
    );
};

export default PreventiveMaintenance;
