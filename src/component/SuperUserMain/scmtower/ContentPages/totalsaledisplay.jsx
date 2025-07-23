

import React, { useState, useEffect, useRef } from 'react';
import './TotalSaleDisplay.css';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { API_BASE_URL } from '../../../api/api';
import { FloatingInput } from '../../../../FloatingInputs';

const TotalSaleDisplay = () => {
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
    doc.text('Total Sales Overview', doc.internal.pageSize.width / 2, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`From Date: ${formatDate(dateRange.from)}`, 14, 25);
    doc.text(`To Date: ${formatDate(dateRange.to)}`, 64, 25);
    doc.text(`Generated on: ${formatDateTime()}`, 219, 25);

    const tableData = filteredData.map((item) => [
      item.serviceName || item.testGridIpdBill?.[0]?.serviceName || 'N/A',
      `₹${item.totalAmount?.toFixed(2) || item.total?.toFixed(2) || 0}`,
      formatDate(item.billing_date || item.billingDate),
    ]);

    const headers = ['Item/Service', 'Amount', 'Date'];
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

  const [billingData, setBillingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState({
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0],
  });
  const [todayCollection, setTodayCollection] = useState({
    total: 0,
    opd: 0,
    ipd: 0,
  });
  const [searchedUserTotal, setSearchedUserTotal] = useState(null);
  const [selectedBillingType, setSelectedBillingType] = useState('opd');
  const tableRef = useRef(null);

  const fetchOPDBillingData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/opdBilling`);
      const transformedData = response.data.map((item) => ({
        ...item,
        serviceName: item.testGridOpdBillDTO?.[0]?.serviceDetailsDTO?.serviceName || 'N/A',
        totalAmount: item.totalAmount,
        billing_date: item.billing_date,
      }));
      setBillingData(transformedData);
      const totalOPDCollection = transformedData.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
      setTodayCollection((prev) => ({
        ...prev,
        opd: totalOPDCollection,
        total: totalOPDCollection,
      }));
    } catch (error) {
      console.error('Error fetching OPD billing data:', error);
      setBillingData([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchIPDBillingData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/ipbillings`);
      const transformedData = response.data.map((item) => ({
        ...item,
        serviceName: item.testGridIpdBill?.[0]?.serviceName || 'N/A',
        total: item.total,
        billingDate: item.billingDate,
      }));
      setBillingData(transformedData);
      const totalIPDCollection = transformedData.reduce((sum, item) => sum + (item.total || 0), 0);
      setTodayCollection((prev) => ({
        ...prev,
        ipd: totalIPDCollection,
        total: totalIPDCollection,
      }));
    } catch (error) {
      console.error('Error fetching IPD billing data:', error);
      setBillingData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedBillingType === 'opd') {
      fetchOPDBillingData();
    } else if (selectedBillingType === 'ipd') {
      fetchIPDBillingData();
    }
  }, [selectedBillingType, dateRange]);

  useEffect(() => {
    if (searchText && billingData.length > 0) {
      const matchingReceipts = billingData.filter((item) =>
        item.serviceName?.toLowerCase().includes(searchText.toLowerCase())
      );
      if (matchingReceipts.length > 0) {
        const userTotal = matchingReceipts.reduce(
          (sum, item) => sum + (item.totalAmount || item.total || 0),
          0
        );
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
      ['', '', '', 'Total Sales Overview'],
      [''],
      ['From Date:', formatDate(dateRange.from), 'To Date:', formatDate(dateRange.to)],
      [''],
      ['Total Collection:', `₹${todayCollection.total.toFixed(2)}`],
      [''],
    ];
    const tableRows = filteredData.map((item) => [
      item.serviceName || item.testGridIpdBill?.[0]?.serviceName || 'N/A',
      `₹${item.totalAmount?.toFixed(2) || item.total?.toFixed(2) || 0}`,
      formatDate(item.billing_date || item.billingDate),
    ]);
    const columnHeaders = ['Item/Service', 'Amount', 'Date'];
    const allRows = [...headerRows, columnHeaders, ...tableRows];
    const ws = XLSX.utils.aoa_to_sheet(allRows);
    const colWidths = [{ wch: 20 }, { wch: 15 }, { wch: 15 }];
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
    XLSX.utils.book_append_sheet(wb, ws, 'TotalSaleDisplay');
    XLSX.writeFile(wb, 'TotalSaleDisplay.xlsx');
  };

  const filteredData = billingData.filter((item) => {
    const receiptDate = new Date(item.billing_date || item.billingDate);
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);
    const isWithinDateRange = receiptDate >= fromDate && receiptDate <= toDate;
    const matchesSearchText = Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    );
    return isWithinDateRange && matchesSearchText;
  });

  const [columnWidths, setColumnWidths] = useState([100, 100, 100]);

  return (
    <div className="TotalSaleDisplay-container">
      <div className="TotalSaleDisplay-header-main-div">
        <Link to="/superuser/tower" className="TotalSaleDisplay-back-button">
          <i className="fa-solid fa-arrow-left"></i>
        </Link>
        <div className="TotalSaleDisplay-header-div">* Total Sales Overview</div>
        <div></div>
      </div>
      <div className="TotalSaleDisplay-header">
        <div className="TotalSaleDisplay-grid">
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
        <div className="TotalSaleDisplay-status-filters">
          <label>
            <input
              type="radio"
              name="status"
              checked={selectedBillingType === 'opd'}
              onChange={() => handleBillingTypeChange('opd')}
            />{' '}
            OPD Billing
          </label>
          <label>
            <input
              type="radio"
              name="status"
              checked={selectedBillingType === 'ipd'}
              onChange={() => handleBillingTypeChange('ipd')}
            />{' '}
            IPD Billing
          </label>
        </div>
      </div>
      <div className="TotalSaleDisplay-search-container">
        <input
          type="text"
          className="TotalSaleDisplay-search-box"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="TotalSaleDisplay-Collection">
          Total Sale: ₹{todayCollection.total.toFixed(2)}
        </div>
        <div className="TotalSaleDisplay-search-right">
          <span className="TotalSaleDisplay-results-count-span">
            Showing {filteredData.length} results
          </span>
          <button className="TotalSaleDisplay-print-button" onClick={handleExport}>
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button className="TotalSaleDisplay-print-button" onClick={handlePrint}>
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <table ref={tableRef}>
        <thead>
          <tr>
            {['Item/Service', 'Amount', 'Date'].map((header, index) => (
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
              <td colSpan="3" className="TotalSaleDisplay-no-rows">
                Loading...
              </td>
            </tr>
          ) : filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <tr key={index} className="parent-row">
                <td>{item.serviceName || item.testGridIpdBill?.[0]?.serviceName || 'N/A'}</td>
                <td>₹{item.totalAmount?.toFixed(2) || item.total?.toFixed(2) || 0}</td>
                <td>{formatDate(item.billing_date || item.billingDate)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="TotalSaleDisplay-no-rows">
                No Rows To Show
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TotalSaleDisplay;