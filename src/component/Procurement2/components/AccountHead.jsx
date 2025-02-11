import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import AddHeadCount from '../components/AddHeadCount'; // Import AddHeadCount component
import UpdateAccountHead from '../components/UpdateAccountHead'; // Import UpdateAccountHead component
import axios from 'axios';
import { useReactToPrint } from 'react-to-print'; // Import for print functionality
import './AccountHead.css';
import CustomModal from '../../../CustomModel/CustomModal';
import { API_BASE_URL } from '../../api/api';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';

Modal.setAppElement('#root'); // Set the app element for accessibility

const AccountHead = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [accountHeads, setAccountHeads] = useState([]);
  const [selectedAccountHead, setSelectedAccountHead] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);


  useEffect(() => {
    // Fetch account heads from the API
    const fetchAccountHeads = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/account-heads/findAll`);
        setAccountHeads(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching account heads:', error);
      }
    };

    fetchAccountHeads();
  }, []); // Empty dependency array means this effect runs once on mount



  const openAddModal = () => setShowAddModal(true);
  const closeAddModal = () => setShowAddModal(false);

  const openEditModal = (accountHead) => {
    setSelectedAccountHead(accountHead);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setSelectedAccountHead(null);
    setShowEditModal(false);
  };

  // Function to handle updating the account head
  const handleUpdateAccountHead = (updatedAccountHead) => {
    setAccountHeads(accountHeads.map(head =>
      head.id === updatedAccountHead.id ? updatedAccountHead : head
    ));
    closeEditModal();
  };

  // Function to export table to Excel
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Downloads the Excel file
  };

  // Function to trigger print
  const printList = () => {
    if (tableRef.current) {
      const printContents = tableRef.current.innerHTML;

      // Create an iframe element
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";

      // Append the iframe to the body
      document.body.appendChild(iframe);

      // Write the table content into the iframe's document
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
        <head>
          
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            button, .admit-actions, th:nth-child(10), td:nth-child(10) {
              display: none; /* Hide action buttons and Action column */
            }
          </style>
        </head>
        <body>
          <table>
            ${printContents}
          </table>
        </body>
        </html>
      `);
      doc.close();

      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      document.body.removeChild(iframe);
    }
  };




  return (
    <div className="account-head-container">
      <div className="account-head-header">
        <button className="account-head-add-button" onClick={openAddModal}>
          Add Account Head
        </button>
      </div>
      <div className="account-head-results-info">
        <div className="account-head-search-bar">
          <input type="text" placeholder="Search" />
        </div>
        <div>
          Showing {accountHeads.length} / {accountHeads.length} results

          <button className="account-head-print-button" onClick={handleExport}>Export</button>
          <button className="account-head-print-button" onClick={printList}>
            Print
          </button>
        </div>
      </div>

      <div ref={tableRef} className='table-container'>
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Account Head Name",
                "Description",
                "Is Active",
                "Action"
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
            {accountHeads.length > 0 ? (
              accountHeads.map((accountHead, index) => (
                <tr key={index}>
                  <td>{accountHead.accountHeadName}</td>
                  <td>{accountHead.description}</td>
                  <td>{accountHead.active ? 'true' : 'false'}</td>
                  <td>
                    <button
                      className="account-head-edit-button"
                      onClick={() => openEditModal(accountHead)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No Rows To Show</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding Account Head */}
      <CustomModal
        isOpen={showAddModal}
        onClose={closeAddModal}
        contentLabel="Add Account Head Modal"

      >
        <AddHeadCount onClose={closeAddModal} />
      </CustomModal>

      {/* Modal for Editing Account Head */}
      <CustomModal
        isOpen={showEditModal}
        onClose={closeEditModal}
        contentLabel="Edit Account Head Modal"

      >
        {/* Render UpdateAccountHead with selectedAccountHead and the update handler */}
        {selectedAccountHead && (
          <UpdateAccountHead
            accountHead={selectedAccountHead}
            onClose={closeEditModal}
            onUpdate={handleUpdateAccountHead}
          />
        )}

      </CustomModal>
    </div>
  );
};

export default AccountHead;
