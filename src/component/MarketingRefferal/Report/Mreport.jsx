// neha mktreffaral-mreport-19/09/24
import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import './Mreport.css';
import { startResizing } from '../../../TableHeadingResizing/ResizableColumns';

const Mreport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);

  useEffect(() => {
   
    axios.get('http://localhost:5000/api.MktReport/fetch-all-MktReport')
      .then(response => {
        setData(response.data); 
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const handlePrint = () => {
    const printContent = document.getElementById('printableTable');
    const newWindow = window.open('', '', 'width=800, height=600');
    newWindow.document.write('<html><head><title>Print Table</title>');
    newWindow.document.write('<style>@media print { body { -webkit-print-color-adjust: exact; } }</style>'); // Ensure the print style matches the screen.
    newWindow.document.write('</head><body >');
    newWindow.document.write(printContent.outerHTML);
    newWindow.document.write('</body></html>');
    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.close();
  };

  return (
    <div className="mkrtref_report_main">
      <h1 className="mkrtref_report_title">Marketing Referral Detail Report</h1>
      
      {/* Filter Bar */}
      <div className="mkrtref_report_filter_bar">
        <div className="mkrtref_report_date_range">
          <label>From:</label>
          <input type="date" />
          <label>To:</label>
          <input type="date" />
        </div>
        <div className="mkrtref_report_filters">
          <label>Referring Party :</label>
          <input type="text" placeholder="Select Referring Party" />
          <label>Referring Group :</label>
          <input type="text" placeholder="Select Referring Group" />
          <label>Referring Org :</label>
          <input type="text" placeholder="Select Referring Org" />
          <label>Area Code :</label>
          <input type="text" />
          <button className="mkrtref_report_show_button">Show Report</button>
        </div>
      </div>
      
      {/* Report Table */}
      <div className="table-container">
        <table className="mkrtref_report_table" ref={tableRef}>
          <thead className="mkrtref_report_table_head">
            <tr>
            {[
  "Referring Party",
  "Party Group",
  "Area Code",
  "Referring Organization",
  "Invoice Net Amount",
  "Referral Amount"
].map((header, index) => (
  <th
    key={index}
    style={{ width: columnWidths[index] }}
    className="rd-resizable-th"
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
                <td colSpan="6" className="mkrtref_report_no_data">Loading...</td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan="6" className="mkrtref_report_no_data">No Rows To Show</td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  <td className="mkrtref_report_no_data">{item.reffeingParty}</td>
                  <td className="mkrtref_report_no_data">{item.partyGroup}</td>
                  <td className="mkrtref_report_no_data">{item.areaCode}</td>
                  <td className="mkrtref_report_no_data">{item.refferingOrganisation}</td>
                  <td className="mkrtref_report_no_data">{item.invoiceNetAmt}</td>
                  <td className="mkrtref_report_no_data">{item.refferalAmt}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="mkrtref_report_pagination">
        {/* <span>Showing {data.length} results</span>
        <div className="mkrtref_report_pagination_controls">
          <button>First</button>
          <button>Previous</button>
          <span>Page 1 of 1</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
        <div className="mkrtref_report_export_print">
         
          {/* <button className='mkrtref_report_export_print_btn' onClick={handlePrint}>Print</button> */}
        </div>
      </div>
    </div>
  );
};

export default Mreport;
