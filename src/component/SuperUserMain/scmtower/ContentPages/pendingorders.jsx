import React, { useState, useEffect, useRef } from 'react';
import './PendingOrdersSCM.css';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { API_BASE_URL } from '../../../api/api';
import { FloatingInput, FloatingSelect, FloatingTextarea } from '../../../../FloatingInputs';

const PendingOrdersSCM = () => {
  const formatDate = (date) => {
    if (!date) return '';
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
    doc.text('Pending Orders', doc.internal.pageSize.width / 2, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`From Date: ${formatDate(dateRange.from)}`, 14, 25);
    doc.text(`To Date: ${formatDate(dateRange.to)}`, 64, 25);
    doc.text(`Generated on: ${formatDateTime()}`, 219, 25);

    const tableData = filteredData.map(item => [
      item.poId,
      item.itemName,
      item.quantity,
      item.supplierName || item.vendorName,
      formatDate(item.deliveryDate),
      item.status
    ]);

    const headers = [
      "Order ID", "Item", "Quantity", "Vendor", "Expected Delivery", "Status"
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

  const [selectedBillingType, setSelectedBillingType] = useState('pharmacy');
  const [billingData, setBillingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState({
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  });

  const tableRef = useRef(null);

  const fetchPharmacyData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/purchaseorders/pending-orders`);
      const transformedData = Array.isArray(response.data) ? response.data : [response.data];
      setBillingData(transformedData);
    } catch (error) {
      console.error('Error fetching Pharmacy pending orders:', error);
      setBillingData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchInventoryData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/purchase-orders/pending-orders`);
      const transformedData = Array.isArray(response.data) ? response.data : [response.data];
      setBillingData(transformedData);
    } catch (error) {
      console.error('Error fetching Inventory pending orders:', error);
      setBillingData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedBillingType === 'pharmacy') {
      fetchPharmacyData();
    } else if (selectedBillingType === 'inventory') {
      fetchInventoryData();
    }
  }, [selectedBillingType, dateRange]);

  const handleBillingTypeChange = (type) => {
    setSelectedBillingType(type);
  };

  const handleExport = () => {
    const wb = XLSX.utils.book_new();

    const headerRows = [
      [''],
      ['', '', '', 'Pending Orders'],
      [''],
      ['From Date:', formatDate(dateRange.from), 'To Date:', formatDate(dateRange.to)],
      ['']
    ];

    const tableRows = filteredData.map(item => [
      item.poId,
      item.itemName,
      item.quantity,
      item.supplierName || item.vendorName,
      formatDate(item.deliveryDate),
      item.status
    ]);

    const columnHeaders = [
      "Order ID", "Item", "Quantity", "Vendor", "Expected Delivery", "Status"
    ];

    const allRows = [
      ...headerRows,
      columnHeaders,
      ...tableRows
    ];

    const ws = XLSX.utils.aoa_to_sheet(allRows);

    const colWidths = [
      { wch: 15 },
      { wch: 20 },
      { wch: 10 },
      { wch: 20 },
      { wch: 15 },
      { wch: 15 }
    ];

    ws['!cols'] = colWidths;

    const headerStyle = {
      font: { bold: true, sz: 14 },
      alignment: { horizontal: 'center' }
    };

    const titleCell = XLSX.utils.encode_cell({ r: 1, c: 3 });
    if (!ws[titleCell]) ws[titleCell] = {};
    ws[titleCell].s = headerStyle;

    for (let i = 0; i < columnHeaders.length; i++) {
      const cellRef = XLSX.utils.encode_cell({ r: 5, c: i });
      if (!ws[cellRef]) ws[cellRef] = {};
      ws[cellRef].s = { font: { bold: true } };
    }

    XLSX.utils.book_append_sheet(wb, ws, 'PendingOrders');
    XLSX.writeFile(wb, 'PendingOrders.xlsx');
  };

  const filteredData = billingData.filter(item => {
    const deliveryDate = new Date(item.deliveryDate);
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);

    toDate.setDate(toDate.getDate() + 1);

    const isWithinDateRange = deliveryDate >= fromDate && deliveryDate <= toDate;

    const itemValues = Object.values(item).map(val =>
      val !== null && val !== undefined ? val.toString().toLowerCase() : ''
    );

    const matchesSearchText = searchText === '' ||
      itemValues.some(val => val.includes(searchText.toLowerCase()));

    return isWithinDateRange && matchesSearchText;
  });

  const [columnWidths, setColumnWidths] = useState({});

  return (
    <div className="PendingOrdersSCM-container">
      <div className="PendingOrdersSCM-header-main-div">
        <Link to="/superuser/tower" className="PendingOrdersSCM-back-button">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div className="PendingOrdersSCM-header-div">
          * Pending Orders
        </div>
        <div></div>
      </div>

      <div className="PendingOrdersSCM-header">
        <div className="PendingOrdersSCM-grid">
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
        <div className="PendingOrdersSCM-status-filters">
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

      <div className="PendingOrdersSCM-search-container">
        <input
          type="text"
          className="PendingOrdersSCM-search-box"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="PendingOrdersSCM-search-right">
          <span className="PendingOrdersSCM-results-count-span">
            Showing {filteredData.length} results
          </span>
          <button
            className="PendingOrdersSCM-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="PendingOrdersSCM-print-button"
            onClick={handlePrint}
          >
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>

      <div className="PendingOrdersSCM-table-container">
        <table ref={tableRef}>
          <thead>
            <tr>
              {[
                "Order ID", "Item", "Quantity", "Vendor", "Expected Delivery", "Status"
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
                <td colSpan="6" className="PendingOrdersSCM-no-rows">
                  Loading...
                </td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={index}
                  className="parent-row"
                >
                  <td>{item.poId}</td>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.supplierName || item.vendorName}</td>
                  <td>{formatDate(item.deliveryDate)}</td>
                  <td>{item.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="PendingOrdersSCM-no-rows">
                  No Rows To Show
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default PendingOrdersSCM;