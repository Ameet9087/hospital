/* Ajhar Tamboli rdlListRequest.jsx 19-09-24 */

import React, { useState, useEffect, useRef } from "react";
import "../ListRequest/rdlListRequest.css";
import AddReportForm from "./rdlAddReport";
import RDLAddScanDoneDetails from "./rdlScanDone";
import { startResizing } from "../../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../../api/api";
import CustomModal from "../../../CustomModel/CustomModal";
import { FloatingInput, FloatingSelect } from "../../../FloatingInputs";
import { toast } from "react-toastify";

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
      linkPending = `${API_BASE_URL}/imaging-requisitions/by-status-date?status=Pending&startDate=${dateFrom}&endDate=${dateTo}`;
      linkActive = `${API_BASE_URL}/imaging-requisitions/by-status-date?status=Active&startDate=${dateFrom}&endDate=${dateTo}`;
    } else {
      const todayDate = getCurrentDate();
      linkPending = `${API_BASE_URL}/imaging-requisitions/by-status-date?status=Pending&startDate=${todayDate}&endDate=${todayDate}`;
      linkActive = `${API_BASE_URL}/imaging-requisitions/by-status-date?status=Active&startDate=${todayDate}&endDate=${todayDate}`;
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
      `${API_BASE_URL}/imaging-requisitions/update-film-type-and-quantity?status=${status}&scannedOn=${scannedOn}&imagingId=${id}`,
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
        toast.success("Scanning Done Successfully");
      })
      .then((data) => {
        setImagingRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.imagingId === id
              ? { ...request, status: status, scannedOn: scannedOn, ...data }
              : request
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
        request.imagingItemDTO?.imagingType?.imagingTypeName?.toUpperCase() ===
        selectedFilter;

      const matchesSearch = [
        request.inPatientDTO?.firstName || "",
        request.inPatientDTO?.lastName || "",
        request.prescriberDTO?.firstName || "",
        request.imagingItemDTO?.imagingItemName || "",
      ].some((field) => field.toLowerCase().includes(searchQuery));

      return matchesFilter && matchesSearch;
    });
  };

  const filteredRequests = applyFilters().filter(
    (request) => request.status?.toLowerCase() !== "completed"
  );
  console.log(filteredRequests);

  return (
    <div className="rDLListRequest-active-imaging-request">
      <header className="rDLListRequest-header">
        <h4>* ACTIVE IMAGING REQUEST</h4>
        <div className="rDLListRequest-filter">
          <FloatingSelect
            label={"Filter"}
            value={selectedFilter}
            onChange={handleFilterChange}
            options={[
              { value: "", label: "-ALL-" },
              { value: "CT-SCAN", label: "CT-SCAN" },
              { value: "USG", label: "USG" },
              { value: "X-RAY", label: "X-RAY" },
              { value: "ECHO", label: "ECHO" },
            ]}
          />
        </div>
      </header>
      <div className="rDLListRequest-controls">
        <div className="rDLListRequest-date-range">
          <FloatingInput
            label={"From"}
            type="date"
            id="dateFrom"
            value={dateFrom}
            onChange={handleDateFromChange}
          />
          <FloatingInput
            label={"To"}
            type="date"
            id="dateTo"
            value={dateTo}
            onChange={handleDateToChange}
          />
        </div>
      </div>
      <div className="rDLListRequest-search-N-results">
        <div className="rDLListRequest-search-bar">
          <FloatingInput
            label={"Search"}
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="rDLListRequest-results-info">
          {filteredRequests.length > 0
            ? `Showing ${filteredRequests.length} result(s)`
            : "No rows to show"}
          <button className="rDLListRequest-ex-pri-buttons" onClick={""}>
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
                "uhid",
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
            {filteredRequests?.length > 0 ? (
              filteredRequests
                .sort((a, b) => {
                  if (
                    a.status?.toLowerCase() === "active" &&
                    b.status?.toLowerCase() !== "active"
                  ) {
                    return -1;
                  }
                  if (
                    a.status?.toLowerCase() !== "active" &&
                    b.status?.toLowerCase() === "active"
                  ) {
                    return 1;
                  }
                  return 0;
                })
                .map((request, index) => (
                  <tr key={request.imagingId}>
                    <td>{index + 1}</td>
                    <td>{request.requestedDate}</td>
                    <td>
                      {request.inPatientDTO?.patient?.uhid ||
                        request.outPatientDTO?.patient?.uhid}
                    </td>
                    <td>
                      {request.inPatientDTO?.patient?.firstName ||
                        request.outPatientDTO?.patient?.firstName}{" "}
                      {request.inPatientDTO?.patient?.lastName ||
                        request.outPatientDTO?.patient?.lastName}
                    </td>
                    <td>
                      {request.inPatientDTO?.patient?.age ||
                        request.outPatientDTO?.patient?.age}{" "}
                      {request.inPatientDTO?.patient?.ageUnit ||
                        request.outPatientDTO?.patient?.ageUnit}{" "}
                      {" / "}{" "}
                      {request.inPatientDTO?.patient?.gender ||
                        request.outPatientDTO?.patient?.gender}
                    </td>
                    <td>{request.prescriberDTO?.doctorName || "self"}</td>
                    <td>
                      {request.imagingItemDTO?.imagingType?.imagingTypeName}
                    </td>
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
                <td colSpan="9" className="rDLListRequest-no-rows">
                  No rows to show
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* AddReportForm as a modal */}
      {showAddReport && (
        <CustomModal
          isOpen={showAddReport}
          onClose={() => setShowAddReport(false)}
        >
          <AddReportForm
            onClose={closePopups}
            selectedRequest={selectedRequest}
          />
        </CustomModal>
      )}

      {/* ScanDoneDetails as a modal */}
      {showScanDone && (
        <CustomModal isOpen={showScanDone} onClose={closePopups}>
          <RDLAddScanDoneDetails
            patient={selectedRequest}
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
        </CustomModal>
      )}
    </div>
  );
}

export default RDLListRequest;
