

// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import "../DisStocks/dispenTransfer.css";
// import DispenStockTransferNewTrans from './dispenStockTransferNewTrans';

// const DispenTransfer = () => {
//     const [showNewTransfer, setShowNewTransfer] = useState(false);
//     const [startDate, setStartDate] = useState(new Date());
//     const [endDate, setEndDate] = useState(new Date());
//     const [searchTerm, setSearchTerm] = useState('');

//     const handlePrint = () => {
//         const doc = new jsPDF();
//         const currentDate = new Date();
//         const formattedDate = currentDate.toLocaleDateString();
//         const formattedTime = currentDate.toLocaleTimeString();

//         // Add title
//         doc.text(" Transfer Report", 20, 10);

//         // Add current date and time
//         doc.text(`Date: ${formattedDate}`, 20, 20);
//         doc.text(`Time: ${formattedTime}`, 20, 30);

//         // Add table
//         doc.autoTable({
//             head: [['Transfer Date', 'Generic Name', 'Medicine Name', 'Batch', 'Expiry Date', 'Requesting Dept.', 'Trans Qty', 'Transferred By', 'Target Store', 'Received By', 'Remarks']],
//             body: [
//                 // Add rows with dummy data or actual data if available
//                 ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
//                 // More rows can be added as needed
//             ],
//             startY: 40,
//         });

//         // Open PDF in a new tab
//         doc.output('dataurlnewwindow');
//     };

//     return (
//         <div className="dispenStockTransfer-requisition">
//             {showNewTransfer ? (
//                 <DispenStockTransferNewTrans />
//             ) : (
//                 <>
//                     <div className="dispenStockTransfer-header">
//                         <button 
//                             className="dispenStockTransfer-collected"
//                             onClick={() => setShowNewTransfer(true)}
//                         >
//                             New Transfer <i className="fa-solid fa-right-left"></i>
//                         </button>
//                     </div>

//                     <div className='dispenStockTransfer-search-N-result'>
//                         <div className="dispenStockTransfer-search-bar">
//                             <i className="fa-solid fa-magnifying-glass"></i>
//                             <input 
//                                 type="text" 
//                                 placeholder="Search..." 
//                                 value={searchTerm}
//                                 onChange={e => setSearchTerm(e.target.value)}
//                             />
//                         </div>
//                         <div className="dispenStockTransfer-results-info">
//                             <span>Showing 0 / 0 results</span>
//                             <button className="dispenStockTransfer-print-button" onClick={handlePrint}>
//                                 Print
//                             </button>
//                         </div>
//                     </div>

//                     <div className='dispenStockTransfer-table-N-paginationDiv'>
//                         <table className="dispenStockTransfer-requisition-table">
//                             <thead>
//                                 <tr>
//                                     <th>Transfer Date</th>
//                                     <th>Generic Name</th>
//                                     <th>Medicine Name</th>
//                                     <th>Batch</th>
//                                     <th>Expiry Date</th>
//                                     <th>Requesting Dept.</th>
//                                     <th>Trans Qty</th>
//                                     <th>Transferred By</th>
//                                     <th>Target Store</th>
//                                     <th>Received By</th>
//                                     <th>Remarks</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     {/* <td colSpan="11" className="no-data">No Rows To Show</td> */}
//                                 </tr>
//                             </tbody>
//                         </table>

//                         <div className="dispenStockTransfer-pagination">
//                             <span>0 to 0 of 0</span>
//                             <button>First</button>
//                             <button>Previous</button>
//                             <span>Page 0 of 0</span>
//                             <button>Next</button>
//                             <button>Last</button>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default DispenTransfer;

// import React, { useState } from 'react';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import "../DisStocks/dispenTransfer.css";
// import DispenStockTransferNewTrans from './dispenStockTransferNewTrans';

// const DispenTransfer = () => {
//     const [showNewTransfer, setShowNewTransfer] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');

//     const handlePrint = () => {
//         const doc = new jsPDF();
//         const currentDate = new Date();
//         const formattedDate = currentDate.toLocaleDateString();
//         const formattedTime = currentDate.toLocaleTimeString();

//         // Add title
//         doc.text("Transfer Report", 20, 10);

//         // Add current date and time
//         doc.text(`Date: ${formattedDate}`, 20, 20);
//         doc.text(`Time: ${formattedTime}`, 20, 30);

//         // Add table
//         doc.autoTable({
//             head: [['Transfer Date', 'Generic Name', 'Medicine Name', 'Batch', 'Expiry Date', 'Requesting Dept.', 'Trans Qty', 'Transferred By', 'Target Store', 'Received By', 'Remarks']],
//             body: [
//                 // Add rows with dummy data or actual data if available
//                 ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'],
//                 // More rows can be added as needed
//             ],
//             startY: 40,
//         });

//         // Open PDF in a new tab
//         doc.output('dataurlnewwindow');
//     };

//     return (
//         <div className="dispenStockTransfer-requisition">
//             {showNewTransfer ? (
//                 <DispenStockTransferNewTrans 
//                     onDiscard={() => setShowNewTransfer(false)} // Pass the callback function
//                 />
//             ) : (
//                 <>
//                     <div className="dispenStockTransfer-header">
//                         <button 
//                             className="dispenStockTransfer-collected"
//                             onClick={() => setShowNewTransfer(true)}
//                         >
//                             New Transfer <i className="fa-solid fa-right-left"></i>
//                         </button>
//                     </div>

//                     <div className='dispenStockTransfer-search-N-result'>
//                         <div className="dispenStockTransfer-search-bar">
//                             <i className="fa-solid fa-magnifying-glass"></i>
//                             <input 
//                                 type="text" 
//                                 placeholder="Search..." 
//                                 value={searchTerm}
//                                 onChange={e => setSearchTerm(e.target.value)}
//                             />
//                         </div>
//                         <div className="dispenStockTransfer-results-info">
//                             <span>Showing 0 / 0 results</span>
//                             <button className="dispenStockTransfer-print-button" onClick={handlePrint}>
//                                 Print
//                             </button>
//                         </div>
//                     </div>

//                     <div className='dispenStockTransfer-table-N-paginationDiv'>
//                         <table className="dispenStockTransfer-requisition-table">
//                             <thead>
//                                 <tr>
//                                     <th>Transfer Date</th>
//                                     <th>Generic Name</th>
//                                     <th>Medicine Name</th>
//                                     <th>Batch</th>
//                                     <th>Expiry Date</th>
//                                     <th>Requesting Dept.</th>
//                                     <th>Trans Qty</th>
//                                     <th>Transferred By</th>
//                                     <th>Target Store</th>
//                                     <th>Received By</th>
//                                     <th>Remarks</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 <tr>
//                                     {/* <td colSpan="11" className="no-data">No Rows To Show</td> */}
//                                 </tr>
//                             </tbody>
//                         </table>

//                         <div className="dispenStockTransfer-pagination">
//                             <span>0 to 0 of 0</span>
//                             <button>First</button>
//                             <button>Previous</button>
//                             <span>Page 0 of 0</span>
//                             <button>Next</button>
//                             <button>Last</button>
//                         </div>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default DispenTransfer;

 /* Ajhar Tamboli dispenTransfer.jsx 19-09-24 */


import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "../DisStocks/dispenTransfer.css";
import DispenStockTransferNewTrans from './dispenStockTransferNewTrans';

const DispenTransfer = () => {
    const [showNewTransfer, setShowNewTransfer] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [transfers, setTransfers] = useState([]);
    const [filteredTransfers, setFilteredTransfers] = useState([]);

    // Fetch transfers data from the API
    useEffect(() => {
        const fetchTransfers = async () => {
            try {
                const response = await fetch('http://localhost:1415/api/transfers/fetch-all-transfers');
                const data = await response.json();
                setTransfers(data);
                setFilteredTransfers(data); // Initialize filtered data
            } catch (error) {
                console.error('Error fetching transfer data:', error);
            }
        };

        fetchTransfers();
    }, []);

    // Filter data based on search term
    useEffect(() => {
        setFilteredTransfers(
            transfers.filter((transfer) =>
                Object.values(transfer).some((value) =>
                    value.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            )
        );
    }, [searchTerm, transfers]);

    const handlePrint = () => {
        const doc = new jsPDF();
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        const formattedTime = currentDate.toLocaleTimeString();

        // Add title
        doc.text("Transfer Report", 20, 10);

        // Add current date and time
        doc.text(`Date: ${formattedDate}`, 20, 20);
        doc.text(`Time: ${formattedTime}`, 20, 30);

        // Add table
        doc.autoTable({
            head: [['Transfer Date', 'Generic Name', 'Medicine Name', 'Batch', 'Expiry Date', 'Requesting Dept.', 'Trans Qty', 'Transferred By', 'Target Store', 'Received By', 'Remarks']],
            body: filteredTransfers.map((transfer) => [
                transfer.transferDate,
                transfer.genericName,
                transfer.medicineName,
                transfer.batch,
                transfer.expiryDate,
                // transfer.requestingDept || '-', // Add other fields accordingly
                transfer.transferQty,
                transfer.transferredBy,
                transfer.targetStore,
                transfer.receivedBy,
                transfer.remark,
            ]),
            startY: 40,
        });

        // Open PDF in a new tab
        doc.output('dataurlnewwindow');
    };

    return (
        <div className="dispenStockTransfer-requisition">
            {showNewTransfer ? (
                <DispenStockTransferNewTrans 
                    onDiscard={() => setShowNewTransfer(false)} 
                />
            ) : (
                <>
                    <div className="dispenStockTransfer-header">
                        <button 
                            className="dispenStockTransfer-collected"
                            onClick={() => setShowNewTransfer(true)}
                        >
                            New Transfer <i className="fa-solid fa-right-left"></i>
                        </button>
                    </div>

                    <div className="dispenStockTransfer-controls">
        {/* Your date range and button controls */}
          <div className="dispenStockTransfer-date-range">
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

                    <div className='dispenStockTransfer-search-N-result'>
                        <div className="dispenStockTransfer-search-bar">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="dispenStockTransfer-results-info">
                            <span>Showing {filteredTransfers.length} / {transfers.length} results</span>
                            <button className="dispenStockTransfer-print-button" onClick={handlePrint}>
                            <i className="fa-solid fa-file-excel"></i> Export
                            </button>
                            <button className="dispenStockTransfer-print-button" onClick={handlePrint}>
                            <i class="fa-solid fa-print"></i> Print
                            </button>
                        </div>
                    </div>

                    <div className='dispenStockTransfer-table-N-paginationDiv'>
                        <table className="dispenStockTransfer-requisition-table">
                            <thead>
                                <tr>
                                    <th>Transfer Date</th>
                                    <th>Generic Name</th>
                                    <th>Medicine Name</th>
                                    <th>Batch</th>
                                    <th>Expiry Date</th>
                                    {/* <th>Requesting Dept.</th> */}
                                    <th>Trans Qty</th>
                                    <th>Transferred By</th>
                                    <th>Target Store</th>
                                    <th>Received By</th>
                                    <th>Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransfers.length > 0 ? (
                                    filteredTransfers.map((transfer, index) => (
                                        <tr key={index}>
                                            <td>{transfer.transferDate}</td>
                                            <td>{transfer.genericName}</td>
                                            <td>{transfer.medicineName}</td>
                                            <td>{transfer.batch}</td>
                                            <td>{transfer.expiryDate}</td>
                                            {/* <td>{transfer.requestingDept || '-'}</td> */}
                                            <td>{transfer.transferQty}</td>
                                            <td>{transfer.transferredBy}</td>
                                            <td>{transfer.targetStore}</td>
                                            <td>{transfer.receivedBy}</td>
                                            <td>{transfer.remark}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="11" className="no-data">No Rows To Show</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* <div className="dispenStockTransfer-pagination">
                            <span>{filteredTransfers.length} to {transfers.length} of {transfers.length}</span>
                            <button>First</button>
                            <button>Previous</button>
                            <span>Page 0 of 0</span>
                            <button>Next</button>
                            <button>Last</button>
                        </div> */}
                    </div>
                </>
            )}
        </div>
    );
};

export default DispenTransfer;

