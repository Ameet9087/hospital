import React, { useState, useRef, useEffect } from 'react';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { API_BASE_URL } from '../api/api';

const RevenueGeneratedReport = () => {
  const [showReport, setShowReport] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [columnWidths, setColumnWidths] = useState({});
  const [reportsData, setReportsData] = useState([]);
  const [summaryTotals, setSummaryTotals] = useState(null);
  const [selectedRange, setSelectedRange] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [selectedReport, setSelectedReport] = useState("summary");
  const tableRef = useRef(null);

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    const tableClone = document.querySelector('.patientList-table').cloneNode(true);
    const thElements = tableClone.querySelectorAll('th');
    const tdElements = tableClone.querySelectorAll('td');

    printWindow.document.write('<html><head><title>Revenue Generated Report</title>');
    printWindow.document.write('<style>body { font-family: Arial, sans-serif; margin: 20px; font-size: 14px; }');
    printWindow.document.write('.patientList-table { width: 100%; border-collapse: collapse; margin-top: 20px; }');
    printWindow.document.write('.patientList-table th, .patientList-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }');
    printWindow.document.write('.summary-row { background-color: #f5f5f5; font-weight: bold; }');
    printWindow.document.write('</style></head><body>');
    printWindow.document.write('<h1 style="text-align: center;">Revenue Generated Report</h1>');
    printWindow.document.write(tableClone.outerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const handleExport = () => {
    let data = reportsData.map(row => ({
      'Service Name': row.serviceName,
      'Billing Date': row.billingDate,
      'Service Count': row.serviceCount,
      'Total Paid Amount': row.totalPaidAmount,
      'Rate': row.rate,
      'Total Service Amount': row.totalServiceAmount,
      'Original Total Amount': row.originalTotalAmount,
      'Total Discount': row.totalDiscount
    }));

    if (summaryTotals) {
      data.push({
        'Service Name': 'TOTAL',
        'Service Count': summaryTotals.totalServiceCount,
        'Total Paid Amount': summaryTotals.totalPaidAmountSum,
        'Rate': summaryTotals.totalRateSum,
        'Total Service Amount': summaryTotals.totalServiceAmountSum,
        'Original Total Amount': summaryTotals.totalOriginalAmountSum,
        'Total Discount': summaryTotals.totalDiscountSum
      });
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Revenue Generated Report');
    XLSX.writeFile(workbook, 'Revenue_Generated_Report.xlsx');
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!fromDate || !toDate) {
        return;
      }

      setIsLoading(true);
      setError(null);
      setShowReport(true);

      let apiUrl = '';
      if (selectedReport === "summary") {
        apiUrl = `${API_BASE_URL}/opdBilling/radiology-summary?startDate=${fromDate}&endDate=${toDate}`;
      } else if (selectedReport === "opd") {
        apiUrl = `${API_BASE_URL}/opdBilling/billing-data/radiology?startDate=${fromDate}&endDate=${toDate}`;
      } else if (selectedReport === "detailed") {
        apiUrl = `${API_BASE_URL}/ipbillings/billing-data/radiology?startDate=${fromDate}&endDate=${toDate}`;
      }

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        if (data && Array.isArray(data.serviceSummary)) {
          setReportsData(data.serviceSummary);
          if (selectedReport === "summary") {
            setSummaryTotals({
              totalOriginalAmountSum: data.totalOriginalAmountSum,
              totalRateSum: data.totalRateSum,
              totalDiscountSum: data.totalDiscountSum,
              totalServiceCount: data.totalServiceCount,
              totalServiceAmountSum: data.totalServiceAmountSum,
              totalPaidAmountSum: data.totalPaidAmountSum
            });
          } else {
            setSummaryTotals(null);
          }
        } else {
          setError('Data format is incorrect');
        }
      } catch (err) {
        setError('Error fetching data: ' + err.message);
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedReport, fromDate, toDate]);

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ Revenue Generated Report</h3>
        <div className="user-collection-report-filters">
          <div className="user-collection-report-date-filter">
            <label>From:</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            <label>To:</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
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
                value="opd"
                checked={selectedReport === "opd"}
                onChange={() => setSelectedReport("opd")}
              />
              opd
            </label>
            <label>
              <input
                type="radio"
                name="reportType"
                value="detailed"
                checked={selectedReport === "detailed"}
                onChange={() => setSelectedReport("detailed")}
              />
              ipd
            </label>
          </div>
        </div>
      </div>

      {showReport && (
        <>
          <div className="user-collection-report-controls">
            <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
            <button className="user-collection-report-print-btn" onClick={handleExport}>Export</button>
          </div>
          <div className='user-collection-report-tab'>
            <table className="patientList-table" id='tableSection' ref={tableRef}>
              <thead>
                <tr>
                  {['Service Name', 'Billing Date', 'Service Count', 'Total Paid Amount', 'Rate', 'Total Service Amount', 'Original Total Amount', 'Total Discount'].map((header, index) => (
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
                {reportsData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.serviceName}</td>
                    <td>{row.billingDate}</td>
                    <td>{row.serviceCount}</td>
                    <td>{row.totalPaidAmount}</td>
                    <td>{row.rate}</td>
                    <td>{row.totalServiceAmount}</td>
                    <td>{row.originalTotalAmount}</td>
                    <td>{row.totalDiscount}</td>
                  </tr>
                ))}
                {summaryTotals && (
                  <tr className="summary-row" style={{ fontWeight: 'bold', backgroundColor: '#f8f8f8' }}>
                    <td colSpan={2}>TOTAL</td>
                    <td>{summaryTotals.totalServiceCount}</td>
                    <td>{summaryTotals.totalPaidAmountSum}</td>
                    <td>{summaryTotals.totalRateSum}</td>
                    <td>{summaryTotals.totalServiceAmountSum}</td>
                    <td>{summaryTotals.totalOriginalAmountSum}</td>
                    <td>{summaryTotals.totalDiscountSum}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default RevenueGeneratedReport;