import React, { useEffect, useState,useRef } from 'react';
import "../SSPharmacy/sSPRequisition.css";
import { useParams } from 'react-router-dom';
import SSPharmacyReqCreateReq from './sSPharmacyReqCreateReq';
import { API_BASE_URL } from '../../../api/api';
import CustomModal from '../../../../CustomModel/CustomModal';
import * as XLSX from 'xlsx';
import RequisitionDetails from './RequisitionDetails';
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";

function SSPRequisition() {
  const { store } = useParams();
  const [requisitions, setRequisitions] = useState([]);
  const [filteredRequisitions, setFilteredRequisitions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showView, setShowView] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const tableRef = useRef(null);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const fetchRequisitions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/subpharm-requisitions`);
        if (!response.ok) {
          throw new Error('Failed to fetch requisitions');
        }
        const data = await response.json();
        const filteredData = data.filter(item => item.subStore.subStoreId == store);

        setRequisitions(filteredData);
        setFilteredRequisitions(filteredData);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRequisitions();
  }, [store]);
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredData = requisitions.filter((req) => 
      req.pharRequisitionId.toString().includes(query) || 
      req.subStore?.subStoreName?.toLowerCase().includes(query) ||
      req.requestedDate.includes(query) ||
      req.status?.toLowerCase().includes(query) 
    );

    setFilteredRequisitions(filteredData);
  };

  const handleReceive = async (item) => {
    try {
      const updateData = item?.subPharmRequisitionItems?.map((subItem) => ({
        subPharmRequisitionItemId: subItem.subPharmRequisitionItemId,
        dispatchQuantity: subItem.dispatchQuantity,
      }));

      if (!item || !item.pharRequisitionId) {
        console.error('Invalid selected requisition');
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/subpharm-requisitions/${item.pharRequisitionId}/update?status=Received`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert('Item Received successful');
      } else {
        console.error('Error updating requisition:', response.statusText);
      }
    } catch (error) {
      console.error('Error occurred during the update process:', error);
    }
  };

  const handleView = (item) => {
    setSelectedRequest(item);
    setShowView(true);
  };
  const handleExportToExcel = () => {
    const tableData = [
      [
        "Req No",
        "Requested By",
        "Date",
        "Status",
        "Action",
        
      ],
      ...filteredRequisitions.map((item) => [
        item.pharRequisitionId,
        item.subStore?.subStoreName,
        item.requestedDate,
        item.status,
       
      ]),
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    XLSX.writeFile(workbook, "requisition.xlsx");
  };
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
          <title>Print Table</title>
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
    <div className="sSPRequisition-container">
      <button className="sSPRequisition-create-requisition" onClick={handleOpenPopup}>
        <i className="fa-solid fa-plus"></i> Create Requisition
      </button>

      {isPopupOpen && (
        <div className="sSPRequisition-modal-overlay">
          <div className="sSPRequisition-modal-content">
            <button className="sSPRequisition-close-button" onClick={handleClosePopup}>
              &times;
            </button>
            <SSPharmacyReqCreateReq onClose={handleClosePopup} />
          </div>
        </div>
      )}

      <div className="sSPRequisition-search-N-results">
        <div className="sSPRequisition-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          
          <FloatingInput
              label={"Search"}
              type="search"
              value={searchQuery}
              onChange={handleSearch}
            />
        </div>
        <div className="sSPRequisition-results-info">
          <span>Showing {filteredRequisitions?.length} / {requisitions?.length} results</span>
          <button className='sSPRequisition-print-btn'onClick={handleExportToExcel}>
            <i className="fa-regular fa-file-excel"></i> Export
          </button>
          <button className='sSPRequisition-print-btn' onClick={printList}>
            <i className="fa-solid fa-print" ></i> Print
          </button>
        </div>
      </div>

      <table className="sSPRequisition-table" ref={tableRef}>
        <thead>
          <tr>
            <th>Req No.</th>
            <th>Requested By</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequisitions.map((req) => (
            <tr key={req?.id}>
              <td>{req?.pharRequisitionId}</td>
              <td>{req?.subStore?.subStoreName}</td>
              <td>{req?.requestedDate}</td>
              <td>{req?.status}</td>
              <td>
                <button className="sSPRequisition-btn-view" onClick={() => handleView(req)}>View</button>
                {req?.status === 'Dispatch' ? (
                  <button className="sSPRequisition-btn-receive" onClick={() => handleReceive(req)}>Receive Items</button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CustomModal isOpen={showView} onClose={() => setShowView(false)}>
        <RequisitionDetails request={selectedRequest} />
      </CustomModal>
    </div>
  );
}

export default SSPRequisition;
