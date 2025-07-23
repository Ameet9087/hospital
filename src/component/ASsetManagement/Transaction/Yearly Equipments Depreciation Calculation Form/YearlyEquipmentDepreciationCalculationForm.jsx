import React, { useState, useEffect, useRef } from "react";
import "./YearlyEquipmentdepreciationCalculationForm.css";
import { API_BASE_URL } from "../../../api/api";
import { toast } from "react-toastify";
import { FloatingInput, FloatingSelect } from "../../../../FloatingInputs";
const YearlyEquipmentDepreciationCalculationForm = ({ bookingId }) => {
  const [id, setId] = useState(bookingId || "");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [selectedType, setSelectedType] = useState("Category");
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showModal, setShowModal] = useState(true); // State to control modal visibility

  // Fetch data based on the selected type
  const fetchData = async () => {
    try {
      const url =
        selectedType === "Category"
          ? `${API_BASE_URL}/asset-categories`
          : `${API_BASE_URL}/equipment-masters`;

      const response = await fetch(url);
      const result = await response.json();

      if (result && result.length > 0) {
        setData(result);
        if (selectedType === "Category") {
          setId(result[0].categoryId);
        } else {
          setId(result[0].equipmentMasterId);
        }
      } else {
        setData([]);
        setId("");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedType]);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setId("");
    setData([]);
  };

  const handleSave = async () => {
    let payload;

    if (selectedType === "Category") {
      payload = {
        type: "Annual",
        fromDate,
        toDate,
        assetCateMasterDTO: {
          categoryId: id,
        },
      };
    } else if (selectedType === "Equipment") {
      payload = {
        type: "Other",
        fromDate,
        toDate,
        equipmentMasterDTO: {
          equipmentMasterId: id,
        },
      };
    }

    try {
      const response = await fetch(`${API_BASE_URL}/depreciation-forms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("Data saved successfully!");
      } else {
        const errorText = await response.text();
        console.error("Error saving data:", errorText);
        toast.error("Failed to save data. Please check and try again.");
      }
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("An error occurred while saving data.");
    }
  };

  const handleClose = () => {
    setShowModal(false); // Hide the modal
  };

  const handlePrint = () => {
    window.print(); // Trigger print dialog
  };

  const handleExport = () => {
    const csvRows = [];
    const headers =
      selectedType === "Category"
        ? ["SN", "Category Name", "Under Category", "Depreciation"]
        : ["SN", "Equipment Name", "Equipment No", "Cost"];

    csvRows.push(headers.join(","));

    data.forEach((row, index) => {
      const rowData =
        selectedType === "Category"
          ? [index + 1, row.assetCategory, row.underCategory, row.depreciation]
          : [index + 1, row.equipmentName, row.equipmentNo, row.cost];

      csvRows.push(rowData.join(","));
    });

    const csvData = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const csvUrl = URL.createObjectURL(csvData);
    const link = document.createElement("a");
    link.href = csvUrl;
    link.download = "depreciation_data.csv";
    link.click();
  };

  // If modal is not visible, return null (hide the modal)
  if (!showModal) return null;

  return (
    <div className="YearlyEquipmentDepreciation-surgery-Events">
      <div className="YearlyEquipmentDepreciation-surgeryEvents-title-bar">
        <div className="YearlyEquipmentDepreciation-surgeryEvents-header">
          <span>Yearly Equipments Depreciation Calculation Form</span>
        </div>
      </div>
      <div className="YearlyEquipmentDepreciation-surgeryEvents-content-wrapper">
        <div className="YearlyEquipmentDepreciation-surgeryEvents-main-section">
          <div className="YearlyEquipmentDepreciation-surgeryEvents-panel dis-templates">
            <div className="YearlyEquipmentDepreciation-surgeryEvents-panel-content">
              <div className="YearlyEquipmentDepreciation-surgeryEvents-form-row">
                <FloatingSelect
                  label={"Type"}
                  onChange={handleTypeChange}
                  value={selectedType}
                  options={[
                    { value: "", label: "" },
                    { value: "Category", label: "Category" },
                    { value: "Equipment", label: "Equipment" },
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="YearlyEquipmentDepreciation-surgeryEvents-panel operation-details">
            <div className="YearlyEquipmentDepreciation-surgeryEvents-panel-content">
              <div className="YearlyEquipmentDepreciation-surgeryEvents-form-row">
                <FloatingSelect
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  options={[
                    { value: "", label: "Select an option" },
                    ...(Array.isArray(data)
                      ? data.map((loc) => ({
                          value: loc.categoryId || loc.equipmentMasterId, // Ensure it's a valid value
                          label:
                            selectedType === "Category"
                              ? loc.assetCategory
                              : loc.equipmentName, // Use loc instead of item
                        }))
                      : []),
                  ]}
                />
              </div>
            </div>
          </div>

          <div className="YearlyEquipmentDepreciation-surgeryEvents-panel operation-details">
            <div className="YearlyEquipmentDepreciation-surgeryEvents-panel-content">
              <div className="YearlyEquipmentDepreciation-surgeryEvents-form-row">
                <FloatingInput
                label={"From Date"}
                 type="date"
                 value={fromDate}
                 onChange={(e) => setFromDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="YearlyEquipmentDepreciation-surgeryEvents-panel operation-details">
            <div className="YearlyEquipmentDepreciation-surgeryEvents-panel-content">
              <div className="YearlyEquipmentDepreciation-surgeryEvents-form-row">
                <FloatingInput
                label={"To Date"}
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="YearlyEquipmentDepreciation-surgeryEvents-services-section">
          <div className="YearlyEquipmentDepreciation-services-table">
            <div className="YearlyEquipmentDepreciation-surgeryEvents-title-bar">
              <div className="YearlyEquipmentDepreciation-surgeryEvents-header">
                <span>Depreciation Details</span>
              </div>
            </div>
            <table ref={tableRef}>
              <thead>
                <tr>
                  {selectedType === "Category"
                    ? [
                        "SN",
                        "Category Name",
                        "Under Category",
                        "Depreciation",
                      ].map((header, index) => <th key={index}>{header}</th>)
                    : ["SN", "Equipment Name", "Equipment No", "Cost"].map(
                        (header, index) => <th key={index}>{header}</th>
                      )}
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((row, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {selectedType === "Category" ? (
                        <>
                          <td>{row.assetCategory}</td>
                          <td>{row.underCategory}</td>
                          <td>{row.depreciation}</td>
                        </>
                      ) : (
                        <>
                          <td>{row.equipmentName}</td>
                          <td>{row.equipmentNo}</td>
                          <td>{row.cost}</td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={selectedType === "Category" ? 4 : 4}>
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="YearlyEquipmentDepreciation-surgeryEvents-action-buttons">
          <button
            className="YearlyEquipmentDepreciation-btn-blue"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="YearlyEquipmentDepreciation-btn-gray"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            className="YearlyEquipmentDepreciation-btn-green"
            onClick={handlePrint}
          >
            Print
          </button>
          <button
            className="YearlyEquipmentDepreciation-btn-blue"
            onClick={handleExport}
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
};

export default YearlyEquipmentDepreciationCalculationForm;
