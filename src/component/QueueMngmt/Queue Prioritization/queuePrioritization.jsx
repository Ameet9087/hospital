/* Ajhar Tamboli patientQueueDisplay.jsx 09-10-24 */


import React, { useState, useEffect, useRef } from 'react';
import "./queuePrioritization.css";
import AddQueuePrioritization from './addQueuePrioritization';
import * as XLSX from 'xlsx'; // Import the xlsx library
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import useCustomAlert from '../../../alerts/useCustomAlert';
import CustomModal from '../../../CustomModel/CustomModal';
import { API_BASE_URL } from '../../api/api';

const QueuePrioritization = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [labTests, setLabTests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingItem, setEditingItem] = useState(null); // State to hold the item being edited
  const itemsPerPage = 10;

  const { success, warning, error, CustomAlerts } = useCustomAlert();


  const handleQueuePrioritization = (item = null) => {
    setEditingItem(item); // Set the item to edit, or null for adding
    setShowPopup(true); // Show the popup
  };
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredLabTests);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lab Tests');
    XLSX.writeFile(workbook, 'PatientQueueData.xlsx');
  };
  const printTable = () => {
    // Get the table HTML
    const tableContent = document.querySelector('table').outerHTML;

    // Open a new window
    const printWindow = window.open('', '', 'height=600,width=800');

    // Write the HTML content for printing
    printWindow.document.write('<html><head><title>Print Queue</title>');
    printWindow.document.write('<link rel="stylesheet" href="queuePrioritization.css" />'); // Link to CSS
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1>Patient Queue</h1>'); // Optional: Add a header for the print page
    printWindow.document.write(tableContent);
    printWindow.document.write('</body></html>');

    // Close the document to apply styles
    printWindow.document.close();
    printWindow.focus();

    // Trigger the print dialog
    printWindow.print();

    // Close the print window after printing
    printWindow.onafterprint = () => printWindow.close();
  };

  const handleClosePopup = () => {
    setEditingItem(null); // Clear the editing item
    setShowPopup(false); // Hide the popup
  };
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(new Array(12).fill('auto'));

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/patientsqueue/allpatients`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLabTests(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      warning('Failed to Fetch Data');

    }
  };

  const handleAddUpdate = async (formData) => {
    // Determine the correct API URL based on whether we're editing or adding a new item
    const apiUrl = editingItem
      ? `${API_BASE_URL}/patientsqueue/update/${editingItem.id}` // Use editingItem.id for the update
      : `${API_BASE_URL}/patientsqueue/add`; // URL for adding a new item

    const method = editingItem ? 'PUT' : 'POST'; // Set the correct method
    success('Successfully Add or Update');


    try {
      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the form data as JSON
      });

      if (!response.ok) {
        throw new Error('Failed to save patient queue data'); // Error handling
      }

      const result = await response.json(); // Parse the response JSON
      console.log(result); // Log the result (handle it as needed)

      // Optionally, refresh the queue list or handle the response further
      fetchData(); // Call your fetchData function to refresh the list
      handleClosePopup(); // Close the form after successful submission
    } catch (error) {
      console.error('Error:', error); // Log any errors that occur
      warning('Failed to Add or Update');

      // Optionally, handle errors (e.g., show a notification)
    }
  };



  useEffect(() => {
    fetchData();
  }, []);

  const filteredLabTests = labTests.filter((test) => {
    const patientId = test?.id?.toString() || '';
    const priority = test?.priority?.toString() || '';
    const queueNumber = test?.queueNumber?.toString() || '';
    const status = test?.status?.toString() || '';

    return (
      patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      priority.toLowerCase().includes(searchTerm.toLowerCase()) ||
      queueNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastTest = currentPage * itemsPerPage;
  const indexOfFirstTest = indexOfLastTest - itemsPerPage;
  const currentTests = filteredLabTests.slice(indexOfFirstTest, indexOfLastTest);

  return (
    <div className="queuePrioritization-container">
      <div className="queuePrioritization-firstRow">
        <div className="queuePrioritization-addBtn">
          <button className="queuePrioritization-add-button" onClick={() => handleQueuePrioritization()}>+ Add Queue Prioritization</button>

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
          <span>Showing {currentTests.length} / {filteredLabTests.length} results</span>
          <button
            className="patientQueueDisplay-print-button"
            onClick={exportToExcel}
          >
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
                "Patient ID", "Priority Level", "Queue Number", "Status", "Actions"
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
                <td colSpan="5" style={{ textAlign: 'center', color: 'red' }}>No Rows to Show</td>
              </tr>
            ) : (
              currentTests.map((test) => (
                <tr key={test.id}>
                  <td>{test.id}</td>
                  <td>{test.priority}</td>
                  <td>{test.queueNumber}</td>
                  <td>{test.status}</td>
                  <td><button className="queuePrioritization-edit-button" onClick={() => handleQueuePrioritization(test)}>Edit</button></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <CustomModal isOpen={showPopup} onClose={handleClosePopup}>
        <AddQueuePrioritization editingItem={editingItem} onSubmit={handleAddUpdate}/>
      </CustomModal>

      {/* {showPopup && (
        <div className="queuePrioritization-modal">
          <div className="queuePrioritization-modal-content">
            <AddQueuePrioritization
              onClose={handleClosePopup}
              editingItem={editingItem}
              onSubmit={handleAddUpdate} // Pass the add/update handler
            />
          </div>
        </div>
      )} */}

      <div className="nGOpatientRegistration-pagination">
        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          « Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(filteredLabTests.length / itemsPerPage)}
        </span>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredLabTests.length / itemsPerPage)))} disabled={currentPage === Math.ceil(filteredLabTests.length / itemsPerPage)}>
          Next »
        </button>
      </div>
    </div>
  );
};

export default QueuePrioritization;
