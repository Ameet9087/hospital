import React, { useState, useRef, useEffect } from "react";
import "./squareLinensIssue.css";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import LinensIssueNew from "./LinensIssueNew/LinensIssueNew";
import SquareLinenReceive from "./squareLinenReceive/squareLinenReceive";
import LinenCondemnationDisposal from "./LinenCondemnationDisposal/LinenCondemnationDisposal";
import LinenShortingAndLoting from "./LinenShortingAndLoting/linenShortingAndLoting";
import ReparingAndSewing from "./ReparingAndSewing/reparingAndSewing";
import PressingAndFolding from "./PressingAndFolding/pressingAndFolding";
import LinenStockUpAndConversion from "./LinenStockUpAndConversion/LinenStockUpAndConversion";
import axios from "axios";
import { API_BASE_URL } from '../../api/api'

function SquareLinensIssue() {
  const [selectedTab, setSelectedTab] = useState("squareLinensIssue");
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  const [servicesTableRows, setServicesTableRows] = useState([]);

  useEffect(() => {
    if (selectedTab === "squareLinensIssue") {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_BASE_URL}/linens-issues`);
          setServicesTableRows(response.data);
        } catch (error) {
          console.error("Error fetching linens issues:", error);
        }
      };

      fetchData();
    }
  }, [selectedTab]);

  const handleChangeStatus = async (issueNumber) => {
    const issue = servicesTableRows.find(
      (row) => row.issueNumber === issueNumber
    );

    if (issue?.status === "Issue") {
      alert(
        `Status for issue ID ${issueNumber} is already "Issued" and cannot be changed.`
      );
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
        alert(
          `Status for issue ID ${issueNumber} has been changed to "Issued"`
        );
        setServicesTableRows((prev) =>
          prev.map((row) =>
            row.issueNumber === issueNumber ? { ...row, status: "Issued" } : row
          )
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update the status. Please try again.");
    }
  };

  const renderTable = () => {
    if (selectedTab === "squareLinensIssue") {
      return (
        <div className="table-container">
          <table ref={tableRef}>
            <thead>
              <tr>
                {["Issue No", "Issue Type", "Actions"].map((header, index) => (
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
              {servicesTableRows.map((row, index) => (
                <tr key={index}>
                  <td>{row.issueNumber}</td>
                  <td>{row.issueType}</td>
                  <td>
                    {row.status === "Issue" ? (
                      <button
                        className="squareLinensIssue-add-btn"
                        disabled // Disable the button for rows with "Issued" status
                      >
                        Issued
                      </button>
                    ) : (
                      <button
                        className="squareLinensIssue-add-btn"
                        onClick={() => handleChangeStatus(row.issueNumber)}
                      >
                        Issue
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="squareLinensIssueMain-page">
      <div className="squareLinensIssueMain-N-imu-btn">
        <div className="squareLinensIssueMain-tabs">
          <button
            className={`squareLinensIssueMain-tab ${selectedTab === "squareLinensIssue"
              ? "squareLinensIssueMain-active"
              : ""
              }`}
            onClick={() => setSelectedTab("squareLinensIssue")}
          >
            Square Linens Issue
          </button>
          <button
            className={`squareLinensIssueMain-tab ${selectedTab === "linensIssueNew"
              ? "squareLinensIssueMain-active"
              : ""
              }`}
            onClick={() => setSelectedTab("linensIssueNew")}
          >
            Linens Issue
          </button>
          <button
            className={`squareLinensIssueMain-tab ${selectedTab === "squareLinenReceive"
              ? "squareLinensIssueMain-active"
              : ""
              }`}
            onClick={() => setSelectedTab("squareLinenReceive")}
          >
            Square Linen Receive
          </button>
          <button
            className={`squareLinensIssueMain-tab ${selectedTab === "linenCondemnationDisposal"
              ? "squareLinensIssueMain-active"
              : ""
              }`}
            onClick={() => setSelectedTab("linenCondemnationDisposal")}
          >
            Linen Condemnation And Disposal
          </button>
          <button
            className={`squareLinensIssueMain-tab ${selectedTab === "linenShortingAndLoting"
              ? "squareLinensIssueMain-active"
              : ""
              }`}
            onClick={() => setSelectedTab("linenShortingAndLoting")}
          >
            Linen Shorting And Loting
          </button>
          <button
            className={`squareLinensIssueMain-tab ${selectedTab === "reparingAndSewing"
              ? "squareLinensIssueMain-active"
              : ""
              }`}
            onClick={() => setSelectedTab("reparingAndSewing")}
          >
            Repairing And Sewing
          </button>
          <button
            className={`squareLinensIssueMain-tab ${selectedTab === "pressingAndFolding"
              ? "squareLinensIssueMain-active"
              : ""
              }`}
            onClick={() => setSelectedTab("pressingAndFolding")}
          >
            Pressing And Folding
          </button>
          <button
            className={`squareLinensIssueMain-tab ${selectedTab === "linenStockUpAndConversion"
              ? "squareLinensIssueMain-active"
              : ""
              }`}
            onClick={() => setSelectedTab("linenStockUpAndConversion")}
          >
            Linen Stock-Up And Conversion
          </button>
        </div>
      </div>
      {renderTable()}
      {selectedTab === "linensIssueNew" && <LinensIssueNew />}
      {selectedTab === "squareLinenReceive" && <SquareLinenReceive />}
      {selectedTab === "linenShortingAndLoting" && <LinenShortingAndLoting />}
      {selectedTab === "linenCondemnationDisposal" && (
        <LinenCondemnationDisposal />
      )}
      {selectedTab === "reparingAndSewing" && <ReparingAndSewing />}
      {selectedTab === "pressingAndFolding" && <PressingAndFolding />}
      {selectedTab === "linenStockUpAndConversion" && (
        <LinenStockUpAndConversion />
      )}
    </div>
  );
}

export default SquareLinensIssue;
