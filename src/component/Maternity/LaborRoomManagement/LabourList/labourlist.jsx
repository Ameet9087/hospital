import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './LabourRoomList.css';
import { startResizing } from '../../../TableHeadingResizing/resizableColumns';

const LabourList = () => {
    const [columnWidths, setColumnWidths] = useState({});
    const tableRef = useRef(null);

    const [deliveries, setDeliveries] = useState([]);
    const [newDelivery, setNewDelivery] = useState({
        laborId: '',
        patientId: '',
        staffManagementId: '', // Added field
        admissionDate: '',
        roomNumber: '',
        deliveryType: '',
        instrumentUsed: '',
        doctorNotes: '',
        motherConditionPostDelivery: '',
        babyConditionPostDelivery: '',
    });

    const [showAddDeliveryModal, setShowAddDeliveryModal] = useState(false);

    // Fetch deliveries data from API when the component mounts
    useEffect(() => {
        const fetchDeliveries = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/labor-list`); // Replace with your actual API endpoint
                setDeliveries(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching deliveries:', error);
            }
        };

        fetchDeliveries();
    }, []); // Empty dependency array ensures this runs once on mount

    const handleAddDelivery = async () => {
        try {
            if (newDelivery.laborId) {
                // Update existing delivery
                await axios.put(`${API_BASE_URL}/labor-list/${newDelivery.laborId}`, newDelivery);
                setDeliveries(deliveries.map(delivery => (delivery.laborId === newDelivery.laborId ? newDelivery : delivery)));
            } else {
                // Add new delivery
                const response = await axios.post(`${API_BASE_URL}/labor-list`, newDelivery);
                setDeliveries([...deliveries, response.data]);
            }
            // Reset newDelivery state
            setNewDelivery({
                laborId: '',
                patientId: '',
                staffManagementId: '', // Reset this as well
                admissionDate: '',
                roomNumber: '',
                deliveryType: '',
                instrumentUsed: '',
                doctorNotes: '',
                motherConditionPostDelivery: '',
                babyConditionPostDelivery: '',
            });
            setShowAddDeliveryModal(false);
        } catch (error) {
            console.error('Error adding/updating delivery:', error);
        }
    };

    const handleEditDelivery = (delivery) => {
        setNewDelivery(delivery);
        setShowAddDeliveryModal(true);
    };

    return (
        <div className="labour-room-management">
            <button className='lr-btn' onClick={() => setShowAddDeliveryModal(true)}>Add Delivery</button>
            
            <table ref={tableRef}>
                <thead>
                    <tr>
                        {[
                            "Labor ID",
                            "Patient ID",
                            "Staff Management ID", // Added header
                            "Admission Date",
                            "Room Number",
                            "Delivery Type",
                            "Instruments Used",
                            "Doctor's Notes",
                            "Mother's Condition Post Delivery",
                            "Baby's Condition Post Delivery",
                            "Actions"
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
                                        onMouseDown={startResizing(tableRef, setColumnWidths)(index)}
                                    ></div>
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {deliveries.map((delivery, index) => (
                        <tr key={index}>
                            <td>{delivery.laborId}</td>
                            <td>{delivery.patientId}</td>
                            <td>{delivery.staffManagementId}</td> {/* Added cell */}
                            <td>{delivery.admissionDate}</td>
                            <td>{delivery.roomNumber}</td>
                            <td>{delivery.deliveryType}</td>
                            <td>{delivery.instrumentUsed}</td>
                            <td>{delivery.doctorNotes}</td>
                            <td>{delivery.motherConditionPostDelivery}</td>
                            <td>{delivery.babyConditionPostDelivery}</td>
                            <td>
                                <button className='lr-edit-btn' onClick={() => handleEditDelivery(delivery)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showAddDeliveryModal && (
                <div className="lr-modal" onClick={() => setShowAddDeliveryModal(false)}>
                    <div className="lr-modal-content" onClick={(e) => e.stopPropagation()}>
                        <h4>{newDelivery.laborId ? 'Edit Delivery' : 'Add New Delivery'}</h4>
                        <div className='lr-formmodal'>
                            <label>Patient ID:</label>
                            <input
                                type="text"
                                value={newDelivery.patientId}
                                onChange={(e) => setNewDelivery({ ...newDelivery, patientId: e.target.value })}
                            />
                        </div>
                        <div className='lr-formmodal'>
                            <label>Staff Management ID:</label>
                            <input
                                type="text"
                                value={newDelivery.staffManagementId} // Added field
                                onChange={(e) => setNewDelivery({ ...newDelivery, staffManagementId: e.target.value })}
                            />
                        </div>
                        <div className='lr-formmodal'>
                            <label>Admission Date:</label>
                            <input
                                type="date"
                                value={newDelivery.admissionDate}
                                onChange={(e) => setNewDelivery({ ...newDelivery, admissionDate: e.target.value })}
                            />
                        </div>
                        <div className='lr-formmodal'>
                            <label>Room Number:</label>
                            <input
                                type="text"
                                value={newDelivery.roomNumber}
                                onChange={(e) => setNewDelivery({ ...newDelivery, roomNumber: e.target.value })}
                            />
                        </div>
                        <div className='lr-formmodal'>
                            <label>Delivery Type:</label>
                            <select
                                value={newDelivery.deliveryType}
                                onChange={(e) => setNewDelivery({ ...newDelivery, deliveryType: e.target.value })}
                            >
                                <option value="Normal">Normal</option>
                                <option value="C-Section">C-Section</option>
                            </select>
                        </div>
                        <div className='lr-formmodal'>
                            <label>Instruments Used:</label>
                            <input
                                type="text"
                                value={newDelivery.instrumentUsed}
                                onChange={(e) => setNewDelivery({ ...newDelivery, instrumentUsed: e.target.value })}
                            />
                        </div>
                        <div className='lr-formmodal'>
                            <label>Doctor's Notes:</label>
                            <textarea
                                value={newDelivery.doctorNotes}
                                onChange={(e) => setNewDelivery({ ...newDelivery, doctorNotes: e.target.value })}
                            />
                        </div>
                        <div className='lr-formmodal'>
                            <label>Mother's Condition Post Delivery:</label>
                            <textarea
                                value={newDelivery.motherConditionPostDelivery}
                                onChange={(e) => setNewDelivery({ ...newDelivery, motherConditionPostDelivery: e.target.value })}
                            />
                        </div>
                        <div className='lr-formmodal'>
                            <label>Baby's Condition Post Delivery:</label>
                            <textarea
                                value={newDelivery.babyConditionPostDelivery}
                                onChange={(e) => setNewDelivery({ ...newDelivery, babyConditionPostDelivery: e.target.value })}
                            />
                        </div>
                        <button className='lr-modal-button' onClick={handleAddDelivery}>Save</button>
                        <button className='lr-modal-button' onClick={() => setShowAddDeliveryModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LabourList;
