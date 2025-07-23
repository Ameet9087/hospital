import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import './PurchaseRequest.css';
import * as XLSX from 'xlsx';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';
import { API_BASE_URL } from '../../api/api';
import CustomModal from '../../../CustomModel/CustomModal';
import AddPurchaseOrderDraft from './AddPurchaseOrder';
import PurchaseView from '../../Inventory1/Internal/PurchaseView';
const Table = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [data, setData] = useState([]); 
  const [show,setShow] = useState(false);
  const [display,setDisplay] = useState(false);
  const [selectedItem,setSelectedItem] = useState({});
  const [selectedRow,setSelectedRow] = useState();
  const [columnWidths,setColumnWidths] = useState({});
  const tableRef=useRef(null);

  const toggleDropdown = (item) => {
    setSelectedRow(item);
    setDisplay(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/purchase-requests`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  const handleExport = () => {
    if (tableRef.current) {
      const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts table to a worksheet
      const wb = XLSX.utils.book_new(); // Creates a new workbook
      XLSX.utils.book_append_sheet(wb, ws, 'PurchaseOrderReport'); // Adds the worksheet to the workbook
      XLSX.writeFile(wb, 'PurchaseOrderReport.xlsx'); // Downloads the Excel file
    } else {
      console.error('Table reference is missing.');
    }
  };

  const handlePrint = () => {
    const printContent = tableRef.current;
    const newWindow = window.open("", "_blank");
    newWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th, td {
              border: 1px solid black;
              padding: 8px;
              text-align: left;
            }
            th {
              background-color: #f2f2f2;
            }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);
    newWindow.document.close();
    newWindow.print();
    newWindow.close();
  };

  const handlePurchaseOrder=(item)=>{
    setSelectedItem(item);
    setShow(true);
  }
  return (
    <div className="tabb-table-container">
      <div className="tabb-date-range">
        <span>From: <input type="date" defaultValue="2024-08-18" /></span>
        <span>To: <input type="date" defaultValue="2024-08-25" /></span>
      
      </div>
      {isDropdownOpen && (
        <div className="tabb-dropdown">
          <ul>
            <li>Last One Week</li>
            <li>Last One Month</li>
            <li>Last Three Months</li>
          </ul>
        </div>
      )}
      <div className="tabb-search-bar">
        <input type="text" placeholder="Search" />
      </div>
      <div className="tabb-results-info">
        <span>Showing {data.length} results</span>
        <button className="tabb-print-button"onClick={handleExport}>Export</button>
        <button className="tabb-print-button" onClick={handlePrint}>Print</button>
      </div>
      <table  ref={tableRef}>
          <thead>
            <tr>
              {[
                 "P.No.",
                 "Request Date",
                 "Vendor",
                 "Status",
                 "PO Created",
                 "Verified By",
                 "Actions"
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
          {data?.length > 0 && data?.map((row) => (
            <tr key={row?.p}>
              <td>{row?.id}</td>
              <td>{row?.requestDate}</td>
              <td>{row?.vendor?.vendorName}</td>
              <td>{row?.status}</td>
              <td>{(row?.status ==="Approved")?(<div className="PO-created">Yes</div>):(<div className="PO-Remaining">No</div>)}</td>
              <td>{row?.verifyBy}</td>
              <td>
                <button className="tabb-view-button" onClick={()=>toggleDropdown(row)}>View</button>
                <button className="tabb-add-po-button" onClick={()=>handlePurchaseOrder(row)} >Add Purchase Order</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <CustomModal isOpen={display} onClose={()=>setDisplay(false)}>
        <PurchaseView item={selectedRow} />
      </CustomModal>
      <CustomModal isOpen={show} onClose={()=>setShow(false)}>
      <AddPurchaseOrderDraft request={selectedItem}/>
      </CustomModal>
    </div>
  );
};

export default Table;
