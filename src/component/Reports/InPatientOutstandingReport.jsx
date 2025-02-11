import React, { useState,useRef } from 'react';
import './UserCollectionReport.css';
import { startResizing } from '../../TableHeadingResizing/ResizableColumns';
const InPatientOutstandingReport = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState(['Dr. Smith', 'Dr. Johnson', 'Dr. Williams']); // Example doctors list
  const [columnWidths, setColumnWidths] = useState({});
  const tableRef = useRef(null);

  // Example data for the table
  const reportsData = [
    {
      scheme: 'Scheme A',
      priceCategory: 'Category 1',
      hospitalNo: 'H12345',
      ipNumber: 'IP1001',
      policyMember: 'Policy 1',
      patientName: 'John Doe',
      ageSex: '30/M',
      contactNo: '123-456-7890',
      address: '123 Elm St, Springfield',
      wardBed: 'Ward 1 / Bed 10',
      admittedOn: '2024-08-01',
      daysOfStay: 5,
      creditPharmacy: 200.00,
      provisionalPharmacy: 50.00,
      creditService: 300.00,
      provisionalService: 75.00,
      totalAmount: 625.00,
      totalDeposit: 400.00,
      dueAmount: 225.00,
      carePersonName: 'Jane Doe',
      carePersonContact: '987-654-3210',
    },
    // Repeat for additional rows
    {
      scheme: 'Scheme B',
      priceCategory: 'Category 2',
      hospitalNo: 'H12346',
      ipNumber: 'IP1002',
      policyMember: 'Policy 2',
      patientName: 'Alice Smith',
      ageSex: '45/F',
      contactNo: '234-567-8901',
      address: '456 Oak St, Springfield',
      wardBed: 'Ward 2 / Bed 12',
      admittedOn: '2024-08-02',
      daysOfStay: 3,
      creditPharmacy: 150.00,
      provisionalPharmacy: 40.00,
      creditService: 250.00,
      provisionalService: 60.00,
      totalAmount: 500.00,
      totalDeposit: 300.00,
      dueAmount: 200.00,
      carePersonName: 'Bob Smith',
      carePersonContact: '876-543-2109',
    },
    // Add more rows as needed
    {
      scheme: 'Scheme C',
      priceCategory: 'Category 3',
      hospitalNo: 'H12347',
      ipNumber: 'IP1003',
      policyMember: 'Policy 3',
      patientName: 'Eve Adams',
      ageSex: '52/F',
      contactNo: '345-678-9012',
      address: '789 Pine St, Springfield',
      wardBed: 'Ward 3 / Bed 15',
      admittedOn: '2024-08-03',
      daysOfStay: 4,
      creditPharmacy: 180.00,
      provisionalPharmacy: 60.00,
      creditService: 270.00,
      provisionalService: 80.00,
      totalAmount: 590.00,
      totalDeposit: 350.00,
      dueAmount: 240.00,
      carePersonName: 'Carol Adams',
      carePersonContact: '765-432-1098',
    },
    {
      scheme: 'Scheme D',
      priceCategory: 'Category 4',
      hospitalNo: 'H12348',
      ipNumber: 'IP1004',
      policyMember: 'Policy 4',
      patientName: 'Tom Brown',
      ageSex: '60/M',
      contactNo: '456-789-0123',
      address: '101 Maple St, Springfield',
      wardBed: 'Ward 4 / Bed 20',
      admittedOn: '2024-08-04',
      daysOfStay: 6,
      creditPharmacy: 220.00,
      provisionalPharmacy: 70.00,
      creditService: 330.00,
      provisionalService: 90.00,
      totalAmount: 710.00,
      totalDeposit: 450.00,
      dueAmount: 260.00,
      carePersonName: 'Laura Brown',
      carePersonContact: '654-321-0987',
    },
    {
      scheme: 'Scheme E',
      priceCategory: 'Category 5',
      hospitalNo: 'H12349',
      ipNumber: 'IP1005',
      policyMember: 'Policy 5',
      patientName: 'Sam Green',
      ageSex: '40/M',
      contactNo: '567-890-1234',
      address: '202 Birch St, Springfield',
      wardBed: 'Ward 5 / Bed 25',
      admittedOn: '2024-08-05',
      daysOfStay: 2,
      creditPharmacy: 120.00,
      provisionalPharmacy: 30.00,
      creditService: 180.00,
      provisionalService: 40.00,
      totalAmount: 370.00,
      totalDeposit: 200.00,
      dueAmount: 170.00,
      carePersonName: 'Sally Green',
      carePersonContact: '543-210-9876',
    },
    {
      scheme: 'Scheme F',
      priceCategory: 'Category 6',
      hospitalNo: 'H12350',
      ipNumber: 'IP1006',
      policyMember: 'Policy 6',
      patientName: 'Nancy White',
      ageSex: '38/F',
      contactNo: '678-901-2345',
      address: '303 Cedar St, Springfield',
      wardBed: 'Ward 6 / Bed 30',
      admittedOn: '2024-08-06',
      daysOfStay: 7,
      creditPharmacy: 250.00,
      provisionalPharmacy: 80.00,
      creditService: 350.00,
      provisionalService: 100.00,
      totalAmount: 780.00,
      totalDeposit: 500.00,
      dueAmount: 280.00,
      carePersonName: 'James White',
      carePersonContact: '432-109-8765',
    },
    {
      scheme: 'Scheme G',
      priceCategory: 'Category 7',
      hospitalNo: 'H12351',
      ipNumber: 'IP1007',
      policyMember: 'Policy 7',
      patientName: 'Kathy Black',
      ageSex: '29/F',
      contactNo: '789-012-3456',
      address: '404 Spruce St, Springfield',
      wardBed: 'Ward 7 / Bed 35',
      admittedOn: '2024-08-07',
      daysOfStay: 4,
      creditPharmacy: 160.00,
      provisionalPharmacy: 50.00,
      creditService: 220.00,
      provisionalService: 60.00,
      totalAmount: 490.00,
      totalDeposit: 300.00,
      dueAmount: 190.00,
      carePersonName: 'Gary Black',
      carePersonContact: '321-098-7654',
    },
    {
      scheme: 'Scheme H',
      priceCategory: 'Category 8',
      hospitalNo: 'H12352',
      ipNumber: 'IP1008',
      policyMember: 'Policy 8',
      patientName: 'Rita Blue',
      ageSex: '35/F',
      contactNo: '890-123-4567',
      address: '505 Pine St, Springfield',
      wardBed: 'Ward 8 / Bed 40',
      admittedOn: '2024-08-08',
      daysOfStay: 5,
      creditPharmacy: 190.00,
      provisionalPharmacy: 60.00,
      creditService: 270.00,
      provisionalService: 70.00,
      totalAmount: 590.00,
      totalDeposit: 350.00,
      dueAmount: 240.00,
      carePersonName: 'Dan Blue',
      carePersonContact: '210-987-6543',
    },
    {
      scheme: 'Scheme I',
      priceCategory: 'Category 9',
      hospitalNo: 'H12353',
      ipNumber: 'IP1009',
      policyMember: 'Policy 9',
      patientName: 'Paul Gray',
      ageSex: '47/M',
      contactNo: '901-234-5678',
      address: '606 Elm St, Springfield',
      wardBed: 'Ward 9 / Bed 45',
      admittedOn: '2024-08-09',
      daysOfStay: 3,
      creditPharmacy: 140.00,
      provisionalPharmacy: 40.00,
      creditService: 200.00,
      provisionalService: 50.00,
      totalAmount: 430.00,
      totalDeposit: 250.00,
      dueAmount: 180.00,
      carePersonName: 'Laura Gray',
      carePersonContact: '987-210-6543',
    },
    {
      scheme: 'Scheme J',
      priceCategory: 'Category 10',
      hospitalNo: 'H12354',
      ipNumber: 'IP1010',
      policyMember: 'Policy 10',
      patientName: 'Julia Pink',
      ageSex: '50/F',
      contactNo: '012-345-6789',
      address: '707 Oak St, Springfield',
      wardBed: 'Ward 10 / Bed 50',
      admittedOn: '2024-08-10',
      daysOfStay: 6,
      creditPharmacy: 200.00,
      provisionalPharmacy: 70.00,
      creditService: 280.00,
      provisionalService: 90.00,
      totalAmount: 640.00,
      totalDeposit: 400.00,
      dueAmount: 240.00,
      carePersonName: 'Michael Pink',
      carePersonContact: '654-321-0987',
    },
    {
      scheme: 'Scheme K',
      priceCategory: 'Category 11',
      hospitalNo: 'H12355',
      ipNumber: 'IP1011',
      policyMember: 'Policy 11',
      patientName: 'Sandra Gray',
      ageSex: '42/F',
      contactNo: '123-678-9012',
      address: '808 Cedar St, Springfield',
      wardBed: 'Ward 11 / Bed 55',
      admittedOn: '2024-08-11',
      daysOfStay: 7,
      creditPharmacy: 230.00,
      provisionalPharmacy: 80.00,
      creditService: 310.00,
      provisionalService: 100.00,
      totalAmount: 720.00,
      totalDeposit: 450.00,
      dueAmount: 270.00,
      carePersonName: 'John Gray',
      carePersonContact: '789-012-3456',
    },
    {
      scheme: 'Scheme L',
      priceCategory: 'Category 12',
      hospitalNo: 'H12356',
      ipNumber: 'IP1012',
      policyMember: 'Policy 12',
      patientName: 'George Black',
      ageSex: '55/M',
      contactNo: '234-789-0123',
      address: '909 Birch St, Springfield',
      wardBed: 'Ward 12 / Bed 60',
      admittedOn: '2024-08-12',
      daysOfStay: 4,
      creditPharmacy: 170.00,
      provisionalPharmacy: 50.00,
      creditService: 240.00,
      provisionalService: 70.00,
      totalAmount: 530.00,
      totalDeposit: 300.00,
      dueAmount: 230.00,
      carePersonName: 'Emily Black',
      carePersonContact: '890-123-4567',
    },
  ];

  // Example calculation summary
  const calculationSummary = {
    totalQuantity: reportsData.length,
    grossTotal: reportsData.reduce((acc, item) => acc + item.totalAmount, 0),
    totalDiscount: reportsData.reduce((acc, item) => acc + (item.creditPharmacy - item.provisionalPharmacy) + (item.creditService - item.provisionalService), 0),
    netTotal: reportsData.reduce((acc, item) => acc + item.totalAmount - item.totalDeposit, 0),
  };

  const handlePrint = () => {
    window.print(); // Simple print functionality using the browser's print dialog
  };

  const handleExport = () => {
    console.log('Export function not yet implemented');
    // Implement your export logic here
  };

  const handlePopupToggle = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleDateRangeSelection = (range) => {
    console.log('Selected Range:', range);
    // Implement the logic to filter data based on the selected range
    setIsPopupOpen(false); // Close the popup after selection
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxStates((prevStates) => {
      if (name === 'all') {
        // Set all checkboxes based on 'All' checkbox
        return {
          all: checked,
          samplePending: checked,
          resultPending: checked,
          resultAdded: checked,
          reportFinalized: checked,
        };
      } else {
        // Set individual checkboxes
        const newState = {
          ...prevStates,
          [name]: checked,
        };
        // If any checkbox is unchecked, uncheck 'All'
        const allChecked = Object.values(newState).every((value) => value);
        return {
          ...newState,
          all: allChecked,
        };
      }
    });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    // Implement search logic here, if needed
  };

  return (
    <div className="user-collection-report">
      <div className="user-collection-report-header">
        <h3 className="user-collection-report-title">⚛ InPatient Outstanding Report</h3>
        <div className="user-collection-report-filters">
          <div className="user-collection-report-doctor-filter">
            <label>Operator:</label>
            <select>
              <option value="">Select Doctor</option>
              {doctors.map((doctor, index) => (
                <option key={index} value={doctor}>{doctor}</option>
              ))}
            </select>
            <label>Amount:</label>
            <select>
              <option value="">Select Amount</option>
              {/* Add amount options if needed */}
            </select>
          </div>
          <button className="user-collection-report-show-btn" onClick={() => setShowReport(true)}>Show Report</button>
        </div>
      </div>
      {showReport && (
        <>
          <div className="user-collection-report-controls">
            {/* Search Input */}
            <input
              type="text"
              className="user-collection-report-search"
              placeholder="Search..."
              onChange={(e) => handleSearch(e.target.value)} // Ensure the handleSearch function is defined
            />
            {/* Print and Export Buttons */}
            <div className="user-collection-page-results-info">
              Showing {reportsData.length}/{reportsData.length} results
            </div>
            <button className="user-collection-report-print-btn" onClick={handlePrint}>Print</button>
            <button className="user-collection-report-print-btn" onClick={handleExport}>Export</button>
          </div>
          <div className='user-collection-report-tab'>
            <div className='in-patient-ta'>

            <table className="patientList-table" ref={tableRef}>
          <thead>
            <tr>
              {[
               "Scheme",
              "Price Category",
              "Hospital No",
              "IP Number",
              "Policy/Member",
              "Patient Name",
              "Age/Sex",
              "Contact No",
              "Address",
              "Ward/Bed",
              "Admitted On",
              "Days Of Stay",
              "Credit Pharmacy",
              "Provisional Pharmacy",
              "Credit Service",
              "Provisional Service",
              "Total Amount",
              "Total Deposit",
              "Due Amount",
              "Care Person Name",
              "Care Person Contact"

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
                {reportsData.map((data, index) => (
                  <tr key={index}>
                    <td>{data.scheme}</td>
                    <td>{data.priceCategory}</td>
                    <td>{data.hospitalNo}</td>
                    <td>{data.ipNumber}</td>
                    <td>{data.policyMember}</td>
                    <td>{data.patientName}</td>
                    <td>{data.ageSex}</td>
                    <td>{data.contactNo}</td>
                    <td>{data.address}</td>
                    <td>{data.wardBed}</td>
                    <td>{data.admittedOn}</td>
                    <td>{data.daysOfStay}</td>
                    <td>{data.creditPharmacy.toFixed(2)}</td>
                    <td>{data.provisionalPharmacy.toFixed(2)}</td>
                    <td>{data.creditService.toFixed(2)}</td>
                    <td>{data.provisionalService.toFixed(2)}</td>
                    <td>{data.totalAmount.toFixed(2)}</td>
                    <td>{data.totalDeposit.toFixed(2)}</td>
                    <td>{data.dueAmount.toFixed(2)}</td>
                    <td>{data.carePersonName}</td>
                    <td>{data.carePersonContact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="user-collection-report-page-no">
              <button className="user-collection-report-pagination-btn">First</button>
              <button className="user-collection-report-pagination-btn">Previous</button>
              <span>Page 1 of 4</span>
              <button className="user-collection-report-pagination-btn">Next</button>
              <button className="user-collection-report-pagination-btn">Last</button>
            </div>
          </div>
         
        </>
      )}
    </div>
  );
};

export default InPatientOutstandingReport;
