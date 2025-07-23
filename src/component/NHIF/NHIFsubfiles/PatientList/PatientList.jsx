// neha HI-patientlist-19/09/24
import React, { useState ,useRef} from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import './patient_list.css';
import { startResizing } from '../../../../TableHeadingResizing/ResizableColumns';

function PatientList() {
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const tableRef = useRef(null);
  const [columnWidths, setColumnWidths] = useState(0);
  const [patients, setPatients] = useState([
    {
      hospitalNo: 'H001',
      patientName: 'John Doe',
      nhifCode: 'HIS1234',
      ageSex: '30/M',
      phone: '+254701234567',
      address: '123 Main St, Nairobi',
      balanceAmount: '5000',
      latestClaimCode: 'CLM1001',
    },
    {
      hospitalNo: 'H002',
      patientName: 'Jane Smith',
      nhifCode: 'HI5678',
      ageSex: '28/F',
      phone: '+254701234568',
      address: '456 Elm St, Nairobi',
      balanceAmount: '3000',
      latestClaimCode: 'CLM1002',
    },
    {
      hospitalNo: 'H003',
      patientName: 'Alice Johnson',
      nhifCode: 'HI9101',
      ageSex: '45/F',
      phone: '+254701234569',
      address: '789 Pine St, Nairobi',
      balanceAmount: '1000',
      latestClaimCode: 'CLM1003',
    },
    {
      hospitalNo: 'H004',
      patientName: 'Bob Brown',
      nhifCode: 'HI1122',
      ageSex: '60/M',
      phone: '+254701234570',
      address: '101 Maple St, Nairobi',
      balanceAmount: '2500',
      latestClaimCode: 'CLM1004',
    },
    {
      hospitalNo: 'H005',
      patientName: 'Carol White',
      nhifCode: 'HI3344',
      ageSex: '37/F',
      phone: '+254701234571',
      address: '202 Oak St, Nairobi',
      balanceAmount: '7000',
      latestClaimCode: 'CLM1005',
    },
    // Add more patients as needed
  ]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleEdit = (index) => {
    console.log(`Editing patient at index ${index}`);
  };

  const filteredPatients = patients.filter((patient) =>
    patient.patientName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='patient_list_main'>
      <div className="patient_list_container">
        <div className="patient_list_new_patient">
          <button className="nhif-new-ptn" onClick={handleOpenModal}>
            <FaPlus className="patient_list_button_icon" />
            New Insurance Patient
          </button>
        </div>

        <div className="patient_list_edit_info">
          <label htmlFor="existing-patient" className="patient_list_label">Edit Information of:</label>
          <input
            type="text"
            id="existing-patient"
            placeholder="Existing Patient Name"
            className="patient_list_input_text"
          />
        </div>
      </div>

      <div className='patient-list-filter-content'>
        <div className="patient_list_search_bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          
          <div>
            <button className='nhif-new-ptn'>Print</button>
          </div>
        </div>
      </div>

     <div className='table-container'>
     <table ref={tableRef}>
        <thead>
          <tr>
          {[
  "Hospital No",
  "Patient Name",
  "HIF Code",
  "Age/Sex",
  "Phone",
  "Address",
  "Balance Amount",
  "Latest Claim Code",
  "Actions"
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
          {filteredPatients.map((patient, index) => (
            <tr key={index}>
              <td className='patient_list_tabledata'>{patient.hospitalNo}</td>
              <td className='patient_list_tabledata'>{patient.patientName}</td>
              <td className='patient_list_tabledata'>{patient.nhifCode}</td>
              <td className='patient_list_tabledata'>{patient.ageSex}</td>
              <td className='patient_list_tabledata'>{patient.phone}</td>
              <td className='patient_list_tabledata'>{patient.address}</td>
              <td className='patient_list_tabledata'>{patient.balanceAmount}</td>
              <td className='patient_list_tabledata'>{patient.latestClaimCode}</td>
              <td className='patient_list_tabledata'>
                <button onClick={() => handleEdit(index)} className="patient_list_edit_button">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     </div>

      {/* <div className="patient_list_pagination">
        <button>First</button>
        <button>Previous</button>
        <span>Page 1 of 1</span>
        <button>Next</button>
        <button>Last</button>
      </div> */}

      {/* Modal */}
      {showModal && (
        <div className="patient-list-modal-overlay">
          <div className="patient-list-modal">
            <div className="patient-list-modal-header">
              <h2>New Patient Registration</h2>
              <button onClick={handleCloseModal} className="patient-list-modal-close-button">&times;</button>
            </div>

            <div className="patient-list-modal-section">
              <h3>Patient Information</h3>
              <div className="patient-list-modal-row">
                <label>First Name <span>*</span></label>
                <input type="text" placeholder="First Name" className="patient-list-modal-input" />
                <label>Country <span>*</span></label>
                <select className="patient-list-modal-input">
                  <option>Kenya</option>
                </select>
              </div>

              <div className="patient-list-modal-row">
                <label>Middle Name</label>
                <input type="text" placeholder="Middle Name" className="patient-list-modal-input" />
                <label>County <span>*</span></label>
                <input type="text" placeholder="Juja sub county" className="patient-list-modal-input" />
              </div>

              <div className="patient-list-modal-row">
                <label>Last Name <span>*</span></label>
                <input type="text" placeholder="Last Name" className="patient-list-modal-input" />
                <label>Address</label>
                <input type="text" placeholder="Address" className="patient-list-modal-input" />
              </div>

              <div className="patient-list-modal-row">
                <label>Religion <span>*</span></label>
                <select className="patient-list-modal-input">
                  <option>--Religion--</option>
                  <option>Christian</option>
                  <option>Muslim</option>
                  <option>Hindu</option>
                  <option>Other</option>
                </select>
                <label>Gender <span>*</span></label>
                <select className="patient-list-modal-input">
                  <option>--Select--</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="patient-list-modal-row">
                <label>Age <span>*</span></label>
                <input type="text" placeholder="Age" className="patient-list-modal-input" />
                <select className="patient-list-modal-input">
                  <option>Years</option>
                  <option>Months</option>
                </select>
                <label>Contact Number <span>*</span></label>
                <input type="text" placeholder="Contact Number" className="patient-list-modal-input" />
              </div>
            </div>

            <div className="patient-list-modal-section">
              <h3>Insurance Information</h3>
              <div className="patient-list-modal-row">
                <label>Insurance Provider <span>*</span></label>
                <select className="patient-list-modal-input">
                  <option>HIF</option>
                </select>
                <label>Is Family Head <span>*</span></label>
                <input type="checkbox" />
              </div>

              <div className="patient-list-modal-row">
                <label>HIF Number <span>*</span></label>
                <input type="text" placeholder="NHIF Number" className="patient-list-modal-input" />
                <label>Insurance Scheme</label>
                <input type="text" placeholder="Insurance Scheme" className="patient-list-modal-input" />
              </div>
            </div>

            <div className="patient-list-modal-footer">
              <button onClick={handleCloseModal} className="patient-list-modal-save-button">Save</button>
              <button onClick={handleCloseModal} className="patient-list-modal-close-button">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientList;
