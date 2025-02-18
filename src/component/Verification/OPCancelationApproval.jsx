import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './OPCancelationApproval.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { API_BASE_URL } from '../api/api';
import { FloatingInput, FloatingSelect, FloatingTextarea } from "../../FloatingInputs/index";
import CustomModal from '../../CustomModel/CustomModal';
import OPCancelationApprovalAction from './OPCancelationApprovalAction';
const OPCancelationApproval = () => {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState({
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  });
  const [statusFilter, setStatusFilter] = useState('all');
  const tableRef = useRef(null);
  const fetchOPCancellationData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/op-cancellation-pending-for-approval`);
      setRows(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching OP Cancellation data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOPCancellationData();
  }, []);
  const handleApproveClick = (rowData) => {
    setSelectedRow(rowData);
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRow(null);
  };
  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'OPCancelationApproval');
    XLSX.writeFile(wb, 'OPCancelationApproval.xlsx');
  };
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  const formatDateTime = () => {
    const now = new Date();
    return now.toLocaleString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };
  const handlePrint = () => {
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFontSize(16);
    doc.text('OP Cancellation Approval Report', doc.internal.pageSize.width / 2, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`From Date: ${formatDate(dateRange.from)}`, 14, 25);
    doc.text(`To Date: ${formatDate(dateRange.to)}`, 64, 25);
    doc.text(`Generated on: ${formatDateTime()}`, 219, 25);
    const tableData = filteredData.map(item => [
      item.opApprovalId,
      item.recievedBy,
      item.reason,
      item.requestedUser,
      formatDate(item.approvalDate),
      item.status,
    ]);
    const headers = [
      "OP Approval ID",
      "Recieved By",
      "Reason",
      "Requested User",
      "Approval Date",
      "Status",
    ];
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 30,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [51, 122, 183],
        textColor: 255,
        fontSize: 9,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });
    const pdfOutput = doc.output('bloburl');
    window.open(pdfOutput, '_blank');
  };
  const filteredData = rows.filter(item => {
    const approvalDate = new Date(item.approvalDate);
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);
    const isWithinDateRange = approvalDate >= fromDate && approvalDate <= toDate;
    const matchesSearchText = Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    );
    const matchesStatusFilter = statusFilter === 'all' || item.status.toLowerCase() === statusFilter;
    return isWithinDateRange && matchesSearchText && matchesStatusFilter;
  });
  return (
    <div className="OPCancelationApproval-container">
      <div className="OPCancelationApproval-header-div">
        * OP Cancelation Approval
      </div>
      <div className="OPCancelationApproval-date-filter">
        <div className="OPCancelationApproval-grid">
          <FloatingInput
            label="From Date"
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
          />
          <FloatingInput
            label="To Date"
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
          />
        </div>
        <div className="OPCancelationApproval-status-filters">
          <label>
            <input
              type="radio"
              name="status"
              value="all"
              checked={statusFilter === 'all'}
              onChange={() => setStatusFilter('all')}
            /> All
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="approved"
              checked={statusFilter === 'approved'}
              onChange={() => setStatusFilter('approved')}
            /> Approved
          </label>
          <label>
            <input
              type="radio"
              name="status"
              value="pending"
              checked={statusFilter === 'pending'}
              onChange={() => setStatusFilter('pending')}
            /> Pending
          </label>
        </div>
      </div>
      <div className="OPCancelationApproval-search-container">
        <input
          type="text"
          className="OPCancelationApproval-search-box"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="OPCancelationApproval-search-right">
          <span className="OPCancelationApproval-results-count-span">
            Showing {filteredData.length} results
          </span>
          <button
            className="OPCancelationApproval-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="OPCancelationApproval-print-button"
            onClick={handlePrint}
          >
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <table ref={tableRef}>
        <thead>
          <tr>
            {[
              "OP Approval ID",
              "Recieved By",
              "Reason",
              "Requested User",
              "Approval Date",
              "Status",
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
              <td colSpan="7" className="OPCancelationApproval-no-rows">
                Loading...
              </td>
            </tr>
          ) : filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr
                key={index}
                className="parent-row"
              >
                <td>{item.opApprovalId}</td>
                <td>{item.recievedBy}</td>
                <td>{item.reason}</td>
                <td>{item.requestedUser}</td>
                <td>{formatDate(item.approvalDate)}</td>
                <td>{item.status}</td>
                <td>
                  <button
                    className="OPCancelationApproval-print-button"
                    onClick={() => handleApproveClick(item)}
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="OPCancelationApproval-no-rows">
                No Rows To Show
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
      >
        <OPCancelationApprovalAction
          approvalData={selectedRow}
          onClose={handleModalClose}
          onApprovalComplete={fetchOPCancellationData}
        />
      </CustomModal>
    </div>
  );
};
export default OPCancelationApproval;