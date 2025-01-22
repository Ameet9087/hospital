import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import axios for API requests
import "./AssetNewReplacementRequest.css";
import { startResizing } from "../../../TableHeadingResizing/resizableColumns";
import CustomModal from "../../../CustomModel/CustomModal";
import { API_BASE_URL } from "../../../api/api";
import AssetNewReplacementRequestPopUp from "./AssetNewReplacementRequestPopUp";

const AssetNewReplacementRequest = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [packageTableRows, setPackageTableRows] = useState([]);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  // Fetch data when component mounts
  useEffect(() => {
    const handleFetchData = async () => {
      try {
        // Fetch the replacement request data from the API
        const response = await axios.get(`${API_BASE_URL}/replacements`);
        console.log("API Response:", response.data);

        // Assuming the API returns an array of objects with the necessary data
        if (Array.isArray(response.data)) {
          const tableData = response.data.map((item) => ({
            equipmentNo: item.equipmentDTO.equipmentNo,
            doctorName: item.docterDTO.doctorName,
            departmentName: item.departmentDTO.departmentName,
            quantity: item.quantity,
            approvalTime: item.approvalTime || "N/A", // Map approvalTime from the API
            approvalDate: item.approvalDate, // Map approvalDate from the API
          }));

          setPackageTableRows(tableData); // Update the table with the response data
        } else {
          alert("Unexpected data format received.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch the data. Please try again.");
      }
    };

    handleFetchData(); // Call the function when the component mounts
  }, []); // Empty dependency array ensures this runs only once after the initial render

  const handleDeleteRow = (index) => {
    const updatedRows = packageTableRows.filter((_, rowIndex) => rowIndex !== index);
    setPackageTableRows(updatedRows);
  };

  return (
    <div className="AssetNewReplacementRequest-container">
      <div className="AssetNewReplacementRequest-addBtn">
        <button
          className="AssetNewReplacementRequest-add-button"
          onClick={openPopup}
        >
          + Add New Asset New/Replacement Request
        </button>
      </div>

      <div className="AssetNewReplacementRequest-search-N-result">
        <div className="AssetNewReplacementRequest-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input type="text" placeholder="Search..." />
        </div>
      </div>

      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "SN",
                "Doctor Name",
                "Department Name",
                "Quantity",
                "Approval Time",
                "Approval Date",
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
            {packageTableRows.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.doctorName}</td>
                <td>{row.departmentName}</td>
                <td>{row.quantity}</td>
                <td>{row.approvalTime}</td>
                <td>{row.approvalDate}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <CustomModal isOpen={showPopup} onClose={closePopup}>
          <AssetNewReplacementRequestPopUp />
        </CustomModal>
      )}
    </div>
  );
};

export default AssetNewReplacementRequest;
