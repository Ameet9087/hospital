import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx'; // Import the xlsx library
import "../SSInventory/sSIConsumption.css"
import { useReactToPrint } from 'react-to-print';
// import SSIPatientConsumNewPCbtn from './sSIPatientConsumNewPCbtn';
import SSIPatientConsumConsumEntry from './sSIPatientConsumConsumEntry';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../../api/api';
import CustomModal from '../../../../CustomModel/CustomModal';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';
import { toast } from "react-toastify";
import {
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
} from "../../../../FloatingInputs";
function SSIPatientConsumption() {
  const { store } = useParams();
  const [consumptions, setConsumptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewPatientConsumption, setShowNewPatientConsumption] = useState(false);
  const printRef = useRef();
const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchConsumptions = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/inventory-consumption/getAll`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const filteredData = data.filter(item => item.storeName === store);
        console.log(filteredData);

        const formattedData = filteredData.map(consumption => {
          return {
            id: consumption.id,
            consumedDate: consumption.consumedDate,
            consumptionTypeName: consumption.consumptionTypeName,
            remarks: consumption.remarks,
            storeName: consumption.storeName,
            items: consumption.items.map(item => ({
              requisitionItemId: item.requisitionItemId,
              consumedQty: item.consumedQty
            }))
          };
        });

        setConsumptions(formattedData);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchConsumptions();
  }, [store, showNewPatientConsumption]);
  // Ensure the useEffect depends on `store` to avoid stale closure issues

  const handleNewPatientConsumptionClick = () => {
    setShowNewPatientConsumption(true);
  };

  const handleBack = () => {
    setShowNewPatientConsumption(false);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const printList = () => {
    if (tableRef.current) {
      const printContents = tableRef.current.innerHTML;

      // Create an iframe element
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "none";

      // Append the iframe to the body
      document.body.appendChild(iframe);

      // Write the table content into the iframe's document
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <html>
        <head>
          <title>Print Table</title>
          <style>
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            button, .admit-actions, th:nth-child(10), td:nth-child(10) {
              display: none; /* Hide action buttons and Action column */
            }
          </style>
        </head>
        <body>
          <table>
            ${printContents}
          </table>
        </body>
        </html>
      `);
      doc.close();

      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      document.body.removeChild(iframe);
    }
  };

  const handleExport = () => {
    const ws = XLSX.utils.table_to_sheet(tableRef.current); // Converts the table to a worksheet
    const wb = XLSX.utils.book_new(); // Creates a new workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Consumption'); // Appends worksheet to workbook
    XLSX.writeFile(wb, 'Consumption.xlsx'); // Downloads the Excel file
  }

  return (
    <div className="sSIConsumption-active-imaging-request">

      <>
        <header className='sSIConsumption-header'>
          <div className="sSIConsumption-status-filters">
            <button
              className="sSIConsumption-new-patient-button"
              onClick={handleNewPatientConsumptionClick}
            >
              + New Consumption
            </button>
          </div>
          {/* <div className="sSIConsumption-filter">
            <label>Consumption Type:            </label>
            <select>
              <option value="" placeholder="Consumption Type">Testing</option>
              <option value="">Some Sub Category</option>
              <option value="">Tissue</option>
              <option value="">Cotton</option>
              <option value="">Soap</option>
            </select>
            <button className='sSIConsumption-print-btn'>Load</button>
          </div> */}
        </header>
        <div className="sSIConsumption-controls">
          {/* <div className="sSIConsumption-date-range">
            <label>
              From:
              <input type="date" defaultValue="2024-08-09" />
            </label>
            <label>
              To:
              <input type="date" defaultValue="2024-08-16" />
            </label>
            <button className="sSIConsumption-star-button">☆</button>
            <button className="sSIConsumption-ok-button">OK</button>
          </div> */}

        </div>
        <div className="sSIConsumption-search-N-results">
          <div className="sSIConsumption-search-bar">
           
            <FloatingInput
            label={"Search"}
            type="search"
            
            />
          </div>
         
        </div>
        <div className="sSIConsumption-results-btn">
            <p> Showing {consumptions.length} /  {consumptions.length} results</p>


            <button className='sSIConsumption-print-btn' onClick={handleExport}>
              <i className="fa-regular fa-file-excel"></i> Export
            </button>
            <button className='sSIConsumption-print-btn' onClick={printList}>Print</button>
          </div>
        <div style={{ display: 'none' }}>
          <div ref={tableRef}>
            <h2>Patient Consumption Report</h2>
            <p>Printed On: {new Date().toLocaleString()}</p>
            <div className="sSIConsumption-table-N-paginat">
               <table  ref={tableRef}>
                         <thead>
                           <tr>
                             {[ "Consumed Date",
  "Requisition Item ID",
  "Consumed Qty",
  "Unit",
  "Consumption Type Name",
  "Entered By",
  "Remarks"].map(
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
                                       onMouseDown={startResizing(
                                         tableRef,
                                         setColumnWidths
                                       )(index)}
                                     ></div>
                                   </div>
                                 </th>
                               )
                             )}
                           </tr>
                         </thead>

                <tbody>
                  {consumptions.map((consumption, index) => (
                    <React.Fragment key={index}>
                      {consumption.items && consumption.items.length > 0 ? (
                        consumption.items.map((item, itemIndex) => (
                          <tr key={`${index}-${itemIndex}`}>
                            <td>{consumption.consumedDate}</td>
                            <td>{item.requisitionItemId || "N/A"}</td>
                            <td>{item.consumedQty || "N/A"}</td>
                            <td>{consumption.units || "N/A"}</td>
                            <td>{consumption.consumptionTypeName}</td>
                            <td>{consumption.enteredBy || "N/A"}</td>
                            <td>{consumption.remarks}</td>
                          </tr>
                        ))
                      ) : (
                        <tr key={index}>
                          <td>{consumption.consumedDate}</td>
                          <td colSpan="6" className="no-data">No Items Found</td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
        <div className="sSIConsumption-table-N-paginat">
          <table>
            <thead>
              <tr>
                <th>Consumed Date</th>
                <th>Consumed Item</th>
                <th>Consumed Qty</th>
                <th>Unit</th>
                <th>Consumption Type Name</th>
                <th>Entered By</th>
                <th>Remarks</th>

              </tr>
            </thead>
            <tbody>
              {consumptions.length > 0 ? (
                consumptions.map((consumption, index) => (
                  <React.Fragment key={index}>
                    {consumption.items.map((item, itemIndex) => (
                      <tr key={`${index}-${itemIndex}`}>
                        <td>{consumption.consumedDate}</td>
                        <td>{item.requisitionItemId}</td>
                        <td>{item.consumedQty}</td>
                        <td>{consumption.units || "N/A"}</td>
                        <td>{consumption.consumptionTypeName}</td>
                        <td>{consumption.enteredBy || "N/A"}</td>
                        <td>{consumption.remarks}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">No Rows To Show</td>
                </tr>
              )}
            </tbody>

          </table>
          {/* <div className="sSIConsumption-pagination">
            <span>0 to 0 of 0</span>
            <button>First</button>
            <button>Previous</button>
            <span>Page 0 of 0</span>
            <button>Next</button>
            <button>Last</button>
          </div> */}
        </div>
      </>

      <CustomModal isOpen={showNewPatientConsumption} onClose={handleBack}>
        <SSIPatientConsumConsumEntry onClose={handleBack} />
      </CustomModal>

    </div>
  );
}

export default SSIPatientConsumption;
