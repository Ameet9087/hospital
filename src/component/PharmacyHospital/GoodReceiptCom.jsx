// /* Mohini_GoodReceiptComponent_WholePage_14/sep/2024 */
// import React, { useState, useEffect, useRef } from 'react';
// import { Modal } from 'react-bootstrap';
// import axios from 'axios';
// import './PurchaseOrder.css';
// import GoodsReceiptForm from './GoodsReceiptForm';
// import { startResizing } from '../TableHeadingResizing/resizableColumns';
// import { API_BASE_URL } from '../api/api';
// import * as XLSX from 'xlsx';
// import CustomModal from '../../CustomModel/CustomModal';

// const GoodReceiptComponent = () => {
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [goodReceipts, setGoodReceipts] = useState([]);
//   const [filteredReceipts, setFilteredReceipts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [columnWidths, setColumnWidths] = useState({});
//   const [searchText, setSearchText] = useState('');
//   const [dateRange, setDateRange] = useState({ from: '', to: '' });
//   const tableRef = useRef(null);

//   const handleOpenModal = () => setShowEditModal(true);
//   const handleCloseModal = () => setShowEditModal(false);

//   // Fetch good receipt data from API
//   useEffect(() => {
//     fetchGoodReceipts();
//   }, []);

//   const fetchGoodReceipts = async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/good-receipts`);
//       setGoodReceipts(response.data);
//       setFilteredReceipts(response.data);
//     } catch (error) {
//       console.error('Error fetching good receipts:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to export table to Excel
//   const handleExport = () => {
//     const ws = XLSX.utils.table_to_sheet(tableRef.current);
//     const wb = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport');
//     XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx');
//   };

//   // Function to trigger print
//   const handlePrint = () => {
//     window.print();
//   };

//   // Filter logic for search and date range
//   useEffect(() => {
//     let filtered = goodReceipts;

//     // Filter by search text
//     if (searchText) {
//       filtered = filtered.filter((receipt) =>
//         Object.values(receipt)
//           .join(' ')
//           .toLowerCase()
//           .includes(searchText.toLowerCase())
//       );
//     }

//     // Filter by date range
//     if (dateRange.from || dateRange.to) {
//       filtered = filtered.filter((receipt) => {
//         const receiptDate = new Date(receipt.goodsReceiptDate);
//         const fromDate = dateRange.from ? new Date(dateRange.from) : null;
//         const toDate = dateRange.to ? new Date(dateRange.to) : null;

//         if (fromDate && receiptDate < fromDate) return false;
//         if (toDate && receiptDate > toDate) return false;
//         return true;
//       });
//     }

//     setFilteredReceipts(filtered);
//   }, [searchText, dateRange, goodReceipts]);

//   return (
//     <div className="purchase-order-container">
//       <div className="purchase-order-header">
//         <button
//           className="purchase-order-add-purchase-order-button"
//           onClick={handleOpenModal}
//         >
//           + Add New Good Receipt
//         </button>

//         <div className="purchase-order-status-filters">
//           <label>List by Status:</label>
//           <label>
//             <input type="radio" name="status" /> Completed
//           </label>
//           <label>
//             <input type="radio" name="status" /> Cancelled
//           </label>
//           <label>
//             <input type="radio" name="status" /> All
//           </label>
//         </div>
//       </div>

//       <div className="purchase-data-order">
//         <div className="purchase-order-date-range">
//           <label htmlFor="from-date">From:</label>
//           <input
//             type="date"
//             id="from-date"
//             value={dateRange.from}
//             onChange={(e) =>
//               setDateRange((prev) => ({ ...prev, from: e.target.value }))
//             }
//           />
//           <label htmlFor="to-date">To:</label>
//           <input
//             type="date"
//             id="to-date"
//             value={dateRange.to}
//             onChange={(e) =>
//               setDateRange((prev) => ({ ...prev, to: e.target.value }))
//             }
//           />
//         </div>
//         {/* <div className="purchase-order-supplier-filter">
//           <label htmlFor="supplier">Supplier Name:</label>

//           <select id="supplier">
//             <option value="">Select Supplier</option>
//           </select>

//           <label htmlFor="aging-days">Aging Days:</label>
//           <input type="number" id="aging-days" min="0" />
//         </div> */}
//       </div>

//       <div className="purchase-order-search-container">
//         <input
//           type="text"
//           className="purchase-order-search-box"
//           placeholder="Search..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         />

//         <div className="purchase-order-search-container">
//           <div className="purchase-order-search-right">
//             <span className="purchase-results-count-span">
//               Showing {filteredReceipts.length} / {goodReceipts.length} results
//             </span>
//             <button
//               className="purchase-order-print-button"
//               onClick={handleExport}
//             >
//               <i class="fa-solid fa-file-excel"></i> Export
//             </button>
//             <button
//               className="purchase-order-print-button"
//               onClick={handlePrint}
//             >
//               <i class="fa-solid fa-print"></i> Print
//             </button>
//           </div>
//         </div>
//       </div>

//       <table ref={tableRef}>
//         <thead>
//           <tr>
//             {[
//               'G.R. No',
//               'GR Date',
//               'Supplier Bill Date',
//               'Bill No',
//               'Supplier Name',
//               'Sub Total',
//               'Discount Amount',
//               'VAT Amount',
//               'Total Amount',
//               'Remark',
//             ].map((header, index) => (
//               <th
//                 key={index}
//                 style={{ width: columnWidths[index] }}
//                 className="resizable-th"
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
//           {loading ? (
//             <tr>
//               <td colSpan="10" className="purchase-order-no-rows">
//                 Loading...
//               </td>
//             </tr>
//           ) : filteredReceipts.length > 0 ? (
//             filteredReceipts.map((receipt) => (
//               <tr key={receipt.goodReceiptId} className="parent-row">
//                 <td>{receipt.goodReceiptId}</td>
//                 <td>{receipt.goodsReceiptDate || 'N/A'}</td>
//                 <td>{receipt.supplierBillDate || 'N/A'}</td>
//                 <td>{receipt.invoiceNumber || 'N/A'}</td>
//                 <td>{receipt.supplier?.supplierName || 'N/A'}</td>
//                 <td>{receipt.subTotal?.toFixed(2)}</td>
//                 <td>{receipt.discountAmount?.toFixed(2)}</td>
//                 <td>{receipt.vatTotal?.toFixed(2)}</td>
//                 <td>{receipt.totalAmount?.toFixed(2)}</td>
//                 <td>{receipt.remarks || 'N/A'}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="10" className="purchase-order-no-rows">
//                 No Rows To Show
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       <CustomModal isOpen={showEditModal} onClose={handleCloseModal}>
//         <GoodsReceiptForm />
//       </CustomModal>
//     </div>
//   );
// };

// export default GoodReceiptComponent;
// /* Mohini_GoodReceiptComponent_WholePage_14/sep/2024 */


/* Mohini_GoodReceiptComponent_WholePage_14/sep/2024 */
import React, { useState, useEffect, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import './PurchaseOrder.css';
import GoodsReceiptForm from './GoodsReceiptForm';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
import { API_BASE_URL } from '../api/api';
import * as XLSX from 'xlsx';
import CustomModal from '../../CustomModel/CustomModal';

const GoodReceiptComponent = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [goodReceipts, setGoodReceipts] = useState([]);
  const [filteredReceipts, setFilteredReceipts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columnWidths, setColumnWidths] = useState({});
  const [searchText, setSearchText] = useState('');
  const [dateRange, setDateRange] = useState({ from: '', to: '' });
  const tableRef = useRef(null);

  const handleOpenModal = () => setShowEditModal(true);
  const handleCloseModal = () => setShowEditModal(false);

  const fetchGoodReceipts = async () => {
    try {
      // http://192.168.1.65:8080/api/pharmacy-good-receipt
      // const response = await axios.get(`${API_BASE_URL}/pharmacy-good-receipt`);
      const response = await axios.get(`${API_BASE_URL}/good-receipts`);
      setGoodReceipts(response.data);
    } catch (error) {
      console.error('Error fetching good receipts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveReceipt = async (receiptData) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/pharmacy-good-receipt`,
        receiptData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      alert('Good receipt saved successfully!');
      fetchGoodReceipts(); // Refresh list after saving
      handleCloseModal();
    } catch (error) {
      console.error('Error saving good receipt:', error);
      alert('Failed to save good receipt.');
    }
  };

  useEffect(() => {
    fetchGoodReceipts();
  }, []);

  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport');
    XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx');
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    let filtered = goodReceipts;

    if (searchText) {
      filtered = filtered.filter((receipt) =>
        Object.values(receipt)
          .join(' ')
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }

    if (dateRange.from || dateRange.to) {
      filtered = filtered.filter((receipt) => {
        const receiptDate = new Date(receipt.goodsReceiptDate);
        const fromDate = dateRange.from ? new Date(dateRange.from) : null;
        const toDate = dateRange.to ? new Date(dateRange.to) : null;

        if (fromDate && receiptDate < fromDate) return false;
        if (toDate && receiptDate > toDate) return false;
        return true;
      });
    }

    setFilteredReceipts(filtered);
  }, [searchText, dateRange, goodReceipts]);

  return (
    <div className="purchase-order-container">
      <div className="purchase-order-header">
        <button
          className="purchase-order-add-purchase-order-button"
          onClick={handleOpenModal}
        >
          + Add New Good Receipt
        </button>

        <div className="purchase-order-status-filters">
          <label>List by Status:</label>
          <label>
            <input type="radio" name="status" /> Completed
          </label>
          <label>
            <input type="radio" name="status" /> Cancelled
          </label>
          <label>
            <input type="radio" name="status" /> All
          </label>
        </div>
      </div>

      <div className="purchase-data-order">
        <div className="purchase-order-date-range">
          <label htmlFor="from-date">From:</label>
          <input
            type="date"
            id="from-date"
            value={dateRange.from}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, from: e.target.value }))
            }
          />
          <label htmlFor="to-date">To:</label>
          <input
            type="date"
            id="to-date"
            value={dateRange.to}
            onChange={(e) =>
              setDateRange((prev) => ({ ...prev, to: e.target.value }))
            }
          />
        </div>
      </div>

      <div className="purchase-order-search-container">
        <input
          type="text"
          className="purchase-order-search-box"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <div className="purchase-order-search-container">
          <div className="purchase-order-search-right">
            <span className="purchase-results-count-span">
              Showing {filteredReceipts.length} / {goodReceipts.length} results
            </span>
            <button
              className="purchase-order-print-button"
              onClick={handleExport}
            >
              <i className="fa-solid fa-file-excel"></i> Export
            </button>
            <button
              className="purchase-order-print-button"
              onClick={handlePrint}
            >
              <i className="fa-solid fa-print"></i> Print
            </button>
          </div>
        </div>
      </div>

      <table ref={tableRef}>
        <thead>
          <tr>
            {["G.R. No", "GR Date", "Supplier Bill Date", "Bill No", "Supplier Name", "Sub Total", "Discount Amount", "VAT Amount", "Total Amount", "Remark"].map((header, index) => (
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
              <td colSpan="10" className="purchase-order-no-rows">
                Loading...
              </td>
            </tr>
          ) : goodReceipts.length > 0 ? (
            goodReceipts.map((receipt) => (
              <tr key={receipt.goodReceiptId} className="parent-row">
                <td>{receipt.goodReceiptId}</td>
                <td>{receipt.goodsReceiptDate || 'N/A'}</td>
                <td>{receipt.supplierBillDate || 'N/A'}</td>
                <td>{receipt.invoiceNumber || 'N/A'}</td>
                <td>{receipt.supplier?.supplierName || 'N/A'}</td>
                <td>{receipt.subTotal?.toFixed(2)}</td>
                <td>{receipt.discountAmount?.toFixed(2)}</td>
                <td>{receipt.vatTotal?.toFixed(2)}</td>
                <td>{receipt.totalAmount?.toFixed(2)}</td>
                <td>{receipt.remarks || 'N/A'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="purchase-order-no-rows">
                No Rows To Show
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <CustomModal isOpen={showEditModal} onClose={handleCloseModal}>
        <GoodsReceiptForm onSave={handleSaveReceipt} />
      </CustomModal>
    </div>
  );
};

export default GoodReceiptComponent;
