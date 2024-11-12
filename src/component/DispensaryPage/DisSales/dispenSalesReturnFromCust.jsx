 /* Ajhar Tamboli dispenSalesReturnFromCust.jsx 19-09-24 */


import React, { useRef,useState } from 'react';
import { Calendar, Search } from 'lucide-react';
import '../DisSales/dispenSalesReturnFromCust.css'
import { startResizing } from '../../TableHeadingResizing/resizableColumns';

const DispenSalesReturnFromCust = () => {
  const [fiscalYear, setFiscalYear] = useState('2024');
  const [invoiceNo, setInvoiceNo] = useState('');
  const [patientName, setPatientName] = useState('');
  const [referenceInvoiceNo, setReferenceInvoiceNo] = useState('');
  const [referenceInvoiceDate, setReferenceInvoiceDate] = useState('08/30/2024');
  const [drugName, setDrugName] = useState('');
  const [batch, setBatch] = useState('');
  const [returnedQty, setReturnedQty] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [remarks, setRemarks] = useState('');
  const [returncustomLists, setReturncustomLists] = useState([]);
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);
  // useEffect(() => {
  //   // Fetch data from the backend API
  //   fetch('http://localhost:1415/api/hospital/return-lists/fetch-all-returnList')
  //     .then(response => response.json())
  //     .then(data => setReturncustomLists(data))
  //     .catch(error => console.error('Error fetching return list data:', error));
  // }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic
  };

  const handleManualReturn = () => {
    // Handle manual return logic
  };

  const handlePrintReceipt = () => {
    // Handle print receipt logic
  };

  return (
    <div className="dispenSalesReturnFromCust-form">
      <div className="dispenSalesReturnFromCust-options">
        <div className="dispenSalesReturnFromCust-checkbox-group">
          <label htmlFor="returnBy">Return By *:</label>
          {/* <input type="checkbox" id="returnBy" /> */}
        </div>
        <div className="dispenSalesReturnFromCust-checkbox-group">
          <input type="checkbox" id="billNo" />
          <label htmlFor="billNo">Bill No</label>
        </div>
        <div className="dispenSalesReturnFromCust-checkbox-group">
          <input type="checkbox" id="hospitalNo" />
          <label htmlFor="hospitalNo">Hospital No</label>
        </div>
      </div>

      <div className="dispenSalesReturnFromCust-search-section">
        <div className="dispenSalesReturnFromCust-form-group-two">
        <div className="dispenSalesReturnFromCust-form-group-fs">
          <label htmlFor="fiscalYear">Fiscal Year:</label>
          <select id="fiscalYear" value={fiscalYear} onChange={(e) => setFiscalYear(e.target.value)}>
            <option value="2024">2024</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="dispenSalesReturnFromCust-form-group-fs">
          <label htmlFor="invoiceNo">Invoice No:</label>
          <input 
            type="text" 
            id="invoiceNo" 
            placeholder="Enter InvoiceNo." 
            value={invoiceNo} 
            onChange={(e) => setInvoiceNo(e.target.value)} 
          />
        </div>
        <button className="dispenSalesReturnFromCust-btn-search" onClick={handleSearch}>
          <Search size={16} /> Search
        </button>
        </div>
        <button className="dispenSalesReturnFromCust-btn-manual-return" onClick={handleManualReturn}>
        <i class="fa-solid fa-plus"></i> Manual Return
        </button>
      </div>

      <h5>New Sales Return</h5>

      <div className="dispenSalesReturnFromCust-patient-info">
        <div className="dispenSalesReturnFromCust-form-group">
          <label htmlFor="patientName">Patient Name *:</label>
          <div className="dispenSalesReturnFromCust-search-input">
            <input 
              type="text" 
              id="patientName" 
              placeholder="Search Patient" 
              value={patientName} 
              onChange={(e) => setPatientName(e.target.value)} 
            />
            <Search size={16} className="dispenSalesReturnFromCust-search-icon" />
          </div>
          {patientName === '' && (
            <div className="dispenSalesReturnFromCust-error-messages">
              <p>Patient Name is required.</p>
              <p>Patient is not registered.</p>
            </div>
          )}
        </div>
        <div className="dispenSalesReturnFromCust-form-group">
          <label htmlFor="referenceInvoiceNo">Reference Invoice No *:</label>
          <input 
            type="text" 
            id="referenceInvoiceNo" 
            value={referenceInvoiceNo} 
            onChange={(e) => setReferenceInvoiceNo(e.target.value)} 
          />
        </div>
        <div className="dispenSalesReturnFromCust-form-group">
          <label htmlFor="referenceInvoiceDate">Reference Invoice Date *:</label>
          <div className="date-input">
            <input 
              type="text" 
              id="referenceInvoiceDate" 
              value={referenceInvoiceDate} 
              onChange={(e) => setReferenceInvoiceDate(e.target.value)} 
            />
            <Calendar size={16} className="dispenSalesReturnFromCust-calendar-icon" />
          </div>
        </div>
      </div>

      <table ref={tableRef}>
      <thead>
          <tr>{[
            "",
            "Drug Name*",
            "Batch*",
            "Expiry*",
            "Returned Qty*",
            "SalePrice*",
            "Total Amount",
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
          <tr>
            <td>
              <button className="dispenSalesReturnFromCust-btn-remove">X</button>
            </td>
            <td>
              <input 
                type="text" 
                placeholder="-- Search Drug --" 
                value={drugName} 
                onChange={(e) => setDrugName(e.target.value)} 
              />
            </td>
            <td>
              <select value={batch} onChange={(e) => setBatch(e.target.value)}>
                <option value="">Select Batch</option>
                {/* Add batch options here */}
              </select>
            </td>
            <td>{/* Add expiry date input */}</td>
            <td>
              <input 
                type="number" 
                value={returnedQty} 
                onChange={(e) => setReturnedQty(Number(e.target.value))} 
              />
            </td>
            <td>
              <input 
                type="number" 
                value={salePrice} 
                onChange={(e) => setSalePrice(Number(e.target.value))} 
              />
            </td>
            <td>{returnedQty * salePrice}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="6" className="dispenSalesReturnFromCust-text-right">Total Return Amount</td>
            <td>{returnedQty * salePrice}</td>
          </tr>
        </tfoot>
      </table>

      <button className="dispenSalesReturnFromCust-btn-add">+</button>

      <div className="dispenSalesReturnFromCust-form-group-remarks">
        <label htmlFor="remarks">Remarks *:</label>
        <textarea 
          id="remarks" 
          value={remarks} 
          onChange={(e) => setRemarks(e.target.value)} 
        ></textarea>
      </div>

      <div className="dispenSalesReturnFromCust-PRB">
      <button className="dispenSalesReturnFromCust-btn-print" onClick={handlePrintReceipt}>
        Print Return Receipt
      </button>
    </div>
    </div>
  );
};

export default DispenSalesReturnFromCust;