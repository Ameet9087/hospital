import React, { useState, useRef, useEffect } from 'react';
import * as XLSX from 'xlsx'; // Import the xlsx library
import "../SSInventory/sSIConsumption.css"
import { useReactToPrint } from 'react-to-print';
// import SSIPatientConsumNewPCbtn from './sSIPatientConsumNewPCbtn';
import SSIPatientConsumConsumEntry from './sSIPatientConsumConsumEntry';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../../../api/api';
import CustomModal from '../../../CustomModel/CustomModal';
function SSIPatientConsumption() {
  const { store } = useParams();
  const [consumptions, setConsumptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewPatientConsumption, setShowNewPatientConsumption] = useState(false);
  const printRef = useRef();

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
}, [store]);
 // Ensure the useEffect depends on `store` to avoid stale closure issues

  const handleNewPatientConsumptionClick = () => {
    setShowNewPatientConsumption(true);
  };

  const handleBack = () => {
    setShowNewPatientConsumption(false);
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Patient Consumption Report',
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
    `,
  });

  const handleExportToExcel = () => {
    const tableData = [
      ['Consumed Date', 'Consumed Item', 'Consumed Qty', 'Unit', 'Consumption Type Name', 'Entered By', 'Remarks'],
      ...consumptions.map(item => [
        item.consumedDate,
        item.consumedItem,
        item.consumedQty,
        item.unit,
        item.consumptionTypeName,
        item.enteredBy,
        item.remarks
      ])
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
    XLSX.writeFile(workbook, 'Consumption_Report.xlsx');
  };

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
          <div className="sSIConsumption-filter">
            <label>Consumption Type:            </label>
            <select>
              <option value="" placeholder="Consumption Type">Testing</option>
              {/* <option value="">Some Sub Category</option>
              <option value="">Tissue</option>
              <option value="">Cotton</option>
              <option value="">Soap</option> */}
            </select>
            <button className='sSIConsumption-print-btn'>Load</button>
          </div>
        </header>
        <div className="sSIConsumption-controls">
          <div className="sSIConsumption-date-range">
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
          </div>
          
        </div>
        <div className="sSIConsumption-search-N-results">
          <div className="sSIConsumption-search-bar">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Search" />
          </div>
          <div className="sSIConsumption-results-info">
            Showing 2 / 2 results
            <button className='sSIConsumption-print-btn' onClick={handleExportToExcel}>
              <i className="fa-regular fa-file-excel"></i> Export
            </button>
            <button className='sSIConsumption-print-btn' onClick={handlePrint}>Print</button>
          </div>
        </div>
        <div style={{ display: 'none' }}>
          <div ref={printRef}>
            <h2>Patient Consumption Report</h2>
            <p>Printed On: {new Date().toLocaleString()}</p>
            <div className="sSIConsumption-table-N-paginat">
  <table>
    <thead>
      <tr>
        <th>Consumed Date</th>
        <th>Requisition Item ID</th>
        <th>Consumed Qty</th>
        <th>Unit</th>
        <th>Consumption Type Name</th>
        <th>Entered By</th>
        <th>Remarks</th>
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
<SSIPatientConsumConsumEntry />
    </CustomModal>

    </div>
  );
}

export default SSIPatientConsumption;
