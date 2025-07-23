import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DispatchTable.css';
import CustomModal from '../../../CustomModel/CustomModal';
import RequisitionDetail from './RequisitionDetail';

const DispatchTable = ({ dispatch }) => {
    console.log(dispatch);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [show, setShow] = useState(false);



    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleViewClick = () => {
        setShow(true); // Only triggered when button is clicked
    };

    const filteredDispatches = dispatch ? [dispatch] : [];
    const handlePrint = () => {
        window.print(); // Trigger the browser's print dialog
    };
    return (
        <>
            <div className="dispatch-table-container">
                <div className="dispatch-table-header">
                    <div className="dispatch-table-search">
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>
                    <div className="dispatch-table-actions">
                        <span>Showing {filteredDispatches?.length} result</span>

                        <button className="dispatch-print-btn" onClick={handlePrint}>Print</button>

                        <button className="dispatch-export-btn">Export</button>
                    </div>
                </div>

                <table className="requisition-dispatch-table">
                    <thead>
                        <tr>
                            <th>DispatchNo</th>
                            <th>Dispatch Date</th>
                            <th>Req. No</th>
                            <th>Received By</th>
                            <th>Dispatched By</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDispatches
                            ?.map(dispatch => (
                                <tr key={dispatch.inventoryRequisitionId}>
                                    <td>{dispatch.inventoryRequisitionId}</td>
                                    <td>{dispatch.dispatchDate}</td>
                                    <td>{`REQ${dispatch.inventoryRequisitionId}`}</td>
                                    <td>{dispatch.receivedBy}</td>
                                    <td>{dispatch.dispatchBy}</td>
                                    <td>
                                        <button className='dispatch-view-btn' onClick={handleViewClick}>View</button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <CustomModal isOpen={show} onClose={() => setShow(false)}>
                <RequisitionDetail requisition={dispatch} onClose={() => setShow(false)} />
            </CustomModal></>
    );
};

export default DispatchTable;
