/* Ajhar Tamboli real-TimeQueueMonitoring.jsx 09-10-24 */


import React, { useState, useEffect, useRef } from 'react';
import "./real-TimeQueueMonitoring.css";
import AddRealTimeQueueMonitoring from './addReal-TimeQueueMonitoring';
import * as XLSX from 'xlsx'; // Ensure you import the xlsx library
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import useCustomAlert from '../../../alerts/useCustomAlert';
import CustomModal from '../../../CustomModel/CustomModal';
const RealTimeQueueMonitoring = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [labTests, setLabTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 10 items per page
  const [selectedData, setSelectedData] = useState(null);
  const [columnWidths, setColumnWidths] = useState([80, 80, 100, 100, 100, 80, 120, 100, 60, 120, 80, 100]); // Set initial widths for columns
  const { success, warning, error, CustomAlerts } = useCustomAlert();

  const handleAddRealTimeQueueMonitoring = (data) => {
    setSelectedData(data);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedData(null);
  };
  const tableRef = useRef(null);

  const handleAddUpdate = async (formData) => {
    const apiUrl = selectedData
      ? `${API_BASE_URL}/patientsqueue/update/${selectedData.id}`
      : `${API_BASE_URL}/patientsqueue/add`;
    const method = selectedData ? 'PUT' : 'POST';
    success('Successfully Add or Update');


    try {
      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save patient queue data');
      }

      const result = await response.json();
      console.log(result);
      fetchLabTests();
      handleClosePopup();
    } catch (error) {
      console.error('Error:', error);
      warning('Failed to Add or Update');

    }
  };

  const fetchLabTests = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/patientsqueue/allpatients`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setLabTests(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      warning('Failed to fetch Data');

    }
  };


  useEffect(() => {
    fetchLabTests();
  }, []);

  // Calculate pagination indexes
  const indexOfLastTest = currentPage * itemsPerPage;
  const indexOfFirstTest = indexOfLastTest - itemsPerPage;

  const filteredTests = labTests.filter(test => {
    const term = searchTerm.toLowerCase(); // Normalize the search term

    return (
      (test.queueNumber?.toString().toLowerCase().includes(term)) ||
      (test.id?.toString().toLowerCase().includes(term)) ||
      (test.arrivalTime?.toLowerCase().includes(term)) ||
      (test.priority?.toString().toLowerCase().includes(term)) ||
      (test.appointmentTime?.toLowerCase().includes(term)) ||
      (test.appointmentNumber?.toString().toLowerCase().includes(term)) ||
      (test.scheduledTime?.toLowerCase().includes(term)) ||
      (test.serviceType?.toLowerCase().includes(term)) ||
      (test.roomNumber?.toLowerCase().includes(term)) ||
      (test.position?.toString().toLowerCase().includes(term)) ||
      (test.status?.toLowerCase().includes(term))
    );
  });

  const printTable = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid #ddd;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
            h2 {
              text-align: center;
            }
          </style>
        </head>
        <body>
          <h2>Queue Monitoring Table</h2>
          ${tableRef.current.outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };



  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(currentTests);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Queue Monitoring");

    // Generate buffer
    XLSX.writeFile(workbook, "RealTimeQueueMonitoring.xlsx");
  };

  // Get the current items to display
  const currentTests = filteredTests.slice(indexOfFirstTest, indexOfLastTest);

  return (
    <div className="realTimeQueueMonitoring-container">
      <div className="realTimeQueueMonitoring-firstRow">
        <div className="realTimeQueueMonitoring-addBtn">
          <button className="realTimeQueueMonitoring-add-button" onClick={() => handleAddRealTimeQueueMonitoring(null)}>+ Add Real-Time Queue Monitoring</button>

          <CustomAlerts />
        </div>
      </div>

      <div className="addQueuePrioritization-controls">
        <div className="addQueuePrioritization-date-range">
          <label>
            From:
            <input type="date" defaultValue="2024-08-09" />
          </label>
          <label>
            To:
            <input type="date" defaultValue="2024-08-16" />
          </label>

        </div>
      </div>

      <div className='queuePrioritization-search-N-result'>
        <div className="queuePrioritization-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="queuePrioritization-results-info">
          <span>Showing {currentTests.length} / {filteredTests.length} results</span>
          <button
            className="patientQueueDisplay-print-button"
            onClick={exportToExcel}>
            <i className="fa-regular fa-file-excel"></i> Export
          </button>
          <button className="queuePrioritization-print-button" onClick={printTable}><i className="fa-solid fa-print"></i> Print</button>
        </div>
      </div>

      <div className="table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Queue ID", "Patient ID", "Arrival Time", "Priority Level",
                "Appo. Time", "Appo. No", "Scheduled Time",
                "Service Type", "Room", "Queue Position",
                "Status", "Actions"
              ].map((header, index) => (
                <th key={index} style={{ width: columnWidths[index] }} className="resizable-th">
                  <div className="header-content">
                    <span>{header}</span>
                    <div className="resizer" onMouseDown={startResizing(tableRef, setColumnWidths)(index)}></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentTests.length === 0 ? (
              <tr>
                <td colSpan="12" style={{ textAlign: 'center', color: 'red' }}>No Rows to Show</td>
              </tr>
            ) : (
              currentTests.map((test) => (
                <tr key={test.id}>
                  <td>{test.queueNumber}</td>
                  <td>{test.id}</td>
                  <td>{test.arrivalTime}</td>
                  <td>{test.priority}</td>
                  <td>{test.appointmentTime}</td>
                  <td>{test.appointmentNumber}</td>
                  <td>{test.scheduledTime}</td>
                  <td>{test.serviceType}</td>
                  <td>{test.roomNumber}</td>
                  <td>{test.position}</td>
                  <td>{test.status}</td>
                  <td>
                    <button className="realTimeQueueMonitoring-edit-button" onClick={() => handleAddRealTimeQueueMonitoring(test)}>Edit</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* {showPopup && (
        <div className="realTimeQueueMonitoring-modal">
          <div className="realTimeQueueMonitoring-modal-content">
            <AddRealTimeQueueMonitoring onClose={handleClosePopup}
              selectedData={selectedData}
              onSubmit={handleAddUpdate} />
          </div>
        </div>
      )} */}
      <CustomModal isOpen={showPopup} onClose={handleClosePopup}>
        <AddRealTimeQueueMonitoring selectedData={selectedData} onSubmit={handleAddUpdate}/>
      </CustomModal>

      <div className="nGOpatientRegistration-pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          « Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredTests.length / itemsPerPage)}
        </span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredTests.length / itemsPerPage)))} disabled={currentPage === Math.ceil(filteredTests.length / itemsPerPage)}>
          Next »
        </button>
      </div>
    </div>
  );
};

export default RealTimeQueueMonitoring;
