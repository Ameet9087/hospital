/* // neha-ADT-canclereservation-19/09/24 */
import React, { useState, useRef } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import './canclereservation.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const CancelReservation = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handlePrint = () => {
    window.print();
  };

  // Dummy data
  const data = [
    { hospitalNo: '001', name: 'John Doe', ageSex: '30/M', phone: '123-456-7890', address: '123 Main St', wardBed: 'Ward 1/Bed 5' },
    { hospitalNo: '002', name: 'Jane Smith', ageSex: '25/F', phone: '987-654-3210', address: '456 Elm St', wardBed: 'Ward 2/Bed 8' },
    // Add more dummy data as needed
  ];

  // Filter data based on search term
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cancelreservation-page">

      {/* <h1>Cancel Bed Reservation</h1> */}
      <div className='canclereservation' >

        <input
          type="text"


          placeholder="Search ....."

          className="cancle-reservation-search-input"
        />
        <button className="canclereservation-print-button" onClick={handlePrint}>Print</button>


      </div>
      <div className='table-container'>

        <table ref={tableRef}>
          <thead>
            <tr>

              {[

                'Hospital No',
                'Patient Name',
                'Age/Sex',
                'Phone No.',
                'Address',
                'Ward/Bed',
                'Action'
              ].map((header, index) => (
                <th
                  key={index}
                  style={{ width: columnWidths[index] }}
                  className="resizable"
                >
                  <div className="rd-header-content">
                    <span>{header}</span>
                    <div
                      className="rd-resizer"
                      onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                    ></div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td >{item.hospitalNo}</td>
                <td >{item.name}</td>
                <td >{item.ageSex}</td>
                <td >{item.phone}</td>
                <td >{item.address}</td>
                <td >{item.wardBed}</td>
                <td>
                  <button className='cancledatabtn'>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default CancelReservation;
