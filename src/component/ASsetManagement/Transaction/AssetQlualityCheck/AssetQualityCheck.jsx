import React, { useState, useRef, useEffect } from "react";
import "./AssetQualityCheck.css"
import AssetQualityCheckPopUp from "./AssetQualityCheckPopUp";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import CustomModal from "../../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../../api/api";

const AssetQualityCheck = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [labTest, setLabTest] = useState(null);
  const [packageTableRows, setPackageTableRows] = useState([
    {
      employeeType: "",
      employeeCode: "",
      employeeName: "",
      designation: "",
      remarks: "",
    },
  ]);
  useEffect(() => {
    fetch(`${API_BASE_URL}/labTestSetting/getAll`)
      .then((res) => res.json())
      .then((data) => setLabTest(data))
      .catch((err) => {
        console.log(err);
      });
  }, [showPopup]);

  const openPopup = () => {
    setShowPopup(true);
  };
  // Add a new row to the table
  const handleAddRow = () => {
    setPackageTableRows((prevRows) => [
      ...prevRows,
      {
        sn: prevRows.length + 1,
        employeeType: "",
        employeeCode: "",
        employeeName: "",
        designation: "",
        remarks: "",
      },
    ]);
  };

  // Delete a row from the table
  const handleDeleteRow = (rowIndex) => {
    setPackageTableRows((prevRows) =>
      prevRows
        .filter((_, index) => index !== rowIndex)
        .map((row, idx) => ({ ...row, sn: idx + 1 })) // Recalculate SN
    );
  };
  // Handle autofill when an employee is selected
  const handleEmployeeChange = (rowIndex, employeeId) => {
    const selectedEmployee = employees.find((emp) => emp.id === parseInt(employeeId, 10));
    console.log(selectedEmployee);

    if (selectedEmployee) {
      const updatedRows = [...packageTableRows];
      updatedRows[rowIndex] = {
        ...updatedRows[rowIndex],
        employeeType: selectedEmployee.employeeType || "",
        employeeCode: selectedEmployee.employee.employeeCode || "",
        employeeName: selectedEmployee.employee.employeeName || "",
        designation: selectedEmployee.employee.designation || "",
        remarks: selectedEmployee.remarks || "",
      };
      setPackageTableRows(updatedRows);
    }
  };
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="AssetQualityCheck-container">
      <div className="AssetQualityCheck-addBtn">
        <button
          className="AssetQualityCheck-add-button"
          onClick={openPopup}
        >
          + Add New Asset Quality Check
        </button>
      </div>


      <div className="AssetQualityCheck-search-N-result">
        <div className="AssetQualityCheck-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." />
        </div>
        <div className="AssetQualityCheck-results-info">
          <span>
            Showing {labTest?.length} / {labTest?.length} results
          </span>
          <button className="AssetQualityCheck-print-button">
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="AssetQualityCheck-print-button">
            <i class="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[

                "Record No",
                "Quality Check Date",
                "Select Equipment",
                "Name of Equipment",
                "Equipment No",
                "Asset No",
                "Location",
                "Make & Serial No",
                "Category",
                "Company Brand",
                "Depreciation",
                "Model No",
                "Responsibility Person",
                "PO No",
                "PO Date",
                "Invoice No",
                "Invoice Date",
                "AMC From Date",
                "AMC To Date",
                "AMC/CMC Service From Company",
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
            {labTest != null &&
              labTest.map((test, index) => (
                <tr key={index}>
                  <td>{test?.labTestName}</td>
                  <td>{test?.reportingName}</td>
                  <td>{test?.Locations}</td>
                  <td>{test?.isActive ? "True" : "False"}</td>
                  <td>{test?.displaySequence}</td>
                  {/* <td>
                  <button
                    className="AssetQualityCheck-edit-button"
                    onClick={handleAddNewLabTestClick}
                  >
                    Edit
                  </button>
                  <button className="AssetQualityCheck-deactivate-button">
                    Deactivate
                  </button>
                </td> */}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <AssetQualityCheckPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default AssetQualityCheck;
