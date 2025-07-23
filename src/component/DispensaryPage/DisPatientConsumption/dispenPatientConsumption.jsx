
// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import "../DisPatientConsumption/dispenPatientConsumption.css"
// import DispenPatientConsumNewPC from './dispenPatientConsumNewPC';

// const DispenPatientConsumption = () => {
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(new Date());
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the popup visibility


//   const handlePrint = () => {
//     const table = document.getElementById('tableToPrint');
    
//     html2canvas(table).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const imgWidth = 190;
//       const imgHeight = canvas.height * imgWidth / canvas.width;
//       pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      
//       // Open PDF in new tab
//       const pdfWindow = window.open("");
//       pdfWindow.document.write("<iframe width='100%' height='100%' src='" + pdf.output('dataurlstring') + "'></iframe>");
//     });
//   };
//   const openPopup = () => {
//     setIsPopupOpen(true); // Open the popup
//   };

//   const closePopup = () => {
//     setIsPopupOpen(false); // Close the popup
//   };

//   return (
//     <div className="dispenPatientConsumption-requisition">
//       <div className="dispenPatientConsumption-header">
//         <button className="dispenPatientConsumption-collected"onClick={openPopup}>New Consumption</button>
//       </div>
      
//       <div className="dispenPatientConsumption-filters">
//         {/* Add your filters here */}
//       </div>

//       <div className='dispenPatientConsumption-search-N-result'>
//         <div className="dispenPatientConsumption-search-bar">
//           <i className="fa-solid fa-magnifying-glass"></i>
//           <input 
//             type="text" 
//             placeholder="Search..." 
//             value={searchTerm}
//             onChange={e => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="dispenPatientConsumption-results-info">
//           <span>Showing 0 / 0 results</span>
//           <button className="dispenPatientConsumption-print-button" onClick={handlePrint}>Print</button>
//         </div>
//       </div>

//       <div className='dispenPatientConsumption-table-N-paginationDiv'>
//         <table id="tableToPrint" className="dispenPatientConsumption-requisition-table">
//           <thead>
//             <tr>
//               <th>Hospital Number</th>
//               <th>Patient Name</th>
//               <th>Age/Sex</th>
//               <th>Contact No.</th>
//               <th>Total Amt.</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               {/* Add your data rows here */}
//               {/* <td colSpan="9" className="no-data">No Rows To Show</td> */}
//             </tr>
//           </tbody>
//         </table>
        
//         <div className="dispenPatientConsumption-pagination">
//           <span>0 to 0 of 0</span>
//           <button>First</button>
//           <button>Previous</button>
//           <span>Page 0 of 0</span>
//           <button>Next</button>
//           <button>Last</button>
//         </div>
//       </div>
//       {/* Popup for New Consumption Entry */}
//       {isPopupOpen && (
//         <div className="dispenPatientConsumption-popup-overlay">
//           <div className="dispenPatientConsumption-popup-content">
//             <DispenPatientConsumNewPC />
//             <button className="dispenPatientConsumption-close-popup-button" onClick={closePopup}>Close</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DispenPatientConsumption;
import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import "../DisPatientConsumption/dispenPatientConsumption.css";
import DispenPatientConsumNewPC from './dispenPatientConsumNewPC';

const DispenPatientConsumption = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [patientConsumptions, setPatientConsumptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:1415/api/patient-consumption/fetch-all-patient-consumption")
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then(data => {
        setPatientConsumptions(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handlePrint = () => {
    const table = document.getElementById('tableToPrint');
    
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      
      const pdfWindow = window.open("");
      pdfWindow.document.write("<iframe width='100%' height='100%' src='" + pdf.output('dataurlstring') + "'></iframe>");
    });
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="dispenPatientConsumption-requisition">
      <div className="dispenPatientConsumption-header">
        <button className="dispenPatientConsumption-collected" onClick={openPopup}>New Consumption <i class="fa-solid fa-plus"></i> </button>
      </div>
      <div className="dispenPatientConsumption-controls">
          <div className="dispenPatientConsumption-date-range">
      <label>
        From:
        <input type="date" defaultValue="2024-08-09" />
      </label>
      <label>
        To:
        <input type="date" defaultValue="2024-08-16" />
      </label>

    </div>

          </div>
      <div className="dispenPatientConsumption-filters">
        {/* Add your filters here */}
      </div>

      <div className='dispenPatientConsumption-search-N-result'>
        <div className="dispenPatientConsumption-search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="dispenPatientConsumption-results-info">
          <span>Showing {patientConsumptions.length} / {patientConsumptions.length} results</span>
          <button className="dispenPatientConsumption-print-button" onClick={""}><i className="fa-solid fa-file-excel"></i> Export</button>
          <button className="dispenPatientConsumption-print-button" onClick={handlePrint}><i class="fa-solid fa-print"></i> Print</button>
        </div>
      </div>

      <div className='dispenPatientConsumption-table-N-paginationDiv'>
        <table id="tableToPrint" className="dispenPatientConsumption-requisition-table">
          <thead>
            <tr>
              <th>Hospital Number</th>
              <th>Patient Name</th>
              <th>Age/Sex</th>
              <th>Contact No.</th>
              <th>Total Amt.</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6">Loading...</td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan="6" className="no-data">{error}</td>
              </tr>
            ) : patientConsumptions.length > 0 ? (
              patientConsumptions.filter(consumption =>
                consumption.patientName.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((consumption) => (
                <tr key={consumption.consumptionId}>
                  <td>{consumption.hospitalNumber}</td>
                  <td>{consumption.patientName}</td>
                  <td>{consumption.age}</td>
                  <td>{consumption.contact}</td>
                  <td>{consumption.totalAmt}</td>
                  <td><button>Action</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">No Rows To Show</td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* <div className="dispenPatientConsumption-pagination">
          <span>0 to {patientConsumptions.length} of {patientConsumptions.length}</span>
          <button>First</button>
          <button>Previous</button>
          <span>Page 0 of 0</span>
          <button>Next</button>
          <button>Last</button>
        </div> */}
      </div>

      {/* Popup for New Consumption Entry */}
      {isPopupOpen && (
        <div className="dispenPatientConsumption-popup-overlay">
          <div className="dispenPatientConsumption-popup-content">
            <DispenPatientConsumNewPC />
            <button className="dispenPatientConsumption-close-popup-button" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DispenPatientConsumption;
