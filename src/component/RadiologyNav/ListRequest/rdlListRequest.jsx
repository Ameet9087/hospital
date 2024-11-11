/* Ajhar Tamboli rdlListRequest.jsx 19-09-24 */

import React, { useState, useEffect, useRef } from "react";
import "../ListRequest/rdlListRequest.css";
import AddReportForm from "./rdlAddReport";
import RDLAddScanDoneDetails from "./rdlScanDone";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";

const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0];
};
function RDLListRequest() {
  const [dateFrom, setDateFrom] = useState(getCurrentDate());
  const [dateTo, setDateTo] = useState(getCurrentDate());
  const [columnWidths, setColumnWidths] = useState({});
  const [showAddReport, setShowAddReport] = useState(false);
  const [showScanDone, setShowScanDone] = useState(false);
  const [imagingRequests, setImagingRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("--All--");
  const [searchQuery, setSearchQuery] = useState("");
  const tableRef = useRef(null);

  const handleDateFromChange = (event) => {
    setDateFrom(event.target.value);
  };

  const handleDateToChange = (event) => {
    setDateTo(event.target.value);
  };

  useEffect(() => {
    const currentDate = getCurrentDate();
    setDateFrom(currentDate);
    setDateTo(currentDate);
  }, []);

  const fetchImagingRequest = () => {
    let linkPending, linkActive;

    if (dateFrom && dateTo) {
      linkPending = `http://localhost:1415/api/imaging-requisitions/by-status-date?status=Pending&startDate=${dateFrom}&endDate=${dateTo}`;
      linkActive = `http://localhost:1415/api/imaging-requisitions/by-status-date?status=Active&startDate=${dateFrom}&endDate=${dateTo}`;
    } else {
      const todayDate = getCurrentDate();
      linkPending = `http://localhost:1415/api/imaging-requisitions/by-status-date?status=Pending&startDate=${todayDate}&endDate=${todayDate}`;
      linkActive = `http://localhost:1415/api/imaging-requisitions/by-status-date?status=Active&startDate=${todayDate}&endDate=${todayDate}`;
    }

    // Fetch the data for Pending and Active statuses
    Promise.all([
      fetch(linkPending).then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      }),
      fetch(linkActive).then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      }),
    ])
      .then(([pendingData, activeData]) => {
        const combinedData = [...pendingData, ...activeData]; // Combine both data
        console.log("Fetched data: ", combinedData);
        setImagingRequests(combinedData);
      })
      .catch((err) => {
        console.log("Fetch error: ", err);
      });
  };

  useEffect(() => {
    fetchImagingRequest();
  }, [dateFrom, dateTo]);

  const updateStatus = (id, filmTypeId, quantity, status, scannedOn) => {
    fetch(
      `http://localhost:1415/api/imaging-requisitions/update-film-type-and-quantity?filmTypeId=${filmTypeId}&quantity=${quantity}&status=${status}&scannedOn=${scannedOn}&imagingId=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        console.log("Scanned Done");
      })
      .then((data) => {
        // Update local state to reflect changes
        setImagingRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.imagingId === id ? { ...request, ...data } : request
          )
        );
        setShowScanDone(false);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  const handleAddReportClick = (request) => {
    setSelectedRequest(request);
    setShowAddReport(true);
  };

  const handleScanDoneClick = (request) => {
    setSelectedRequest(request);
    setShowScanDone(true);
  };

  const closePopups = () => {
    setShowAddReport(false);
    setShowScanDone(false);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const applyFilters = () => {
    return imagingRequests.filter((request) => {
      const matchesFilter =
        selectedFilter === "--All--" ||
        request.imagingTypeDTO?.imagingTypeName.toUpperCase() ===
          selectedFilter;
      const matchesSearch =
        request.patientDTO?.firstName.toLowerCase().includes(searchQuery) ||
        request.patientDTO?.lastName.toLowerCase().includes(searchQuery) ||
        request.prescriberDTO?.firstName.toLowerCase().includes(searchQuery) ||
        request.imagingItemDTO?.imagingItemName
          .toLowerCase()
          .includes(searchQuery);

      return matchesFilter && matchesSearch;
    });
  };

  const filteredRequests = applyFilters().filter(
    (request) => request.status?.toLowerCase() !== "completed"
  );

  return (
    <div className="rDLListRequest-active-imaging-request">
      <header className="rDLListRequest-header">
        <h4>* ACTIVE IMAGING REQUEST</h4>
        <div className="rDLListRequest-filter">
          <label>
            Filter
            <select value={selectedFilter} onChange={handleFilterChange}>
              <option>--All--</option>
              <option>CT-SCAN</option>
              <option>USG</option>
              <option>X-RAY</option>
              <option>ECHO</option>
            </select>
          </label>
        </div>
      </header>
      <div className="rDLListRequest-controls">
        <div className="rDLListRequest-date-range">
          <label>
            From:
            <input
              type="date"
              id="dateFrom"
              defaultValue={dateFrom}
              onChange={handleDateFromChange}
            />
          </label>
          <label>
            To:
            <input
              type="date"
              id="dateTo"
              defaultValue={dateTo}
              onChange={handleDateToChange}
            />
          </label>
</div>
      </div>
      <div className="rDLListRequest-search-N-results">
        <div className="rDLListRequest-search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="rDLListRequest-results-info">
          {filteredRequests.length > 0
            ? `Showing ${filteredRequests.length} result(s)`
            : "No rows to show"}
                     <button
            className="rDLListRequest-ex-pri-buttons"
            onClick={""}
          >
            <i className="fa-regular fa-file-excel"></i> Export
          </button>
          <button className="rDLListRequest-ex-pri-buttons" onClick={""}>
            <i class="fa-solid fa-print"></i> Print
          </button>
        </div>

      </div>
      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Id",
                "Requested Date",
                "Patient Name",
                "Age/Sex",
                "Prescriber",
                "Type",
                "Imaging Name",
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
            {filteredRequests.length > 0 ? (
              filteredRequests.map((request, index) => (
                <tr key={request.imagingId}>
                  <td>{index + 1}</td>
                  <td>{request.requestedDate}</td>
                  <td>
                    {request.patientDTO?.firstName ||
                      request.newPatientVisitDTO?.firstName}{" "}
                    {request.patientDTO?.lastName ||
                      request.newPatientVisitDTO?.lastName}
                  </td>
                  <td>
                    {request.patientDTO?.age || request.newPatientVisitDTO?.age}
                  </td>
                  <td>{request.prescriberDTO?.employeeName || "self"}</td>
                  <td>{request.imagingTypeDTO?.imagingTypeName}</td>
                  <td>{request.imagingItemDTO?.imagingItemName}</td>
                  <td>
                    {request.status?.toLowerCase() === "pending" && (
                      <button
                        className="rDLListRequest-scan-done"
                        onClick={() => handleScanDoneClick(request)}
                      >
                        Scan Done
                      </button>
                    )}
                    {request.status?.toLowerCase() === "active" && (
                      <button
                        className="rDLListRequest-add-report"
                        onClick={() => handleAddReportClick(request)}
                      >
                        Add Report
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="rDLListRequest-no-rows">
                  No rows to show
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* AddReportForm as a modal */}
      {showAddReport && (
        <div className="rDLListRequest-modal-overlay">
          <div className="rDLListRequest-modal-content">
            <button
              className="rDLListRequest-close-modal"
              onClick={closePopups}
            >
              &times;
            </button>
            <AddReportForm
              onClose={closePopups}
              selectedRequest={selectedRequest}
            />
          </div>
        </div>
      )}

      {/* ScanDoneDetails as a modal */}
      {showScanDone && (
        <div className="rDLListRequest-modal-overlay">
          <div className="rDLListRequest-modal-content">
            <RDLAddScanDoneDetails
              onClose={closePopups}
              onUpdateStatus={(scannedOn, filmType, quantity, remarks) => {
                updateStatus(
                  selectedRequest.imagingId,
                  filmType,
                  quantity,
                  "Active",
                  scannedOn
                );
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default RDLListRequest;
