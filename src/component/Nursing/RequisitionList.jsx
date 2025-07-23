 /* prachi parab user interface changed  14/9 */

import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import './RequisitionList.css'; // Update to match the new CSS file
import { startResizing } from '../TableHeadingResizing/resizableColumns';
import { API_BASE_URL } from '../api/api';

const RequisitionList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1); // Assuming you may want to calculate this based on API response
    const [requisitions, setRequisitions] = useState([]);
    const itemsPerPage = 10; // Adjust this as needed
    const [columnWidths, setColumnWidths] = useState({});
    const [selectedItem,setSelectedItem]=useState();
    const [showTable,setShowTable] = useState(false);
  const tableRef = useRef(null);


    useEffect(() => {
        const fetchRequisitions = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/medications`);
                const data = response.data;
                setRequisitions(data); 
                console.log(data);
                
                setTotalPages(Math.ceil(data.length / itemsPerPage)); // Example logic for total pages
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchRequisitions();
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }

    };

    const handleClick=(item)=>{
        setSelectedItem(item);
        setShowTable(true);
    }

    // Calculate the data to show on current page
    const currentItems = requisitions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <>
            <div className="RequisitionList-tableContainer">
                <h5 style={{marginBottom:'20px'}}>Drugs Requisition List</h5>
                <div className='RequisitionList-Header'>
                    <input type='text' placeholder='Search' className='RequisitionList-searchInput'/>
                    <div className="RequisitionList-actions">
                        <span className="RequisitionList-results">Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, requisitions.length)} of {requisitions.length} results</span>
                        <button className="RequisitionList-button">Export</button>
                        <button className="RequisitionList-button">Print</button>
                    </div>
                </div>
                <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
               "Patient Name",
                "Contact No",
                "Date",
                "Status",
                "Item Name",
                "Action"
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
                        {currentItems.map((item, index) => (
                            <tr key={index} className="RequisitionList-tableRow">
                                
                                 <td>{item.newPatientVisitDTO?.firstName} {item.newPatientVisitDTO?.lastName}</td>
                                 <td>{item.patientDTO?.phoneNumber || '7239876658'}</td>

                                <td>{item.medicationDate || 'N/A'}</td>
                                <td>pending</td>
                                <td>{item.medicationName || 'N/A'}</td>
                                <td><button className='RequisitionList-button' onClick={()=>handleClick(item)}>View</button></td>
                                {/* <td>{item.comments || 'N/A'}</td> */}
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {showTable && <div className='RequisitionList-Model'>
                <div className='RequisitionList-view-table'>
                    <div className='RequisitionList-conatiner'>
                    <h1 className='RequisitionList-h1'>Requesting Item List</h1>
                    <button className='RequisitionList-back-btn' onClick={()=>setShowTable(false)}>X</button>
                    </div>
                    <table>
                        <thead>
                            <th>Item Name</th>
                            <th>Requested Qunatity</th>
                        </thead>
                        <tbody>
                                <tr >
                                    <td>{selectedItem.medicationName}</td>
                                    <td>{selectedItem.medicationName}</td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            </div> }           
        </>
    );
};

export default RequisitionList;
