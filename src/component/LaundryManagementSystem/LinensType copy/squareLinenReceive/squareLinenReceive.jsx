import React, { useState, useEffect, useRef } from "react";
import "./squareLinenReceive.css";
import { startResizing } from "../../../../TableHeadingResizing/ResizableColumns";
import axios from "axios";
import { API_BASE_URL } from "../../../api/api";

function SquareLinenReceive() {
  const [selectedTab, setSelectedTab] = useState("squareLinenReceive");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [servicesTableRows, setServicesTableRows] = useState([]);
  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/linens-issues`);
        const data = await response.json();
        console.log("API Response:", data);
        const formattedData = data.map((item) => ({
          // id: item.id,
          issueNumber: item.issueNumber || "N/A",
          name: item.issueType || "N/A",
          status: item.status || "N/A",
        }));
        setServicesTableRows(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTableData();
  }, []);

  // const handleIssueClick = async (id, index) => {
  //   try {
  //     const response = await axios.put(
  //       `${API_BASE_URL}/linens-issues/${id}/issue`,
  //       null,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (response.status === 200 || response.status === 204) {
  //       alert(`Status for issue ID ${id} has been changed to "Received"`);
  //       setServicesTableRows((prevRows) => {
  //         const updatedRows = [...prevRows];
  //         updatedRows[index] = { ...updatedRows[index], status: "Received" };
  //         return updatedRows;
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error updating status:", error);
  //     alert("Failed to update the status. Please try again.");
  //   }
  // };
  const handleIssueClick = async (issueNumber, index) => {
    const issued = servicesTableRows[index];
    (row) => row.issueNumber === issueNumber
    if (issued?.status === "Issued") {
      alert(`Status for issue ID ${issueNumber} is already "Issued" and cannot be changed.`);
      return;
    }
  
    try {
      const response = await axios.put(
        `${API_BASE_URL}/linens-issues/${issueNumber}/issue`,
        null,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200 || response.status === 204) {
        alert(`Status for issue ID ${issueNumber} has been changed to "Received"`);
  
        setServicesTableRows((prevRows) =>
          prevRows.map((row, i) =>
            row.issueNumber === issueNumber ? { ...row, status: "Received" } : row
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update the status. Please try again.");
    }
  };
  
  const renderTable = () => {
    if (selectedTab === "squareLinenReceive") {
      return (
        <div className="table-container">
          <table ref={tableRef}>
            <thead>
              <tr>
                {["Issue No", "Name", "Actions"].map((header, index) => (
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
              {servicesTableRows.length === 0 ? (
                <tr>
                  <td colSpan="3">No data available</td>
                </tr>
              ) : (
                servicesTableRows.map((row, index) => (
                  <tr key={row.issueNumber}>
                    <td>{row.issueNumber}</td>
                    <td>{row.name}</td>
                    <td>
                      {row.status === "Issue" ? (
                        <button className="squareLinenReceive-received-btn" disabled>
                          Received
                        </button>
                      ) : (
                        <button
                          className="squareLinenReceive-add-btn"
                          onClick={() => handleIssueClick(row.issueNumber)}
                        >
                          Issued
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="squareLinenReceiveMain-page">
      {selectedTab === "squareLinenReceive" && renderTable()}
    </div>
  );
}
export default SquareLinenReceive;
