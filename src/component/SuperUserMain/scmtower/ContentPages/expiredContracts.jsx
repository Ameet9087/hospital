// import React, { useState, useEffect, useRef } from 'react';
// import "./ExpiredContractsSCM.css"
// import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import { API_BASE_URL } from '../../../api/api'; 
// import { FloatingInput, FloatingSelect, FloatingTextarea } from '../../../../FloatingInputs'; 

// const ExpiredContractsSCM = () => {
//   const formatDate = (date) => {
//     const d = new Date(date);
//     return d.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     });
//   };

//   const formatDateTime = () => {
//     const now = new Date();
//     return now.toLocaleString('en-IN', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   const handlePrint = () => {
//     const doc = new jsPDF('l', 'mm', 'a4');
//     doc.setFontSize(16);
//     doc.text('Expired Contracts', doc.internal.pageSize.width / 2, 15, { align: 'center' });
//     doc.setFontSize(10);
//     doc.text(`From Date: ${formatDate(dateRange.from)}`, 14, 25);
//     doc.text(`To Date: ${formatDate(dateRange.to)}`, 64, 25);
//     doc.text(`Generated on: ${formatDateTime()}`, 219, 25);

//     const tableData = filteredData.map(item => [
//       item.vendorName || item.supplierName,
//       item.itemName,
//       formatDate(item.poDate),
//       formatDate(item.goodsReceiptDate),
//       item.daysBetween
//     ]);

//     const headers = ["Contract Name","Type","Vendor","Expiration Date","Status"];
//     doc.autoTable({
//       head: [headers],
//       body: tableData,
//       startY: 30,
//       styles: {
//         fontSize: 8,
//         cellPadding: 2,
//       },
//       headStyles: {
//         fillColor: [51, 122, 183],
//         textColor: 255,
//         fontSize: 9,
//         fontStyle: 'bold',
//       },
//       alternateRowStyles: {
//         fillColor: [245, 245, 245],
//       },
//     });

//     const lastY = doc.lastAutoTable.finalY;
//     doc.setFontSize(12);



//     const pdfOutput = doc.output('bloburl');
//     window.open(pdfOutput, '_blank');
//   };

//   const [rows, setRows] = useState([]);
//   const [activePopup, setActivePopup] = useState(null);
//   const [selectedRowData, setSelectedRowData] = useState(null);
//   const [formData, setFormData] = useState({
//     urineAcetone: "",
//     ipAdmissionDTO: {
//       ipAdmmissionId: null
//     },
//     addItemDTO: {
//       addItemId: null
//     }
//   });

//   const [selectedBillingType, setSelectedBillingType] = useState('pharmacy');
//   const [billingData, setBillingData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchText, setSearchText] = useState('');
//   const [dateRange, setDateRange] = useState({ 
//     from: new Date().toISOString().split('T')[0],
//     to: new Date().toISOString().split('T')[0]
//   });

//   const [leadTimeOverview, setLeadTimeOverview] = useState({
//     average: 0,
//     longest: 0,
//     shortest: 0
//   });

//   const tableRef = useRef(null);

//   const fetchPharmacyData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${API_BASE_URL}/purchaseorders/lead-time`);
//       setBillingData(response.data);
//       calculateLeadTimeOverview(response.data);
//     } catch (error) {
//       console.error("Error fetching Pharmacy data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchInventoryData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${API_BASE_URL}/purchase-orders/lead-days`);
//       setBillingData(response.data);
//       calculateLeadTimeOverview(response.data);
//     } catch (error) {
//       console.error("Error fetching Inventory data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const calculateLeadTimeOverview = (data) => {
//     if (data.length === 0) {
//       setLeadTimeOverview({ average: 0, longest: 0, shortest: 0 });
//       return;
//     }

//     const leadTimes = data.map(item => item.daysBetween);
//     const totalLeadTime = leadTimes.reduce((sum, days) => sum + days, 0);
//     const average = (totalLeadTime / leadTimes.length).toFixed(2);
//     const longest = Math.max(...leadTimes);
//     const shortest = Math.min(...leadTimes);

//     setLeadTimeOverview({ average, longest, shortest });
//   };

//   useEffect(() => {
//     if (selectedBillingType === 'pharmacy') {
//       fetchPharmacyData();
//     } else if (selectedBillingType === 'inventory') {
//       fetchInventoryData();
//     }
//   }, [selectedBillingType]);

//   const handleBillingTypeChange = (type) => {
//     setSelectedBillingType(type);
//   };

//   const handleExport = () => {
//     const wb = XLSX.utils.book_new();
//     const headerRows = [
//       [''],  
//       ['','','','Expired Contracts'],
//       [''],  
//       ['From Date:', formatDate(dateRange.from),'To Date:', formatDate(dateRange.to)],
//       ['']  
//     ];
//     const tableRows = filteredData.map(item => [
//       item.vendorName || item.supplierName,
//       item.itemName,
//       formatDate(item.poDate),
//       formatDate(item.goodsReceiptDate),
//       item.daysBetween
//     ]);
//     const columnHeaders = ["Contract Name","Type","Vendor","Expiration Date","Status"];

//     const ws = XLSX.utils.aoa_to_sheet(allRows);
//     const colWidths = [
//       { wch: 15 },  
//       { wch: 12 },  
//       { wch: 15 },  
//       { wch: 12 },  
//       { wch: 15 },  
//       { wch: 20 },  
//       { wch: 15 }  
//     ];
//     ws['!cols'] = colWidths;
//     const headerStyle = {
//       font: { bold: true, sz: 14 },
//       alignment: { horizontal: 'center' }
//     };
//     for (let i = 0; i < 6; i++) {
//       const cellRef = XLSX.utils.encode_cell({ r: 0, c: 0 });
//       if (!ws[cellRef]) ws[cellRef] = {};
//       ws[cellRef].s = headerStyle;
//     }
//     XLSX.utils.book_append_sheet(wb, ws, 'LeadTimeReport');
//     XLSX.writeFile(wb, 'LeadTimeReport.xlsx');
//   };

//   const filteredData = billingData.filter(item => {
//     const poDate = new Date(item.poDate);
//     const fromDate = new Date(dateRange.from);
//     const toDate = new Date(dateRange.to);
//     const isWithinDateRange = poDate >= fromDate && poDate <= toDate;
//     const matchesSearchText = Object.values(item).some(value =>
//       value?.toString().toLowerCase().includes(searchText.toLowerCase())
//     );
//     return isWithinDateRange && matchesSearchText;
//   });

//   const [columnWidths, setColumnWidths] = useState(0);

//   return (
//     <div className="ExpiredContractsSCM-container">
//       <div className="ExpiredContractsSCM-header-main-div">
//         <Link to="/superuser/tower" className="ExpiredContractsSCM-back-button"><i className="fa-solid fa-arrow-left"></i> </Link>
//         <div className="ExpiredContractsSCM-header-div">
//           * Expired Contracts
//         </div>
//         <div>
//         </div>
//       </div>
//       <div className="ExpiredContractsSCM-header">
//         <div className="ExpiredContractsSCM-grid">
//           <FloatingInput
//             label="From Date"
//             type="date"
//             value={dateRange.from}
//             onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
//           />
//           <FloatingInput
//             label="To Date"
//             type="date"
//             value={dateRange.to}
//             onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
//           />
//         </div>
//         <div className="ExpiredContractsSCM-status-filters">
//           <label>
//             <input 
//               type="radio" 
//               name="status"
//               checked={selectedBillingType === 'pharmacy'}
//               onChange={() => handleBillingTypeChange('pharmacy')}
//             /> Pharmacy 
//           </label>
//           <label>
//             <input 
//               type="radio"
//               name="status"
//               checked={selectedBillingType === 'inventory'}
//               onChange={() => handleBillingTypeChange('inventory')}
//             /> Inventory 
//           </label>
//         </div>
//       </div>
//       <div className="ExpiredContractsSCM-search-container">
//         <input
//           type="text"
//           className="ExpiredContractsSCM-search-box"
//           placeholder="Search..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />
//         <div className="ExpiredContractsSCM-search-right">
//           <span className="ExpiredContractsSCM-results-count-span">
//             Showing {filteredData.length} results
//           </span>
//           <button
//             className="ExpiredContractsSCM-print-button"
//             onClick={handleExport}
//           >
//             <i className="fa-solid fa-file-excel"></i> Export
//           </button>
//           <button
//             className="ExpiredContractsSCM-print-button"
//             onClick={handlePrint}
//           >
//             <i className="fa-solid fa-print"></i> Print
//           </button>
//         </div>
//       </div>
//       <div className="ExpiredContractsSCM-table-container">
//         <h2 className="ExpiredContractsSCM-section-title">List of Expired Contracts</h2>
//         <table ref={tableRef}>
//           <thead>
//             <tr>
//               {["Contract Name","Type","Vendor","Expiration Date","Status"].map((header, index) => (
//                 <th
//                   key={index}
//                   style={{ width: columnWidths[index] }}
//                   className="resizable-th"
//                 >
//                   <div className="header-content">
//                     <span>{header}</span>
//                     <div
//                       className="resizer"
//                       onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
//                     ></div>
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="5" className="ExpiredContractsSCM-no-rows">
//                   Loading...
//                 </td>
//               </tr>
//             ) : filteredData.length > 0 ? (
//               filteredData.map((item, index) => (
//                 <tr 
//                   key={index} 
//                   className="parent-row"
//                 >
//                   <td>{item.vendorName || item.supplierName}</td>
//                   <td>{item.itemName}</td>
//                   <td>{formatDate(item.poDate)}</td>
//                   <td>{formatDate(item.goodsReceiptDate)}</td>
//                   <td>{item.daysBetween}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="ExpiredContractsSCM-no-rows">
//                   No Rows To Show
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div className='ExpiredContractsSCM-summary-main'>
//         <p className="ExpiredContractsSCM-description">
//         Monitor contracts that have expired and require immediate attention to avoid service disruptions.        </p>

//       </div>
//     </div>
//   );
// };

// export default ExpiredContractsSCM;


// import React, { useState, useEffect, useRef } from 'react';
// import "./ExpiredContractsSCM.css"
// import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import * as XLSX from 'xlsx';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import { API_BASE_URL } from '../../../api/api'; 
// import { FloatingInput, FloatingSelect, FloatingTextarea } from '../../../../FloatingInputs'; 

// const ExpiredContractsSCM = () => {
//   const formatDate = (date) => {
//     const d = new Date(date);
//     return d.toLocaleDateString('en-IN', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric'
//     });
//   };

//   const formatDateTime = () => {
//     const now = new Date();
//     return now.toLocaleString('en-IN', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//       hour12: true
//     });
//   };

//   const handlePrint = () => {
//     const doc = new jsPDF('l', 'mm', 'a4');
//     doc.setFontSize(16);
//     doc.text('Expired Contracts', doc.internal.pageSize.width / 2, 15, { align: 'center' });
//     doc.setFontSize(10);
//     doc.text(`From Date: ${formatDate(dateRange.from)}`, 14, 25);
//     doc.text(`To Date: ${formatDate(dateRange.to)}`, 64, 25);
//     doc.text(`Generated on: ${formatDateTime()}`, 219, 25);

//     const tableData = filteredData.map(item => [
//       item.vendorName || item.supplierName,
//       item.itemName,
//       formatDate(item.contractStartDate),
//       formatDate(item.contractEndDate),
//       item.isActive
//     ]);

//     const headers = ["Contract Name", "Type", "Vendor", "Expiration Date", "Status"];
//     doc.autoTable({
//       head: [headers],
//       body: tableData,
//       startY: 30,
//       styles: {
//         fontSize: 8,
//         cellPadding: 2,
//       },
//       headStyles: {
//         fillColor: [51, 122, 183],
//         textColor: 255,
//         fontSize: 9,
//         fontStyle: 'bold',
//       },
//       alternateRowStyles: {
//         fillColor: [245, 245, 245],
//       },
//     });

//     const lastY = doc.lastAutoTable.finalY;
//     doc.setFontSize(12);

//     const pdfOutput = doc.output('bloburl');
//     window.open(pdfOutput, '_blank');
//   };

//   const [rows, setRows] = useState([]);
//   const [activePopup, setActivePopup] = useState(null);
//   const [selectedRowData, setSelectedRowData] = useState(null);
//   const [formData, setFormData] = useState({
//     urineAcetone: "",
//     ipAdmissionDTO: {
//       ipAdmmissionId: null
//     },
//     addItemDTO: {
//       addItemId: null
//     }
//   });

//   const [selectedBillingType, setSelectedBillingType] = useState('pharmacy');
//   const [billingData, setBillingData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchText, setSearchText] = useState('');
//   const [dateRange, setDateRange] = useState({ 
//     from: new Date().toISOString().split('T')[0],
//     to: new Date().toISOString().split('T')[0]
//   });

//   const tableRef = useRef(null);

//   const fetchPharmacyData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${API_BASE_URL}/suppliers/supplier-contract-expired`);
//       setBillingData(response.data);
//       console.log(response.data)
//     } catch (error) {
//       console.error("Error fetching Pharmacy data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchInventoryData = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${API_BASE_URL}/vendors/inactive-vendor-expired`);
//       setBillingData(response.data);
//     } catch (error) {
//       console.error("Error fetching Inventory data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (selectedBillingType === 'pharmacy') {
//       fetchPharmacyData();
//     } else if (selectedBillingType === 'inventory') {
//       fetchInventoryData();
//     }
//   }, [selectedBillingType]);

//   const handleBillingTypeChange = (type) => {
//     setSelectedBillingType(type);
//   };

//   const handleExport = () => {
//     const wb = XLSX.utils.book_new();
//     const headerRows = [
//       [''],  
//       ['','','','Expired Contracts'],
//       [''],  
//       ['From Date:', formatDate(dateRange.from),'To Date:', formatDate(dateRange.to)],
//       ['']  
//     ];
//     const tableRows = filteredData.map(item => [
//       item.vendorName || item.supplierName,
//       item.itemName,
//       formatDate(item.contractStartDate),
//       formatDate(item.contractEndDate),
//       item.isActive
//     ]);
//     const columnHeaders = ["Contract Name", "Type", "Vendor", "Expiration Date", "Status"];

//     const allRows = [...headerRows, columnHeaders, ...tableRows];
//     const ws = XLSX.utils.aoa_to_sheet(allRows);
//     const colWidths = [
//       { wch: 15 },  
//       { wch: 12 },  
//       { wch: 15 },  
//       { wch: 12 },  
//       { wch: 15 },  
//       { wch: 20 },  
//       { wch: 15 }  
//     ];
//     ws['!cols'] = colWidths;
//     const headerStyle = {
//       font: { bold: true, sz: 14 },
//       alignment: { horizontal: 'center' }
//     };
//     for (let i = 0; i < 6; i++) {
//       const cellRef = XLSX.utils.encode_cell({ r: 0, c: 0 });
//       if (!ws[cellRef]) ws[cellRef] = {};
//       ws[cellRef].s = headerStyle;
//     }
//     XLSX.utils.book_append_sheet(wb, ws, 'ExpiredContractsReport');
//     XLSX.writeFile(wb, 'ExpiredContractsReport.xlsx');
//   };

//   const filteredData = billingData.filter(item => {
//     const contractEndDate = new Date(item.contractEndDate);
//     const fromDate = new Date(dateRange.from);
//     const toDate = new Date(dateRange.to);
//     const isWithinDateRange = contractEndDate >= fromDate && contractEndDate <= toDate;
//     const matchesSearchText = Object.values(item).some(value =>
//       value?.toString().toLowerCase().includes(searchText.toLowerCase())
//     );
//     return isWithinDateRange && matchesSearchText;
//   });

//   const [columnWidths, setColumnWidths] = useState(0);

//   return (
//     <div className="ExpiredContractsSCM-container">
//       <div className="ExpiredContractsSCM-header-main-div">
//         <Link to="/superuser/tower" className="ExpiredContractsSCM-back-button"><i className="fa-solid fa-arrow-left"></i> </Link>
//         <div className="ExpiredContractsSCM-header-div">
//           * Expired Contracts
//         </div>
//         <div>
//         </div>
//       </div>
//       <div className="ExpiredContractsSCM-header">
//         <div className="ExpiredContractsSCM-grid">
//           <FloatingInput
//             label="From Date"
//             type="date"
//             value={dateRange.from}
//             onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
//           />
//           <FloatingInput
//             label="To Date"
//             type="date"
//             value={dateRange.to}
//             onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
//           />
//         </div>
//         <div className="ExpiredContractsSCM-status-filters">
//           <label>
//             <input 
//               type="radio" 
//               name="status"
//               checked={selectedBillingType === 'pharmacy'}
//               onChange={() => handleBillingTypeChange('pharmacy')}
//             /> Pharmacy 
//           </label>
//           <label>
//             <input 
//               type="radio"
//               name="status"
//               checked={selectedBillingType === 'inventory'}
//               onChange={() => handleBillingTypeChange('inventory')}
//             /> Inventory 
//           </label>
//         </div>
//       </div>
//       <div className="ExpiredContractsSCM-search-container">
//         <input
//           type="text"
//           className="ExpiredContractsSCM-search-box"
//           placeholder="Search..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />
//         <div className="ExpiredContractsSCM-search-right">
//           <span className="ExpiredContractsSCM-results-count-span">
//             Showing {filteredData.length} results
//           </span>
//           <button
//             className="ExpiredContractsSCM-print-button"
//             onClick={handleExport}
//           >
//             <i className="fa-solid fa-file-excel"></i> Export
//           </button>
//           <button
//             className="ExpiredContractsSCM-print-button"
//             onClick={handlePrint}
//           >
//             <i className="fa-solid fa-print"></i> Print
//           </button>
//         </div>
//       </div>
//       <div className="ExpiredContractsSCM-table-container">
//         <h2 className="ExpiredContractsSCM-section-title">List of Expired Contracts</h2>
//         <table ref={tableRef}>
//           <thead>
//             <tr>
//               {["Contract Name", "Type", "Vendor", "Expiration Date", "Status"].map((header, index) => (
//                 <th
//                   key={index}
//                   style={{ width: columnWidths[index] }}
//                   className="resizable-th"
//                 >
//                   <div className="header-content">
//                     <span>{header}</span>
//                     <div
//                       className="resizer"
//                       onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
//                     ></div>
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="5" className="ExpiredContractsSCM-no-rows">
//                   Loading...
//                 </td>
//               </tr>
//             ) : filteredData.length > 0 ? (
//               filteredData.map((item, index) => (
//                 <tr 
//                   key={index} 
//                   className="parent-row"
//                 >
//                   <td>{item.vendorName || item.supplierName}</td>
//                   <td>{item.itemName}</td>
//                   <td>{formatDate(item.contractStartDate)}</td>
//                   <td>{formatDate(item.contractEndDate)}</td>
//                   <td>{item.isActive}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="ExpiredContractsSCM-no-rows">
//                   No Rows To Show
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div className='ExpiredContractsSCM-summary-main'>
//         <p className="ExpiredContractsSCM-description">
//         Monitor contracts that have expired and require immediate attention to avoid service disruptions.        </p>
//       </div>
//     </div>
//   );
// };

// export default ExpiredContractsSCM;


import React, { useState, useEffect, useRef } from 'react';
import "./ExpiredContractsSCM.css"
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { API_BASE_URL } from '../../../api/api';
import { FloatingInput, FloatingSelect, FloatingTextarea } from '../../../../FloatingInputs';

const ExpiredContractsSCM = () => {
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
    doc.text('Expired Contracts', doc.internal.pageSize.width / 2, 15, { align: 'center' });
    doc.setFontSize(10);
    doc.text(`From Date: ${formatDate(dateRange.from)}`, 14, 25);
    doc.text(`To Date: ${formatDate(dateRange.to)}`, 64, 25);
    doc.text(`Generated on: ${formatDateTime()}`, 219, 25);

    const tableData = filteredData.map(item => [
      item.contractName,
      item.type,
      item.vendorName || item.supplierName,
      formatDate(item.contractEndDate),
      item.isActive === "No" || item.isActive === "false" ? "Expired" : "Active"
    ]);

    const headers = ["Contract Name", "Type", "Vendor", "Expiration Date", "Status"];
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

  const tableRef = useRef(null);

  const fetchPharmacyData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/suppliers/supplier-contract-expired`);

      // Transform data to add contract name and type
      const transformedData = response.data.map(item => ({
        ...item,
        contractName: `${item.supplierName} Contract`,
        type: 'Pharmacy'
      }));

      setBillingData(transformedData);
    } catch (error) {
      console.error("Error fetching Pharmacy data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchInventoryData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/vendors/inactive-vendor-expired`);

      // Transform data to add contract name and type
      const transformedData = response.data.map(item => ({
        ...item,
        contractName: `${item.vendorName} Contract`,
        type: 'Inventory'
      }));

      setBillingData(transformedData);
    } catch (error) {
      console.error("Error fetching Inventory data:", error);
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
  }, [selectedBillingType]);

  const handleBillingTypeChange = (type) => {
    setSelectedBillingType(type);
  };

  const handleExport = () => {
    const headerRows = [
      [''],
      ['', '', '', 'Expired Contracts'],
      [''],
      ['From Date:', formatDate(dateRange.from), 'To Date:', formatDate(dateRange.to)],
      ['']
    ];

    const tableRows = filteredData.map(item => [
      item.contractName,
      item.type,
      item.vendorName || item.supplierName,
      formatDate(item.contractEndDate),
      item.isActive === "No" || item.isActive === "false" ? "Expired" : "Active"
    ]);

    const columnHeaders = ["Contract Name", "Type", "Vendor", "Expiration Date", "Status"];

    const allRows = [
      ...headerRows,
      columnHeaders,
      ...tableRows
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(allRows);

    const colWidths = [
      { wch: 25 },  // Contract Name  
      { wch: 12 },  // Type
      { wch: 25 },  // Vendor
      { wch: 15 },  // Expiration Date
      { wch: 12 }   // Status
    ];

    ws['!cols'] = colWidths;

    const headerStyle = {
      font: { bold: true, sz: 14 },
      alignment: { horizontal: 'center' }
    };

    for (let i = 0; i < columnHeaders.length; i++) {
      const cellRef = XLSX.utils.encode_cell({ r: 5, c: i }); // Headers row
      if (!ws[cellRef]) ws[cellRef] = {};
      ws[cellRef].s = headerStyle;
    }

    XLSX.utils.book_append_sheet(wb, ws, 'ExpiredContracts');
    XLSX.writeFile(wb, 'ExpiredContracts.xlsx');
  };

  const filteredData = billingData.filter(item => {
    const contractEndDate = new Date(item.contractEndDate);
    const fromDate = new Date(dateRange.from);
    const toDate = new Date(dateRange.to);

    // Add one day to toDate to include it in the range
    toDate.setDate(toDate.getDate() + 1);

    const isWithinDateRange = contractEndDate >= fromDate && contractEndDate <= toDate;

    const matchesSearchText = (
      (item.vendorName?.toString().toLowerCase() || "").includes(searchText.toLowerCase()) ||
      (item.supplierName?.toString().toLowerCase() || "").includes(searchText.toLowerCase()) ||
      (item.contractName?.toString().toLowerCase() || "").includes(searchText.toLowerCase()) ||
      (item.type?.toString().toLowerCase() || "").includes(searchText.toLowerCase())
    );

    return isWithinDateRange && matchesSearchText;
  });

  const [columnWidths, setColumnWidths] = useState({});

  return (
    <div className="ExpiredContractsSCM-container">
      <div className="ExpiredContractsSCM-header-main-div">
        <Link to="/superuser/tower" className="ExpiredContractsSCM-back-button"><i className="fa-solid fa-arrow-left"></i> </Link>
        <div className="ExpiredContractsSCM-header-div">
          * Expired Contracts
        </div>
        <div>
        </div>
      </div>
      <div className="ExpiredContractsSCM-header">
        <div className="ExpiredContractsSCM-grid">
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
        <div className="ExpiredContractsSCM-status-filters">
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
      <div className="ExpiredContractsSCM-search-container">
        <input
          type="text"
          className="ExpiredContractsSCM-search-box"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="ExpiredContractsSCM-search-right">
          <span className="ExpiredContractsSCM-results-count-span">
            Showing {filteredData.length} results
          </span>
          <button
            className="ExpiredContractsSCM-print-button"
            onClick={handleExport}
          >
            <i className="fa-solid fa-file-excel"></i> Export
          </button>
          <button
            className="ExpiredContractsSCM-print-button"
            onClick={handlePrint}
          >
            <i className="fa-solid fa-print"></i> Print
          </button>
        </div>
      </div>
      <div className="ExpiredContractsSCM-table-container">
        <h2 className="ExpiredContractsSCM-section-title">List of Expired Contracts</h2>
        <table ref={tableRef}>
          <thead>
            <tr>
              {["Contract Name", "Type", "Vendor", "Expiration Date", "Status"].map((header, index) => (
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
                <td colSpan="5" className="ExpiredContractsSCM-no-rows">
                  Loading...
                </td>
              </tr>
            ) : filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <tr
                  key={index}
                  className="parent-row"
                >
                  <td>{item.contractName}</td>
                  <td>{item.type}</td>
                  <td>{item.vendorName || item.supplierName}</td>
                  <td>{formatDate(item.contractEndDate)}</td>
                  <td>{item.isActive === "No" || item.isActive === "false" ? "Expired" : "Active"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="ExpiredContractsSCM-no-rows">
                  No Rows To Show
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className='ExpiredContractsSCM-summary-main'>
        <p className="ExpiredContractsSCM-description">
          Monitor contracts that have expired and require immediate attention to avoid service disruptions.
        </p>
      </div>
    </div>
  );
};

export default ExpiredContractsSCM;