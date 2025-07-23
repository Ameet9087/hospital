import React, { useState, useRef, useEffect } from "react";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import "./UserCollectionReport.css";
import { startResizing } from "../../TableHeadingResizing/ResizableColumns";
import { API_BASE_URL } from "../api/api";

const CategoryWiseReport = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [billingData, setBillingData] = useState([]);
  const [summaryData, setSummaryData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState("summary");
  const tableRef = useRef(null);

  const fetchRadiologySummary = (start, end) => {
    if (!start || !end) return;

    fetch(`${API_BASE_URL}/opdBilling/radiology-summary?startDate=${start}&endDate=${end}`)
      .then(response => response.json())
      .then(data => {
        if (data.serviceSummary) {
          setBillingData(data.serviceSummary);
          setSummaryData({
            totalOriginalAmountSum: data.totalOriginalAmountSum,
            totalRateSum: data.totalRateSum,
            totalDiscountSum: data.totalDiscountSum,
            totalServiceCount: data.totalServiceCount,
            totalServiceAmountSum: data.totalServiceAmountSum,
            totalPaidAmountSum: data.totalPaidAmountSum
          });
        }
      })
      .catch(error => console.error('Error fetching radiology summary:', error));
  };

  const fetchOPDBillingData = (start, end) => {
    if (!start || !end) return;

    fetch(`${API_BASE_URL}/opdBilling/billing-data?startDate=${start}&endDate=${end}`)
      .then(response => response.json())
      .then(data => {
        if (data.serviceSummary) {
          setBillingData(data.serviceSummary);
          setSummaryData(null);
        }
      })
      .catch(error => console.error('Error fetching OPD billing data:', error));
  };

  const fetchIPDBillingData = (start, end) => {
    if (!start || !end) return;

    fetch(`${API_BASE_URL}/ipbillings/billing-data?startDate=${start}&endDate=${end}`)
      .then(response => response.json())
      .then(data => {
        if (data.serviceSummary) {
          setBillingData(data.serviceSummary);
          setSummaryData(null);
        }
      })
      .catch(error => console.error('Error fetching IPD billing data:', error));
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (endDate) {
      fetchData(date, endDate);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (startDate) {
      fetchData(startDate, date);
    }
  };

  const fetchData = (start, end) => {
    if (selectedReport === "detailed") {
      fetchOPDBillingData(start, end);
    } else if (selectedReport === "ipd") {
      fetchIPDBillingData(start, end);
    } else if (selectedReport === "summary") {
      fetchRadiologySummary(start, end);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchData(startDate, endDate);
    }
  }, [selectedReport]);

  const handleExport = () => {
    const dataToExport = [
      ...filteredData.map(item => ({
        'Service Name': item.serviceName,
        'Billing Date': item.billingDate,
        'Service Count': item.serviceCount,
        'Rate': item.rate,
        'Total Paid Amount': item.totalPaidAmount,
        'Total Service Amount': item.totalServiceAmount,
        'Original Total Amount': item.originalTotalAmount,
        'Total Discount': item.totalDiscount,
      })),
      {
        'Service Name': 'Total',
        'Billing Date': '',
        'Service Count': summaryData?.totalServiceCount || 0,
        'Rate': summaryData?.totalRateSum || 0,
        'Total Paid Amount': summaryData?.totalPaidAmountSum || 0,
        'Total Service Amount': summaryData?.totalServiceAmountSum || 0,
        'Original Total Amount': summaryData?.totalOriginalAmountSum || 0,
        'Total Discount': summaryData?.totalDiscountSum || 0,
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Billing Report");
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'BillingReport.xlsx');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Billing Report</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .total-row { font-weight: bold; background-color: #f8f8f8; }
          </style>
        </head>
        <body>
          <table>
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Billing Date</th>
                <th>Service Count</th>
                <th>Rate</th>
                <th>Total Paid Amount</th>
                <th>Total Service Amount</th>
                <th>Original Total Amount</th>
                <th>Total Discount</th>
              </tr>
            </thead>
            <tbody>
              ${filteredData.map(item => `
                <tr>
                  <td>${item.serviceName}</td>
                  <td>${item.billingDate}</td>
                  <td>${item.serviceCount}</td>
                  <td>${item.rate}</td>
                  <td>${item.totalPaidAmount}</td>
                  <td>${item.totalServiceAmount}</td>
                  <td>${item.originalTotalAmount}</td>
                  <td>${item.totalDiscount}</td>
                </tr>
              `).join('')}
              ${summaryData ? `
                <tr class="total-row">
                  <td>Total</td>
                  <td></td>
                  <td>${summaryData.totalServiceCount}</td>
                  <td>${summaryData.totalRateSum}</td>
                  <td>${summaryData.totalPaidAmountSum}</td>
                  <td>${summaryData.totalServiceAmountSum}</td>
                  <td>${summaryData.totalOriginalAmountSum}</td>
                  <td>${summaryData.totalDiscountSum}</td>
                </tr>
              ` : ''}
            </tbody>
          </table>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const filteredData = billingData.filter(item =>
    item.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.billingDate.includes(searchTerm) ||
    item.serviceCount.toString().includes(searchTerm) ||
    item.totalServiceAmount.toString().includes(searchTerm)
  );

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Category Wise Imaging Report</h3>
        <div className="user-collection-report-filters">
          <div className="user-collection-report-date-filter">
            <label>From:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleStartDateChange(e.target.value)}
            />
            <label>To:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => handleEndDateChange(e.target.value)}
            />
          </div>
          <div className="report-selection">
            <label>
              <input
                type="radio"
                name="reportType"
                value="summary"
                checked={selectedReport === "summary"}
                onChange={() => setSelectedReport("summary")}
              />
              All
            </label>
            <label>
              <input
                type="radio"
                name="reportType"
                value="ipd"
                checked={selectedReport === "ipd"}
                onChange={() => setSelectedReport("ipd")}
              />
              ipd
            </label>
            <label>
              <input
                type="radio"
                name="reportType"
                value="detailed"
                checked={selectedReport === "detailed"}
                onChange={() => setSelectedReport("detailed")}
              />
              opd
            </label>
          </div>
        </div>
      </div>

      <div className="user-collection-report-controls">
        <input
          type="text"
          className="user-collection-report-search"
          placeholder="Search..."
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button className="user-collection-report-print-btn" onClick={handlePrint}>
          Print
        </button>
        <button className="user-collection-report-print-btn" onClick={handleExport}>
          Export
        </button>
      </div>

      <div className="user-collection-report-tab">
        <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
                "Service Name",
                "Billing Date",
                "Service Count",
                "Rate",
                "Total Paid Amount",
                "Total Service Amount",
                "Original Total Amount",
                "Total Discount",
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
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.serviceName}</td>
                <td>{item.billingDate}</td>
                <td>{item.serviceCount}</td>
                <td>{item.rate}</td>
                <td>{item.totalPaidAmount}</td>
                <td>{item.totalServiceAmount}</td>
                <td>{item.originalTotalAmount}</td>
                <td>{item.totalDiscount}</td>
              </tr>
            ))}
            {summaryData && (
              <tr className="total-row" style={{ fontWeight: 'bold', backgroundColor: '#f8f8f8' }}>
                <td colSpan={2}>TOTAL</td>
                <td>{summaryData.totalServiceCount}</td>
                <td>{summaryData.totalRateSum}</td>
                <td>{summaryData.totalPaidAmountSum}</td>
                <td>{summaryData.totalServiceAmountSum}</td>
                <td>{summaryData.totalOriginalAmountSum}</td>
                <td>{summaryData.totalDiscountSum}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryWiseReport;