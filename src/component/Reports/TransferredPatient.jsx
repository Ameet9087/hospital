import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import { useReactToPrint } from "react-to-print";

import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


import jsPDF from "jspdf";
import "jspdf-autotable";
import { API_BASE_URL } from '../api/api';

const TransferredPatient = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const [roomTypes, setRoomTypes] = useState([]);
  const tableRef = useRef(null);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [wardRequests, setWardRequests] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/room-types`)
      .then(response => {
        console.log("Room Types Data:", response.data); // Log room types data
        setRoomTypes(response.data);
      })
      .catch(error => {
        console.error('Error fetching room types:', error);
      });

    axios.get(`${API_BASE_URL}/ward-request-change/all`)
      .then(response => {
        console.log("Ward Requests Data:pppppppp", response.data); // Log ward requests data
        setWardRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching ward requests:', error);
      });
  }, []);


  useEffect(() => {
    axios.get(`${API_BASE_URL}/room-types`)
      .then(response => {
        setRoomTypes(response.data);
      })
      .catch(error => {
        console.error('Error fetching room types:', error);
      });
  }, []);


  const countRoomTypes = () => {
    const roomCount = {};

    wardRequests.forEach((request) => {
      const updatedData = JSON.parse(request.updateWardRequestData);
      const updatedRoomType = updatedData?.roomType?.roomType;

      if (updatedRoomType) {
        const matchedRoom = roomTypes.find(room => room.roomtype === updatedRoomType);
        if (matchedRoom) {
          roomCount[updatedRoomType] = (roomCount[updatedRoomType] || 0) + 1;
        }
      }
    });

    return roomCount;
  };

  const roomTypeCounts = countRoomTypes();



  const handlePrint = () => {
    const doc = new jsPDF("l", "mm", "a4");

    // Title
    doc.setFontSize(16);
    doc.text("Transferred Patients Report", doc.internal.pageSize.width / 2, 15, { align: "center" });

    // Current date/time
    const currentDate = new Date().toLocaleString();
    doc.setFontSize(10);
    doc.text(`Generated on: ${currentDate}`, 14, 25);

    // Table headers
    const headers = ["Date", ...roomTypes.map(room => room.roomtype), "Total Patients Transferred"];

    // Table data
    const data = reportsData.map(row => {
      return [
        row.date,
        ...roomTypes.map(room => roomTypeCounts[room.roomtype] || 0),
        wardRequests.length
      ];
    });

    // Auto-table
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 30,
      theme: "grid",
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 123, 255] }, // Blue header
      alternateRowStyles: { fillColor: [240, 240, 240] }
    });

    // Save or Print
    doc.save("Transferred_Patients_Report.pdf");
  };


  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredPatients);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Discharged Patients");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'Discharged_Patients_Report.xlsx');
  };

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleDateRangeSelection = (range) => {
    const today = new Date();
    let fromDate, toDate;

    switch (range) {
      case "Today":
        fromDate = toDate = today.toISOString().split("T")[0];
        break;
      case "Last 1 Week":
        fromDate = new Date(today.setDate(today.getDate() - 7))
          .toISOString()
          .split("T")[0];
        toDate = new Date().toISOString().split("T")[0];
        break;
      case "Last 1 Month":
        fromDate = new Date(today.setMonth(today.getMonth() - 1))
          .toISOString()
          .split("T")[0];
        toDate = new Date().toISOString().split("T")[0];
        break;
      case "Last 3 Months":
        fromDate = new Date(today.setMonth(today.getMonth() - 3))
          .toISOString()
          .split("T")[0];
        toDate = new Date().toISOString().split("T")[0];
        break;
      default:
        return;
    }
    setFromDate(fromDate);
    setToDate(toDate);
    setIsPopupOpen(false);
  };

  const reportsData = [
    {
      date: '31-Aug-2024',
      totalPatientsTransferred: 1,
      totalTransferred: 1,
      roomData: {
        'Daycare': 1,
        'ICU': 0,
        'General Ward': 0
      }
    }
  ];

  const handleShowReport = () => {
    const filtered = reportsData.filter((row) => {
      const admissionDate = row.date;

      if (!fromDate && !toDate) return true;
      if (!fromDate) return admissionDate <= toDate;
      if (!toDate) return admissionDate >= fromDate;

      return admissionDate >= fromDate && admissionDate <= toDate;
    });

    setFilteredData(filtered);
    setShowReport(true); // Ensure the report is displayed
  };


  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Transferred Patients Report</h3>
        <div className="user-collection-report-filters">
          {/* <div className="user-collection-report-date-filter">
              <label>From:</label>
              <input type="date" />
              <label>To:</label>
              <input type="date" />
              <button className="user-collection-report-fav-btn">☆</button>
              <button className="user-collection-report-fav-btn" onClick={handlePopupToggle}>-</button>
              {isPopupOpen && (
                <div className="user-collection-popup">
                  <ul className="user-collection-popup-list">
                    <li onClick={() => handleDateRangeSelection('Today')}>Today</li>
                    <li onClick={() => handleDateRangeSelection('Last 1 Week')}>Last 1 Week</li>
                    <li onClick={() => handleDateRangeSelection('Last 1 Month')}>Last 1 Month</li>
                    <li onClick={() => handleDateRangeSelection('Last 3 Months')}>Last 3 Months</li>
                  </ul>
                </div>
              )}
            </div> */}
          <button className="user-collection-report-show-btn" onClick={handleShowReport}>Show Report</button>
        </div>
      </div>

      {showReport && (
        <>
          <div className="user-collection-report-controls">
            <input
              type="text"
              className="user-collection-report-search"
              placeholder="Search..."
              onChange={(e) => console.log(e.target.value)}
            />
            <div className="user-collection-page-results-info">
              Showing {reportsData.length}/{reportsData.length} results
            </div>
            <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
            <button className="user-collection-report-print-btn" onClick={handleExport}>Export</button>
          </div>

          <div className="user-collection-report-tab">
            <table className="patientList-table" ref={tableRef}>
              <thead>
                <tr>
                  <th style={{ width: columnWidths[0] }} className="resizable-th">
                    <div className="header-content">
                      <span>Date</span>
                      <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(0)}></div>
                    </div>
                  </th>


                  {roomTypes.map((room, index) => (
                    <th key={index} style={{ width: columnWidths[index + 3] }} className="resizable-th">
                      <div className="header-content">
                        <span>{room.roomtype}</span>
                        <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(index + 3)}></div>
                      </div>
                    </th>

                  ))}
                  <th>Total Patients Transferred</th>
                </tr>
              </thead>
              <tbody>
                {reportsData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {wardRequests.map((request, rowIndex) => (
                      <td>{request.ipAdmission?.admissionDate || "N/A"}</td>
                    ))}
                    {/* <td>{wardRequests?.admissionDate}</td> */}

                    {/* <td>{row.totalTransferred}</td>
                    {roomTypes.map((room, index) => (
                      <td key={index}>{row.roomData[room.roomtype] || 0}</td>
                    ))} */}


                    {roomTypes.map((room, index) => (
                      <td key={index}>{roomTypeCounts[room.roomtype] || 0}</td>
                    ))}
                    <td>{wardRequests.length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default TransferredPatient;