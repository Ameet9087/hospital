import React, { useState, useEffect, useRef } from 'react';
import './BackOrderSCM.css';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { API_BASE_URL } from '../../../api/api';
import { FloatingInput, FloatingSelect, FloatingTextarea } from '../../../../FloatingInputs';

const BackOrderSCM = () => {
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
    doc.text('Back Orders Report', doc.internal.pageSize.width / 2, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`From Date: ${formatDate(dateRange.from)}`, 14, 25);
    doc.text(`To Date: ${formatDate(dateRange.to)}`, 64, 25);
    doc.text(`Generated on: ${formatDateTime()}`, 219, 25);

    const tableData = filteredData.map(item => [
      item.returnSupplierId || item.returnToVendorProcurmentId,
      item.itemName,
      item.totalQty || item.quantity,
      item.returnQty,
      item.returnDate || item.goodsReceiptDate,
      item.supplierName || item.vendorName
    ]);

    const headers = [
      "Order ID", "Item Name", "Quantity Ordered", "Quantity Back-Ordered", "Expected Restock Date", "Supplier"
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

    const lastY = doc.lastAutoTable.finalY;
    doc.text(`Total Collection: ₹${todayCollection.total.toFixed(2)}`, 14, lastY + 10);
    if (searchedUserTotal !== null) {
      doc.text(`Searched User's Total Collection: ₹${searchedUserTotal.toFixed(2)}`, 14, lastY + 15);
    }

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

  const [todayCollection, setTodayCollection] = useState({
    total: 0,
    pharmacy: 0,
    inventory: 0
  });

  const [searchedUserTotal, setSearchedUserTotal] = useState(null);
  const tableRef = useRef(null);

  const fetchPharmacyData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/returnsupplier/return-to-supplier`);
      const transformedData = response.data.map(item => ({
        returnSupplierId: item.returnSupplierId,
        itemName: item.itemName,
        returnDate: item.returnDate,
        returnQty: item.returnQty,
        totalQty: item.totalQty,
        supplierName: item.supplierName
      }));
      setBillingData(transformedData);
      setTodayCollection(prev => ({
        ...prev,
        pharmacy: transformedData.reduce((sum, item) => sum + (item.returnQty || 0), 0),
        total: transformedData.reduce((sum, item) => sum + (item.returnQty || 0), 0)
      }));
    } catch (error) {
      console.error('Error fetching Pharmacy data:', error);
      setBillingData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchInventoryData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/return-to-vendor-procurment/return-to-vendor`);
      const transformedData = response.data.map(item => ({
        returnToVendorProcurmentId: item.returnToVendorProcurmentId,
        itemName: item.itemName,
        quantity: item.quantity,
        returnQty: item.returnQty,
        goodsReceiptDate: item.goodsReceiptDate,
        vendorName: item.vendorName
      }));
      setBillingData(transformedData);
      setTodayCollection(prev => ({
        ...prev,
        inventory: transformedData.reduce((sum, item) => sum + (item.returnQty || 0), 0),
        total: transformedData.reduce((sum, item) => sum + (item.returnQty || 0), 0)
      }));
    } catch (error) {
      console.error('Error fetching Inventory data:', error);
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

  useEffect(() => {
    if (searchText && billingData.length > 0) {
      const matchingReceipts = billingData.filter(item =>
        item.itemName?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
        item.supplierName?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
        item.vendorName?.toString().toLowerCase().includes(searchText.toLowerCase())
      );
      if (matchingReceipts.length > 0) {
        const userTotal = matchingReceipts.reduce((sum, item) => sum + (item.returnQty || 0), 0);
        setSearchedUserTotal(userTotal);
      } else {
        setSearchedUserTotal(null);
      }
    } else {
      setSearchedUserTotal(null);
    }
  }, [searchText, billingData]);

  const handleBillingTypeChange = (type) => {
    setSelectedBillingType(type);
  };

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const headerRows = [
      [''],
      ['', '', '', 'Back Orders Report'],
      [''],
      ['From Date:', formatDate(dateRange.from), 'To Date:', formatDate(dateRange.to)],
      [''],
      ['Total Collection:', `₹${todayCollection.total.toFixed(2)}`],
      ['']
    ];
    const tableRows = filteredData.map(item => [
      item.returnSupplierId || item.returnToVendorProcurmentId,
      item.itemName,
      item.totalQty || item.quantity,
      item.returnQty,
      item.returnDate || item.goodsReceiptDate,
      item.supplierName || item.vendorName
    ]);
    const columnHeaders = [
      "Order ID", "Item Name", "Quantity Ordered", "Quantity Back-Ordered", "Expected Restock Date", "Supplier"
    ];
    const allRows = [
      ...headerRows,
      columnHeaders,
      ...tableRows
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
    XLSX.utils.book_append_sheet(wb, ws, 'BackOrderReport');
    XLSX.writeFile(wb, 'BackOrderReport.xlsx');
  };

  const filteredData = billingData.filter(item => {
    const receiptDate = new Date(item.returnDate || item.goodsReceiptDate);
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);
    const isWithinDateRange = receiptDate >= fromDate && receiptDate <= toDate;
    const matchesSearchText = Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    );
    return isWithinDateRange && matchesSearchText;
  });

  const [columnWidths, setColumnWidths] = useState(0);

  return (
    <div className="BackOrderSCM-container">
      <div className="BackOrderSCM-header-main-div">
        <Link to="/superuser/tower" className="BackOrderSCM-back-button"><i className="fa-solid fa-arrow-left"></i> </Link>
        <div className="BackOrderSCM-header-div">
          * Back Orders
        </div>
        <div></div>
      </div>
      <div className="BackOrderSCM-header">
        <div className="BackOrderSCM-grid">
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
        <div className="BackOrderSCM-status-filters">
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
      <div className="BackOrderSCM-search-container">
        <input
          type="text"
          className="BackOrderSCM-search-box"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="BackOrderSCM-search-right">
          <span className="BackOrderSCM-results-count-span">
            Showing {filteredData.length} results
          </span>
          <button
            className="BackOrderSCM-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="BackOrderSCM-print-button"
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
              "Order ID", "Item Name", "Quantity Ordered", "Quantity Back-Ordered", "Expected Restock Date", "Supplier"
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
              <td colSpan="6" className="BackOrderSCM-no-rows">
                Loading...
              </td>
            </tr>
          ) : filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr
                key={index}
                className="parent-row"
              >
                <td>{item.returnSupplierId || item.returnToVendorProcurmentId}</td>
                <td>{item.itemName}</td>
                <td>{item.totalQty || item.quantity}</td>
                <td>{item.returnQty}</td>
                <td>{item.returnDate || item.goodsReceiptDate}</td>
                <td>{item.supplierName || item.vendorName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="BackOrderSCM-no-rows">
                No Rows To Show
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BackOrderSCM;