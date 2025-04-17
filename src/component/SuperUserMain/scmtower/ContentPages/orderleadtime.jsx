// import React, { useState, useRef } from 'react';
// import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
// import { Link } from 'react-router-dom';

// const OrderLeadTimeSCM = () => {
//   const tableRef = useRef(null);
//   const [columnWidths, setColumnWidths] = useState(0);
//   // Example order lead time data
//   const orderData = [
//     {
//       orderID: 'PO101',
//       orderDate: '2024-09-01',
//       supplier: 'MedSupply Co.',
//       expectedDeliveryDate: '2024-09-04',
//       actualDeliveryDate: '2024-09-05',
//       leadTime: '4 days'
//     },
//     {
//       orderID: 'PO102',
//       orderDate: '2024-09-03',
//       supplier: 'HealthEquip Ltd.',
//       expectedDeliveryDate: '2024-09-06',
//       actualDeliveryDate: '2024-09-06',
//       leadTime: '3 days'
//     },
//     {
//       orderID: 'PO103',
//       orderDate: '2024-09-05',
//       supplier: 'MediGoods Inc.',
//       expectedDeliveryDate: '2024-09-08',
//       actualDeliveryDate: '2024-09-09',
//       leadTime: '4 days'
//     }
//   ];
//   const handlePrint = () => {
//     window.print();
//   };


//   return (
//     <div className="orderleadtime-scm-container">
//       <h2 className="orderleadtime-scm-title">Order Lead Time</h2>
//       <table className="orderleadtime-scm-table" ref={tableRef}>
//         <thead>
//           <tr>
//             {[
//               "Order ID",
//               "Order Date",
//               "Supplier",
//               "Expected Delivery Date",
//               "Actual Delivery Date",
//               "Lead Time"
//             ].map((header, index) => (
//               <th
//                 key={index}
//                 style={{ width: columnWidths[index] }}
//                 className="rd-resizable-th"
//               >
//                 <div className="header-content">
//                   <span>{header}</span>
//                   <div
//                     className="resizer"
//                     onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
//                   ></div>
//                 </div>
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {orderData.map((order, index) => (
//             <tr key={index}>
//               <td>{order.orderID}</td>
//               <td>{order.orderDate}</td>
//               <td>{order.supplier}</td>
//               <td>{order.expectedDeliveryDate}</td>
//               <td>{order.actualDeliveryDate}</td>
//               <td>{order.leadTime}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <Link to="/superuser/tower" className="ordleadtime-back-button">Back to SCM Control Tower</Link>
//       <button className="lowstockprintbtn" style={{ marginLeft: "20px", border: "none" }} onClick={handlePrint}>Print</button>

//     </div>
//   );
// };

// export default OrderLeadTimeSCM;

import React, { useState, useEffect, useRef } from 'react';
import './OrderLeadTimeSCM.css';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { API_BASE_URL } from '../../../api/api';
import { FloatingInput, FloatingSelect, FloatingTextarea } from '../../../../FloatingInputs';
const OrderLeadTimeSCM = () => {
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
    doc.text('Order Lead Time ', doc.internal.pageSize.width / 2, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`From Date: ${formatDate(dateRange.from)}`, 14, 25);
    doc.text(`To Date: ${formatDate(dateRange.to)}`, 64, 25);
    doc.text(`Generated on: ${formatDateTime()}`, 219, 25);
    const tableData = filteredData.map(receipt => [
      receipt.receiptNo || receipt.opdBillingId,
      formatDate(receipt.receiptDate || receipt.billing_date),
      receipt.userName || receipt.outPatientDTO?.patient?.firstName,
      `₹${receipt.amount?.toFixed(2) || receipt.totalAmount?.toFixed(2)}`,
      receipt.paymentType || receipt.paymentModeDTO?.[0]?.paymentMode,
      receipt.patientName || `${receipt.outPatientDTO?.patient?.firstName} ${receipt.outPatientDTO?.patient?.lastName}`,
      receipt.patientMobileNumber || receipt.outPatientDTO?.patient?.contactNumber
    ]);
    const headers = [
      "Order ID", "Order Date", "Supplier", "Expected Delivery Date", "Actual Delivery Date", "Lead Time"
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
  const [mrNoData, setMrNoData] = useState([]);
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
  const [selectedBillingType, setSelectedBillingType] = useState('opd');
  const [billingData, setBillingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState({
    from: new Date().toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  });
  const [todayCollection, setTodayCollection] = useState({
    total: 0,
    ipd: 0,
    opd: 0
  });
  const [searchedUserTotal, setSearchedUserTotal] = useState(null);
  const tableRef = useRef(null);
  useEffect(() => {
    if (activePopup === "MrNo") {
      fetchMrno();
    }
  }, [activePopup]);
  const fetchMrno = async () => {
    try {
      const response = await axios.get("http://192.168.233.114:8080/api/");
      setMrNoData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchOPDBillingData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/opdBilling/totalAmountByWeek?startDate=${dateRange.from}&endDate=${dateRange.to}`
      );
      console.log('OPD API Response:', response.data);
      const dataArray = Array.isArray(response?.data) ? response.data : [response?.data || {}];
      const transformedData = response.data.opdBillings.map(receipt => ({
        opdBillingId: receipt.opdBillingId || '',
        billing_date: receipt.billing_date || new Date().toISOString(),
        totalAmount: receipt.totalAmount || 0,
        paymentModeDTO: Array.isArray(receipt.paymentModeDTO) ? receipt.paymentModeDTO : [],
        outPatientDTO: receipt.outPatientDTO || {},
        patientName: receipt.outPatientDTO?.patient
          ? `${receipt.outPatientDTO.patient.firstName || ''} ${receipt.outPatientDTO.patient.lastName || ''}`.trim()
          : '',
        patientMobileNumber: receipt.outPatientDTO?.patient?.contactNumber || '',
      }));
      setBillingData(transformedData);
      const totalOPDCollection = transformedData.reduce((sum, receipt) => sum + (receipt.totalAmount || 0), 0);
      setTodayCollection(prev => ({
        ...prev,
        opd: totalOPDCollection,
        total: prev.ipd + totalOPDCollection,
      }));
    } catch (error) {
      console.error('Error fetching Pharmacy data:', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);
        console.log('Error response status:', error.response.status);
      }
      setBillingData([]);
      setTodayCollection(prev => ({
        ...prev,
        opd: 0,
        total: prev.ipd,
      }));
    } finally {
      setLoading(false);
    }
  };
  const fetchIPDMoneyReceiptData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/ipd-money-receipt`);
      const transformedData = response.data.map(receipt => ({
        receiptNo: receipt.receiptNo,
        receiptDate: receipt.receiptDate,
        userName: receipt.createdBy,
        amount: receipt.amount,
        paymentType: receipt.paymentType,
        patientName: `${receipt.ipAdmissionDTO.patient.patient.firstName} ${receipt.ipAdmissionDTO.patient.patient.lastName}`,
        patientMobileNumber: receipt.ipAdmissionDTO.patient.patient.contactNumber
      }));
      setBillingData(transformedData);
      const totalIPDCollection = transformedData.reduce((sum, receipt) => sum + (receipt.amount || 0), 0);
      setTodayCollection(prev => ({
        ...prev,
        ipd: totalIPDCollection,
        total: totalIPDCollection
      }));
    } catch (error) {
      console.error('Error fetching IPD money receipt data:', error);
      setBillingData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (selectedBillingType === 'opd') {
      fetchOPDBillingData();
    } else if (selectedBillingType === 'ipd') {
      fetchIPDMoneyReceiptData();
    }
  }, [selectedBillingType, dateRange]);
  useEffect(() => {
    if (searchText && billingData.length > 0) {
      const matchingReceipts = billingData.filter(item =>
        item.userName?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
        item.patientName?.toString().toLowerCase().includes(searchText.toLowerCase())
      );
      if (matchingReceipts.length > 0) {
        const userTotal = matchingReceipts.reduce((sum, receipt) => sum + (receipt.amount || receipt.totalAmount || 0), 0);
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
      ['', '', '', 'Order Lead Time '],
      [''],
      ['From Date:', formatDate(dateRange.from), 'To Date:', formatDate(dateRange.to)],
      [''],
      ['Total Collection:', `₹${todayCollection.total.toFixed(2)}`],
      ['']
    ];
    const tableRows = filteredData.map(receipt => [
      receipt.receiptNo || receipt.opdBillingId,
      formatDate(receipt.receiptDate || receipt.billing_date),
      receipt.userName || receipt.outPatientDTO?.patient?.firstName,
      `₹${receipt.amount?.toFixed(2) || receipt.totalAmount?.toFixed(2)}`,
      receipt.paymentType || receipt.paymentModeDTO?.[0]?.paymentMode,
      receipt.patientName || `${receipt.outPatientDTO?.patient?.firstName} ${receipt.outPatientDTO?.patient?.lastName}`,
      receipt.patientMobileNumber || receipt.outPatientDTO?.patient?.contactNumber
    ]);
    const columnHeaders = [
      "Order ID", "Order Date", "Supplier", "Expected Delivery Date", "Actual Delivery Date", "Lead Time"
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
    XLSX.utils.book_append_sheet(wb, ws, 'OrderLeadTimeSCMReport');
    XLSX.writeFile(wb, 'OrderLeadTimeSCMReport.xlsx');
  };
  const filteredData = billingData.filter(item => {
    const receiptDate = new Date(item.receiptDate || item.billing_date);
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);
    const isWithinDateRange = receiptDate >= fromDate && receiptDate <= toDate;
    const matchesSearchText = Object.values(item).some(value =>
      value?.toString().toLowerCase().includes(searchText.toLowerCase())
    );
    return isWithinDateRange && matchesSearchText;
  });
  const [columnWidths, setColumnWidths] = useState(0);
  const stockOrders = [
    { item: 'Surgical Masks', quantity: 500, supplier: 'MedSupply Co.', expectedDelivery: '2024-10-10' },
    { item: 'Gloves', quantity: 1000, supplier: 'SafeHealth', expectedDelivery: '2024-10-15' },
    { item: 'Ventilator', quantity: 10, supplier: 'TechMed Inc.', expectedDelivery: '2024-10-20' },
    { item: 'Hand Sanitizer', quantity: 200, supplier: 'PureHands', expectedDelivery: '2024-10-08' },
  ];
  return (
    <div className="OrderLeadTimeSCM-container">
      <div className="OrderLeadTimeSCM-header-main-div">
        <Link to="/superuser/tower" className="OrderLeadTimeSCM-back-button"><i class="fa-solid fa-arrow-left"></i> </Link>
        <div className="OrderLeadTimeSCM-header-div">
          * Order Lead Time
        </div>
        <div>
        </div>
      </div>
      <div className="OrderLeadTimeSCM-header">
        <div className="OrderLeadTimeSCM-grid">
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
        <div className="OrderLeadTimeSCM-status-filters">
          <label>
            <input
              type="radio"
              name="status"
              checked={selectedBillingType === 'opd'}
              onChange={() => handleBillingTypeChange('opd')}
            /> Pharmacy
          </label>
          <label>
            <input
              type="radio"
              name="status"
              checked={selectedBillingType === 'ipd'}
              onChange={() => handleBillingTypeChange('ipd')}
            /> Inventory
          </label>
        </div>
      </div>
      <div className="OrderLeadTimeSCM-search-container">
        <input
          type="text"
          className="OrderLeadTimeSCM-search-box"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="OrderLeadTimeSCM-search-right">
          <span className="OrderLeadTimeSCM-results-count-span">
            Showing {filteredData.length} results
          </span>
          <button
            className="OrderLeadTimeSCM-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="OrderLeadTimeSCM-print-button"
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
              "Order ID", "Order Date", "Supplier", "Expected Delivery Date", "Actual Delivery Date", "Lead Time"
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
              <td colSpan="6" className="OrderLeadTimeSCM-no-rows">
                Loading...
              </td>
            </tr>
          ) : filteredData.length > 0 ? (
            filteredData.map((receipt, index) => (
              <tr
                key={index}
                className="parent-row"
              >
                <td>{receipt.receiptNo || receipt.opdBillingId}</td>
                <td>{receipt.receiptDate || receipt.billing_date}</td>
                <td>{receipt.userName || receipt.outPatientDTO?.patient?.firstName}</td>
                <td>₹{receipt.amount?.toFixed(2) || receipt.totalAmount?.toFixed(2)}</td>
                <td>{receipt.paymentType || receipt.paymentModeDTO?.[0]?.paymentMode}</td>
                <td>{receipt.patientName || `${receipt.outPatientDTO?.patient?.firstName} ${receipt.outPatientDTO?.patient?.lastName}`}</td>
                <td>{receipt.patientMobileNumber || receipt.outPatientDTO?.patient?.contactNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="OrderLeadTimeSCM-no-rows">
                No Rows To Show
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default OrderLeadTimeSCM;