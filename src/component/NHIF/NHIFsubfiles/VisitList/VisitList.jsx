
// neha HI-visitlist-19/09/24
import React, { useState,useRef } from 'react';
import { FaSearch, FaUser, FaSync } from 'react-icons/fa';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';

import './VisitList.css';

function VisitList() {
    const [searchTerm, setSearchTerm] = useState('');
    const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
    const [patients, setPatients] = useState([
        {
            date: '2024-08-20',
            time: '10:00 AM',
            hospitalNo: 'H001',
            name: 'John Doe',
            ageSex: '30/M',
            nhifNo: 'HI123456',
            department: 'Cardiology',
            claimCode: 'CLM0001',
            visitType: 'Follow-up',
            apptType: 'In-Person',
            daysPassed: 5,
        },
        {
            date: '2024-08-18',
            time: '02:00 PM',
            hospitalNo: 'H002',
            name: 'Jane Smith',
            ageSex: '28/F',
            nhifNo: 'NH654321',
            department: 'Pediatrics',
            claimCode: 'CLM0002',
            visitType: 'Initial',
            apptType: 'Virtual',
            daysPassed: 7,
        },
        {
            date: '2024-08-15',
            time: '09:30 AM',
            hospitalNo: 'H003',
            name: 'Alice Johnson',
            ageSex: '45/F',
            nhifNo: 'HI789012',
            department: 'Orthopedics',
            claimCode: 'CLM0003',
            visitType: 'Follow-up',
            apptType: 'In-Person',
            daysPassed: 12,
        },
        {
            date: '2024-08-10',
            time: '11:00 AM',
            hospitalNo: 'H004',
            name: 'Bob Brown',
            ageSex: '60/M',
            nhifNo: 'HI345678',
            department: 'Neurology',
            claimCode: 'CLM0004',
            visitType: 'Initial',
            apptType: 'Virtual',
            daysPassed: 20,
        },
        {
            date: '2024-08-05',
            time: '03:00 PM',
            hospitalNo: 'H005',
            name: 'Carol White',
            ageSex: '37/F',
            nhifNo: 'HI901234',
            department: 'Gynecology',
            claimCode: 'CLM0005',
            visitType: 'Follow-up',
            apptType: 'In-Person',
            daysPassed: 25,
        },
        // Add more entries as needed
    ]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleEdit = (index) => {
        console.log(`Editing visit at index ${index}`);
    };

    const filteredPatients = patients.filter((patient) =>
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='visit_list_main'>
            <div className="visit_list_container">
                <div className="visit_list_new_patient">
                    <FaUser style={{ color: 'blue', fontSize: '16px', marginRight: '10px' }} />
                    <p className='nhif-Admitted_Patient_List'>Insurance Patient Visit List</p>
                </div>
                <div className="visit_list_edit_info">
                     <button className='visit_list_filter_button'> 
                        <FaSync style={{ marginRight: '5px' }} /> Reload
                    </button> 
                </div>
            </div>

            {/* <div className="visit_list_new_patient">
                <p style={{ fontSize: "18px" }}>* Follow-up is valid up to 14 days of last visit with the same doctor</p>
            </div> */}

            <div className='visit-list-filter-content'>
                <div className="visit_list_search_bar">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    {/* <button className="visit_list_filter_button" style={{ height: "30px", padding: "8px", marginLeft: "-50px", fontSize: "18px" }}>
                        <FaSearch />
                    </button> */}
                </div>
                {/* <div>
                    <label style={{ fontSize: "18px" }}>Showing {filteredPatients.length}/5 results</label>
                </div> */}
                <div>
                    <button className='visit_list_filter_button'>Print</button>
                </div>
            </div>

           <div className='table-container'>
           <table className="visit_list_table" ref={tableRef}>
                <thead>
                    <tr>
                    {[
  "Date",
  "Time",
  "Hospital No",
  "Name",
  "Age/Sex",
  "HIF No",
  "Department",
  "Claim Code",
  "Visit Type",
  "Appt. Type",
  "Days Passed",
  "Action"
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
<tbody>                   {filteredPatients.map((patient, index) => (
                        <tr key={index}>
                            <td className='visit_list_tabledata'>{patient.date}</td>
                            <td className='visit_list_tabledata'>{patient.time}</td>
                            <td className='visit_list_tabledata'>{patient.hospitalNo}</td>
                            <td className='visit_list_tabledata'>{patient.name}</td>
                            <td className='visit_list_tabledata'>{patient.ageSex}</td>
                            <td className='visit_list_tabledata'>{patient.nhifNo}</td>
                            <td className='visit_list_tabledata'>{patient.department}</td>
                            <td className='visit_list_tabledata'>{patient.claimCode}</td>
                            <td className='visit_list_tabledata'>{patient.visitType}</td>
                            <td className='visit_list_tabledata'>{patient.apptType}</td>
                            <td className='visit_list_tabledata'>{patient.daysPassed}</td>
                            <td className='visit_list_tabledata'>
                                <button onClick={() => handleEdit(index)} className="visit_list_edit_button">Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
           </div>

            {/* <div className="visit_list_pagination">
                <button>First</button>
                <button>Previous</button>
                <span>Page 1 of 1</span>
                <button>Next</button>
                <button>Last</button>
            </div> */}
        </div>
    );
}   

export default VisitList;
