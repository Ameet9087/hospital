import React, { useState, useEffect, useRef } from 'react';
import './LowStockListDisplay.css';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { API_BASE_URL } from '../../../api/api';
import { FloatingInput } from '../../../../FloatingInputs';

const LateStockListDisplay = () => {
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
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
      hour12: true,
    });
  };

  const handlePrint = () => {
    const doc = new jsPDF('l', 'mm', 'a4');
    doc.setFontSize(16);
    doc.text('Low Stock Items', doc.internal.pageSize.width / 2, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`From Date: ${formatDate(dateRange.from)}`, 14, 25);
    doc.text(`To Date: ${formatDate(dateRange.to)}`, 64, 25);
    doc.text(`Generated on: ${formatDateTime()}`, 219, 25);

    const tableData = filteredData.map((item) => [
      item.purchaseOrderNumber,
      item.supplierName || item.vendorName,
      formatDate(item.deliveryDate),
      item.lateDeliveries,
      formatDate(item.goodsReceiptDate),
    ]);

    const headers = ['Purchase Order Number', 'Supplier/Vendor', 'Delivery Date', 'Late Deliveries', 'Goods Receipt Date'];
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

  const [billingData, setBillingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState({
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0],
  });
  const [selectedBillingType, setSelectedBillingType] = useState('pharmacy');
  const tableRef = useRef(null);

  const fetchPharmacyData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/purchaseorders/details-with-late-deliveries`);
      const transformedData = response.data.map((item) => ({
        ...item,
        supplierName: item.supplierName,
        deliveryDate: item.deliveryDate,
        lateDeliveries: item.lateDeliveries,
        goodsReceiptDate: item.goodsReceiptDate,
        purchaseOrderNumber: item.purchaseOrderNumber,
      }));
      setBillingData(transformedData);
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
      const response = await axios.get(`${API_BASE_URL}/purchase-orders/procurement/late-deliveries`);
      const transformedData = response.data.map((item) => ({
        ...item,
        vendorName: item.vendorName,
        deliveryDate: item.deliveryDate,
        lateDeliveries: item.lateDeliveries,
        goodsReceiptDate: item.goodsReceiptDate,
        purchaseOrderNumber: item.purchaseOrderNumber,
      }));
      setBillingData(transformedData);
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

  const handleBillingTypeChange = (type) => {
    setSelectedBillingType(type);
  };

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const headerRows = [
      [''],
      ['', '', '', 'Low Stock Items'],
      [''],
      ['From Date:', formatDate(dateRange.from), 'To Date:', formatDate(dateRange.to)],
      [''],
    ];
    const tableRows = filteredData.map((item) => [
      item.purchaseOrderNumber,
      item.supplierName || item.vendorName,
      formatDate(item.deliveryDate),
      item.lateDeliveries,
      formatDate(item.goodsReceiptDate),
    ]);
    const columnHeaders = ['Purchase Order Number', 'Supplier/Vendor', 'Delivery Date', 'Late Deliveries', 'Goods Receipt Date'];
    const allRows = [...headerRows, columnHeaders, ...tableRows];
    const ws = XLSX.utils.aoa_to_sheet(allRows);
    const colWidths = [{ wch: 20 }, { wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 20 }];
    ws['!cols'] = colWidths;

    const headerStyle = {
      font: { bold: true, sz: 14 },
      alignment: { horizontal: 'center' },
    };
    for (let i = 0; i < 6; i++) {
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: 0 });
      if (!ws[cellRef]) ws[cellRef] = {};
      ws[cellRef].s = headerStyle;
    }
    XLSX.utils.book_append_sheet(wb, ws, 'LowStockReport');
    XLSX.writeFile(wb, 'LowStockReport.xlsx');
  };

  const filteredData = billingData.filter((item) => {
    const deliveryDate = new Date(item.deliveryDate);
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);
    const isWithinDateRange = deliveryDate >= fromDate && deliveryDate <= toDate;
    const matchesSearchText = Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    );
    return isWithinDateRange && matchesSearchText;
  });

  const [columnWidths, setColumnWidths] = useState([100, 100, 100, 100, 100]);

  return (
    <div className="LateStockListDisplay-container">
      <div className="LateStockListDisplay-header-main-div">
        <Link to="/superuser/tower" className="LateStockListDisplay-back-button">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div className="LateStockListDisplay-header-div">* Low Stock Items</div>
        <div></div>
      </div>
      <div className="LateStockListDisplay-header">
        <div className="LateStockListDisplay-grid">
          <FloatingInput
            label="From Date"
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange((prev) => ({ ...prev, from: e.target.value }))}
          />
          <FloatingInput
            label="To Date"
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange((prev) => ({ ...prev, to: e.target.value }))}
          />
        </div>
        <div className="LateStockListDisplay-status-filters">
          <label>
            <input
              type="radio"
              name="status"
              checked={selectedBillingType === 'pharmacy'}
              onChange={() => handleBillingTypeChange('pharmacy')}
            />{' '}
            Pharmacy
          </label>
          <label>
            <input
              type="radio"
              name="status"
              checked={selectedBillingType === 'inventory'}
              onChange={() => handleBillingTypeChange('inventory')}
            />{' '}
            Inventory
          </label>
        </div>
      </div>
      <div className="LateStockListDisplay-search-container">
        <input
          type="text"
          className="LateStockListDisplay-search-box"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="LateStockListDisplay-search-right">
          <span className="LateStockListDisplay-results-count-span">
            Showing {filteredData.length} results
          </span>
          <button className="LateStockListDisplay-print-button" onClick={handleExport}>
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="LateStockListDisplay-print-button" onClick={handlePrint}>
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <table ref={tableRef}>
        <thead>
          <tr>
            {['Purchase Order Number', 'Supplier/Vendor', 'Delivery Date', 'Late Deliveries', 'Goods Receipt Date'].map(
              (header, index) => (
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
              <td colSpan="5" className="LateStockListDisplay-no-rows">
                Loading...
              </td>
            </tr>
          ) : filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index} className="parent-row">
                <td>{item.purchaseOrderNumber}</td>
                <td>{item.supplierName || item.vendorName}</td>
                <td>{formatDate(item.deliveryDate)}</td>
                <td>{item.lateDeliveries}</td>
                <td>{formatDate(item.goodsReceiptDate)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="LateStockListDisplay-no-rows">
                No Rows To Show
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LateStockListDisplay;