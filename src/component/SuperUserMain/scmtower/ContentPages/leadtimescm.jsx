import React, { useState, useEffect, useRef } from 'react';
import './StockOnOrderTable.css';
import "./LeadTimeSCM.css"
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { API_BASE_URL } from '../../../api/api';
import { FloatingInput, FloatingSelect, FloatingTextarea } from '../../../../FloatingInputs';

const LeadTimeSCM = () => {
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
    doc.text('Lead Time Monitoring', doc.internal.pageSize.width / 2, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`From Date: ${formatDate(dateRange.from)}`, 14, 25);
    doc.text(`To Date: ${formatDate(dateRange.to)}`, 64, 25);
    doc.text(`Generated on: ${formatDateTime()}`, 219, 25);

    const tableData = filteredData.map(item => [
      item.vendorName || item.supplierName,
      item.itemName,
      formatDate(item.poDate),
      formatDate(item.goodsReceiptDate),
      item.daysBetween
    ]);

    const headers = ["Supplier", "Product", "Order Date", "Received Date", "Lead Time (Days)"];
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

    const lastY = doc.lastAutoTable.finalY;
    doc.setFontSize(12);
    doc.text('Current Lead Time Overview', 14, lastY + 15);
    const overviewData = [
      ["Average Lead Time", `${leadTimeOverview.average} days`],
      ["Longest Lead Time", `${leadTimeOverview.longest} days`],
      ["Shortest Lead Time", `${leadTimeOverview.shortest} days`]
    ];
    doc.autoTable({
      startY: lastY + 20,
      head: [["Metric", "Value"]],
      body: overviewData,
      styles: {
        fontSize: 10,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [51, 122, 183],
        textColor: 255,
        fontStyle: 'bold',
      },
    });

    const pdfOutput = doc.output('bloburl');
    window.open(pdfOutput, '_blank');
  };

  const [rows, setRows] = useState([]);
  const [activePopup, setActivePopup] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [formData, setFormData] = useState({
    urineAcetone: "",
    ipAdmissionDTO: {
      ipAdmmissionId: null
    },
    addItemDTO: {
      addItemId: null
    }
  });

  const [selectedBillingType, setSelectedBillingType] = useState('pharmacy');
  const [billingData, setBillingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState({
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  });

  const [leadTimeOverview, setLeadTimeOverview] = useState({
    average: 0,
    longest: 0,
    shortest: 0
  });

  const tableRef = useRef(null);

  const fetchPharmacyData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/purchaseorders/lead-time`);
      setBillingData(response.data);
      calculateLeadTimeOverview(response.data);
    } catch (error) {
      console.error("Error fetching Pharmacy data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInventoryData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/purchase-orders/lead-days`);
      setBillingData(response.data);
      calculateLeadTimeOverview(response.data);
    } catch (error) {
      console.error("Error fetching Inventory data:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateLeadTimeOverview = (data) => {
    if (data.length === 0) {
      setLeadTimeOverview({ average: 0, longest: 0, shortest: 0 });
      return;
    }

    const leadTimes = data.map(item => item.daysBetween);
    const totalLeadTime = leadTimes.reduce((sum, days) => sum + days, 0);
    const average = (totalLeadTime / leadTimes.length).toFixed(2);
    const longest = Math.max(...leadTimes);
    const shortest = Math.min(...leadTimes);

    setLeadTimeOverview({ average, longest, shortest });
  };

  useEffect(() => {
    if (selectedBillingType === 'pharmacy') {
      fetchPharmacyData();
    } else if (selectedBillingType === 'inventory') {
      fetchInventoryData();
    }
  }, [selectedBillingType]);

  const handleBillingTypeChange = (type) => {
    setSelectedBillingType(type);
  };

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const headerRows = [
      [''],
      ['', '', '', 'Lead Time Monitoring'],
      [''],
      ['From Date:', formatDate(dateRange.from), 'To Date:', formatDate(dateRange.to)],
      ['']
    ];
    const tableRows = filteredData.map(item => [
      item.vendorName || item.supplierName,
      item.itemName,
      formatDate(item.poDate),
      formatDate(item.goodsReceiptDate),
      item.daysBetween
    ]);
    const columnHeaders = ["Supplier", "Product", "Order Date", "Received Date", "Lead Time (Days)"];
    const allRows = [
      ...headerRows,
      columnHeaders,
      ...tableRows,
      [''],
      ["Current Lead Time Overview"],
      ["Metric", "Value"],
      ["Average Lead Time", `${leadTimeOverview.average} days`],
      ["Longest Lead Time", `${leadTimeOverview.longest} days`],
      ["Shortest Lead Time", `${leadTimeOverview.shortest} days`]
    ];
    const ws = XLSX.utils.aoa_to_sheet(allRows);
    const colWidths = [
      { wch: 15 },
      { wch: 12 },
      { wch: 15 },
      { wch: 12 },
      { wch: 15 },
      { wch: 20 },
      { wch: 15 }
    ];
    ws['!cols'] = colWidths;
    const headerStyle = {
      font: { bold: true, sz: 14 },
      alignment: { horizontal: 'center' }
    };
    for (let i = 0; i < 6; i++) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: 0 });
      if (!ws[cellRef]) ws[cellRef] = {};
      ws[cellRef].s = headerStyle;
    }
    XLSX.utils.book_append_sheet(wb, ws, 'LeadTimeReport');
    XLSX.writeFile(wb, 'LeadTimeReport.xlsx');
  };

  const filteredData = billingData.filter(item => {
    const poDate = new Date(item.poDate);
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);
    const isWithinDateRange = poDate >= fromDate && poDate <= toDate;
    const matchesSearchText = Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    );
    return isWithinDateRange && matchesSearchText;
  });

  const [columnWidths, setColumnWidths] = useState(0);

  return (
    <div className="LeadTimeSCM-container">
      <div className="LeadTimeSCM-header-main-div">
        <Link to="/superuser/tower" className="LeadTimeSCM-back-button"><i className="fa-solid fa-arrow-left"></i> </Link>
        <div className="LeadTimeSCM-header-div">
          * Lead Time Monitoring
        </div>
        <div>
        </div>
      </div>
      <div className="LeadTimeSCM-header">
        <div className="LeadTimeSCM-grid">
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
        <div className="LeadTimeSCM-status-filters">
          <label>
            <input
              type="radio"
              name="status"
              checked={selectedBillingType === 'pharmacy'}
              onChange={() => handleBillingTypeChange('pharmacy')}
            /> Pharmacy
          </label>
          <label>
            <input
              type="radio"
              name="status"
              checked={selectedBillingType === 'inventory'}
              onChange={() => handleBillingTypeChange('inventory')}
            /> Inventory
          </label>
        </div>
      </div>
      <div className="LeadTimeSCM-search-container">
        <input
          type="text"
          className="LeadTimeSCM-search-box"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="LeadTimeSCM-search-right">
          <span className="LeadTimeSCM-results-count-span">
            Showing {filteredData.length} results
          </span>
          <button
            className="LeadTimeSCM-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="LeadTimeSCM-print-button"
            onClick={handlePrint}
          >
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <div className="LeadTimeSCM-table-container">
        <h2 className="LeadTimeSCM-section-title">Detailed Lead Time by Supplier</h2>
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Supplier", "Product", "Order Date", "Received Date", "Lead Time (Days)"].map((header, index) => (
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
                <td colSpan="5" className="LeadTimeSCM-no-rows">
                  Loading...
                </td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={index}
                  className="parent-row"
                >
                  <td>{item.vendorName || item.supplierName}</td>
                  <td>{item.itemName}</td>
                  <td>{formatDate(item.poDate)}</td>
                  <td>{formatDate(item.goodsReceiptDate)}</td>
                  <td>{item.daysBetween}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="LeadTimeSCM-no-rows">
                  No Rows To Show
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='LeadTimeSCM-summary-main'>
        <p className="LeadTimeSCM-description">
          Track the time taken between placing orders and receiving critical supplies to ensure efficient hospital operations.
        </p>
        <div className='LeadTimeSCM-collection-header'>
          <h4 className="LeadTimeSCM-net-collection">Current Lead Time Overview</h4>
          <div className="LeadTimeSCM-summary">
            <table className="LeadTimeSCM-summary-table">
              <tbody>
                <tr><td>Average Lead Time</td><td>{leadTimeOverview.average} days</td></tr>
                <tr><td>Longest Lead Time</td><td>{leadTimeOverview.longest} days</td></tr>
                <tr><td>Shortest Lead Time</td><td>{leadTimeOverview.shortest} days</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadTimeSCM;