import React, { useState, useEffect, useRef } from "react";
import "./Requisition.css";
import DirectDispatch from "./DirectDispatch";
import DispatchTable from "./DispatchTable";
import RequisitionDetail from "./RequisitionDetail";
import axios from "axios";
import { startResizing } from '../../TableHeadingResizing/resizableColumns';
import { API_BASE_URL } from "../../api/api";
import CustomModal from "../../../CustomModel/CustomModal";
import DispatchRequisition from "./DispatchRequisition";

const Requisition = () => {
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showDirect, setShowDirect] = useState(false);
  const [showDirectDispatch,setShowDirectDispatch] = useState(false);
  const [status, setStatus] = useState("All");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDispatchTable, setShowDispatchTable] = useState(false);
  const [selectedDispatch, setSelectedDispatch] = useState(null);
  const [showRequisitionDetail, setShowRequisitionDetail] = useState(false);
  const [selectedRequisition, setSelectedRequisition] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/inventory-requisitions`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const handlePrint = () => {
    console.log("Printing...");
  };

  const handleDispatchListClick = (dispatch) => {
    setSelectedDispatch(dispatch);
    setShowDispatchTable(true);
  };

  const handleRequisitionViewClick = (requisition) => {
    setSelectedRequisition(requisition);
    setShowRequisitionDetail(true);
  };

  const closeRequisitionDetail = () => {
    setShowRequisitionDetail(false);
    setSelectedRequisition(null);
  };

  const closeDispatchTable = () => {
    setShowDispatchTable(false);
    setSelectedDispatch(null);
  };

  // Function to filter data based on date range
  const filterDataByDate = (data) => {
    if (!dateFrom && !dateTo) return data; // Return original data if no date filter is applied

    return data.filter((item) => {
      const dispatchDate = new Date(item.dispatchDate);
      const fromDate = new Date(dateFrom);
      const toDate = new Date(dateTo);

      // Check if dispatch date is within the specified range
      return (
        (!dateFrom || dispatchDate >= fromDate) &&
        (!dateTo || dispatchDate <= toDate)
      );
    });
  };

  // Get filtered data based on date range
  const filteredData = filterDataByDate(data);

  console.log(filteredData);
  

  return (
    <div className="requisition-inventory-content">
              <div className="requisition-inventory-status-filter">
                <button
                  className="requisition-inventory-direct-dispatch"
                  onClick={() => setShowDirectDispatch(true)}
                >
                  Direct Dispatch
                </button>
                <div className="requisition-inventory-direct-dispatch-filters">
                  <span>List by Requisition Status:</span>
                  {["Pending", "Complete", "Cancelled", "All"].map((s) => (
                    <label key={s}>
                      <input
                        type="radio"
                        name="status"
                        checked={status === s}
                        onChange={() => setStatus(s)}
                      />
                      {s}
                    </label>
                  ))}
                </div>
              </div>
              <div className="requisition-inventory-date-range">
                <label>
                  From:{" "}
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                  />
                </label>
                <label>
                  To:{" "}
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                  />
                </label>
              </div>
              <div className="requisition-inventory-search-bar-container">
                <div className="requisition-inventory-search-bar">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {/* <button className="requisition-inventory-search-bar-button" onClick={handleSearch}>🔍</button> */}
                </div>
                <div className="requisition-inventory-results">
                  <span className="requisition-inventory-results-span">Showing {filteredData?.length} results</span>
                  <button className="requisition-inventory-results-print" onClick={handlePrint}>Print</button>
                </div>
              </div>
              <div className="requisition-ta">
                <table className="patientList-table" ref={tableRef}>
                  <thead>
                    <tr>
                      {[
                        "Req.No",
                        "StoreName",
                        "Req.Date",
                        "Received By",
                        "Status",
                        "Verified Or Not",
                        "Actions"
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
                    {loading ? (
                      <tr>
                        <td colSpan="8">Loading...</td>
                      </tr>
                    ) : filteredData?.length > 0 ? (
                      filteredData?.map((item, index) => (
                        <tr key={index}>
                          <td>{item?.id}</td>
                          <td>{item?.subStore?.subStoreName}</td>
                          <td>{item?.requisitionDate}</td>
                          <td>{item?.receivedBy}</td>
                          <td>{item?.status}</td>
                          <td>{item?.verifyOrNot}</td>
                          <td>
                            <button
                              className="requisition-inventory-direct-button"
                              onClick={() => handleDispatchListClick(item)}
                            >
                              Dispatch List
                            </button>
                            <button
                              className="requisition-inventory-direct-button"
                              onClick={() => handleRequisitionViewClick(item)}
                            >
                              Requisition View
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="8">No Rows To Show</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
          
        <CustomModal isOpen={selectedDispatch} onClose={closeDispatchTable} >
          <DispatchTable dispatch={selectedDispatch} />
        </CustomModal>     
      <CustomModal isOpen={showDirect || showDispatchTable} onClose={()=>setShowDirect(false)|| setShowDispatchTable(false)}>
        <DispatchRequisition request={selectedDispatch} onClose={()=>setShowDirect(false)|| setShowDispatchTable(false)} />
      </CustomModal>
      <CustomModal isOpen={showDirectDispatch} onClose={()=>setShowDirectDispatch(false)}>
        <DirectDispatch onClose={()=>setShowDirectDispatch(false)}/>
      </CustomModal>
  

      <CustomModal isOpen={showRequisitionDetail} onClose={()=>setShowRequisitionDetail(false)}>
        <RequisitionDetail
          requisition={selectedRequisition}
          onClose={closeRequisitionDetail}
        />
        </CustomModal>
     
    </div>
  );
};

export default Requisition;
