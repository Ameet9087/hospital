import React, { useState, useRef, useEffect } from "react";
import "./YearlyEquipmentDepreciationCalculationFormButton.css";
import CustomModal from "../../../CustomModel/CustomModal";
import YearlyEquipmentDepreciationCalculationForm from "./YearlyEquipmentDepreciationCalculationForm";
import { API_BASE_URL } from "../../../api/api";
const YearlyEquipmentDepreciationCalculationFormButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [depreciationData, setDepreciationData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch Depreciation data from the provided API
  useEffect(() => {
    fetch(`${API_BASE_URL}/depreciation-forms`)
      .then((res) => res.json())
      .then((data) => setDepreciationData(data))
      .catch((err) => {
        console.log("Error fetching depreciation data:", err);
      });
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const filteredData = depreciationData.filter((item) =>
    (item.depreciationCalculationId && item.depreciationCalculationId.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.type && item.type.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (item.equipmentMasterDTO?.equipmentName && item.equipmentMasterDTO?.equipmentName.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleExport = () => {
    const csvRows = [];
    const headers = ["Depreciation Calculation ID", "Type", "From Date", "To Date", "Equipment Name", "Cost", "Accumulated", "Net Value", "Category", "Depreciation", "Salvage"];
    csvRows.push(headers.join(","));

    filteredData.forEach((item) => {
      const row = [
        item.depreciationCalculationId,
        item.type,
        item.fromDate,
        item.toDate,
        item.equipmentMasterDTO?.equipmentName || "N/A",
        item.equipmentMasterDTO?.cost || "N/A",
        item.equipmentMasterDTO?.accumulated || "N/A",
        item.equipmentMasterDTO?.netValue || "N/A",
        item.assetCateMasterDTO?.assetCategory || "N/A",
        item.assetCateMasterDTO?.depreciation || "N/A",
        item.assetCateMasterDTO?.salvage || "N/A",
      ];
      csvRows.push(row.join(","));
    });

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "depreciation_data.csv";
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="YearlyEquipmentDepreciationCalculationFormButton-container">
      <div className="YearlyEquipmentDepreciationCalculationFormButton-addBtn">
        <button className="YearlyEquipmentDepreciationCalculationFormButton-add-button" onClick={openPopup}>
          + Add New Yearly Equipment Depreciation
        </button>
      </div>

      <div className="YearlyEquipmentDepreciationCalculationFormButton-search-N-result">
        <div className="YearlyEquipmentDepreciationCalculationFormButton-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} />
        </div>
        <div className="YearlyEquipmentDepreciationCalculationFormButton-results-info">
          <span>Showing {filteredData.length} / {filteredData.length} results</span>
          <button className="YearlyEquipmentDepreciationCalculationFormButton-print-button" onClick={handleExport}>
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="YearlyEquipmentDepreciationCalculationFormButton-print-button" onClick={handlePrint}>
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              <th>Depreciation Calculation ID</th>
              <th>Type</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Equipment Name</th>
              <th>Cost</th>
              <th>Accumulated</th>
              <th>Net Value</th>
              <th>Category</th>
              <th>Depreciation</th>
              <th>Salvage</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.depreciationCalculationId}</td>
                <td>{item.type}</td>
                <td>{item.fromDate}</td>
                <td>{item.toDate}</td>
                <td>{item.equipmentMasterDTO?.equipmentName || "N/A"}</td>
                <td>{item.equipmentMasterDTO?.cost || "N/A"}</td>
                <td>{item.equipmentMasterDTO?.accumulated || "N/A"}</td>
                <td>{item.equipmentMasterDTO?.netValue || "N/A"}</td>
                <td>{item.assetCateMasterDTO?.assetCategory || "N/A"}</td>
                <td>{item.assetCateMasterDTO?.depreciation || "N/A"}</td>
                <td>{item.assetCateMasterDTO?.salvage || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <YearlyEquipmentDepreciationCalculationForm closePopup={closePopup} />
        </CustomModal>
      )}
    </div>
  );
};

export default YearlyEquipmentDepreciationCalculationFormButton;
